'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  ArrowUpRight,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

// Mock data - in a real app, this would come from your API
const mockStats = {
  totalRevenue: 1250000,
  totalOrders: 156,
  totalCustomers: 89,
  totalProducts: 45,
  revenueChange: 12.5,
  ordersChange: -2.3,
  customersChange: 8.1,
  productsChange: 5.7,
};

const mockRecentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    amount: 25000,
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    amount: 18000,
    status: 'completed',
    date: '2024-01-14',
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    amount: 32000,
    status: 'processing',
    date: '2024-01-13',
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Wilson',
    amount: 15000,
    status: 'shipped',
    date: '2024-01-12',
  },
];

const mockTopProducts = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    sales: 45,
    revenue: 67500,
    image: '/api/placeholder/40/40',
  },
  {
    id: '2',
    name: 'Denim Jeans',
    sales: 32,
    revenue: 96000,
    image: '/api/placeholder/40/40',
  },
  {
    id: '3',
    name: 'Summer Dress',
    sales: 28,
    revenue: 56000,
    image: '/api/placeholder/40/40',
  },
];

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  href,
}: {
  title: string;
  value: string | number;
  change: number;
  icon: any;
  href?: string;
}) {
  const isPositive = change >= 0;
  
  const content = (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {isPositive ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          {Math.abs(change)}% from last month
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

function getStatusBadge(status: string) {
  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const },
    processing: { label: 'Processing', variant: 'default' as const },
    shipped: { label: 'Shipped', variant: 'default' as const },
    completed: { label: 'Completed', variant: 'default' as const },
    cancelled: { label: 'Cancelled', variant: 'destructive' as const },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`KSh ${mockStats.totalRevenue.toLocaleString()}`}
          change={mockStats.revenueChange}
          icon={DollarSign}
          href="/admin/analytics"
        />
        <StatCard
          title="Total Orders"
          value={mockStats.totalOrders}
          change={mockStats.ordersChange}
          icon={ShoppingCart}
          href="/admin/orders"
        />
        <StatCard
          title="Total Customers"
          value={mockStats.totalCustomers}
          change={mockStats.customersChange}
          icon={Users}
          href="/admin/customers"
        />
        <StatCard
          title="Total Products"
          value={mockStats.totalProducts}
          change={mockStats.productsChange}
          icon={Package}
          href="/admin/products"
        />
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your customers</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/orders">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">KSh {order.amount.toLocaleString()}</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling products this month</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/products">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded bg-gray-200 flex items-center justify-center">
                      <Package className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">KSh {product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common admin tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild className="h-auto flex-col p-4">
              <Link href="/admin/products/new">
                <Package className="mb-2 h-6 w-6" />
                <span>Add Product</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col p-4">
              <Link href="/admin/orders">
                <ShoppingCart className="mb-2 h-6 w-6" />
                <span>View Orders</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col p-4">
              <Link href="/admin/customers">
                <Users className="mb-2 h-6 w-6" />
                <span>Manage Customers</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col p-4">
              <Link href="/admin/analytics">
                <BarChart3 className="mb-2 h-6 w-6" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
