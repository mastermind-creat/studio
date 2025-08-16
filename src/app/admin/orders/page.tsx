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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+254 712 345 678',
    },
    items: [
      { id: '1', name: 'Classic White T-Shirt', quantity: 2, price: 2500 },
      { id: '2', name: 'Denim Jeans', quantity: 1, price: 4500 },
    ],
    total: 9500,
    status: 'pending',
    paymentMethod: 'mpesa',
    shippingAddress: '123 Main St, Nairobi, Kenya',
    orderDate: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-20',
    trackingNumber: 'TRK-123456789',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+254 723 456 789',
    },
    items: [
      { id: '3', name: 'Summer Dress', quantity: 1, price: 3500 },
    ],
    total: 4000,
    status: 'completed',
    paymentMethod: 'card',
    shippingAddress: '456 Oak Ave, Mombasa, Kenya',
    orderDate: '2024-01-14T14:20:00Z',
    estimatedDelivery: '2024-01-19',
    trackingNumber: 'TRK-987654321',
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+254 734 567 890',
    },
    items: [
      { id: '4', name: 'Leather Jacket', quantity: 1, price: 12000 },
      { id: '5', name: 'Sneakers', quantity: 1, price: 8000 },
    ],
    total: 21000,
    status: 'processing',
    paymentMethod: 'mpesa',
    shippingAddress: '789 Pine Rd, Kisumu, Kenya',
    orderDate: '2024-01-13T09:15:00Z',
    estimatedDelivery: '2024-01-18',
    trackingNumber: 'TRK-456789123',
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+254 745 678 901',
    },
    items: [
      { id: '6', name: 'Hoodie', quantity: 1, price: 3000 },
    ],
    total: 3500,
    status: 'shipped',
    paymentMethod: 'card',
    shippingAddress: '321 Elm St, Nakuru, Kenya',
    orderDate: '2024-01-12T16:45:00Z',
    estimatedDelivery: '2024-01-17',
    trackingNumber: 'TRK-789123456',
  },
];

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock },
  processing: { label: 'Processing', variant: 'default' as const, icon: Package },
  shipped: { label: 'Shipped', variant: 'default' as const, icon: Truck },
  completed: { label: 'Completed', variant: 'default' as const, icon: CheckCircle },
  cancelled: { label: 'Cancelled', variant: 'destructive' as const, icon: XCircle },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const { toast } = useToast();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: 'Order status updated',
      description: `Order ${orderId} status has been updated to ${newStatus}.`,
    });
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
    toast({
      title: 'Order cancelled',
      description: `Order ${orderId} has been cancelled.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track customer orders.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer name, or email..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>
            {filteredOrders.length} orders found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {order.customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{order.customer.name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {order.items.map(item => item.name).join(', ')}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      KSh {order.total.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(order.orderDate)}</div>
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
                            setSelectedOrder(order);
                            setIsOrderDetailOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          {order.status !== 'pending' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'pending')}>
                              <Clock className="mr-2 h-4 w-4" />
                              Mark as Pending
                            </DropdownMenuItem>
                          )}
                          {order.status !== 'processing' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'processing')}>
                              <Package className="mr-2 h-4 w-4" />
                              Mark as Processing
                            </DropdownMenuItem>
                          )}
                          {order.status !== 'shipped' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'shipped')}>
                              <Truck className="mr-2 h-4 w-4" />
                              Mark as Shipped
                            </DropdownMenuItem>
                          )}
                          {order.status !== 'completed' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'completed')}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Completed
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {order.status !== 'cancelled' && (
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          )}
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

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Complete order information and customer details
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6">
              {/* Order Summary */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Order ID:</span>
                      <span className="font-medium">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Order Date:</span>
                      <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      {getStatusBadge(selectedOrder.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payment Method:</span>
                      <span className="font-medium capitalize">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tracking Number:</span>
                      <span className="font-medium">{selectedOrder.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Delivery:</span>
                      <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{selectedOrder.customer.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedOrder.customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedOrder.customer.phone}</span>
                    </div>
                    <Separator />
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{selectedOrder.shippingAddress}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">KSh {item.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            Total: KSh {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>KSh {selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOrderDetailOpen(false)}>
                Close
              </Button>
              <Button onClick={() => setIsOrderDetailOpen(false)}>
                Print Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
