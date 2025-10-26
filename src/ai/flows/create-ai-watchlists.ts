'use server';
/**
 * @fileOverview Generates smart watchlists based on a selected mood.
 *
 * - createAIWatchlist - A function that generates an AI movie watchlist based on a user-provided mood.
 * - CreateAIWatchlistInput - The input type for the createAIWatchlist function.
 * - CreateAIWatchlistOutput - The return type for the createAIWatchlist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateAIWatchlistInputSchema = z.object({
  mood: z.string().describe('The mood for which to generate a watchlist (e.g., happy, sad, thrilling).'),
  genre: z.string().optional().describe('Optional: The genre to filter the watchlist by (e.g., comedy, action, drama).'),
  streamingPlatform: z.string().optional().describe('Optional: The streaming platform to filter the watchlist by (e.g., Netflix, Prime, Disney+).'),
});

export type CreateAIWatchlistInput = z.infer<typeof CreateAIWatchlistInputSchema>;

const CreateAIWatchlistOutputSchema = z.object({
  watchlist: z.array(
    z.object({
      title: z.string().describe('The title of the movie.'),
      year: z.number().describe('The year the movie was released.'),
      imdbRating: z.number().optional().describe('The IMDb rating of the movie, if available.'),
      streamingAvailability: z.string().optional().describe('Where the movie is available for streaming, if available.'),
      description: z.string().describe('A short description of the movie.'),
    })
  ).describe('A list of movies that match the given mood, genre and platform.'),
});

export type CreateAIWatchlistOutput = z.infer<typeof CreateAIWatchlistOutputSchema>;

export async function createAIWatchlist(input: CreateAIWatchlistInput): Promise<CreateAIWatchlistOutput> {
  return createAIWatchlistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createAIWatchlistPrompt',
  input: {schema: CreateAIWatchlistInputSchema},
  output: {schema: CreateAIWatchlistOutputSchema},
  prompt: `You are an AI movie expert. Your task is to create a movie watchlist based on the user's mood and optional filters.

  The mood is: {{{mood}}}
  {{#if genre}}
  The genre should be: {{{genre}}}
  {{/if}}
  {{#if streamingPlatform}}
  The movies should be available on: {{{streamingPlatform}}}
  {{/if}}

  Create a watchlist of movies that fit the criteria. Each movie entry must include the title, year, a short description, and optionally the IMDb rating and streaming availability.

  Format your response as a JSON array of movie objects:
  {
    "watchlist": [
      {
        "title": "Movie Title",
        "year": 2023,
        "imdbRating": 7.5,
        "streamingAvailability": "Netflix",
        "description": "A thrilling movie about..."
      },
      ...
    ]
  }
  Make sure that year is represented as number.
`,
});

const createAIWatchlistFlow = ai.defineFlow(
  {
    name: 'createAIWatchlistFlow',
    inputSchema: CreateAIWatchlistInputSchema,
    outputSchema: CreateAIWatchlistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
