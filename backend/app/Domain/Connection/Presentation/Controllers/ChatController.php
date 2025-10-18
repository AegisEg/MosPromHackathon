<?php
declare(strict_types=1);

namespace App\Domain\Connection\Presentation\Controllers;

use App\Domain\Connection\Application\Action\ChatAction;
use App\Domain\Connection\Application\Exceptions\ChatNotFoundException;
use App\Domain\Connection\Application\Exceptions\ForbiddenChatException;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Throwable;

class ChatController extends Controller
{
    public function index(Request $request) {
        $user       = $request->user();
        $chats      = (new ChatAction())->chatList($user);
        $chatsArray = array_map(fn ($chat) => $chat->toArray(), $chats);

        return (new ParentResponse(
            data: $chatsArray,
            httpStatus: 200,
            status: StatusEnum::OK,
        ))->toResponse();
    }

    public function show(int $id, Request $request) {
        $user = $request->user();
        try {
            $messages = (new ChatAction())->showMessages($id, $user);
            // $messagesArray = array_map(fn ($message) => $message->toArray(), $messages);

            return (new ParentResponse(
                data: $messages,
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (ForbiddenChatException $e) {
            return (new ParentResponse(
                data: [],
                httpStatus: 403,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (ChatNotFoundException $e) {
            return (new ParentResponse(
                data: [],
                httpStatus: 404,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (Throwable $e) {
            return (new ParentResponse(
                data: [],
                httpStatus: 500,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }

    public function sendMessage(int $id, Request $request) {
        return response()->json(['message' => 'Message sent']);
    }
}
