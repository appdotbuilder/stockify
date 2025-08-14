<?php

namespace Database\Factories;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseOrder>
 */
class PurchaseOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $orderDate = fake()->dateTimeBetween('-2 months', 'now');
        $expectedDeliveryDate = fake()->dateTimeBetween($orderDate, '+1 month');

        return [
            'po_number' => fake()->unique()->bothify('PO-####-###'),
            'supplier_id' => Supplier::factory(),
            'created_by' => User::factory(),
            'status' => fake()->randomElement(['pending', 'approved', 'received', 'cancelled']),
            'total_amount' => fake()->randomFloat(2, 100, 10000),
            'order_date' => $orderDate,
            'expected_delivery_date' => $expectedDeliveryDate,
            'notes' => fake()->optional()->sentence(),
        ];
    }
}