<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StockTransaction>
 */
class StockTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $previousStock = fake()->numberBetween(0, 500);
        $quantity = fake()->numberBetween(1, 100);
        $type = fake()->randomElement(['inflow', 'outflow', 'adjustment', 'count']);
        
        $newStock = match($type) {
            'inflow' => $previousStock + $quantity,
            'outflow' => max(0, $previousStock - $quantity),
            'adjustment' => fake()->numberBetween(0, 1000),
            'count' => $previousStock,
            default => $previousStock,
        };

        return [
            'product_id' => Product::factory(),
            'user_id' => User::factory(),
            'type' => $type,
            'quantity' => $quantity,
            'previous_stock' => $previousStock,
            'new_stock' => $newStock,
            'reference_number' => fake()->optional()->bothify('REF-####'),
            'notes' => fake()->optional()->sentence(),
            'transaction_date' => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }
}