FROM docker/whalesay:latest
LABEL Name=portfolio Version=0.0.1
RUN apt-get -y update && apt-get install -y fortunes
CMD ["sh", "-c", "/usr/games/fortune -a | cowsay"]
# Use an official PHP image with necessary extensions
FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql gd mbstring bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www

# Copy application code
COPY . .

# Run Laravel optimization commands
RUN composer install --optimize-autoloader --no-dev && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan storage:link

# Expose port 80
EXPOSE 80

# Start the PHP server
CMD ["php", "-S", "0.0.0.0:80", "-t", "public"]
