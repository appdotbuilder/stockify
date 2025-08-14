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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Supplier name');
            $table->string('email')->unique()->comment('Supplier email address');
            $table->string('phone')->nullable()->comment('Supplier phone number');
            $table->string('contact_person')->nullable()->comment('Primary contact person');
            $table->text('address')->nullable()->comment('Supplier address');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Supplier status');
            $table->timestamps();
            
            $table->index('name');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};