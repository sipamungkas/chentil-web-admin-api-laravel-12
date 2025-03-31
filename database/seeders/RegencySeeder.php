<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = database_path('seeders/csv/regencies.csv');
        $regencies = array_map('str_getcsv', file($csvFile));
        
        // Remove header row
        array_shift($regencies);
        
        // Get province code to ID mapping
        $provinceMapping = DB::table('provinces')
            ->pluck('id', 'code')
            ->toArray();
        
        foreach ($regencies as $regency) {
            $provinceCode = substr($regency[0], 0, 2);
            $provinceId = $provinceMapping[$provinceCode] ?? null;
            
            if ($provinceId) {
                DB::table('regencies')->insert([
                    'code' => $regency[0],
                    'province_id' => $provinceId,
                    'name' => $regency[2],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
