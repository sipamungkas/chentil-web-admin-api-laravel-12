<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VillageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = database_path('seeders/csv/villages.csv');
        $handle = fopen($csvFile, 'r');
        
        // Skip header row
        fgetcsv($handle);
        
        // Get district code to ID mapping
        $districtMapping = DB::table('districts')
            ->pluck('id', 'code')
            ->toArray();
        
        // Keep track of processed codes
        $processedCodes = [];
        
        // Read and process the data
        while (($data = fgetcsv($handle)) !== false) {
            if (count($data) >= 3 && !in_array($data[0], $processedCodes)) {
                $districtId = $districtMapping[$data[1]] ?? null;
                
                if ($districtId) {
                    try {
                        DB::table('villages')->insert([
                            'code' => $data[0],
                            'district_id' => $districtId,
                            'name' => $data[2],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                        $processedCodes[] = $data[0];
                    } catch (\Exception $e) {
                        // Skip duplicate entries
                        continue;
                    }
                }
            }
        }
        
        fclose($handle);
    }
}
