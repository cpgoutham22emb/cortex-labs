````markdown
# EVIBE Ecommerce Platform

EVIBE is a Django-based ecommerce platform designed for fashion retail with support for product variants, inventory management, offers, Razorpay payment integration, invoice generation, and an administrative dashboard.

---

# Technology Stack

- Python 3.14.x (3.13+ supported)
- Django 6.x
- SQLite (Development)
- Razorpay
- WhiteNoise
- Pillow
- ReportLab
- Django Jazzmin

---

# Prerequisites

Install the following software:

- Python 3.13 or later
- Git
- Visual Studio Code (Recommended)

Verify installation:

```bash
py --version
py -m pip --version
git --version
````

---

# Clone Repository

```bash
git clone <repository-url>
cd evibe_cjn
```

---

# Create Virtual Environment

Windows PowerShell

```powershell
py -m venv venv
```

Activate

```powershell
.\venv\Scripts\Activate.ps1
```

Windows Command Prompt

```cmd
venv\Scripts\activate.bat
```

Git Bash

```bash
source venv/Scripts/activate
```

---

# Install Dependencies

```bash
py -m pip install --upgrade pip
py -m pip install -r requirements.txt
```

---

# Configure Environment Variables

Create a file named

```
.env
```

Example

```env
SECRET_KEY=your-secret-key

DEBUG=True

ALLOWED_HOSTS=127.0.0.1,localhost

DATABASE_NAME=db.sqlite3

DATABASE_USER=

DATABASE_PASSWORD=

DATABASE_HOST=

DATABASE_PORT=

RAZORPAY_KEY_ID=

RAZORPAY_KEY_SECRET=
```

> Never commit the `.env` file to Git.

---

# Database Setup

Run migrations

```bash
py manage.py migrate
```

If you need an administrator account

```bash
py manage.py createsuperuser
```

---

# Load Initial Data (If Required)

If the project uses custom import commands:

```bash
py manage.py import_products
py manage.py import_variants
```

---

# Run Development Server

```bash
py manage.py runserver
```

Application

```
http://127.0.0.1:8000/
```

Admin

```
http://127.0.0.1:8000/admin/
```

---

# Useful Commands

Create migrations

```bash
py manage.py makemigrations
```

Apply migrations

```bash
py manage.py migrate
```

Collect static files

```bash
py manage.py collectstatic
```

Create superuser

```bash
py manage.py createsuperuser
```

Generate requirements

```bash
py -m pip freeze > requirements.txt
```

---

# Project Structure

```
evibe_cjn/
│
├── apps/
├── config/
├── media/
├── static/
├── templates/
├── requirements.txt
├── .env
├── manage.py
└── README.md
```

---

# Common Issues

## Virtual environment activation blocked

Run once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## Missing Python package

Install requirements again

```bash
py -m pip install -r requirements.txt
```

or install a specific package

```bash
py -m pip install package_name
```

---

## SECRET_KEY error

Ensure `.env` exists and contains

```env
SECRET_KEY=your-secret-key
```

---

## Run Tests

```bash
py manage.py test
```

---

# Development Notes

* Use a virtual environment for every project.
* Never commit `.env`.
* Update `requirements.txt` whenever new packages are installed.
* Commit frequently with meaningful Git messages.

---

# License

Internal project for EVIBE.

```
```
