<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Presentation\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ShowVacancyEvent
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public int $idVacancy;

    public function __construct(int $idVacancy) {
        $this->idVacancy = $idVacancy;
    }
}
