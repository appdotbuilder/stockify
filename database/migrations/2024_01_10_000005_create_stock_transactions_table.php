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
        Schema::create('stock_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->enum('type', ['inflow', 'outflow', 'adjustment', 'count'])->comment('Transaction type');
            $table->integer('quantity')->comment('Transaction quantity');
            $table->integer('previous_stock')->comment('Stock before transaction');
            $table->integer('new_stock')->comment('Stock after transaction');
            $table->string('reference_number')->nullable()->comment('Reference number (PO, SO, etc.)');
            $table->text('notes')->nullable()->comment('Transaction notes');
            $table->timestamp('transaction_date')->comment('Transaction date');
            $table->timestamps();
            
            $table->index('product_id');
            $table->index('user_id');
            $table->index('type');
            $table->index('transaction_date');
            $table->index(['product_id', 'transaction_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_transactions');
    }
};