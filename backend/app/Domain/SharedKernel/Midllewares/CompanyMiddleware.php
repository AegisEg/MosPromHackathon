<?php
declare(strict_types=1);

namespace App\Domain\SharedKernel\Midllewares;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;

class CompanyMiddleware
{
    public function handle(Request $request, Closure $next) {
        $user = $request->user();

        if ($user->role !== UserRole::EMPLOYER) {
            return response()->json(['message' => 'Доступ только для работодателя'], 403);
        }

        return $next($request);
    }
}
