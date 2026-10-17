from django import forms


class QuizQuestionImportForm(forms.Form):
    csv_file = forms.FileField(
        label="CSV file",
        help_text=(
            "Upload a CSV containing quiz questions "
            "and four answer options."
        ),
    )