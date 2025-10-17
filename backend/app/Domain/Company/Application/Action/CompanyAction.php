<?php
declare(strict_types=1);

namespace App\Domain\Company\Application\Action;

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

    public function getCompany(int $id): Companies {
        return Companies::find($id);
    }

    public function updateCompany(int $id, array $companyArray): void {
        $company = Companies::find($id);
        $company->update($companyArray);
    }
    
    public function deleteCompany(int $id): void {
        Companies::find($id)->delete();
    }
}