'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Movie } from "@/lib/types";
import { Save, Share2 } from "lucide-react";

type WatchlistActionsProps = {
  watchlist: Movie[];
  title: string;
};

export function WatchlistActions({ watchlist, title }: WatchlistActionsProps) {
  const { toast } = useToast();

  const handleSave = () => {
    try {
      const savedWatchlists = JSON.parse(localStorage.getItem('cine-genie-watchlists') || '[]');
      const newWatchlist = { id: Date.now(), title, movies: watchlist };
      // For simplicity, we'll just prepend and not check for duplicates.
      localStorage.setItem('cine-genie-watchlists', JSON.stringify([newWatchlist, ...savedWatchlists]));
      toast({
        title: "Watchlist Saved!",
        description: `"${title}" has been saved to your device.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save watchlist to your device.",
      });
    }
  };

  const handleShare = () => {
    const shareText = `🎬 Cine Genie Watchlist: ${title}\n\n${watchlist
      .map(movie => `- ${movie.title} (${movie.year})`)
      .join('\n')}`;
      
    navigator.clipboard.writeText(shareText).then(() => {
      toast({
        title: "Copied to Clipboard!",
        description: "Your watchlist is ready to be shared.",
      });
    }).catch(() => {
        toast({
            variant: "destructive",
            title: "Copy Failed",
            description: "Could not copy watchlist to clipboard.",
        });
    });
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleSave}>
        <Save />
        Save
      </Button>
      <Button onClick={handleShare}>
        <Share2 />
        Share
      </Button>
    </div>
  );
}
