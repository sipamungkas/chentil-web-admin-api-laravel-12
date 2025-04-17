<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Storage;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Create placeholder images directory if it doesn't exist
        if (!Storage::disk('public')->exists('news')) {
            Storage::disk('public')->makeDirectory('news');
        }

        // Create 20 news items
        for ($i = 0; $i < 5; $i++) {
            $title = $faker->sentence(6);
            
            // Create a placeholder image
            $imagePath = "news/news-" . ($i + 1) . ".jpg";
            if (!Storage::disk('public')->exists($imagePath)) {
                // Create a colored placeholder image
                $image = imagecreatetruecolor(800, 600);
                $bgColor = imagecolorallocate($image, rand(0, 255), rand(0, 255), rand(0, 255));
                imagefill($image, 0, 0, $bgColor);
                
                // Add text to the image
                $textColor = imagecolorallocate($image, 255, 255, 255);
                $text = "News " . ($i + 1);
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

            News::create([
                'title' => $title,
                'description' => $faker->paragraphs(3, true),
                'image' => $imagePath,
                'is_visible' => $faker->boolean(80), // 80% chance of being visible
                'order' => $i + 1,
            ]);
        }
    }
}
