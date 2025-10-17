FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache bash \
    libpq \
    $PHPIZE_DEPS \
    zip \
    git \
    unzip \
    curl \
    zlib-dev \
    icu-dev \
    libzip && \
    apk add --no-cache --virtual .build-deps \
    libpq-dev \
    libzip-dev && \
    apk add --update linux-headers

# Xdebug install
RUN pecl install xdebug && docker-php-ext-enable xdebug

RUN docker-php-ext-configure pgsql
RUN docker-php-ext-configure   intl
RUN docker-php-ext-configure   zip
RUN docker-php-ext-configure   ftp
RUN docker-php-ext-install pgsql \
    pdo_pgsql \
    intl \
    zip

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY ./php.ini /usr/local/etc/php/php.ini

# Копируем конфиг php-fpm
COPY ./php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

RUN ulimit -n 65535 && ulimit -u 65535

ADD ./php-fpm-entrypoint.sh /usr/local/bin/php-entrypoint

RUN chmod a+x /usr/local/bin/php-entrypoint

ENTRYPOINT ["/usr/local/bin/php-entrypoint"]

USER www-data

CMD ["php-fpm"]

