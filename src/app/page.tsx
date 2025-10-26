'use client';

import { MovieCard } from '@/components/movie-card';
import type { Movie } from '@/lib/types';

const categories = [
  {
    title: 'Trending',
    movies: [
      { title: 'Fighter', year: 2024, description: 'Top IAF aviators assemble for a perilous mission.', imdbRating: 7.2, platform: 'Netflix' },
      { title: 'Animal', year: 2023, description: 'A son\'s tumultuous relationship with his father spirals into a bloody gang war.', imdbRating: 6.8, platform: 'Netflix' },
      { title: 'Jawan', year: 2023, description: 'A man is driven by a personal vendetta to rectify the wrongs in society.', imdbRating: 7.8, platform: 'Netflix' },
      { title: 'Pathaan', year: 2023, description: 'An Indian agent races against a doomsday clock to stop a ruthless mercenary with a bitter past.', imdbRating: 6.8, platform: 'Prime Video' },
      { title: 'Rocky Aur Rani Kii Prem Kahaani', year: 2023, description: 'A flamboyant Punjabi and a witty Bengali fall in love despite their differences.', imdbRating: 6.9, platform: 'Prime Video' },
    ],
  },
  {
    title: 'Bollywood Blockbusters',
    movies: [
      { title: '3 Idiots', year: 2009, description: 'Two friends searching for their long lost companion recall their college days and the memories of their friend who inspired them to think differently.', imdbRating: 8.4, platform: 'Prime Video' },
      { title: 'Dangal', year: 2016, description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games.', imdbRating: 8.4, platform: 'Netflix' },
      { title: 'Lagaan', year: 2001, description: 'The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.', imdbRating: 8.1, platform: 'Netflix' },
      { title: 'Sholay', year: 1975, description: 'After his family is murdered by a notorious and ruthless bandit, a former police officer enlists the services of two outlaws to capture him.', imdbRating: 8.2, platform: 'Prime Video' },
      { title: 'Dilwale Dulhania Le Jayenge', year: 1995, description: 'When Raj and Simran first met on an inter-rail holiday in Europe, it wasn\'t exactly Love at first sight but when Simran is taken to India for an arranged marriage, things change.', imdbRating: 8.1, platform: 'Prime Video' },
    ],
  },
  {
    title: 'Sports',
    movies: [
        { title: '83', year: 2021, description: 'The story of India\'s incredible cricket World Cup victory in 1983.', imdbRating: 7.4, platform: 'Netflix' },
        { title: 'Bhaag Milkha Bhaag', year: 2013, description: 'The true story of the "Flying Sikh" - world champion runner and Olympian Milkha Singh.', imdbRating: 8.2, platform: 'Disney+' },
        { title: 'Chak De! India', year: 2007, description: 'A disgraced hockey player coaches the Indian women\'s national hockey team to victory.', imdbRating: 8.2, platform: 'Prime Video' },
        { title: 'Mary Kom', year: 2014, description: 'A chronicle of the life of Indian boxer Mary Kom, who went through several hardships before audaciously accomplishing her ultimate dream.', imdbRating: 6.8, platform: 'Netflix' },
        { title: 'M.S. Dhoni: The Untold Story', year: 2016, description: 'The untold story of Mahendra Singh Dhoni\'s journey from ticket collector to trophy collector - the world-cup-winning captain of the Indian Cricket Team.', imdbRating: 7.9, platform: 'Disney+' },
    ],
  },
  {
    title: 'Drama',
    movies: [
      { title: 'Gangs of Wasseypur', year: 2012, description: 'A clash between Sultan and Shahid Khan leads to the expulsion of Khan from Wasseypur, and a bloody blending of revenge, politics and power.', imdbRating: 8.2, platform: 'Netflix' },
      { title: 'Queen', year: 2013, description: 'A Delhi girl from a traditional family sets out on a solo honeymoon after her marriage gets canceled.', imdbRating: 8.2, platform: 'Netflix' },
      { title: 'Barfi!', year: 2012, description: 'Three young people learn that love can neither be defined nor contained by society\'s definition of normal and abnormal.', imdbRating: 8.1, platform: 'Netflix' },
      { title: 'My Name Is Khan', year: 2010, description: 'An Indian Muslim man with Asperger\'s syndrome takes a challenge to speak to the President of the United States, and embarks on a cross-country journey.', imdbRating: 8.0, platform: 'Prime Video' },
      { title: 'Taare Zameen Par', year: 2007, description: 'An eight-year-old boy is thought to be a lazy trouble-maker, until the new art teacher has the patience and compassion to discover the real problem behind his struggles in school.', imdbRating: 8.4, platform: 'Netflix' },
    ],
  },
  {
    title: 'Web Series',
    movies: [
      { title: 'Mirzapur', year: 2018, description: 'A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.', imdbRating: 8.5, platform: 'Prime Video' },
      { title: 'Sacred Games', year: 2018, description: 'A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs the officer on a quest to save Mumbai from cataclysm.', imdbRating: 8.6, platform: 'Netflix' },
      { title: 'The Family Man', year: 2019, description: 'A working man from the National Investigation Agency tries to protect the nation from terrorism, but he also has to protect his family from the impact of his secretive, high-pressure job.', imdbRating: 8.7, platform: 'Prime Video' },
      { title: 'Panchayat', year: 2020, description: 'A comedy-drama, which captures the journey of an engineering graduate Abhishek, who for lack of a better job option joins as secretary of a Panchayat office in a remote village of Uttar Pradesh.', imdbRating: 8.9, platform: 'Prime Video' },
      { title: 'Scam 1992: The Harshad Mehta Story', year: 2020, description: 'Set in 1980s and 90s Bombay, it follows the life of Harshad Mehta, a stockbroker who took the stock market to dizzying heights and his catastrophic downfall.', imdbRating: 9.3, platform: 'SonyLIV' },
    ],
  },
  {
    title: 'TV Shows',
    movies: [
      { title: 'Kaun Banega Crorepati', year: 2000, description: 'Indian version of the popular quiz show, "Who Wants to be a Millionaire?"', imdbRating: 7.2, platform: 'SonyLIV' },
      { title: 'Bigg Boss', year: 2006, description: 'Indian reality television game show based on the Dutch reality show Big Brother.', imdbRating: 5.1, platform: 'JioCinema' },
      { title: 'The Kapil Sharma Show', year: 2016, description: 'A comedy and celebrity talk show hosted by Kapil Sharma.', imdbRating: 7.9, platform: 'Netflix' },
      { title: 'Crime Patrol', year: 2003, description: 'A Hindi-language crime anthology series that presents dramatized versions of crime cases that occurred in India.', imdbRating: 7.7, platform: 'SonyLIV' },
      { title: 'CID', year: 1998, description: 'An Indian police procedural television series about the Criminal Investigation Department.', imdbRating: 8.1, platform: 'SonyLIV' },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {categories.map((category) => (
        <section key={category.title}>
          <h2 className="text-2xl font-bold font-headline mb-4 text-primary">{category.title}</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
            {category.movies.map((movie: Movie) => (
              <div key={movie.title} className="w-48 flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
