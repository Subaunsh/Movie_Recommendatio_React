'use server';

/**
 * @fileOverview A movie recommendation AI agent that suggests movies based on a given mood.
 *
 * - getMoviesByMood - A function that handles the movie recommendation process based on mood.
 * - GetMoviesByMoodInput - The input type for the getMoviesByMood function.
 * - GetMoviesByMoodOutput - The return type for the getMoviesByMood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetMoviesByMoodInputSchema = z.object({
  mood: z.string().describe('The mood of the user (e.g., happy, sad, mystic, funny, emotional, thrilling).'),
});
export type GetMoviesByMoodInput = z.infer<typeof GetMoviesByMoodInputSchema>;

const GetMoviesByMoodOutputSchema = z.array(z.object({
  title: z.string().describe('The title of the movie.'),
  year: z.number().optional().describe('The release year of the movie.'),
  imdbRating: z.number().optional().describe('The IMDb rating of the movie.'),
  platform: z.string().optional().describe('The streaming platform where the movie is available.'),
  description: z.string().describe('A short summary highlighting why it matches the user’s mood.'),
}));

export type GetMoviesByMoodOutput = z.infer<typeof GetMoviesByMoodOutputSchema>;

export async function getMoviesByMood(
  input: GetMoviesByMoodInput
): Promise<GetMoviesByMoodOutput> {
  return getMoviesByMoodFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getMoviesByMoodPrompt',
  input: {schema: GetMoviesByMoodInputSchema},
  output: {schema: GetMoviesByMoodOutputSchema},
  prompt: `You are CineMatch, an intelligent movie recommendation assistant. Your primary goal is to recommend movies based on the user's mood.

  Current Mood: {{{mood}}}

  Recommend 6 movies that fit this mood. Include short, appealing descriptions and optional details like IMDb rating, release year, and where to watch.

  Output Format Example:
  [
    {
      "title": "Movie Name",
      "year": 2024,
      "imdbRating": 7.8,
      "platform": "Netflix",
      "description": "A short 2–3 line summary highlighting why it matches the user’s mood."
    }
  ]
  `,
});

const getMoviesByMoodFlow = ai.defineFlow(
  {
    name: 'getMoviesByMoodFlow',
    inputSchema: GetMoviesByMoodInputSchema,
    outputSchema: GetMoviesByMoodOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
