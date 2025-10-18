<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Presentation\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewRespondEvent
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    /**
     * ID отклика
     * @var int
     */
    public int $respondId;

    /**
     * Create a new event instance.
     * @param int $respondId
     */
    public function __construct(int $respondId) {
        $this->respondId = $respondId;
    }
}
