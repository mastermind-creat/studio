'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  phone: z.string().min(10, 'Phone number is required'),
  paymentMethod: z.enum(['card', 'mpesa']),
  mpesaPhone: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
}).refine(data => {
  if (data.paymentMethod === 'mpesa') {
    return !!data.mpesaPhone && data.mpesaPhone.length >= 10;
  }
  return true;
}, {
  message: 'M-Pesa phone number is required',
  path: ['mpesaPhone'],
}).refine(data => {
    if (data.paymentMethod === 'card') {
        return !!data.cardNumber && data.cardNumber.length === 16;
    }
    return true;
}, {
    message: 'Card number must be 16 digits',
    path: ['cardNumber'],
}).refine(data => {
    if (data.paymentMethod === 'card') {
        return !!data.expiryDate && /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate);
    }
    return true;
}, {
    message: 'Expiry date must be in MM/YY format',
    path: ['expiryDate'],
}).refine(data => {
    if (data.paymentMethod === 'card') {
        return !!data.cvv && data.cvv.length === 3;
    }
    return true;
}, {
    message: 'CVV must be 3 digits',
    path: ['cvv'],
});

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('mpesa');

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      phone: '',
      paymentMethod: 'mpesa',
      mpesaPhone: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
    console.log('Order submitted:', values);
    toast({
      title: 'Order Placed!',
      description: 'Thank you for your purchase. Your order is being processed.',
    });
    clearCart();
    router.push('/shop');
  };
  
  const shippingFee = 500;
  const grandTotal = totalPrice + shippingFee;

  const checkoutContent = (
    <>
      {cartItems.length === 0 ? (
        <div className="container mx-auto px-4 md:px-6 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty.</h1>
          <p className="text-muted-foreground">Please add items to your cart before proceeding to checkout.</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Checkout</h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Nairobi" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="0712 345 678" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <h3 className="text-xl font-headline pt-4">Payment Details</h3>
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setPaymentMethod(value);
                                }}
                                defaultValue={field.value}
                                className="flex space-x-4"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="mpesa" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    M-Pesa
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="card" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Card
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {paymentMethod === 'mpesa' && (
                         <FormField
                            control={form.control}
                            name="mpesaPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>M-Pesa Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="0712 345 678" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                      )}

                      {paymentMethod === 'card' && (
                        <>
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="•••• •••• •••• ••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           <div className="grid grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="expiryDate"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Expiry Date</FormLabel>
                                   <FormControl>
                                     <Input placeholder="MM/YY" {...field} />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>
                               )}
                             />
                             <FormField
                               control={form.control}
                               name="cvv"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>CVV</FormLabel>
                                   <FormControl>
                                     <Input placeholder="123" {...field} />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>
                               )}
                             />
                           </div>
                        </>
                      )}
                      <Button type="submit" size="lg" className="w-full mt-6">
                        {paymentMethod === 'mpesa' ? 'Pay with M-Pesa' : 'Place Order'} (KSh {grandTotal.toLocaleString()})
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p>KSh {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>KSh {totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Shipping</p>
                      <p>KSh {shippingFee.toLocaleString()}</p>
                    </div>
                    <div className="border-t my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <p>Total</p>
                      <p>KSh {grandTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <ProtectedRoute
      fallback={
        <div className="container mx-auto px-4 md:px-6 py-12">
          <Card className="text-center py-16 max-w-md mx-auto">
            <CardContent className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-6">
                Please sign in or create an account to proceed to checkout.
              </p>
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Create Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      {checkoutContent}
    </ProtectedRoute>
  );
}
