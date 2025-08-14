<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->canManageProducts();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sku' => ['required', 'string', 'max:255', Rule::unique('products', 'sku')->ignore($this->product)],
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'unit_price' => 'required|numeric|min:0',
            'current_stock' => 'required|integer|min:0',
            'minimum_stock' => 'required|integer|min:0',
            'unit_of_measure' => 'required|string|max:255',
            'status' => 'required|in:active,inactive,discontinued',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'sku.required' => 'Product SKU is required.',
            'sku.unique' => 'This SKU is already in use by another product.',
            'name.required' => 'Product name is required.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'Selected category is invalid.',
            'unit_price.required' => 'Unit price is required.',
            'unit_price.numeric' => 'Unit price must be a valid number.',
            'current_stock.required' => 'Current stock is required.',
            'current_stock.integer' => 'Current stock must be a whole number.',
            'minimum_stock.required' => 'Minimum stock is required.',
            'minimum_stock.integer' => 'Minimum stock must be a whole number.',
            'unit_of_measure.required' => 'Unit of measure is required.',
        ];
    }
}