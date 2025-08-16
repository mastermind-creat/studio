'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Star,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  User,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock customers data
const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254 712 345 678',
    address: '123 Main St, Nairobi, Kenya',
    joinDate: '2023-06-15',
    totalOrders: 8,
    totalSpent: 45000,
    lastOrder: '2024-01-15',
    status: 'active',
    avatar: null,
    orders: [
      { id: 'ORD-001', date: '2024-01-15', amount: 9500, status: 'pending' },
      { id: 'ORD-005', date: '2024-01-10', amount: 12000, status: 'completed' },
      { id: 'ORD-008', date: '2024-01-05', amount: 8500, status: 'completed' },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+254 723 456 789',
    address: '456 Oak Ave, Mombasa, Kenya',
    joinDate: '2023-08-22',
    totalOrders: 12,
    totalSpent: 78000,
    lastOrder: '2024-01-14',
    status: 'active',
    avatar: null,
    orders: [
      { id: 'ORD-002', date: '2024-01-14', amount: 4000, status: 'completed' },
      { id: 'ORD-006', date: '2024-01-08', amount: 15000, status: 'completed' },
      { id: 'ORD-009', date: '2024-01-02', amount: 22000, status: 'completed' },
    ],
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+254 734 567 890',
    address: '789 Pine Rd, Kisumu, Kenya',
    joinDate: '2023-11-10',
    totalOrders: 3,
    totalSpent: 21000,
    lastOrder: '2024-01-13',
    status: 'active',
    avatar: null,
    orders: [
      { id: 'ORD-003', date: '2024-01-13', amount: 21000, status: 'processing' },
    ],
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+254 745 678 901',
    address: '321 Elm St, Nakuru, Kenya',
    joinDate: '2023-09-05',
    totalOrders: 15,
    totalSpent: 95000,
    lastOrder: '2024-01-12',
    status: 'active',
    avatar: null,
    orders: [
      { id: 'ORD-004', date: '2024-01-12', amount: 3500, status: 'shipped' },
      { id: 'ORD-007', date: '2024-01-07', amount: 18000, status: 'completed' },
      { id: 'ORD-010', date: '2024-01-01', amount: 12000, status: 'completed' },
    ],
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+254 756 789 012',
    address: '654 Maple Dr, Eldoret, Kenya',
    joinDate: '2023-12-20',
    totalOrders: 1,
    totalSpent: 5000,
    lastOrder: '2024-01-11',
    status: 'inactive',
    avatar: null,
    orders: [
      { id: 'ORD-011', date: '2024-01-11', amount: 5000, status: 'completed' },
    ],
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isCustomerDetailOpen, setIsCustomerDetailOpen] = useState(false);
  const { toast } = useToast();

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (customerId: string, newStatus: string) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
    toast({
      title: 'Customer status updated',
      description: `Customer status has been updated to ${newStatus}.`,
    });
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
    toast({
      title: 'Customer deleted',
      description: 'The customer has been successfully deleted.',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'active' ? 'default' : 'secondary'}>
        {status === 'active' ? 'Active' : 'Inactive'}
      </Badge>
    );
  };

  const getOrderStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'secondary' as const },
      processing: { label: 'Processing', variant: 'default' as const },
      shipped: { label: 'Shipped', variant: 'default' as const },
      completed: { label: 'Completed', variant: 'default' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer database and view customer insights.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((customers.filter(c => c.status === 'active').length / customers.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              KSh {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From all customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            {filteredCustomers.length} customers found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Joined {formatDate(customer.joinDate)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{customer.email}</p>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{customer.totalOrders}</div>
                      <p className="text-xs text-muted-foreground">orders</p>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        KSh {customer.totalSpent.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        avg: KSh {Math.round(customer.totalSpent / customer.totalOrders).toLocaleString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(customer.lastOrder)}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(customer.status)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedCustomer(customer);
                            setIsCustomerDetailOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          {customer.status !== 'active' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(customer.id, 'active')}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Mark as Active
                            </DropdownMenuItem>
                          )}
                          {customer.status !== 'inactive' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(customer.id, 'inactive')}>
                              <UserMinus className="mr-2 h-4 w-4" />
                              Mark as Inactive
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Detail Dialog */}
      {selectedCustomer && (
        <Dialog open={isCustomerDetailOpen} onOpenChange={setIsCustomerDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Customer Details - {selectedCustomer.name}</DialogTitle>
              <DialogDescription>
                Complete customer information and order history
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{selectedCustomer.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedCustomer.phone}</span>
                      </div>
                      <Separator />
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">{selectedCustomer.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Joined {formatDate(selectedCustomer.joinDate)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{selectedCustomer.totalOrders}</div>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            KSh {selectedCustomer.totalSpent.toLocaleString()}
                          </div>
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Average Order Value:</span>
                          <span className="font-medium">
                            KSh {Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last Order:</span>
                          <span className="font-medium">{formatDate(selectedCustomer.lastOrder)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          {getStatusBadge(selectedCustomer.status)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      Recent orders from this customer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedCustomer.orders.map((order: any) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                              <ShoppingBag className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(order.date)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">KSh {order.amount.toLocaleString()}</p>
                            {getOrderStatusBadge(order.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Spending Pattern</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Chart would go here</p>
                        <p className="text-sm text-muted-foreground">
                          Spending over time visualization
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Frequency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Chart would go here</p>
                        <p className="text-sm text-muted-foreground">
                          Order frequency analysis
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCustomerDetailOpen(false)}>
                Close
              </Button>
              <Button onClick={() => setIsCustomerDetailOpen(false)}>
                Send Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
