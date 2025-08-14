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
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->string('po_number')->unique()->comment('Purchase order number');
            $table->foreignId('supplier_id')->constrained();
            $table->foreignId('created_by')->constrained('users');
            $table->enum('status', ['pending', 'approved', 'received', 'cancelled'])->default('pending')->comment('Purchase order status');
            $table->decimal('total_amount', 12, 2)->comment('Total order amount');
            $table->date('order_date')->comment('Order date');
            $table->date('expected_delivery_date')->nullable()->comment('Expected delivery date');
            $table->text('notes')->nullable()->comment('Order notes');
            $table->timestamps();
            
            $table->index('po_number');
            $table->index('supplier_id');
            $table->index('status');
            $table->index('order_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};