#!/bin/sh
set -e

echo "Running database migrations and seeding..."
php artisan migrate --seed --force --no-interaction

echo "Clearing caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear

exec "$@"
