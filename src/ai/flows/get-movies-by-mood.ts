'use server';

/**
 * @fileOverview A movie recommendation AI agent that suggests movies based on a given mood.
 *
 * - getMoviesByMood - A function that handles the movie recommendation process based on mood.
 * - GetMoviesByMoodInput - The input type for the getMoviesByMood function.
 * - GetMoviesByMoodOutput - The return type for the getMoviesByyMood function.
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
        },
        {
          title: 'Ae Dil Hai Mushkil',
          year: 2016,
          imdbRating: 5.8,
          platform: 'Netflix',
          description: 'A story about unrequited love, heartbreak, and the journey of two characters, Ayan and Alizeh.',
          imageUrl: 'https://picsum.photos/seed/aedilhaimushkil/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=Z_POD748vyQ',
        },
        {
          title: 'Jab Tak Hai Jaan',
          year: 2012,
          imdbRating: 6.7,
          platform: 'Prime Video',
          description: 'A bomb disposal expert in the Indian Army defies death with a reckless attitude until he meets a vibrant young woman.',
          imageUrl: 'https://picsum.photos/seed/jabtakhaijaan/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=v0vy6s-pLpY',
        },
        {
          title: 'Raanjhanaa',
          year: 2013,
          imdbRating: 7.6,
          platform: 'JioCinema',
          description: 'A one-sided love story of a Hindu boy for a Muslim girl that spans over a decade, set against the backdrop of political turmoil.',
          imageUrl: 'https://picsum.photos/seed/raanjhanaa/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=OSgH6b2t3o8',
        },
        {
          title: 'Saathiya',
          year: 2002,
          imdbRating: 6.9,
          platform: 'Prime Video',
          description: 'A young couple elopes and gets married, but their life takes a drastic turn when they face the realities of marriage and an accident.',
          imageUrl: 'https://picsum.photos/seed/saathiya/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=J7_1AZdCFdc',
        },
        {
          title: 'Fitoor',
          year: 2016,
          imdbRating: 5.4,
          platform: 'Netflix',
          description: 'An adaptation of Charles Dickens\' "Great Expectations," this is a passionate love story between a poor Kashmiri boy and a wealthy girl.',
          imageUrl: 'https://picsum.photos/seed/fitoor/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=2D53Ue4p3w4',
        }
      ];
    } else if (input.mood.toLowerCase() === 'thrilling') {
      return [
        {
          title: 'Ugly',
          year: 2013,
          imdbRating: 8.0,
          platform: 'Prime Video',
          description: 'A struggling actor\'s daughter goes missing, and the subsequent investigation unveils a web of corruption, greed, and broken relationships.',
          imageUrl: 'https://picsum.photos/seed/ugly/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=4-p4g96kX-E'
        },
        {
          title: 'Ravanasura',
          year: 2023,
          imdbRating: 6.3,
          platform: 'Zee5',
          description: 'A junior lawyer known for his cunning nature takes on a high-profile case that reveals a sinister plot and a series of murders.',
          imageUrl: 'https://picsum.photos/seed/ravanasura/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=GbJy_8tL3x0'
        },
        {
          title: 'Hacked',
          year: 2020,
          imdbRating: 3.2,
          platform: 'Zee5',
          description: 'A young woman\'s life turns into a nightmare when an obsessed hacker begins to control her life through her digital devices.',
          imageUrl: 'https://picsum.photos/seed/hacked/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=Nn1_pLgP3sU'
        },
        {
          title: 'Raw',
          year: 2016,
          imdbRating: 7.0,
          platform: 'Netflix',
          description: 'A young vegetarian undergoes a carnivorous hazing ritual at vet school and develops an unbidden and insatiable craving for meat.',
          imageUrl: 'https://picsum.photos/seed/raw-movie/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=gFlXVX2af_0'
        },
        {
          title: 'Fighter',
          year: 2024,
          imdbRating: 7.2,
          platform: 'Netflix',
          description: 'Top IAF aviators come together in the face of imminent danger, to form Air Dragons. Fighter unfolds their camaraderie, brotherhood and battles, internal and external.',
          imageUrl: 'https://picsum.photos/seed/fighter-thrill/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=6amIq_mP4xM'
        },
        {
          title: 'Drishyam',
          year: 2015,
          imdbRating: 8.2,
          platform: 'Disney+',
          description: 'Desperate measures are taken by a man who tries to save his family from the dark side of the law, after they commit an unexpected crime.',
          imageUrl: 'https://picsum.photos/seed/drishyam-thrill/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=AuuX2j14NBg'
        },
        {
          title: 'A Wednesday',
          year: 2008,
          imdbRating: 8.1,
          platform: 'Netflix',
          description: 'A retiring police commissioner recounts the most memorable case of his career wherein he was informed about a bomb scare in Mumbai.',
          imageUrl: 'https://picsum.photos/seed/awednesday-thrill/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=f3yS1d34i20'
        },
        {
          title: 'Rahasya',
          year: 2015,
          imdbRating: 7.6,
          platform: 'Zee5',
          description: 'When a young girl is murdered in her own house, her father is the prime suspect. A CBI officer must unravel the mystery.',
          imageUrl: 'https://picsum.photos/seed/rahasya-thrill/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=5-Q2G_62p-4'
        },
        {
          title: 'Special 26',
          year: 2013,
          imdbRating: 8.0,
          platform: 'Netflix',
          description: 'A team of con artists pose as CBI officers and conduct bogus raids on corrupt officials and businessmen.',
          imageUrl: 'https://picsum.photos/seed/special26-thrill/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=Piy6F1F3J5s'
        },
        {
          title: 'Silence... Can You Hear It?',
          year: 2021,
          imdbRating: 6.7,
          platform: 'Zee5',
          description: 'When a high-profile judge\'s daughter is found dead, a special team of detectives is assigned to uncover the truth.',
          imageUrl: 'https://picsum.photos/seed/silence-thrill/200/300',
          trailerUrl: 'https://www.youtube.com/watch?v=7h_43y-p_eE'
        },
        {
            title: 'Kahaani',
            year: 2012,
            imdbRating: 8.1,
            platform: 'JioCinema',
            description: 'A pregnant woman travels to Kolkata from London to search for her missing husband.',
            imageUrl: 'https://picsum.photos/seed/kahaani-thrill/200/300',
            trailerUrl: 'https://www.youtube.com/watch?v=rsjamo0GPwo'
        },
        {
            title: 'Talvar',
            year: 2015,
            imdbRating: 8.1,
            platform: 'Netflix',
            description: 'An experienced investigator confronts several conflicting theories about the perpetrators of a violent double homicide.',
            imageUrl: 'https://picsum.photos/seed/talvar-thrill/200/300',
            trailerUrl: 'https://www.youtube.com/watch?v=aQ2sI-3hG6s'
        },
        {
            title: 'Talaash',
            year: 2012,
            imdbRating: 7.2,
            platform: 'Netflix',
            description: 'A police officer\'s investigation into a high-profile car accident case leads him to a mysterious woman and a dark secret.',
            imageUrl: 'https://picsum.photos/seed/talaash-thrill/200/300',
            trailerUrl: 'https://www.youtube.com/watch?v=m-p_n2i3o1Y'
        },
        {
            title: 'Ittefaq',
            year: 2017,
            imdbRating: 7.2,
            platform: 'Netflix',
            description: 'A detective seeks the truth between two different stories of a crime scene.',
            imageUrl: 'https://picsum.photos/seed/ittefaq-thrill/200/300',
            trailerUrl: 'https://www.youtube.com/watch?v=I-hD1_SjX9o'
        },
        {
            title: 'Badla',
            year: 2019,
            imdbRating: 7.8,
            platform: 'Netflix',
            description: 'A young entrepreneur hires a prestigious lawyer to defend her in a murder case.',
            imageUrl: 'https://picsum.photos/seed/badla-thrill/200/300',
            trailerUrl: 'https://www.youtube.com/watch?v=mYRdptA8D7A'
        }
      ]
    }
    const {output} = await prompt(input);
    return output!;
  }
);
