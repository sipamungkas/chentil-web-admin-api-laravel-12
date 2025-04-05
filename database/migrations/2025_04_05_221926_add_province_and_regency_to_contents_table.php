<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contents', function (Blueprint $table) {
            $table->foreignId('province_id')->nullable()->after('category')->constrained()->nullOnDelete();
            $table->foreignId('regency_id')->nullable()->after('province_id')->constrained()->nullOnDelete();
            
            // Add indexes for better query performance
            $table->index('province_id');
            $table->index('regency_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contents', function (Blueprint $table) {
            $table->dropForeign(['province_id']);
            $table->dropForeign(['regency_id']);
            $table->dropColumn(['province_id', 'regency_id']);
        });
    }
};
