import PersonalizationTool from './PersonalizationTool';

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Your AI-Powered Stylist
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Let our AI help you discover new styles and find the perfect pieces for any occasion.
        </p>
      </div>
      <PersonalizationTool />
    </div>
  );
}
