'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  Star,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from 'lucide-react';

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalRevenue: 1250000,
    totalOrders: 156,
    totalCustomers: 89,
    totalProducts: 45,
    revenueChange: 12.5,
    ordersChange: -2.3,
    customersChange: 8.1,
    productsChange: 5.7,
  },
  topProducts: [
    { name: 'Classic White T-Shirt', sales: 45, revenue: 67500, growth: 15.2 },
    { name: 'Denim Jeans', sales: 32, revenue: 96000, growth: 8.7 },
    { name: 'Summer Dress', sales: 28, revenue: 56000, growth: 22.1 },
    { name: 'Leather Jacket', sales: 18, revenue: 216000, growth: 5.3 },
    { name: 'Sneakers', sales: 25, revenue: 200000, growth: 12.8 },
  ],
  topCategories: [
    { name: 'Clothing', revenue: 450000, percentage: 36 },
    { name: 'Shoes', revenue: 320000, percentage: 25.6 },
    { name: 'Accessories', revenue: 280000, percentage: 22.4 },
    { name: 'Bags', revenue: 200000, percentage: 16 },
  ],
  recentActivity: [
    { type: 'order', message: 'New order #ORD-001 placed by John Doe', time: '2 minutes ago', amount: 9500 },
    { type: 'customer', message: 'New customer Sarah Wilson registered', time: '15 minutes ago' },
    { type: 'product', message: 'Product "Summer Dress" stock updated', time: '1 hour ago' },
    { type: 'order', message: 'Order #ORD-002 completed', time: '2 hours ago', amount: 4000 },
    { type: 'customer', message: 'Customer Mike Johnson made a purchase', time: '3 hours ago', amount: 21000 },
  ],
  monthlyData: [
    { month: 'Jan', revenue: 850000, orders: 120, customers: 65 },
    { month: 'Feb', revenue: 920000, orders: 135, customers: 72 },
    { month: 'Mar', revenue: 780000, orders: 110, customers: 58 },
    { month: 'Apr', revenue: 950000, orders: 140, customers: 75 },
    { month: 'May', revenue: 1100000, orders: 155, customers: 82 },
    { month: 'Jun', revenue: 1250000, orders: 156, customers: 89 },
  ],
};

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  const getGrowthIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case 'customer':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'product':
        return <Package className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your business performance and insights.
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockAnalytics.overview.totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getGrowthIcon(mockAnalytics.overview.revenueChange)}
              <span className="ml-1">{Math.abs(mockAnalytics.overview.revenueChange)}% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.totalOrders}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getGrowthIcon(mockAnalytics.overview.ordersChange)}
              <span className="ml-1">{Math.abs(mockAnalytics.overview.ordersChange)}% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.totalCustomers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getGrowthIcon(mockAnalytics.overview.customersChange)}
              <span className="ml-1">{Math.abs(mockAnalytics.overview.customersChange)}% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.totalProducts}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getGrowthIcon(mockAnalytics.overview.productsChange)}
              <span className="ml-1">{Math.abs(mockAnalytics.overview.productsChange)}% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Insights */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Revenue chart would be displayed here</p>
                    <p className="text-sm text-muted-foreground">
                      Using a charting library like Recharts or Chart.js
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Revenue distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Pie chart would be displayed here</p>
                    <p className="text-sm text-muted-foreground">
                      Showing category revenue distribution
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Revenue breakdown by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topCategories.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-primary"></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                      <span className="font-medium">{formatCurrency(category.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Best selling products by revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(product.revenue)}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {getGrowthIcon(product.growth)}
                        <span className="ml-1">{product.growth}% growth</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New customers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Customer acquisition chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
                <CardDescription>Average customer spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">CLV analysis chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest business activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(activity.amount)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(Math.round(mockAnalytics.overview.totalRevenue / mockAnalytics.overview.totalOrders))}
            </div>
            <p className="text-sm text-muted-foreground">
              Per order across all customers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78.5%</div>
            <p className="text-sm text-muted-foreground">
              Customers who made repeat purchases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.2%</div>
            <p className="text-sm text-muted-foreground">
              Visitors who made a purchase
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
