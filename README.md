# Listra

You can run each project separately or using Docker Compose.

## Running the project

### Running the project using Docker Compose

```bash
docker compose -f docker/compose.production.yml up --build -d
```

### Running the project separately

```bash
cd backend

php artisan serve
```

```bash
cd frontend

pnpm run dev
```

## Accessing the project

- Backend: http://localhost:8000
- Frontend: http://localhost:3000

> **Note:** The frontend docker is a little bit buggy, so you may need to run the project separately in the development environment.