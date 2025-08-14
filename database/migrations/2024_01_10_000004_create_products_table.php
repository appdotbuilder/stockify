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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique()->comment('Stock keeping unit');
            $table->string('name')->comment('Product name');
            $table->text('description')->nullable()->comment('Product description');
            $table->foreignId('category_id')->constrained();
            $table->decimal('unit_price', 10, 2)->comment('Unit price');
            $table->integer('current_stock')->default(0)->comment('Current stock quantity');
            $table->integer('minimum_stock')->default(0)->comment('Minimum stock threshold');
            $table->string('unit_of_measure')->comment('Unit of measure (pcs, kg, etc.)');
            $table->enum('status', ['active', 'inactive', 'discontinued'])->default('active')->comment('Product status');
            $table->timestamps();
            
            $table->index('sku');
            $table->index('name');
            $table->index('status');
            $table->index('category_id');
            $table->index('current_stock');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};