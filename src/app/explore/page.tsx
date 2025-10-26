import PageHeader from '@/components/page-header';
import { ExploreForm } from '@/components/features/explore-form';

export default function ExplorePage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Explore Mode"
        description="Discover hidden gems and international masterpieces. Tell us your tastes, and we'll find movies off the beaten path."
        className="text-center mb-10"
      />
      <ExploreForm />
    </div>
  );
}
