import PageHeader from '@/components/page-header';
import { WatchlistForm } from '@/components/features/watchlist-form';

export default function WatchlistPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="AI Watchlist Generator"
        description="Let our AI create the perfect movie marathon for you. Just pick a mood and let the magic happen."
        className="text-center mb-10"
      />
      <WatchlistForm />
    </div>
  );
}
