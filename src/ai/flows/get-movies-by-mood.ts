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

// Helper for Handlebars to check for equality
ai.handlebars.registerHelper('ifEquals', function (this: any, arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

const prompt = ai.definePrompt({
  name: 'getMoviesByMoodPrompt',
  input: {schema: GetMoviesByMoodInputSchema},
  output: {schema: GetMoviesByMoodOutputSchema},
  prompt: `You are CineMatch, an intelligent movie recommendation assistant. Your primary goal is to recommend movies based on the user's mood.

  Current Mood: {{{mood}}}

  {{#ifEquals mood "Thrilling"}}
  Return the following JSON list of movies exactly as specified. Do not generate new ones.
  [
    {
        "title": "Tehran",
        "year": 2020,
        "imdbRating": 7.9,
        "platform": "Apple TV+",
        "description": "A Mossad agent goes deep undercover on a dangerous mission in Tehran that places her and everyone around her in dire jeopardy.",
        "imageUrl": "https://picsum.photos/seed/tehran/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=n_L-rfS_I_4"
    },
    {
        "title": "Fighter",
        "year": 2024,
        "imdbRating": 7.2,
        "platform": "Netflix",
        "description": "Top IAF aviators assemble for a perilous mission to protect the nation from an imminent threat.",
        "imageUrl": "https://picsum.photos/seed/fighter/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=6amIq_mP4xM"
    },
    {
        "title": "Drishyam",
        "year": 2015,
        "imdbRating": 8.2,
        "platform": "Disney+",
        "description": "Desperate measures are taken by a man who tries to save his family from the dark side of the law, after they commit an unexpected crime.",
        "imageUrl": "https://picsum.photos/seed/drishyam/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=AuuX2j14NBg"
    },
    {
        "title": "Ugly",
        "year": 2013,
        "imdbRating": 8.0,
        "platform": "Prime Video",
        "description": "The case of a missing girl takes a dark turn as the investigation reveals a web of secrets and corruption among the dysfunctional people in her life.",
        "imageUrl": "https://picsum.photos/seed/ugly/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=4ougQY2-zpk"
    },
    {
        "title": "Ravanasura",
        "year": 2023,
        "imdbRating": 6.3,
        "platform": "Prime Video",
        "description": "A junior lawyer known for his clever tactics gets entangled in a complex criminal case where nothing is as it seems.",
        "imageUrl": "https://picsum.photos/seed/ravanasura/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=3dGj9L3n2bY"
    },
    {
        "title": "Rahasya",
        "year": 2015,
        "imdbRating": 7.6,
        "platform": "JioCinema",
        "description": "When a young girl is murdered in her own home, a CBI officer must navigate a maze of lies and hidden motives to find the real killer.",
        "imageUrl": "https://picsum.photos/seed/rahasya/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=5-Q1SgYcYrQ"
    },
    {
        "title": "Hacked",
        "year": 2020,
        "imdbRating": 3.2,
        "platform": "Zee5",
        "description": "A young woman's life turns into a living nightmare when she is stalked by a teenage hacker who takes control of her digital life.",
        "imageUrl": "https://picsum.photos/seed/hacked/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=cpx_i8aPoxA"
    },
    {
        "title": "RAW (Romeo Akbar Walter)",
        "year": 2019,
        "imdbRating": 6.5,
        "platform": "Netflix",
        "description": "A bank employee is recruited by India's intelligence agency for an undercover operation in Pakistan during the 1971 war.",
        "imageUrl": "https://picsum.photos/seed/raw/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=HSHzY2M-T3I"
    },
    {
        "title": "Special 26",
        "year": 2013,
        "imdbRating": 8.0,
        "platform": "Netflix",
        "description": "A team of con artists pose as CBI officers to conduct bogus raids on corrupt politicians and businessmen.",
        "imageUrl": "https://picsum.photos/seed/special26/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=Piy6FxlbVtA"
    },
    {
        "title": "Silence... Can You Hear It?",
        "year": 2021,
        "imdbRating": 6.7,
        "platform": "Zee5",
        "description": "A team of special crime officers investigate the mysterious murder of a high-profile victim, where every witness seems to be hiding something.",
        "imageUrl": "https://picsum.photos/seed/silence/200/300",
        "trailerUrl": "https://www.youtube.com/watch?v=o8vW38L8aFw"
    },
    {
      "title": "Kahaani",
      "year": 2012,
      "imdbRating": 8.1,
      "platform": "JioCinema",
      "description": "A pregnant woman's search for her missing husband in Kolkata takes a mysterious turn as she delves deeper into the city's dark secrets.",
      "imageUrl": "https://picsum.photos/seed/kahaani/200/300",
      "trailerUrl": "https://www.youtube.com/watch?v=j1wE-Da_O-g"
    },
    {
      "title": "Talvar",
      "year": 2015,
      "imdbRating": 8.1,
      "platform": "Netflix",
      "description": "An experienced investigator confronts several conflicting theories about the perpetrators of a violent double homicide.",
      "imageUrl": "https://picsum.photos/seed/talvar/200/300",
      "trailerUrl": "https://www.youtube.com/watch?v=aQ2sI-3hG6s"
    }
  ]
  {{else}}
  Recommend 6 movies that fit this mood. Include short, appealing descriptions and optional details like IMDb rating, release year, and where to watch.
  {{/ifEquals}}

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
    const {output} = await prompt(input);
    return output!;
  }
);
