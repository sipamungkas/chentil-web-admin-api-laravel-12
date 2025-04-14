<?php

namespace Database\Seeders;

use App\Models\Content;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'destination' => [
                'titles' => [
                    'Pantai Kuta', 'Gunung Bromo', 'Danau Toba', 'Candi Borobudur', 'Raja Ampat',
                    'Pulau Komodo', 'Nusa Penida', 'Taman Nasional Bunaken', 'Kawah Ijen',
                    'Pantai Pink', 'Pulau Weh', 'Tana Toraja', 'Pulau Belitung',
                    'Gunung Rinjani', 'Kepulauan Derawan'
                ],
                'description' => 'A beautiful destination in Indonesia featuring natural wonders and cultural heritage.',
                'image_prefix' => 'destination',
            ],
            'outbound' => [
                'titles' => [
                    'Tokyo Adventure', 'Seoul City Tour', 'Singapore Explorer', 'Bangkok Discovery',
                    'Kuala Lumpur Trip', 'Hong Kong Journey', 'Dubai Experience', 'Istanbul Tour',
                    'Paris Escapade', 'London Discovery', 'New York Adventure', 'Sydney Explorer',
                    'Amsterdam Trip', 'Barcelona Tour', 'Venice Journey'
                ],
                'description' => 'An exciting outbound trip package to explore international destinations.',
                'image_prefix' => 'outbound',
            ],
            'culture' => [
                'titles' => [
                    'Tari Kecak', 'Wayang Kulit', 'Reog Ponorogo', 'Tari Saman',
                    'Batik Making', 'Gamelan Music', 'Pencak Silat', 'Angklung Performance',
                    'Tari Pendet', 'Karapan Sapi', 'Tari Piring', 'Debus Performance',
                    'Tari Jaipong', 'Ondel-ondel', 'Tari Legong'
                ],
                'description' => 'Traditional Indonesian cultural performance and heritage.',
                'image_prefix' => 'culture',
            ],
            'fnb' => [
                'titles' => [
                    'Nasi Goreng', 'Rendang', 'Sate Ayam', 'Gado-gado', 'Soto Ayam',
                    'Bakso', 'Mie Goreng', 'Nasi Uduk', 'Sop Buntut', 'Bebek Goreng',
                    'Ayam Betutu', 'Pempek', 'Gudeg', 'Rawon', 'Sate Lilit'
                ],
                'description' => 'Delicious Indonesian culinary specialties and traditional dishes.',
                'image_prefix' => 'food',
            ],
        ];

        // Create placeholder images directory if it doesn't exist
        if (!Storage::disk('public')->exists('contents')) {
            Storage::disk('public')->makeDirectory('contents');
        }

        foreach ($categories as $category => $data) {
            foreach ($data['titles'] as $index => $title) {
                // Create a placeholder image
                $imagePath = "contents/{$data['image_prefix']}-" . ($index + 1) . ".jpg";
                if (!Storage::disk('public')->exists($imagePath)) {
                    // Create a colored placeholder image
                    $image = imagecreatetruecolor(800, 600);
                    $bgColor = imagecolorallocate($image, rand(0, 255), rand(0, 255), rand(0, 255));
                    imagefill($image, 0, 0, $bgColor);
                    
                    // Add text to the image
                    $textColor = imagecolorallocate($image, 255, 255, 255);
                    $text = $title;
                    $font = 5; // Built-in font
                    $x = 20;
                    $y = 300;
                    imagestring($image, $font, $x, $y, $text, $textColor);
                    
                    // Save the image
                    ob_start();
                    imagejpeg($image);
                    $imageData = ob_get_clean();
                    Storage::disk('public')->put($imagePath, $imageData);
                    imagedestroy($image);
                }

                Content::create([
                    'title' => $title,
                    'description' => $data['description'],
                    'category' => $category,
                    'image' => $imagePath,
                    'is_visible' => true,
                    'province_id' => rand(1, 10), // Assuming you have provinces seeded
                    'regency_id' => rand(1, 20), // Assuming you have regencies seeded
                    'district_id' => rand(1, 30), // Assuming you have districts seeded
                ]);
            }
        }
    }
}
