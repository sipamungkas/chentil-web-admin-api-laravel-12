<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('category', ['destination', 'outbound', 'culture', 'fnb']);
            $table->foreignId('district_id')->nullable()->constrained()->nullOnDelete();
            $table->string('image')->nullable()->comment('Content image');
            $table->integer('since_century')->nullable()->comment('For culture category: which century it started');
            $table->integer('established_year')->nullable()->comment('For other categories: year of establishment');
            $table->decimal('latitude', 10, 8)->nullable()->comment('Latitude for location-based queries');
            $table->decimal('longitude', 11, 8)->nullable()->comment('Longitude for location-based queries');
            $table->boolean('is_visible')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
            
            // Add indexes
            $table->index('category');
            $table->index('is_visible');
            $table->index('order');
            $table->index(['latitude', 'longitude']); // Regular index for location columns
        });

        // Add spatial column and index for location queries
        // DB::statement('ALTER TABLE contents ADD COLUMN location POINT NOT NULL AFTER longitude');
        // DB::statement('UPDATE contents SET location = POINT(0, 0)'); // Set default point at 0,0
        // DB::statement('UPDATE contents SET location = POINT(longitude, latitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL');
        // DB::statement('CREATE SPATIAL INDEX contents_location_spatial ON contents(location)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
