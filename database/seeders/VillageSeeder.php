<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class VillageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = database_path('seeders/csv/villages.csv');
        $handle = fopen($csvFile, 'r');
        $processedCodes = [];
        $districtMapping = [];

        // Get district mapping
        $districts = DB::table('districts')->select('id', 'code')->get();
        foreach ($districts as $district) {
            $districtMapping[$district->code] = $district->id;
        }

        // Skip header row
        fgetcsv($handle);

        // Start transaction
        DB::beginTransaction();

        try {
            while (($data = fgetcsv($handle)) !== false) {
                if (count($data) >= 3 && !in_array($data[0], $processedCodes)) {
                    $districtId = $districtMapping[$data[1]] ?? null;

                    if ($districtId) {
                        DB::table('villages')->insert([
                            'code' => $data[0],
                            'district_id' => $districtId,
                            'name' => $data[2],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                        $processedCodes[] = $data[0];
                    }
                }
            }

            // Commit transaction
            DB::commit();
        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();
            throw $e;
        } finally {
            fclose($handle);
        }
    }
}
