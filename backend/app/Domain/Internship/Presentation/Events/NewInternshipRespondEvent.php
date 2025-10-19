<?php
declare(strict_types=1);

namespace App\Domain\Internship\Presentation\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewInternshipRespondEvent
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    /**
     * ID отклика на стажировку
     */
    public int $respondId;

    public function __construct(int $respondId) {
        $this->respondId = $respondId;
    }
}
