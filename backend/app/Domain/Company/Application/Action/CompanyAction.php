<?php
declare(strict_types=1);

namespace App\Domain\Company\Application\Action;

use App\Domain\Company\Application\Enum\SizeCompanyEnum;
use App\Domain\Company\Application\Exceptions\NotFoundCompanyException;
use App\Models\Companies;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Throwable;

class CompanyAction {
    public function __construct() {}

    public function createCompany(User $user, array $companyArray): int {
        $companyArray['user_id'] = $user->id;
        DB::beginTransaction();
        try {
            $company = Companies::create($companyArray);
            DB::commit();
            return $company->id;
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getCompany(int $id): array {
        $company = Companies::find($id);
        if (!$company) {
            throw new NotFoundCompanyException();
        }
        $company = [
            'id' => $company->id,
            'name' => $company->name,
            'description' => $company->description,
            'website' => $company->website,
            'size' => SizeCompanyEnum::fromSize($company->size)?->label(),
            'city' => $company->city,
            'country' => $company->country,
            'logo_url' => $company->logo_url,
            'user_id' => $company->user_id,
            'created_at' => $company->created_at,
            'updated_at' => $company->updated_at,
        ];
        return $company;
    }

    public function updateCompany(int $id, array $companyArray): void {
        $company = Companies::find($id);
        $company->update($companyArray);
    }
    
    public function deleteCompany(int $id): void {
        Companies::find($id)->delete();
    }
}