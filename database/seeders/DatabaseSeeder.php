<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\StockTransaction;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@stockify.com',
        ]);

        // Create warehouse manager
        $manager = User::factory()->warehouseManager()->create([
            'name' => 'Warehouse Manager',
            'email' => 'manager@stockify.com',
        ]);

        // Create warehouse staff
        $staff = User::factory()->warehouseStaff()->create([
            'name' => 'Warehouse Staff',
            'email' => 'staff@stockify.com',
        ]);

        // Create additional users
        User::factory(5)->create();

        // Create suppliers
        $suppliers = Supplier::factory(10)->active()->create();

        // Create categories
        $categories = Category::factory(8)->active()->create();

        // Create products
        $products = Product::factory(50)->active()->create([
            'category_id' => fn() => $categories->random()->id,
        ]);

        // Create some products with low stock
        Product::factory(5)->lowStock()->create([
            'category_id' => fn() => $categories->random()->id,
        ]);

        // Create purchase orders
        $purchaseOrders = PurchaseOrder::factory(15)->create([
            'supplier_id' => fn() => $suppliers->random()->id,
            'created_by' => fn() => [$admin->id, $manager->id][random_int(0, 1)],
        ]);

        // Create purchase order items
        foreach ($purchaseOrders as $po) {
            PurchaseOrderItem::factory(random_int(1, 5))->create([
                'purchase_order_id' => $po->id,
                'product_id' => fn() => $products->random()->id,
            ]);
        }

        // Create stock transactions
        foreach ($products->take(30) as $product) {
            StockTransaction::factory(random_int(1, 8))->create([
                'product_id' => $product->id,
                'user_id' => fn() => [$admin->id, $manager->id, $staff->id][random_int(0, 2)],
            ]);
        }
    }
}