import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';

interface StockTransaction {
    id: number;
    type: string;
    quantity: number;
    previous_stock: number;
    new_stock: number;
    reference_number?: string;
    transaction_date: string;
    product: {
        name: string;
        sku: string;
    };
    user: {
        name: string;
    };
}

interface Filters {
    search?: string;
    type?: string;
    start_date?: string;
    end_date?: string;
}

interface Props {
    transactions: {
        data: StockTransaction[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: Filters;
    [key: string]: unknown;
}

export default function StockTransactionsIndex({ transactions, filters }: Props) {
    const getTypeIcon = (type: string) => {
        const icons = {
            inflow: '📥',
            outflow: '📤',
            adjustment: '⚖️',
            count: '📊'
        };
        return icons[type as keyof typeof icons] || '📦';
    };

    const getTypeColor = (type: string) => {
        const colors = {
            inflow: 'bg-green-100 text-green-800',
            outflow: 'bg-red-100 text-red-800',
            adjustment: 'bg-blue-100 text-blue-800',
            count: 'bg-purple-100 text-purple-800'
        };
        return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(route('stock-transactions.index'), 
            { ...filters, [key]: value || undefined },
            { preserveState: true }
        );
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        
        router.get(route('stock-transactions.index'), 
            { ...filters, search: search || undefined },
            { preserveState: true }
        );
    };

    return (
        <AppShell>
            <Head title="Stock Transactions - Stockify" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="📈 Stock Transactions" />
                    <Link
                        href={route('stock-transactions.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        ➕ Record Transaction
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters.search || ''}
                                placeholder="Search by product or reference..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </form>

                        {/* Type Filter */}
                        <select
                            value={filters.type || ''}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="inflow">Inflow</option>
                            <option value="outflow">Outflow</option>
                            <option value="adjustment">Adjustment</option>
                            <option value="count">Count</option>
                        </select>

                        {/* Start Date */}
                        <input
                            type="date"
                            value={filters.start_date || ''}
                            onChange={(e) => handleFilterChange('start_date', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />

                        {/* End Date */}
                        <input
                            type="date"
                            value={filters.end_date || ''}
                            onChange={(e) => handleFilterChange('end_date', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mt-4">
                        <span className="text-sm text-gray-500">
                            {transactions.total} transaction{transactions.total !== 1 ? 's' : ''} found
                        </span>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {transactions.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Quantity</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock Change</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Reference</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.data.map((transaction) => (
                                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <span className="text-sm text-gray-900">
                                                    {new Date(transaction.transaction_date).toLocaleDateString()}
                                                </span>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(transaction.transaction_date).toLocaleTimeString()}
                                                </p>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{transaction.product.name}</p>
                                                    <p className="text-sm text-gray-500">SKU: {transaction.product.sku}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{getTypeIcon(transaction.type)}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                                                        {transaction.type}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="font-medium text-gray-900">
                                                    {transaction.type === 'outflow' ? '-' : '+'}
                                                    {transaction.quantity}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-sm text-gray-600">
                                                    {transaction.previous_stock} → {transaction.new_stock}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-sm text-gray-600">{transaction.user.name}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-sm text-gray-600">
                                                    {transaction.reference_number || '-'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <Link
                                                    href={route('stock-transactions.show', transaction.id)}
                                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📈</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                            <p className="text-gray-500 mb-4">Start recording stock movements to see transaction history.</p>
                            <Link
                                href={route('stock-transactions.create')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                ➕ Record Transaction
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {transactions.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">
                            Page {transactions.current_page} of {transactions.last_page}
                        </p>
                        <div className="flex gap-2">
                            {transactions.links.map((link, index) => (
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