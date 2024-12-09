
# Use an official PHP image from Docker Hub
FROM php:8.1-cli

# Install required PHP extensions and tools
RUN apt-get update && apt-get install -y \
    php-mbstring \
    php-xml \
    php-bcmath \
    php-curl \
    unzip \
    git && \
    docker-php-ext-install bcmath

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory inside the container
WORKDIR /app

# Copy project files into the container
COPY . .

# Install dependencies and optimize Laravel
RUN composer install --optimize-autoloader --no-dev && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan storage:link

# Expose port 8000 for the application
EXPOSE 8000

# Command to run the Laravel app
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
