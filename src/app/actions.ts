'use server';

import { generateMovieRecommendations } from '@/ai/flows/generate-movie-recommendations';
import { suggestMoviesByMood } from '@/ai/flows/suggest-movies-by-mood';
import { discoverHiddenGems } from '@/ai/flows/discover-hidden-gems';
import { createAIWatchlist } from '@/ai/flows/create-ai-watchlists';

export async function getRecommendationsAction(formData: FormData) {
  try {
    const tasteProfile = `
      Favorite Movies: ${formData.get('favoriteMovies')}
      Favorite Genres: ${formData.get('favoriteGenres')}
      Favorite Directors: ${formData.get('favoriteDirectors')}
      Favorite Actors: ${formData.get('favoriteActors')}
    `;

    const mood = formData.get('mood') as string | undefined;
    const platform = formData.get('platform') as string | undefined;
    
    const recommendations = await generateMovieRecommendations({
      tasteProfile,
      mood: mood === 'any' ? undefined : mood,
      platform: platform === 'any' ? undefined : platform,
      count: 6,
    });

    return { success: true, data: recommendations };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get recommendations. Please try again.' };
  }
}

export async function getMoodMoviesAction(mood: string) {
    try {
        const result = await suggestMoviesByMood({ mood });
        return { success: true, data: result.movies };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to get movies for this mood. Please try again.' };
    }
}

export async function getHiddenGemsAction(formData: FormData) {
    try {
        const favoriteMovies = formData.get('favoriteMovies') as string;
        const favoriteGenres = formData.get('favoriteGenres') as string;
        const favoriteDirectors = formData.get('favoriteDirectors') as string;
        const favoriteActors = formData.get('favoriteActors') as string;

        const result = await discoverHiddenGems({
            favoriteMovies,
            favoriteGenres,
            favoriteDirectors,
            favoriteActors,
        });

        return { success: true, data: result.recommendations };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to discover hidden gems. Please try again.' };
    }
}

export async function getAiWatchlistAction(formData: FormData) {
    try {
        const mood = formData.get('mood') as string;
        const genre = formData.get('genre') as string | undefined;
        const streamingPlatform = formData.get('streamingPlatform') as string | undefined;

        const result = await createAIWatchlist({
            mood,
            genre: genre === 'any' ? undefined : genre,
            streamingPlatform: streamingPlatform === 'any' ? undefined : streamingPlatform,
        });

        return { success: true, data: result.watchlist };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to generate AI watchlist. Please try again.' };
    }
}
