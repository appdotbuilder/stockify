<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\PurchaseOrderItem
 *
 * @property int $id
 * @property int $purchase_order_id
 * @property int $product_id
 * @property int $quantity
 * @property int $received_quantity
 * @property float $unit_price
 * @property float $total_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PurchaseOrder $purchaseOrder
 * @property-read \App\Models\Product $product
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem wherePurchaseOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem whereReceivedQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurchaseOrderItem whereUpdatedAt($value)
 * @method static \Database\Factories\PurchaseOrderItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PurchaseOrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'purchase_order_id',
        'product_id',
        'quantity',
        'received_quantity',
        'unit_price',
        'total_price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'purchase_order_id' => 'integer',
        'product_id' => 'integer',
        'quantity' => 'integer',
        'received_quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the purchase order that owns this item.
     */
    public function purchaseOrder(): BelongsTo
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

    /**
     * Get the product for this item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}