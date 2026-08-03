# Database Design

## Core Entities
- User
- Course
- Module
- Lesson
- Enrollment
- Payment
- LiveClass
- Assignment
- Submission

## Relationships
User -> Enrollment -> Course
Course -> Module -> Lesson
Course -> LiveClass
Course -> Assignment -> Submission
Enrollment -> Payment
