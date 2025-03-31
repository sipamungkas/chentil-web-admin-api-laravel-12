<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = database_path('seeders/csv/districts.csv');
        $districts = array_map('str_getcsv', file($csvFile));
        
        // Remove header row
        array_shift($districts);
        
        // Get regency code to ID mapping
        $regencyMapping = DB::table('regencies')
            ->pluck('id', 'code')
            ->toArray();
        
        foreach ($districts as $district) {
            $regencyCode = substr($district[0], 0, 4);
            $regencyId = $regencyMapping[$regencyCode] ?? null;
            
            if ($regencyId) {
                DB::table('districts')->insert([
                    'code' => $district[0],
                    'regency_id' => $regencyId,
                    'name' => $district[2],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
