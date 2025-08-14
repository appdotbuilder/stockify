import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Stockify - Inventory Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
                {/* Header */}
                <header className="w-full px-6 py-4 lg:px-8">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">📦</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">Stockify</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 dark:bg-blue-900 dark:text-blue-200">
                                📊 Inventory Management Made Simple
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 dark:text-white">
                                Welcome to{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Stockify
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-gray-300">
                                Streamline your warehouse operations with comprehensive product management, 
                                real-time stock tracking, and detailed reporting. Built for businesses of all sizes.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 dark:bg-blue-900">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">Product Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Organize your inventory with detailed product catalogs, SKU tracking, and category management.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 dark:bg-green-900">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">Stock Tracking</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Monitor stock levels in real-time with automated alerts for low inventory and reorder points.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 dark:bg-purple-900">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">Supplier Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Maintain comprehensive supplier databases with contact information and purchase history.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 dark:bg-orange-900">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">Purchase Orders</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Create and track purchase orders from approval to delivery with automated workflows.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 dark:bg-red-900">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">Role-Based Access</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Secure multi-user environment with Admin, Warehouse Manager, and Staff role permissions.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 dark:bg-yellow-900">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">Detailed Reports</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Generate comprehensive reports on inventory, transactions, and performance analytics.
                                </p>
                            </div>
                        </div>

                        {/* User Roles Section */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 mb-16 dark:bg-gray-800">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
                                    Built for Every Team Member
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Tailored dashboards and permissions for different roles in your organization
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl text-white">👑</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Admin</h3>
                                    <p className="text-gray-600 mb-4 dark:text-gray-300">Full system control and user management</p>
                                    <ul className="text-sm text-gray-500 space-y-1 dark:text-gray-400">
                                        <li>• User role management</li>
                                        <li>• Comprehensive reporting</li>
                                        <li>• System configuration</li>
                                        <li>• All warehouse operations</li>
                                    </ul>
                                </div>

                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl text-white">👔</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Warehouse Manager</h3>
                                    <p className="text-gray-600 mb-4 dark:text-gray-300">Stock operations and reporting</p>
                                    <ul className="text-sm text-gray-500 space-y-1 dark:text-gray-400">
                                        <li>• Product data management</li>
                                        <li>• Stock operations oversight</li>
                                        <li>• Purchase order creation</li>
                                        <li>• Inventory reporting</li>
                                    </ul>
                                </div>

                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl text-white">👷</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Warehouse Staff</h3>
                                    <p className="text-gray-600 mb-4 dark:text-gray-300">Goods receipt and dispatch</p>
                                    <ul className="text-sm text-gray-500 space-y-1 dark:text-gray-400">
                                        <li>• Stock receipt confirmation</li>
                                        <li>• Dispatch operations</li>
                                        <li>• Stock count participation</li>
                                        <li>• Basic inventory updates</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
                                Ready to Transform Your Inventory Management?
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-lg transition-all transform hover:scale-105"
                                    >
                                        Go to Dashboard →
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-lg transition-all transform hover:scale-105"
                                        >
                                            Get Started Free
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl text-lg border-2 border-gray-200 transition-all dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-600"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
                        <p>Built with ❤️ for efficient warehouse management</p>
                    </div>
                </footer>
            </div>
        </>
    );
}