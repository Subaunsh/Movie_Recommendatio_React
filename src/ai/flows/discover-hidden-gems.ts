'use server';

/**
 * @fileOverview AI flow for recommending hidden gem or international movies based on user taste profile.
 *
 * - discoverHiddenGems - A function that recommends movies based on user taste for hidden gems and international films.
 * - DiscoverHiddenGemsInput - The input type for the discoverHiddenGems function.
 * - DiscoverHiddenGemsOutput - The return type for the discoverHiddenGems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiscoverHiddenGemsInputSchema = z.object({
  favoriteMovies: z
    .string()
    .describe('A comma-separated list of the user\'s favorite movies.'),
  favoriteGenres: z
    .string()
    .describe('A comma-separated list of the user\'s favorite genres.'),
  favoriteDirectors: z
    .string()
    .describe('A comma-separated list of the user\'s favorite directors.'),
  favoriteActors: z
    .string()
    .describe('A comma-separated list of the user\'s favorite actors.'),
});
export type DiscoverHiddenGemsInput = z.infer<typeof DiscoverHiddenGemsInputSchema>;

const DiscoverHiddenGemsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string().describe('The title of the recommended movie.'),
      year: z.number().describe('The release year of the movie.'),
      imdbRating: z.number().optional().describe('The IMDb rating of the movie.'),
      streamingPlatform: z.string().optional().describe('The streaming platform where the movie is available.'),
      description: z.string().describe('A short summary of the movie and why it might appeal to the user.'),
    })
  ).describe('A list of movie recommendations based on user preferences for hidden gems and international films.'),
});
export type DiscoverHiddenGemsOutput = z.infer<typeof DiscoverHiddenGemsOutputSchema>;

export async function discoverHiddenGems(input: DiscoverHiddenGemsInput): Promise<DiscoverHiddenGemsOutput> {
  return discoverHiddenGemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'discoverHiddenGemsPrompt',
  input: {schema: DiscoverHiddenGemsInputSchema},
  output: {schema: DiscoverHiddenGemsOutputSchema},
  prompt: `You are an expert movie recommender, specializing in hidden gems and international films. A user will provide their taste profile. You should recommend movies that are not mainstream and may be from outside the United States.

Taste Profile:
Favorite Movies: {{{favoriteMovies}}}
Favorite Genres: {{{favoriteGenres}}}
Favorite Directors: {{{favoriteDirectors}}}
Favorite Actors: {{{favoriteActors}}}

Based on the user's taste profile, recommend some hidden gem or international movies. Include a title, year, short description, and streaming platform, if available.

Format:
[
  {
    "title": "Movie Title",
    "year": Year,
    "imdbRating": Rating (optional),
    "streamingPlatform": "Platform" (optional),
    "description": "Short description highlighting why it matches the user's preference"
  },
  ...
]
`,
});

const discoverHiddenGemsFlow = ai.defineFlow(
  {
    name: 'discoverHiddenGemsFlow',
    inputSchema: DiscoverHiddenGemsInputSchema,
    outputSchema: DiscoverHiddenGemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
