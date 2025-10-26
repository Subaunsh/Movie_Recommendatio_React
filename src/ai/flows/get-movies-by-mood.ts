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
  imageUrl: z.string().optional().describe('URL for the movie poster image.'),
  trailerUrl: z.string().optional().describe('URL for the movie trailer.'),
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

  Format your response as a JSON array of movie objects:
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
    if (input.mood.toLowerCase() === 'emotional') {
      return [
        {
          title: 'Sanam Teri Kasam',
          year: 2016,
          imdbRating: 7.9,
          platform: 'JioCinema',
          description: 'A musical romantic tragedy about a librarian who is disowned by her family and falls for her brooding neighbor.',
          imageUrl: 'https://picsum.photos/seed/sanamterikasam/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=1u6a-f-zK7A',
        },
        {
          title: 'Dil To Pagal Hai',
          year: 1997,
          imdbRating: 7.0,
          platform: 'Prime Video',
          description: 'A classic musical love triangle between a director, his leading lady, and his best friend.',
          imageUrl: 'https://picsum.photos/seed/dil-to-pagal-hai/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=pP5e-d2I-pg',
        },
        {
          title: 'Ek Deewana Tha',
          year: 2012,
          imdbRating: 5.7,
          platform: 'JioCinema',
          description: 'An aspiring filmmaker falls in love with a woman from a conservative Christian family, leading to a passionate but tumultuous romance.',
          imageUrl: 'https://picsum.photos/seed/ekdeewanatha/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=b4l3sZ2WkL4'
        },
        {
          title: 'Om Shanti Om',
          year: 2007,
          imdbRating: 6.7,
          platform: 'Netflix',
          description: 'A junior artist from the 1970s is reincarnated into the 2000s to avenge his own death and reunite with his love.',
          imageUrl: 'https://picsum.photos/seed/omshantiom/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=v05013QhX-M'
        },
        {
            title: 'Saiyaara (from Ek Tha Tiger)',
            year: 2012,
            imdbRating: 5.6,
            platform: 'Prime Video',
            description: "While not a movie, 'Saiyaara' is an emotional song from 'Ek Tha Tiger' about longing and love. The film is about an Indian spy who falls for a Pakistani agent during a mission.",
            imageUrl: 'https://picsum.photos/seed/saiyaara/200/300',
            trailerUrl: 'https://www.youtube.com/watch?v=pES-4V6jL4s',
        }
      ];
    }
    const {output} = await prompt(input);
    return output!;
  }
);
