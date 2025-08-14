import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/data';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom_1px_center"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter text-primary">
              Stitch & Style
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80">
              Discover your unique style with AI-powered recommendations. We help
              you find the perfect outfit for any occasion.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/shop">
                  Shop New Arrivals
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/recommendations">
                  Get Style Advice
                  <Sparkles className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="secondary" size="lg">
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-card">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
               <Image
                src="https://placehold.co/600x600.png"
                alt="AI Stylist"
                width={600}
                height={600}
                className="w-full h-full object-cover"
                data-ai-hint="fashion consultation"
              />
            </div>
            <div>
              <h2 className="text-3xl font-headline font-bold mb-4">
                Your Personal AI Stylist
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Tired of endless scrolling? Our AI-powered tool analyzes your
                preferences to provide personalized clothing recommendations that
                truly match your style. Spend less time searching and more time
                looking your best.
              </p>
              <Button asChild size="lg">
                <Link href="/recommendations">
                  Find Your Style
                  <Sparkles className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
