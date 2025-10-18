<?php

namespace App\Domain\AssistantAI\Services;

use Illuminate\Support\Facades\Http;

class SemanticSearchService
{
    protected string $promptKey;
    protected string $prompt;
    protected string $apiKey;
    protected CONST BASE_PROMPT = 'Подбери наиболее подходящие элементы из списка которые подошли бы под описание и выведи id через запятую. Описание: ';

    public function __construct() {
            $this->apiKey = env('GPT_API_KEY');
    }


    public function search(string $promptKey, array $listItems) {
        $this->prompt = self::BASE_PROMPT . $promptKey;
        return $this->GPTRequestAPI($this->prompt, $listItems);
    }

    protected function GPTRequestAPI(string $systemText, array $listItems): ?array {
            $requestArray = [
                "modelUri" => "gpt://b1gcof6jm3k515g3b7tb/yandexgpt/rc",
                "completionOptions" => [
                    "stream" => false,
                    "temperature" => 0.6,
                    "maxTokens" => "2000",
                    "reasoningOptions" => [
                        "mode" => "DISABLED"
                    ]
                ],
                "messages" => [
                    [
                        "role" => "system",
                        "text" => $systemText
                    ],
                    [
                        "role" => "user",
                        "text" => json_encode($listItems)
                    ]
                ]
            ];

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', $requestArray);
            $responseArray = $response->json();
            $result = $responseArray['result']['alternatives'][0]['message']['text'];
            if ($result) {
                $resultArray = array_map('intval', explode(',', $result));
                return $resultArray;
            }
            return null;
    }
}