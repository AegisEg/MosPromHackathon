<?php
declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use Notifiable;
    use HasApiTokens;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'email',
        'password',
        'role',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'role'              => UserRole::class,
        ];
    }

    /**
     * Получите идентификатор, который будет сохранен в заявлении субъекта JWT.
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Верните массив значений ключа, содержащий любые пользовательские утверждения, которые необходимо добавить в JWT.
     */
    public function getJWTCustomClaims() {
        return [];
    }

    /**
     * Связь с резюме пользователя
     */
    public function resume() {
        return $this->hasOne(Resume::class);
    }

    /**
     * Связь с компаниями пользователя
     */
    public function companies() {
        return $this->hasMany(Companies::class);
    }

    /**
     * Связь с вакансиями пользователя
     */
    public function vacancies() {
        return $this->hasMany(Vacancies::class);
    }
}
