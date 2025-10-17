<?php
declare(strict_types=1);

use App\Domain\SharedKernel\Midllewares\AdminMiddleware;
use App\Domain\SharedKernel\Midllewares\CompanyMiddleware;
use App\Domain\SharedKernel\Midllewares\InstituteMiddleware;
use App\Domain\SharedKernel\Midllewares\SeekerMiddleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin'     => AdminMiddleware::class,
            'company'   => CompanyMiddleware::class,
            'institute' => InstituteMiddleware::class,
            'seeker'    => SeekerMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->renderable(function (AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }
        });
        $exceptions->shouldRenderJsonWhen(function (Request $request, Throwable $e) {
            return $request->expectsJson();
        });
    })->create();
