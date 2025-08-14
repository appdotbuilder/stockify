<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\PurchaseOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseOrderItem>
 */
class PurchaseOrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 100);
        $unitPrice = fake()->randomFloat(2, 5, 200);
        $totalPrice = $quantity * $unitPrice;
        $receivedQuantity = fake()->numberBetween(0, $quantity);

        return [
            'purchase_order_id' => PurchaseOrder::factory(),
            'product_id' => Product::factory(),
            'quantity' => $quantity,
            'received_quantity' => $receivedQuantity,
            'unit_price' => $unitPrice,
            'total_price' => $totalPrice,
        ];
    }
}