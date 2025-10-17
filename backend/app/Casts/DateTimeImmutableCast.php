<?php
declare(strict_types=1);

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use DateTimeImmutable;
use Exception;

class DateTimeImmutableCast implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes) {
        return $value ? new DateTimeImmutable($value) : null;
    }

    public function set($model, string $key, $value, array $attributes) {
        if ($value instanceof DateTimeImmutable) {
            return $value->format('Y-m-d H:i:s'); // TODO
        }

        try {
            if ($value === null) {
                throw new Exception();
            }

            $dt = new DateTimeImmutable($value);

            return $dt->format('Y-m-d H:i:s'); // TODO
        } catch (Exception $e) {
            return null;
        }
    }
}