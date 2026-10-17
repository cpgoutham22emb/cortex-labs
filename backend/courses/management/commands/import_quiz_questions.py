import csv

from django.core.management.base import (
    BaseCommand,
    CommandError,
)
from django.db import transaction

from courses.models import (
    Quiz,
    QuizQuestion,
    QuizOption,
)


class Command(BaseCommand):
    help = "Bulk import quiz questions from a CSV file."

    def add_arguments(self, parser):
        parser.add_argument(
            "csv_file",
            type=str,
            help="Path to the CSV file",
        )

        parser.add_argument(
            "--replace",
            action="store_true",
            help=(
                "Delete existing questions for the "
                "specified quizzes before importing."
            ),
        )

    @transaction.atomic
    def handle(self, *args, **options):

        csv_file = options["csv_file"]
        replace = options["replace"]

        try:
            with open(
                csv_file,
                "r",
                encoding="utf-8-sig",
                newline="",
            ) as file:

                reader = csv.DictReader(file)

                required_columns = {
                    "quiz",
                    "question",
                    "option_a",
                    "option_b",
                    "option_c",
                    "option_d",
                    "correct_option",
                    "marks",
                    "order",
                }

                missing = (
                    required_columns
                    - set(reader.fieldnames or [])
                )

                if missing:
                    raise CommandError(
                        "Missing CSV columns: "
                        + ", ".join(
                            sorted(missing)
                        )
                    )

                rows = list(reader)

                if not rows:
                    raise CommandError(
                        "CSV file contains no questions."
                    )

                quiz_titles = {
                    row["quiz"].strip()
                    for row in rows
                    if row.get("quiz")
                }

                quizzes = {}

                for title in quiz_titles:
                    try:
                        quizzes[title] = Quiz.objects.get(
                            title=title
                        )
                    except Quiz.DoesNotExist:
                        raise CommandError(
                            f"Quiz '{title}' does not exist."
                        )

                # -------------------------------------------------
                # OPTIONAL REPLACE MODE
                # -------------------------------------------------

                if replace:
                    self.stdout.write(
                        self.style.WARNING(
                            "Replace mode enabled."
                        )
                    )

                    for quiz in quizzes.values():

                        deleted_count, _ = (
                            QuizQuestion.objects.filter(
                                quiz=quiz
                            ).delete()
                        )

                        self.stdout.write(
                            f"Deleted {deleted_count} "
                            f"existing records from "
                            f"'{quiz.title}'."
                        )

                # -------------------------------------------------
                # IMPORT
                # -------------------------------------------------

                created_questions = 0
                created_options = 0

                for row_number, row in enumerate(
                    rows,
                    start=2,
                ):

                    quiz_title = row[
                        "quiz"
                    ].strip()

                    quiz = quizzes[quiz_title]

                    question_text = row[
                        "question"
                    ].strip()

                    correct_option = row[
                        "correct_option"
                    ].strip().upper()

                    if correct_option not in {
                        "A",
                        "B",
                        "C",
                        "D",
                    }:
                        raise CommandError(
                            f"Row {row_number}: "
                            "correct_option must be "
                            "A, B, C or D."
                        )

                    try:
                        order = int(
                            row["order"]
                        )

                        marks = int(
                            row["marks"]
                        )
                    except ValueError:
                        raise CommandError(
                            f"Row {row_number}: "
                            "order and marks must "
                            "be integers."
                        )

                    if order < 1:
                        raise CommandError(
                            f"Row {row_number}: "
                            "order must be >= 1."
                        )

                    if marks < 1:
                        raise CommandError(
                            f"Row {row_number}: "
                            "marks must be >= 1."
                        )

                    options_data = {
                        "A": row[
                            "option_a"
                        ].strip(),

                        "B": row[
                            "option_b"
                        ].strip(),

                        "C": row[
                            "option_c"
                        ].strip(),

                        "D": row[
                            "option_d"
                        ].strip(),
                    }

                    for letter, text in options_data.items():
                        if not text:
                            raise CommandError(
                                f"Row {row_number}: "
                                f"Option {letter} "
                                "cannot be empty."
                            )

                    question = (
                        QuizQuestion.objects.create(
                            quiz=quiz,
                            question=question_text,
                            order=order,
                            marks=marks,
                        )
                    )

                    created_questions += 1

                    for option_order, letter in enumerate(
                        ["A", "B", "C", "D"],
                        start=1,
                    ):

                        QuizOption.objects.create(
                            question=question,
                            text=options_data[
                                letter
                            ],
                            order=option_order,
                            is_correct=(
                                letter
                                == correct_option
                            ),
                        )

                        created_options += 1

                    self.stdout.write(
                        self.style.SUCCESS(
                            f"Imported Q{order}: "
                            f"{question_text}"
                        )
                    )

                self.stdout.write("")
                self.stdout.write(
                    self.style.SUCCESS(
                        "Import completed successfully."
                    )
                )

                self.stdout.write(
                    f"Questions created: "
                    f"{created_questions}"
                )

                self.stdout.write(
                    f"Options created: "
                    f"{created_options}"
                )

        except FileNotFoundError:
            raise CommandError(
                f"CSV file not found: {csv_file}"
            )