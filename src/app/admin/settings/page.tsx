'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
  Settings,
  Store,
  Users,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Truck,
  Mail,
  Save,
  Trash2,
  UserPlus,
  Key,
  Database,
  Download,
  Upload,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    name: 'Stitch & Style',
    description: 'Your personal AI-powered fashion stylist',
    email: 'contact@stitchstyle.com',
    phone: '+254 700 000 000',
    address: '123 Fashion Street, Nairobi, Kenya',
    currency: 'KES',
    timezone: 'Africa/Nairobi',
    language: 'en',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    inventoryAlerts: true,
    customerSupport: true,
    marketingEmails: false,
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 5000,
    standardShippingCost: 500,
    expressShippingCost: 1000,
    deliveryTimeStandard: '3-5 days',
    deliveryTimeExpress: '1-2 days',
  });

  const [paymentSettings, setPaymentSettings] = useState({
    mpesaEnabled: true,
    cardEnabled: true,
    bankTransferEnabled: false,
    cashOnDelivery: true,
  });

  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = (section: string) => {
    toast({
      title: 'Settings saved',
      description: `${section} settings have been successfully updated.`,
    });
  };

  const handleBackupData = () => {
    toast({
      title: 'Backup initiated',
      description: 'Your data backup has been started. You will receive an email when it\'s complete.',
    });
    setIsBackupDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store configuration and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Store Information
              </CardTitle>
              <CardDescription>
                Basic store details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input
                    id="store-name"
                    value={storeSettings.name}
                    onChange={(e) => setStoreSettings(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email">Email</Label>
                  <Input
                    id="store-email"
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => setStoreSettings(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description">Description</Label>
                <Textarea
                  id="store-description"
                  value={storeSettings.description}
                  onChange={(e) => setStoreSettings(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Phone</Label>
                  <Input
                    id="store-phone"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-address">Address</Label>
                  <Input
                    id="store-address"
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={storeSettings.currency} onValueChange={(value) => setStoreSettings(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KES">KES (Kenyan Shilling)</SelectItem>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={storeSettings.timezone} onValueChange={(value) => setStoreSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Nairobi">Africa/Nairobi</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={storeSettings.language} onValueChange={(value) => setStoreSettings(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Swahili</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => handleSaveSettings('Store')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Store Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new orders are placed
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.orderNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, orderNotifications: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Inventory Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert when products are running low on stock
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.inventoryAlerts}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, inventoryAlerts: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Customer Support</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for customer support requests
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.customerSupport}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, customerSupport: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional and marketing emails
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>
              </div>
              <Button onClick={() => handleSaveSettings('Notification')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Configuration
              </CardTitle>
              <CardDescription>
                Configure shipping rates and delivery options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="free-shipping">Free Shipping Threshold (KSh)</Label>
                  <Input
                    id="free-shipping"
                    type="number"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={(e) => setShippingSettings(prev => ({ ...prev, freeShippingThreshold: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="standard-shipping">Standard Shipping Cost (KSh)</Label>
                  <Input
                    id="standard-shipping"
                    type="number"
                    value={shippingSettings.standardShippingCost}
                    onChange={(e) => setShippingSettings(prev => ({ ...prev, standardShippingCost: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="express-shipping">Express Shipping Cost (KSh)</Label>
                  <Input
                    id="express-shipping"
                    type="number"
                    value={shippingSettings.expressShippingCost}
                    onChange={(e) => setShippingSettings(prev => ({ ...prev, expressShippingCost: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-standard">Standard Delivery Time</Label>
                  <Input
                    id="delivery-standard"
                    value={shippingSettings.deliveryTimeStandard}
                    onChange={(e) => setShippingSettings(prev => ({ ...prev, deliveryTimeStandard: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-express">Express Delivery Time</Label>
                <Input
                  id="delivery-express"
                  value={shippingSettings.deliveryTimeExpress}
                  onChange={(e) => setShippingSettings(prev => ({ ...prev, deliveryTimeExpress: e.target.value }))}
                />
              </div>
              <Button onClick={() => handleSaveSettings('Shipping')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Shipping Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Configure available payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>M-Pesa</Label>
                    <p className="text-sm text-muted-foreground">
                      Mobile money payments via M-Pesa
                    </p>
                  </div>
                  <Switch
                    checked={paymentSettings.mpesaEnabled}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, mpesaEnabled: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Credit/Debit Cards</Label>
                    <p className="text-sm text-muted-foreground">
                      Accept card payments
                    </p>
                  </div>
                  <Switch
                    checked={paymentSettings.cardEnabled}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, cardEnabled: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bank Transfer</Label>
                    <p className="text-sm text-muted-foreground">
                      Direct bank transfers
                    </p>
                  </div>
                  <Switch
                    checked={paymentSettings.bankTransferEnabled}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, bankTransferEnabled: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cash on Delivery</Label>
                    <p className="text-sm text-muted-foreground">
                      Pay when you receive your order
                    </p>
                  </div>
                  <Switch
                    checked={paymentSettings.cashOnDelivery}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, cashOnDelivery: checked }))}
                  />
                </div>
              </div>
              <Button onClick={() => handleSaveSettings('Payment')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage admin users and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Admin Users</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage who has access to the admin panel
                  </p>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-medium">A</span>
                    </div>
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-muted-foreground">admin@stitchstyle.com</p>
                    </div>
                  </div>
                  <Badge>Owner</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Backup and restore your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={() => setIsBackupDialogOpen(true)} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Create Backup
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Restore from Backup
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>
                  Security and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your data including products, orders, and customer information.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete All Data
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Backup Dialog */}
      <Dialog open={isBackupDialogOpen} onOpenChange={setIsBackupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Data Backup</DialogTitle>
            <DialogDescription>
              This will create a complete backup of all your store data including products, orders, customers, and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Backup will include:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• All product information and images</li>
                <li>• Customer data and order history</li>
                <li>• Store settings and configuration</li>
                <li>• Analytics and reporting data</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBackupDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBackupData}>
              <Download className="mr-2 h-4 w-4" />
              Start Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
