<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Companies;
use App\Models\Internship;
use App\Models\InternshipRespond;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InternshipRespondsSeeder extends Seeder
{
    public function run(): void {
        $companyIds    = Companies::query()->pluck('id')->all();
        $internshipIds = Internship::query()->pluck('id')->all();

        if (empty($companyIds) || empty($internshipIds)) {
            return;
        }

        DB::transaction(function () use ($companyIds, $internshipIds) {
            foreach ($internshipIds as $internshipId) {
                $count = rand(1, 5);

                for ($i = 0; $i < $count; $i++) {
                    InternshipRespond::create([
                        'internship_id' => $internshipId,
                        'company_id'    => $companyIds[array_rand($companyIds)],
                        'status'        => 0,
                        'message'       => fake()->boolean(60) ? fake()->sentence(10) : null,
                    ]);
                }
            }
        });
    }
}
