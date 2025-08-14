<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $units = ['pcs', 'kg', 'lbs', 'liters', 'meters', 'boxes', 'pairs', 'sets'];
        $currentStock = fake()->numberBetween(0, 1000);
        $minimumStock = fake()->numberBetween(5, 50);

        return [
            'sku' => fake()->unique()->bothify('SKU-####-???'),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'category_id' => Category::factory(),
            'unit_price' => fake()->randomFloat(2, 1, 500),
            'current_stock' => $currentStock,
            'minimum_stock' => $minimumStock,
            'unit_of_measure' => fake()->randomElement($units),
            'status' => fake()->randomElement(['active', 'inactive', 'discontinued']),
        ];
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the product has low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'current_stock' => fake()->numberBetween(0, 10),
            'minimum_stock' => fake()->numberBetween(15, 25),
        ]);
    }
}