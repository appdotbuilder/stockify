import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';

interface Product {
    id: number;
    sku: string;
    name: string;
    current_stock: number;
    minimum_stock: number;
    unit_price: number;
    status: string;
    category: {
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
}

interface Filters {
    search?: string;
    category_id?: string;
    status?: string;
    low_stock?: string;
}

interface Props {
    products: {
        data: Product[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        last_page: number;
        total: number;
    };
    categories: Category[];
    filters: Filters;
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        
        router.get(route('products.index'), 
            { ...filters, search: search || undefined },
            { preserveState: true }
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(route('products.index'), 
            { ...filters, [key]: value || undefined },
            { preserveState: true }
        );
    };

    const getStatusColor = (status: string) => {
        const colors = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            discontinued: 'bg-red-100 text-red-800'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const isLowStock = (product: Product) => {
        return product.current_stock <= product.minimum_stock;
    };

    return (
        <AppShell>
            <Head title="Products - Stockify" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="📦 Products" />
                    <Link
                        href={route('products.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        ➕ Add Product
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="md:col-span-2">
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters.search || ''}
                                placeholder="Search by name, SKU, or description..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </form>

                        {/* Category Filter */}
                        <select
                            value={filters.category_id || ''}
                            onChange={(e) => handleFilterChange('category_id', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={filters.status || ''}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="discontinued">Discontinued</option>
                        </select>
                    </div>

                    <div className="flex items-center mt-4 gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={!!filters.low_stock}
                                onChange={(e) => handleFilterChange('low_stock', e.target.checked ? '1' : '')}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Show low stock only</span>
                        </label>
                        
                        <span className="text-sm text-gray-500">
                            {products.total} product{products.total !== 1 ? 's' : ''} found
                        </span>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {products.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div>
                                                    <Link 
                                                        href={route('products.show', product.id)}
                                                        className="font-medium text-blue-600 hover:text-blue-700"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-sm text-gray-600">{product.category.name}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-medium ${isLowStock(product) ? 'text-red-600' : 'text-gray-900'}`}>
                                                        {product.current_stock}
                                                    </span>
                                                    {isLowStock(product) && (
                                                        <span className="text-red-500 text-sm">⚠️</span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500">Min: {product.minimum_stock}</p>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="font-medium text-gray-900">
                                                    ${product.unit_price}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route('products.show', product.id)}
                                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('products.edit', product.id)}
                                                        className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route('stock-transactions.create', { product_id: product.id })}
                                                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                                                    >
                                                        + Stock
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-4">Get started by adding your first product to the inventory.</p>
                            <Link
                                href={route('products.create')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                ➕ Add Product
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">
                            Page {products.current_page} of {products.last_page}
                        </p>
                        <div className="flex gap-2">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || ''}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        link.active 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}