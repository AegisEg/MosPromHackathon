<?php
declare(strict_types=1);

namespace App\Domain\SharedKernel\Midllewares;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next) {
        $user = $request->user();

        if ($user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Доступ только для администратора'], 403);
        }

        return $next($request);
    }
}
