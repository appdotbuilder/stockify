<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Electronics',
            'Furniture',
            'Office Supplies',
            'Raw Materials',
            'Finished Goods',
            'Packaging',
            'Tools & Equipment',
            'Safety Equipment',
            'Cleaning Supplies',
            'Maintenance Items'
        ];

        return [
            'name' => fake()->randomElement($categories),
            'description' => fake()->sentence(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the category is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}