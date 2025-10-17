#!/bin/bash

main() {
        prepare_storage
        prepare_file_permissions
        run_server "$@"
}

prepare_storage() {
    # Create required directories for Laravel
    rm -rf /var/www/html/storage/framework/cache/data
    rm -rf /var/www/html/storage/framework/sessions
    rm -rf /var/www/html/storage/framework/views
    rm -rf /var/www/html/storage/logs
    mkdir -p /var/www/html/storage/framework/cache/data
    mkdir -p /var/www/html/storage/framework/sessions
    mkdir -p /var/www/html/storage/framework/views
    mkdir -p /var/www/html/storage/logs

    rm -rf /var/www/html/bootstrap/cache
    mkdir -p /var/www/html/bootstrap/cache

     # Ensure the symlink exists
    php artisan storage:link
}
prepare_file_permissions() {
    chmod a+x ./artisan
    chown -R www-data:www-data /var/www/html/storage
    chmod -R 755 /var/www/html/storage
    chown -R www-data:www-data /var/www/html/bootstrap/cache
    chmod -R 755 /var/www/html/bootstrap/cache
    chown -R www-data:www-data /var/www/html/storage/logs
    chmod -R 755 /var/www/html/storage/logs
}

run_server() {
    exec /usr/local/bin/docker-php-entrypoint "$@"
}

main "$@"