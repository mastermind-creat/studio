'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function CartPage() {
  const { cartItems, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const shippingFee = 500;
  const grandTotal = totalPrice + shippingFee;

  const cartContent = (

    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent className="flex flex-col items-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex items-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-grow p-4">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold hover:text-primary">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="font-bold text-primary mt-1">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 flex flex-col items-end gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 text-center"
                      aria-label="Quantity"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>KSh {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>KSh {shippingFee.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Grand Total</span>
                  <span>KSh {grandTotal.toLocaleString()}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ProtectedRoute
      fallback={
        <div className="container mx-auto px-4 md:px-6 py-12">
          <Card className="text-center py-16 max-w-md mx-auto">
            <CardContent className="flex flex-col items-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-6">
                Please sign in or create an account to view your shopping cart.
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
      {cartContent}
    </ProtectedRoute>
  );
}
