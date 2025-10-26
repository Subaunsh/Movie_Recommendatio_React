'use client';

import PageHeader from '@/components/page-header';
import { MoodSelector } from '@/components/features/mood-selector';

export default function MoodPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Mood Mode"
        description="How are you feeling today? Pick a mood, and we'll find the perfect movies to match."
        className="text-center mb-10"
      />
      <MoodSelector />
    </div>
  );
}
