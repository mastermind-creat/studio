'use client';

import { useState } from 'react';
import { products as allProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

const categories = ['All', ...Array.from(new Set(allProducts.map((p) => p.category)))];
const maxPrice = Math.max(...allProducts.map((p) => p.price));

export default function ShopPage() {
  const [sort, setSort] = useState('newest');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  const filteredAndSortedProducts = allProducts
    .filter((product) => {
      const categoryMatch = category === 'All' || product.category === category;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default: // newest, assuming higher ID is newer
          return parseInt(b.id) - parseInt(a.id);
      }
    });

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <aside className="w-full md:w-64 lg:w-72">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-headline font-bold mb-6">Filters</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Category</h3>
                  <RadioGroup value={category} onValueChange={setCategory}>
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-2">
                        <RadioGroupItem value={cat} id={`cat-${cat}`} />
                        <Label htmlFor={`cat-${cat}`}>{cat}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium mb-3">Price Range</h3>
                  <Slider
                    defaultValue={[maxPrice]}
                    max={maxPrice}
                    step={100}
                    onValueChange={(value) => setPriceRange([0, value[0]])}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>KSh 0</span>
                    <span>KSh {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing {filteredAndSortedProducts.length} products
            </p>
            <div className="flex items-center gap-2">
              <Label htmlFor="sort-by">Sort by:</Label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger id="sort-by" className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
