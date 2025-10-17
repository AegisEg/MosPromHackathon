<?php
declare(strict_types=1);

namespace App\Domain\User\Presentation\Controllers;

use App\Domain\User\Presentation\Requests\RegistrationRequest;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            /** @var \App\Models\User $user */
            $user  = Auth::user();
            $token = $user->createToken('token-name')->plainTextToken;

            return response()->json(['token' => $token]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function register(RegistrationRequest $request) {
        $user  = User::create($request->validated());
        $token = $user->createToken('token-name')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function logout() {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->tokens()->delete();

        return [
            'message' => 'Tokens Revoked',
        ];
    }
}
