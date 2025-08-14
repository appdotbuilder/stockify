<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStockTransactionRequest;
use App\Models\Product;
use App\Models\StockTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = StockTransaction::with(['product', 'user']);

        // Search by product name or reference number
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('reference_number', 'like', "%{$search}%")
                  ->orWhereHas('product', function ($productQuery) use ($search) {
                      $productQuery->where('name', 'like', "%{$search}%")
                                   ->orWhere('sku', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by transaction type
        if ($type = $request->get('type')) {
            $query->where('type', $type);
        }

        // Filter by date range
        if ($startDate = $request->get('start_date')) {
            $query->whereDate('transaction_date', '>=', $startDate);
        }
        if ($endDate = $request->get('end_date')) {
            $query->whereDate('transaction_date', '<=', $endDate);
        }

        $transactions = $query->orderBy('transaction_date', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('stock-transactions/index', [
            'transactions' => $transactions,
            'filters' => $request->only(['search', 'type', 'start_date', 'end_date']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $products = Product::active()->orderBy('name')->get();
        $selectedProduct = null;

        if ($productId = $request->get('product_id')) {
            $selectedProduct = Product::find($productId);
        }

        return Inertia::render('stock-transactions/create', [
            'products' => $products,
            'selectedProduct' => $selectedProduct,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockTransactionRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();
            $product = Product::findOrFail($data['product_id']);
            
            // Set transaction details
            $data['user_id'] = $request->user()->id;
            $data['previous_stock'] = $product->current_stock;
            $data['transaction_date'] = now();

            // Calculate new stock based on transaction type
            $newStock = match($data['type']) {
                'inflow' => $product->current_stock + $data['quantity'],
                'outflow' => max(0, $product->current_stock - $data['quantity']),
                'adjustment' => $data['quantity'], // For adjustments, quantity IS the new stock
                'count' => $data['quantity'], // For stock counts, quantity IS the actual count
                default => $product->current_stock,
            };

            $data['new_stock'] = $newStock;

            // Create the transaction
            StockTransaction::create($data);

            // Update the product stock
            $product->update(['current_stock' => $newStock]);
        });

        return redirect()->route('stock-transactions.index')
            ->with('success', 'Stock transaction recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(StockTransaction $stockTransaction)
    {
        $stockTransaction->load(['product.category', 'user']);

        return Inertia::render('stock-transactions/show', [
            'transaction' => $stockTransaction,
        ]);
    }
}