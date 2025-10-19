<?php

namespace App\Domain\AssistantAI\Services;

use Illuminate\Support\Facades\Http;

class SemanticSearchService
{
    protected string $promptKey;
    protected string $prompt;
    protected string $apiKey;
    protected CONST SERACH_PROMPT = 'Подбери наиболее подходящие элементы из списка которые подошли бы под описание и выведи id через запятую. Описание: ';
    protected CONST MATCH_PROMPT = 'Подбери 5 наиболее подходящих резюме для вакансии и дай своё экспертное мнение по каждой. Выведи id по порядку релевантности, каждому id должно быть своё мнение, учитывай educations и experiences. Дай ответ сразу в формате json: {"id": {"about":"мнение", "rating":"место от 1 до 5", "resume_id":"id резюме которове пришло в поле resume_id"}}. Описание вакансии: ';

    public function __construct() {
            $this->apiKey = "AQVN37FwRrXLSyz6k5ZwX7dPLhyjsLtBPyeN_xPW";
            // $this->apiKey = env('GPT_API_KEY');
    }


    public function search(string $promptKey, array $listItems) {
        $this->prompt = self::SERACH_PROMPT . $promptKey;
        $result = $this->GPTRequestAPI($this->prompt, $listItems);
        $resultArray = array_map('intval', explode(',', $result));
        return $resultArray;
    }

    public function bestMatch(array $resumesArray, string $promptKey) {
        $this->prompt = self::MATCH_PROMPT . $promptKey;
        $result = $this->GPTRequestAPI($this->prompt, $resumesArray);
        $cleanJson = $this->extractJsonFromMarkdown($result);
        $resultArray = json_decode($cleanJson, true);
        return $resultArray;
    }

    /**
     * Извлекает JSON из markdown блока кода
     */
    protected function extractJsonFromMarkdown(string $text): string {
        // Удаляем markdown блоки кода (```json и ```)
        $text = preg_replace('/```(?:json)?\s*/', '', $text);
        $text = preg_replace('/```\s*$/', '', $text);
        
        // Удаляем лишние пробелы и переносы строк в начале и конце
        $text = trim($text);
        
        return $text;
    }

    protected function GPTRequestAPI(string $systemText, array $listItems) {
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
                return $result;
            }
            return null;
    }
}