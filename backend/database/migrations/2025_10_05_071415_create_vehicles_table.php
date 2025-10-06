<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('photo_url');
            $table->string('city');
            $table->string('brand');
            $table->string('model');
            $table->text('description');
            $table->integer('year');
            $table->integer('mileage');
            $table->string('transmission_type');
            $table->string('store_phone');
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
