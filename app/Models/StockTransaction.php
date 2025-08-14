<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StockTransaction
 *
 * @property int $id
 * @property int $product_id
 * @property int $user_id
 * @property string $type
 * @property int $quantity
 * @property int $previous_stock
 * @property int $new_stock
 * @property string|null $reference_number
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon $transaction_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Product $product
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereNewStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction wherePreviousStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereReferenceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereTransactionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereUserId($value)
 * @method static \Database\Factories\StockTransactionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StockTransaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'user_id',
        'type',
        'quantity',
        'previous_stock',
        'new_stock',
        'reference_number',
        'notes',
        'transaction_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'product_id' => 'integer',
        'user_id' => 'integer',
        'quantity' => 'integer',
        'previous_stock' => 'integer',
        'new_stock' => 'integer',
        'transaction_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the product that belongs to this transaction.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the user who performed this transaction.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}