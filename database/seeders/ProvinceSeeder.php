<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = database_path('seeders/csv/provinces.csv');
        $provinces = array_map('str_getcsv', file($csvFile));
        
        // Remove header row
        array_shift($provinces);
        
        foreach ($provinces as $province) {
            DB::table('provinces')->insert([
                'code' => $province[0],
                'name' => $province[1],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
