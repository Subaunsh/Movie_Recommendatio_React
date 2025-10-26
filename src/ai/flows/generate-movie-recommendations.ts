'use server';

/**
 * @fileOverview A movie recommendation AI agent.
 *
 * - generateMovieRecommendations - A function that handles the movie recommendation process.
 * - GenerateMovieRecommendationsInput - The input type for the generateMovieRecommendations function.
 * - GenerateMovieRecommendationsOutput - The return type for the generateMovieRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMovieRecommendationsInputSchema = z.object({
  tasteProfile: z
    .string()
    .describe(
      'A description of the users taste profile including favorite movies, genres, directors, actors, language, mood, and platform.'
    ),
  mood: z.string().optional().describe('The mood of the user.'),
  platform: z.string().optional().describe('The preferred streaming platform.'),
  count: z.number().optional().default(3).describe('The number of movies to recommend.'),
});
export type GenerateMovieRecommendationsInput = z.infer<
  typeof GenerateMovieRecommendationsInputSchema
>;

const GenerateMovieRecommendationsOutputSchema = z.array(z.object({
  title: z.string().describe('The title of the movie.'),
  year: z.number().optional().describe('The release year of the movie.'),
  imdbRating: z.number().optional().describe('The IMDb rating of the movie.'),
  platform: z.string().optional().describe('The streaming platform where the movie is available.'),
  description: z.string().describe('A short summary highlighting why it matches the user’s preference.'),
}));

export type GenerateMovieRecommendationsOutput = z.infer<
  typeof GenerateMovieRecommendationsOutputSchema
>;

export async function generateMovieRecommendations(
  input: GenerateMovieRecommendationsInput
): Promise<GenerateMovieRecommendationsOutput> {
  return generateMovieRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMovieRecommendationsPrompt',
  input: {schema: GenerateMovieRecommendationsInputSchema},
  output: {schema: GenerateMovieRecommendationsOutputSchema},
  prompt: `You are CineMatch, an intelligent movie recommendation assistant designed to suggest movies tailored perfectly to each user’s preferences.

  Taste Profile: {{{tasteProfile}}}

  {{#if mood}}Mood: {{{mood}}}{{/if}}
  {{#if platform}}Platform: {{{platform}}}{{/if}}

  Recommend {{{count}}} movies with short, appealing descriptions and optional details like IMDb rating, release year, and where to watch.

  Output Format Example:
  [
    {
      "title": "Movie Name",
      "year": 2024,
      "imdbRating": 7.8,
      "platform": "Netflix",
      "description": "A short 2–3 line summary highlighting why it matches the user’s preference."
    }
  ]
  `,
});

const generateMovieRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateMovieRecommendationsFlow',
    inputSchema: GenerateMovieRecommendationsInputSchema,
    outputSchema: GenerateMovieRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
