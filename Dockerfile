# Dockerfile for Laravel app
FROM php:8.2-fpm

# Add ARG and ENV for all environment variables needed by Laravel and the build
ARG APP_NAME
ARG APP_ENV
ARG APP_KEY
ARG APP_DEBUG
ARG APP_URL
ARG LOG_CHANNEL
ARG LOG_DEPRECATIONS_CHANNEL
ARG LOG_LEVEL
ARG DB_CONNECTION
ARG DB_HOST
ARG DB_PORT
ARG DB_DATABASE
ARG DB_USERNAME
ARG DB_PASSWORD
ARG SESSION_DRIVER
ARG SESSION_LIFETIME
ARG REDIS_CLIENT
ARG REDIS_HOST
ARG REDIS_PASSWORD
ARG REDIS_PORT
ARG MAIL_MAILER
ARG MAIL_SCHEME
ARG MAIL_HOST
ARG MAIL_PORT
ARG MAIL_USERNAME
ARG MAIL_PASSWORD
ARG MAIL_FROM_ADDRESS
ARG MAIL_FROM_NAME
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ARG AWS_BUCKET
ARG AWS_ENDPOINT
ARG AWS_URL
ARG AWS_USE_PATH_STYLE_ENDPOINT
ARG VITE_APP_NAME

ENV APP_NAME=${APP_NAME}
ENV APP_ENV=${APP_ENV}
ENV APP_KEY=${APP_KEY}
ENV APP_DEBUG=${APP_DEBUG}
ENV APP_URL=${APP_URL}
ENV LOG_CHANNEL=${LOG_CHANNEL}
ENV LOG_DEPRECATIONS_CHANNEL=${LOG_DEPRECATIONS_CHANNEL}
ENV LOG_LEVEL=${LOG_LEVEL}
ENV DB_CONNECTION=${DB_CONNECTION}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_DATABASE=${DB_DATABASE}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV SESSION_DRIVER=${SESSION_DRIVER}
ENV SESSION_LIFETIME=${SESSION_LIFETIME}
ENV REDIS_CLIENT=${REDIS_CLIENT}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PASSWORD=${REDIS_PASSWORD}
ENV REDIS_PORT=${REDIS_PORT}
ENV MAIL_MAILER=${MAIL_MAILER}
ENV MAIL_SCHEME=${MAIL_SCHEME}
ENV MAIL_HOST=${MAIL_HOST}
ENV MAIL_PORT=${MAIL_PORT}
ENV MAIL_USERNAME=${MAIL_USERNAME}
ENV MAIL_PASSWORD=${MAIL_PASSWORD}
ENV MAIL_FROM_ADDRESS=${MAIL_FROM_ADDRESS}
ENV MAIL_FROM_NAME=${MAIL_FROM_NAME}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}
ENV AWS_BUCKET=${AWS_BUCKET}
ENV AWS_ENDPOINT=${AWS_ENDPOINT}
ENV AWS_URL=${AWS_URL}
ENV AWS_USE_PATH_STYLE_ENDPOINT=${AWS_USE_PATH_STYLE_ENDPOINT}
ENV VITE_APP_NAME=${VITE_APP_NAME}

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install Node.js (for Inertia React build)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Set working directory
WORKDIR /var/www

# Copy package.json and lock file first for better caching
COPY package.json package-lock.json ./

# Install JS dependencies
RUN npm install

# Copy the rest of the application (including Vite entry points and resources)
COPY . .

# Build frontend assets with VITE_APP_NAME set for Vite
RUN VITE_APP_NAME="$VITE_APP_NAME" npm run build

# Set permissions (optional, but recommended)
RUN chown -R www-data:www-data /var/www

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
