# Use an official PHP image
FROM php:8.1-cli

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Copy existing application files
COPY . .

# Set file permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Run composer install
RUN composer install --optimize-autoloader --no-dev

# Cache Laravel configuration
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan storage:link

# Expose port
EXPOSE 8000

# Start the application
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
