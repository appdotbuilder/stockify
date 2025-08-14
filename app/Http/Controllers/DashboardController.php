<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockTransaction;
use App\Models\Supplier;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get dashboard statistics
        $stats = [
            'total_products' => Product::active()->count(),
            'low_stock_products' => Product::lowStock()->count(),
            'total_suppliers' => Supplier::active()->count(),
            'pending_orders' => PurchaseOrder::where('status', 'pending')->count(),
        ];

        // Get recent stock transactions (limited based on role)
        $recentTransactions = StockTransaction::with(['product', 'user'])
            ->orderBy('transaction_date', 'desc')
            ->limit(10)
            ->get();

        // Get low stock alerts
        $lowStockProducts = Product::with('category')
            ->lowStock()
            ->active()
            ->limit(5)
            ->get();

        // Role-specific data
        $roleSpecificData = [];
        
        if ($user->isAdmin()) {
            $roleSpecificData = [
                'total_users' => \App\Models\User::count(),
                'recent_purchase_orders' => PurchaseOrder::with(['supplier', 'creator'])
                    ->orderBy('created_at', 'desc')
                    ->limit(5)
                    ->get(),
            ];
        }

        if ($user->canAccessReports()) {
            $roleSpecificData['monthly_transactions'] = StockTransaction::selectRaw('
                    DATE_FORMAT(transaction_date, "%Y-%m") as month,
                    COUNT(*) as count,
                    SUM(CASE WHEN type = "inflow" THEN quantity ELSE 0 END) as inflow,
                    SUM(CASE WHEN type = "outflow" THEN quantity ELSE 0 END) as outflow
                ')
                ->where('transaction_date', '>=', now()->subMonths(6))
                ->groupBy('month')
                ->orderBy('month')
                ->get();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentTransactions' => $recentTransactions,
            'lowStockProducts' => $lowStockProducts,
            'roleSpecificData' => $roleSpecificData,
            'userRole' => $user->role,
            'userPermissions' => [
                'canManageProducts' => $user->canManageProducts(),
                'canManageStock' => $user->canManageStock(),
                'canAccessReports' => $user->canAccessReports(),
            ],
        ]);
    }
}