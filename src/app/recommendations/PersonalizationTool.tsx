'use client';

import { useState } from 'react';
import { Sparkles, Bot } from 'lucide-react';

import { suggestStyleGuide } from '@/ai/flows/style-guide-suggestions';
import { generatePersonalizedRecommendations } from '@/ai/flows/generate-personalized-recommendations';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/generate-personalized-recommendations';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function PersonalizationTool() {
  const [occasion, setOccasion] = useState('');
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const [browsingActivity, setBrowsingActivity] = useState('');
  const [pastPreferences, setPastPreferences] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput['recommendations']>([]);
  const [isRecommending, setIsRecommending] = useState(false);

  const handleSuggestKeywords = async () => {
    if (!occasion) return;
    setIsSuggesting(true);
    try {
      const result = await suggestStyleGuide({ occasion, previousKeywords: pastPreferences });
      setSuggestedKeywords(result.keywords);
    } catch (error) {
      console.error('Error suggesting style guide:', error);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleGetRecommendations = async () => {
    if (!browsingActivity && pastPreferences.length === 0) return;
    setIsRecommending(true);
    setRecommendations([]);
    try {
      const result = await generatePersonalizedRecommendations({
        currentBrowsingActivity: browsingActivity,
        pastPreferences: pastPreferences.join(', '),
      });
      // Mock product data for UI since generated URLs might not be real
      const mockRecommendations = result.recommendations.map((rec, index) => ({
        id: `rec-${index}-${Date.now()}`,
        name: rec.name,
        description: rec.description,
        price: Math.floor(Math.random() * (15000 - 3000 + 1) + 3000),
        category: 'Recommended',
        images: [rec.imageUrl || 'https://placehold.co/600x800.png'],
        keywords: rec.keywords,
        rating: Math.round((Math.random() * (5 - 3.5) + 3.5) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 100),
        reviews: [],
      }));
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsRecommending(false);
    }
  };

  const togglePreference = (keyword: string) => {
    setPastPreferences((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };
  
  return (
    <div className="space-y-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-primary" />
            Find Style Inspiration
          </CardTitle>
          <CardDescription>
            Tell us about an occasion, and we'll suggest some style keywords to get you started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., a beach wedding, a business conference"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSuggestKeywords()}
            />
            <Button onClick={handleSuggestKeywords} disabled={isSuggesting}>
              {isSuggesting ? 'Suggesting...' : 'Suggest Keywords'}
            </Button>
          </div>
          {isSuggesting && <div className="text-sm text-muted-foreground">AI is thinking...</div>}
          {suggestedKeywords.length > 0 && (
            <div>
              <p className="font-medium mb-2">Click keywords to add to your preferences:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedKeywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant={pastPreferences.includes(keyword) ? 'default' : 'secondary'}
                    onClick={() => togglePreference(keyword)}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Bot className="text-primary" />
            Get Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Based on your preferences and what you're looking for now, we'll find items just for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="font-medium">Your current preferences:</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {pastPreferences.length > 0 ? (
                pastPreferences.map((keyword) => (
                  <Badge key={keyword} variant="default" onClick={() => togglePreference(keyword)} className="cursor-pointer">
                    {keyword} &times;
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No preferences selected yet.</p>
              )}
            </div>
          </div>
          <Textarea
            placeholder="Describe what you're looking for today... e.g., 'A comfortable but stylish dress for a casual dinner', 'Smart trousers for work'"
            value={browsingActivity}
            onChange={(e) => setBrowsingActivity(e.target.value)}
            rows={4}
          />
          <Button onClick={handleGetRecommendations} disabled={isRecommending} size="lg">
            {isRecommending ? 'Finding Your Style...' : 'Generate Recommendations'}
          </Button>
        </CardContent>
      </Card>
      
      {(isRecommending || recommendations.length > 0) && (
        <div>
          <h2 className="text-3xl font-headline font-bold text-center mb-8">
            Here's what we found for you
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isRecommending ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="w-full max-w-sm">
                  <Skeleton className="h-[400px] w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
