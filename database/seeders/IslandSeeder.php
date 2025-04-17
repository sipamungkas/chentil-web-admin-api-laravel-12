<?php

namespace Database\Seeders;

use App\Models\Island;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class IslandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $islands = [
            [
                'name' => 'Sumatra',
                'description' => 'The sixth largest island in the world, known for its diverse wildlife, rainforests, and rich cultural heritage.',
            ],
            [
                'name' => 'Jawa',
                'description' => 'The most populous island in Indonesia, home to the capital city Jakarta and rich in Javanese culture.',
            ],
            [
                'name' => 'Kalimantan',
                'description' => 'The third largest island in the world, famous for its ancient rainforests and diverse indigenous cultures.',
            ],
            [
                'name' => 'Sulawesi',
                'description' => 'Known for its unique K-shape and incredible marine biodiversity, home to unique cultures like the Toraja.',
            ],
            [
                'name' => 'Papua',
                'description' => 'The largest and easternmost province of Indonesia, known for its diverse indigenous cultures and unique wildlife.',
            ],
            [
                'name' => 'Bali',
                'description' => 'Famous tourist destination known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.',
            ],
            [
                'name' => 'Nusa Tenggara',
                'description' => 'A chain of islands east of Bali, including Lombok, Flores, and Komodo, home to unique wildlife and cultures.',
            ],
            [
                'name' => 'Maluku',
                'description' => 'Also known as the Moluccas or Spice Islands, historically important for spice trade and rich marine life.',
            ],
        ];

        // Create placeholder images directory if it doesn't exist
        if (!Storage::disk('public')->exists('islands')) {
            Storage::disk('public')->makeDirectory('islands');
        }

        foreach ($islands as $index => $islandData) {
            // Create a placeholder image
            $imagePath = "islands/island-" . ($index + 1) . ".jpg";
            if (!Storage::disk('public')->exists($imagePath)) {
                // Create a colored placeholder image
                $image = imagecreatetruecolor(800, 600);
                $bgColor = imagecolorallocate($image, rand(0, 255), rand(0, 255), rand(0, 255));
                imagefill($image, 0, 0, $bgColor);
                
                // Add text to the image
                $textColor = imagecolorallocate($image, 255, 255, 255);
                $text = $islandData['name'];
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

            // Create island record
            Island::create([
                'name' => $islandData['name'],
                'description' => $islandData['description'],
                'image' => $imagePath,
            ]);
        }
    }
}
