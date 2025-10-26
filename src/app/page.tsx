import PageHeader from '@/components/page-header';
import { TasteProfilerForm } from '@/components/features/taste-profiler-form';

export default function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Your Personal Movie Genie"
        description="Tell us what you love, and we'll find your next favorite movie. The more details you provide, the better the recommendations!"
        className="text-center mb-10"
      />
      <TasteProfilerForm />
    </div>
  );
}
