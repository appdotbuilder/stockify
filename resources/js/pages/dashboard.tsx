import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface DashboardStats {
    total_products: number;
    low_stock_products: number;
    total_suppliers: number;
    pending_orders: number;
    total_users?: number;
}

interface Transaction {
    id: number;
    type: string;
    quantity: number;
    transaction_date: string;
    product: {
        name: string;
        sku: string;
    };
    user: {
        name: string;
    };
}

interface Product {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
    minimum_stock: number;
    category: {
        name: string;
    };
}

interface PurchaseOrder {
    id: number;
    po_number: string;
    status: string;
    total_amount: number;
    order_date: string;
    supplier: {
        name: string;
    };
}



interface Props {
    stats: DashboardStats;
    recentTransactions: Transaction[];
    lowStockProducts: Product[];
    roleSpecificData: {
        total_users?: number;
        recent_purchase_orders?: PurchaseOrder[];
        monthly_transactions?: Array<{
            month: string;
            count: number;
            inflow: number;
            outflow: number;
        }>;
    };
    userRole: string;
    userPermissions: {
        canManageProducts: boolean;
        canManageStock: boolean;
        canAccessReports: boolean;
    };
    [key: string]: unknown;
}

export default function Dashboard({ 
    stats, 
    recentTransactions, 
    lowStockProducts, 
    roleSpecificData, 
    userRole, 
    userPermissions 
}: Props) {
    const getRoleDisplayName = (role: string) => {
        const roles = {
            admin: 'Administrator',
            warehouse_manager: 'Warehouse Manager',
            warehouse_staff: 'Warehouse Staff'
        };
        return roles[role as keyof typeof roles] || role;
    };

    const getTypeIcon = (type: string) => {
        const icons = {
            inflow: '📥',
            outflow: '📤',
            adjustment: '⚖️',
            count: '📊'
        };
        return icons[type as keyof typeof icons] || '📦';
    };

    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-blue-100 text-blue-800',
            received: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppShell>
            <Head title="Dashboard - Stockify" />
            
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                Welcome to Stockify! 📦
                            </h1>
                            <p className="text-blue-100 text-lg">
                                Role: {getRoleDisplayName(userRole)} • Manage your inventory efficiently
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                                <span className="text-4xl">🏢</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Products</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_products}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                                <p className="text-3xl font-bold text-red-600">{stats.low_stock_products}</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-full">
                                <span className="text-2xl">⚠️</span>
                            </div>
                        </div>
                        {stats.low_stock_products > 0 && (
                            <Link 
                                href="/products?low_stock=1" 
                                className="text-sm text-red-600 hover:text-red-700 font-medium mt-2 inline-block"
                            >
                                View low stock items →
                            </Link>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_suppliers}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <span className="text-2xl">🤝</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                                <p className="text-3xl font-bold text-orange-600">{stats.pending_orders}</p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-full">
                                <span className="text-2xl">📋</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {userPermissions.canManageProducts && (
                            <Link
                                href={route('products.create')}
                                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                                <span className="text-2xl">➕</span>
                                <span className="font-medium text-blue-900">Add Product</span>
                            </Link>
                        )}
                        
                        {userPermissions.canManageStock && (
                            <Link
                                href={route('stock-transactions.create')}
                                className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                            >
                                <span className="text-2xl">📝</span>
                                <span className="font-medium text-green-900">Record Transaction</span>
                            </Link>
                        )}
                        
                        <Link
                            href={route('products.index')}
                            className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                        >
                            <span className="text-2xl">📋</span>
                            <span className="font-medium text-purple-900">View Products</span>
                        </Link>
                        
                        <Link
                            href={route('stock-transactions.index')}
                            className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                        >
                            <span className="text-2xl">📊</span>
                            <span className="font-medium text-orange-900">Transaction History</span>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Low Stock Alerts */}
                    {lowStockProducts.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">⚠️ Low Stock Alerts</h2>
                                <Link 
                                    href="/products?low_stock=1"
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    View all
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {lowStockProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                                            <p className="text-sm text-gray-600">{product.category.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-red-600">
                                                {product.current_stock} / {product.minimum_stock}
                                            </p>
                                            <p className="text-xs text-gray-500">Current / Min</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">📈 Recent Transactions</h2>
                            <Link 
                                href={route('stock-transactions.index')}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentTransactions.slice(0, 5).map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{getTypeIcon(transaction.type)}</span>
                                        <div>
                                            <p className="font-medium text-gray-900">{transaction.product.name}</p>
                                            <p className="text-sm text-gray-600">by {transaction.user.name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                            {transaction.type === 'outflow' ? '-' : '+'}{transaction.quantity}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(transaction.transaction_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {recentTransactions.length === 0 && (
                                <p className="text-gray-500 text-center py-4">No recent transactions</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Admin-specific section */}
                {userRole === 'admin' && roleSpecificData.recent_purchase_orders && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">📋 Recent Purchase Orders</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-2 font-semibold text-gray-900">PO Number</th>
                                        <th className="text-left py-3 px-2 font-semibold text-gray-900">Supplier</th>
                                        <th className="text-left py-3 px-2 font-semibold text-gray-900">Status</th>
                                        <th className="text-left py-3 px-2 font-semibold text-gray-900">Amount</th>
                                        <th className="text-left py-3 px-2 font-semibold text-gray-900">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roleSpecificData.recent_purchase_orders.map((po) => (
                                        <tr key={po.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-2 font-medium">{po.po_number}</td>
                                            <td className="py-3 px-2">{po.supplier.name}</td>
                                            <td className="py-3 px-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(po.status)}`}>
                                                    {po.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2">${po.total_amount}</td>
                                            <td className="py-3 px-2">{new Date(po.order_date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}