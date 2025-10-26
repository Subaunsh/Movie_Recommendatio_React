'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest movies based on the user's mood.
 *
 * - suggestMoviesByMood - A function that takes a mood as input and returns a list of movie recommendations.
 * - SuggestMoviesByMoodInput - The input type for the suggestMoviesByMood function.
 * - SuggestMoviesByMoodOutput - The output type for the suggestMoviesByMood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMoviesByMoodInputSchema = z.object({
  mood: z
    .string()
    .describe("The user's current mood (e.g., 'nostalgic', 'thrilling', 'funny', 'emotional')."),
  genre: z.string().optional().describe('Optional: The genre to filter the watchlist by (e.g., comedy, action, drama).'),
});
export type SuggestMoviesByMoodInput = z.infer<typeof SuggestMoviesByMoodInputSchema>;

const SuggestMoviesByMoodOutputSchema = z.object({
  movies: z
    .array(
      z.object({
        title: z.string().describe('The title of the movie.'),
        year: z.number().describe('The release year of the movie.'),
        imdbRating: z.number().optional().describe('The IMDb rating of the movie.'),
        streamingPlatform: z.string().optional().describe('The streaming platform where the movie is available.'),
        description: z.string().describe('A short description of the movie.'),
      })
    )
    .describe('A list of movie recommendations that match the user provided mood.'),
});
export type SuggestMoviesByMoodOutput = z.infer<typeof SuggestMoviesByMoodOutputSchema>;

export async function suggestMoviesByMood(input: SuggestMoviesByMoodInput): Promise<SuggestMoviesByMoodOutput> {
  return suggestMoviesByMoodFlow(input);
}

const suggestMoviesByMoodPrompt = ai.definePrompt({
  name: 'suggestMoviesByMoodPrompt',
  input: {schema: SuggestMoviesByMoodInputSchema},
  output: {schema: SuggestMoviesByMoodOutputSchema},
  prompt: `You are CineMatch, an AI movie recommendation expert. A user is feeling {{{mood}}}.
  {{#if genre}}
  The genre should be: {{{genre}}}
  {{/if}}

  Suggest a list of movies that match the mood and genre. Provide the title, year, a short description, and optionally the IMDB rating and where it can be streamed.
  
  Format your response as a JSON object with a "movies" array. Each movie object in the array should include: title, year, description, and optionally imdbRating and streamingPlatform.
  Ensure that the year is a number.
  `,
});

const suggestMoviesByMoodFlow = ai.defineFlow(
  {
    name: 'suggestMoviesByMoodFlow',
    inputSchema: SuggestMoviesByMoodInputSchema,
    outputSchema: SuggestMoviesByMoodOutputSchema,
  },
  async input => {
    const {output} = await suggestMoviesByMoodPrompt(input);
    return output!;
  }
);
