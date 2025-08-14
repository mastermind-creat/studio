'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Star, StarHalf } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} is now in your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="h-5 w-5 fill-accent text-accent" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<StarHalf key={i} className="h-5 w-5 fill-accent text-accent" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-muted-foreground/50" />);
      }
    }
    return stars;
  };
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <div className="aspect-square rounded-lg overflow-hidden shadow-lg mb-4">
            <Image
              src={selectedImage || product.images[0]}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint="fashion product"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`aspect-square rounded-md overflow-hidden ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring ${selectedImage === img ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-headline font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">{renderStars(product.rating)}</div>
            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-primary mb-6">KSh {product.price.toLocaleString()}</p>
          <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {product.keywords.map(keyword => (
              <Badge key={keyword} variant="secondary">{keyword}</Badge>
            ))}
          </div>

          <div className="mt-auto">
            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      <div>
        <h2 className="text-2xl font-headline font-bold mb-6">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map(review => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-headline">{review.author}</CardTitle>
                    <div className="flex items-center">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                </CardHeader>
                <CardContent>
                  <p>{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
}
