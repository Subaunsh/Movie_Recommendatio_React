'use client';

import { MovieCard } from '@/components/movie-card';
import type { Movie } from '@/lib/types';

const categories = [
  {
    title: 'Trending',
    movies: [
      { title: 'Cybernetic City', year: 2024, description: 'In a neon-lit metropolis, a detective hunts a rogue AI.', imdbRating: 8.5, platform: 'Netflix' },
      { title: 'The Last Kingdom', year: 2023, description: 'A historical epic of war and honor.', imdbRating: 8.9, platform: 'Prime Video' },
      { title: 'Echoes of Tomorrow', year: 2024, description: 'A sci-fi thriller about time loops and destiny.', imdbRating: 8.2, platform: 'Hulu' },
      { title: 'Galaxy Runners', year: 2023, description: 'A space opera adventure.', imdbRating: 7.9, platform: 'Disney+' },
      { title: 'The Silent Witness', year: 2024, description: 'A crime drama with a shocking twist.', imdbRating: 8.6, platform: 'Max' },
    ],
  },
  {
    title: 'Movies',
    movies: [
      { title: 'Inception', year: 2010, description: 'A thief who steals corporate secrets through use of dream-sharing technology.', imdbRating: 8.8, platform: 'Netflix' },
      { title: 'Parasite', year: 2019, description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', imdbRating: 8.5, platform: 'Hulu' },
      { title: 'The Grand Budapest Hotel', year: 2014, description: 'The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars.', imdbRating: 8.1, platform: 'Disney+' },
      { title: 'Mad Max: Fury Road', year: 2015, description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners.', imdbRating: 8.1, platform: 'Max' },
      { title: 'Spider-Man: Into the Spider-Verse', year: 2018, description: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.', imdbRating: 8.4, platform: 'Netflix' },
    ],
  },
  {
    title: 'Sports',
    movies: [
        { title: 'Formula 1: Drive to Survive', year: 2024, description: 'Go behind the scenes of the high-stakes world of Formula 1 racing.', imdbRating: 8.6, platform: 'Netflix' },
        { title: 'The Last Dance', year: 2020, description: 'A definitive account of Michael Jordan\'s career and the 1990s Chicago Bulls.', imdbRating: 9.1, platform: 'Netflix' },
        { title: 'All or Nothing: Manchester City', year: 2018, description: 'Follow Manchester City F.C. through their record-breaking 2017-18 season.', imdbRating: 8.8, platform: 'Prime Video' },
        { title: 'Sunderland \'Til I Die', year: 2018, description: 'The passionate story of Sunderland AFC\'s fall from the Premier League.', imdbRating: 8.2, platform: 'Netflix' },
        { title: 'Cheer', year: 2020, description: 'The competitive world of college cheerleading at Navarro College.', imdbRating: 8.1, platform: 'Netflix' },
    ],
  },
  {
    title: 'Drama',
    movies: [
      { title: 'The Crown', year: 2016, description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.', imdbRating: 8.6, platform: 'Netflix' },
      { title: 'Succession', year: 2018, description: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.', imdbRating: 8.8, platform: 'Max' },
      { title: 'Chernobyl', year: 2019, description: 'In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world\'s worst man-made catastrophes.', imdbRating: 9.4, platform: 'Max' },
      { title: 'Better Call Saul', year: 2015, description: 'The trials and tribulations of criminal lawyer Jimmy McGill in the time before he established his strip-mall law office in Albuquerque, New Mexico.', imdbRating: 8.9, platform: 'Netflix' },
      { title: 'The Handmaid\'s Tale', year: 2017, description: 'Set in a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship.', imdbRating: 8.4, platform: 'Hulu' },
    ],
  },
  {
    title: 'Web Series',
    movies: [
      { title: 'Stranger Things', year: 2016, description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.', imdbRating: 8.7, platform: 'Netflix' },
      { title: 'The Boys', year: 2019, description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.', imdbRating: 8.7, platform: 'Prime Video' },
      { title: 'Fleabag', year: 2016, description: 'A dry-witted woman, known only as Fleabag, has no filter as she navigates life and love in London while trying to cope with tragedy.', imdbRating: 8.7, platform: 'Prime Video' },
      { title: 'Black Mirror', year: 2011, description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.', imdbRating: 8.8, platform: 'Netflix' },
      { title: 'The Witcher', year: 2019, description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', imdbRating: 8.2, platform: 'Netflix' },
    ],
  },
  {
    title: 'TV Shows',
    movies: [
      { title: 'Breaking Bad', year: 2008, description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.', imdbRating: 9.5, platform: 'Netflix' },
      { title: 'Game of Thrones', year: 2011, description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.', imdbRating: 9.2, platform: 'Max' },
      { title: 'The Office', year: 2005, description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.', imdbRating: 9.0, platform: 'Peacock' },
      { title: 'Friends', year: 1994, description: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.', imdbRating: 8.9, platform: 'Max' },
      { title: 'Sherlock', year: 2010, description: 'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.', imdbRating: 9.1, platform: 'BBC iPlayer' },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {categories.map((category) => (
        <section key={category.title}>
          <h2 className="text-2xl font-bold font-headline mb-4 text-primary">{category.title}</h2>
          <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4">
            {category.movies.map((movie: Movie) => (
              <div key={movie.title} className="w-64 flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
