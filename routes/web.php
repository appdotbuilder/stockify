<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    // Products routes
    Route::resource('products', App\Http\Controllers\ProductController::class);
    
    // Stock Transactions routes
    Route::resource('stock-transactions', App\Http\Controllers\StockTransactionController::class)
        ->only(['index', 'create', 'store', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
