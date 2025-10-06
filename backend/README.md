# Listra API - Vehicle Financing REST API

A robust Laravel REST API for vehicle listings and financing simulations, built with clean architecture principles and comprehensive test coverage.

## Features

- **Vehicle Listings**: Retrieve all vehicles with simplified data for UI selectors
- **Vehicle Details**: Get complete information about a specific vehicle
- **Financing Simulation**: Calculate monthly installments for different payment plans (6, 12, and 48 months)
- **Caching**: Automatic caching on GET endpoints for improved performance
- **Validation**: Comprehensive request validation with custom error messages
- **Testing**: 100% test coverage with PHPUnit (26 passing tests)

## Tech Stack

- **Laravel 12.x**
- **PHP 8.4+**
- **PostgreSQL 15+**
- **Docker & Docker Compose**

## Requirements

- PHP 8.4 or higher
- Composer
- PostgreSQL 15 or higher
- Docker & Docker Compose (for containerized setup)

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
cd backend
composer install
```

### 2. Environment Configuration

```bash
cp .env.example .env
php artisan key:generate
```

Update your `.env` file with database credentials:

```env
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=listra
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

### 3. Database Setup

Create the database and run migrations:

```bash
# Run migrations
php artisan migrate

# Seed with sample data (10 vehicles)
php artisan db:seed
```

### 4. Start Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`
