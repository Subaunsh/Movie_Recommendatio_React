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
      { title: 'Laapataa Ladies', year: 2024, description: 'Two young brides get swapped on a train. A search for them begins.', imdbRating: 8.5, platform: 'Netflix' },
      { title: 'Shaitaan', year: 2024, description: 'A family\'s idyllic getaway turns into a nightmare when a mysterious stranger enters their home.', imdbRating: 7.0, platform: 'Netflix' },
      { title: 'Article 370', year: 2024, description: 'A young intelligence officer is recruited for a top-secret mission to crack down on terrorism and the conflict economy.', imdbRating: 8.2, platform: 'JioCinema' },
      { title: 'Crew', year: 2024, description: 'Three hard-working women have their lives thrown into turmoil when they get involved in a smuggling ring.', imdbRating: 6.1, platform: 'Netflix' },
      { title: 'Srikanth', year: 2024, description: 'The inspiring true story of a visually impaired entrepreneur who built a multi-crore company.', imdbRating: 8.2, platform: 'Netflix' },
      { title: 'Maidaan', year: 2024, description: 'The story of Syed Abdul Rahim, the architect of the golden era of Indian football.', imdbRating: 8.0, platform: 'Prime Video' },
      { title: 'Chandu Champion', year: 2024, description: 'The real-life story of Murlikant Petkar, India\'s first Paralympic gold medalist.', imdbRating: 8.1, platform: 'In Theaters' },
      { title: 'Stree 2', year: 2024, description: 'The follow-up to the hit horror-comedy, bringing back the mystery of the female ghost.', imdbRating: 7.5, platform: 'Upcoming' },
      { title: 'Bhool Bhulaiyaa 3', year: 2024, description: 'The third installment in the popular horror-comedy franchise.', imdbRating: 7.0, platform: 'Upcoming' },
      { title: 'Singham Again', year: 2024, description: 'The next chapter in the cop universe, featuring the iconic Inspector Bajirao Singham.', imdbRating: 7.2, platform: 'Upcoming' },
      { title: 'Munjya', year: 2024, description: 'A young man\'s visit to his native village unveils a family secret and a vengeful spirit.', imdbRating: 7.5, platform: 'In Theaters' },
      { title: 'Kalki 2898 AD', year: 2024, description: 'A modern-day avatar of Vishnu, arrives on Earth to protect the world from evil forces.', imdbRating: 8.5, platform: 'Upcoming' },
      { title: 'Bad Newz', year: 2024, description: 'A comedy of errors ensues when two couples find themselves in a hilarious IVF mix-up.', imdbRating: 6.8, platform: 'Upcoming' },
      { title: 'Ishq Vishk Rebound', year: 2024, description: 'A reboot of the classic romantic comedy, exploring modern-day relationships.', imdbRating: 6.5, platform: 'In Theaters' },
      { title: 'Emergency', year: 2024, description: 'A political drama based on the life of former Prime Minister Indira Gandhi and the Indian Emergency.', imdbRating: 8.0, platform: 'Upcoming' },
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
      { title: 'Baahubali: The Beginning', year: 2015, description: 'In the kingdom of Mahishmati, a young man raised in a remote village discovers his royal heritage.', imdbRating: 8.0, platform: 'Netflix' },
      { title: 'Bajrangi Bhaijaan', year: 2015, description: 'An Indian man with a magnanimous heart takes a young mute Pakistani girl back to her homeland to reunite her with her family.', imdbRating: 8.1, platform: 'Disney+' },
      { title: 'PK', year: 2014, description: 'An alien on Earth loses the remote to his spaceship. His innocent questions and childlike curiosity force people to re-examine their beliefs.', imdbRating: 8.1, platform: 'Netflix' },
      { title: 'Gadar: Ek Prem Katha', year: 2001, description: 'A Sikh truck driver falls in love with a Muslim girl during the 1947 partition of India.', imdbRating: 7.3, platform: 'Zee5' },
      { title: 'K.G.F: Chapter 2', year: 2022, description: 'The blood-soaked land of Kolar Gold Fields has a new overlord now. Rocky, whose name strikes fear in the heart of his foes.', imdbRating: 8.3, platform: 'Prime Video' },
      { title: 'Kabhi Khushi Kabhie Gham...', year: 2001, description: 'A family drama about a wealthy family torn apart by a marriage against the patriarch\'s wishes.', imdbRating: 7.4, platform: 'Netflix' },
      { title: 'Kal Ho Naa Ho', year: 2003, description: 'A terminally ill man tries to set up his best friend with the woman he loves.', imdbRating: 7.9, platform: 'Netflix' },
      { title: 'Zindagi Na Milegi Dobara', year: 2011, description: 'Three friends on a bachelor trip in Spain learn some lessons about life and themselves.', imdbRating: 8.2, platform: 'Prime Video' },
      { title: 'Yeh Jawaani Hai Deewani', year: 2013, description: 'A coming-of-age story about two people who meet during a trekking trip and fall in love.', imdbRating: 7.2, platform: 'Netflix' },
      { title: 'Chennai Express', year: 2013, description: 'A man\'s journey from Mumbai to Rameshwaram becomes an unexpected adventure.', imdbRating: 6.1, platform: 'Netflix' },
      { title: 'Swades', year: 2004, description: 'A successful Indian scientist returns to an Indian village to take his nanny to America with him and in the process rediscovers his roots.', imdbRating: 8.2, platform: 'Netflix' },
      { title: 'Rang De Basanti', year: 2006, description: 'The story of six young Indians who assist an English woman to film a documentary on the freedom fighters from their past.', imdbRating: 8.1, platform: 'Netflix' },
      { title: 'Mughal-E-Azam', year: 1960, description: 'A 16th century prince falls in love with a court dancer and battles with his emperor father.', imdbRating: 8.1, platform: 'Prime Video' },
      { title: 'Mother India', year: 1957, description: 'In the absence of her husband, a poverty-stricken woman raises her sons through many trials and tribulations.', imdbRating: 8.0, platform: 'Prime Video' },
      { title: 'Anand', year: 1971, description: 'The story of a terminally ill man who wishes to live his life to the fullest before he passes away.', imdbRating: 8.2, platform: 'Prime Video' },
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
      { title: 'Paan Singh Tomar', year: 2012, description: 'The story of a soldier and athlete who becomes a dacoit.', imdbRating: 8.2, platform: 'Netflix' },
      { title: 'Sultan', year: 2016, description: 'A middle-aged wrestling champion tries to make a comeback to represent India at the Olympics.', imdbRating: 7.0, platform: 'Prime Video' },
      { title: 'Iqbal', year: 2005, description: 'A deaf-and-mute boy from a remote Indian village dreams of playing cricket for India.', imdbRating: 8.1, platform: 'Zee5' },
      { title: 'Soorma', year: 2018, description: 'The inspiring true story of the comeback of hockey player Sandeep Singh.', imdbRating: 7.4, platform: 'Netflix' },
      { title: 'Gold', year: 2018, description: 'The journey of a man who was instrumental in India\'s first Olympic gold medal as a free nation.', imdbRating: 7.3, platform: 'Prime Video' },
      { title: 'Saala Khadoos', year: 2016, description: 'A former boxer quits boxing but coaches a fisherwoman to fulfill his dream.', imdbRating: 7.6, platform: 'Prime Video' },
      { title: 'Jersey', year: 2022, description: 'A talented but failed cricketer decides to return to cricket in his late thirties.', imdbRating: 7.2, platform: 'Netflix' },
      { title: 'Toofaan', year: 2021, description: 'An orphan from Dongri grows up to be a local goon but his life changes when he meets Ananya.', imdbRating: 6.9, platform: 'Prime Video' },
      { title: 'Rashmi Rocket', year: 2021, description: 'A small-town girl who overcomes all societal barriers to become a national-level athlete.', imdbRating: 7.1, platform: 'Zee5' },
      { title: 'Shabaash Mithu', year: 2022, description: 'The life of Mithali Raj, the captain of the Indian women\'s cricket team.', imdbRating: 5.7, platform: 'Netflix' },
      { title: 'Jhund', year: 2022, description: 'Based on the life of Vijay Barse, a retired sports teacher who founded an NGO called Slum Soccer.', imdbRating: 7.4, platform: 'Zee5' },
      { title: 'Budhia Singh: Born to Run', year: 2016, description: 'The story of the world\'s youngest marathon runner, Budhia Singh.', imdbRating: 7.4, platform: 'Netflix' },
      { title: 'Ghoomer', year: 2023, description: 'The story of a paraplegic sportswoman, who is a cricket prodigy.', imdbRating: 7.7, platform: 'Disney+' },
      { title: 'Dangal Girls', year: 2017, description: 'A documentary on the Phogat sisters, their training and their journey to the Commonwealth Games.', imdbRating: 7.1, platform: 'Netflix' },
      { title: 'Sachin: A Billion Dreams', year: 2017, description: 'A documentary on the life of Indian cricket icon Sachin Tendulkar.', imdbRating: 8.6, platform: 'SonyLIV' },
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
      { title: 'Andhadhun', year: 2018, description: 'A series of mysterious events change the life of a blind pianist, who must report a crime that he should technically not know about.', imdbRating: 8.2, platform: 'Netflix' },
      { title: 'Pink', year: 2016, description: 'When three young women are implicated in a crime, a retired lawyer steps forward to help them clear their names.', imdbRating: 8.1, platform: 'Disney+' },
      { title: 'Haider', year: 2014, description: 'A young man returns to Kashmir after his father\'s disappearance to confront his uncle - the man who has a relationship with his mother.', imdbRating: 8.1, platform: 'Netflix' },
      { title: 'A Wednesday', year: 2008, description: 'A retiring police commissioner recounts the most memorable case of his career wherein he was informed about a bomb scare in Mumbai.', imdbRating: 8.1, platform: 'Netflix' },
      { title: 'Drishyam', year: 2015, description: 'Desperate measures are taken by a man who tries to save his family from the dark side of the law, after they commit an unexpected crime.', imdbRating: 8.2, platform: 'Disney+' },
      { title: 'Udta Punjab', year: 2016, description: 'A story that revolves around drug abuse in the affluent north Indian State of Punjab.', imdbRating: 7.8, platform: 'Netflix' },
      { title: 'Talvar', year: 2015, description: 'An experienced investigator confronts several conflicting theories about the perpetrators of a violent double homicide.', imdbRating: 8.1, platform: 'Netflix' },
      { title: 'Neerja', year: 2016, description: 'The story of the courageous Neerja Bhanot, who sacrificed her life while protecting the lives of 359 passengers on a hijacked plane.', imdbRating: 7.6, platform: 'Disney+' },
      { title: 'Kapoor & Sons', year: 2016, description: 'A dysfunctional family comes together for a reunion, and old tensions and secrets bubble to the surface.', imdbRating: 7.7, platform: 'Netflix' },
      { title: 'Padmaavat', year: 2018, description: 'Set in medieval Rajasthan, Queen Padmavati is married to a noble king and they live in a prosperous fortress with their subjects until an ambitious Sultan hears of Padmavati\'s beauty.', imdbRating: 7.0, platform: 'Prime Video' },
      { title: 'Udaan', year: 2010, description: 'Expelled from his school, a 16-year-old boy returns home to his abusive and oppressive father.', imdbRating: 8.1, platform: 'Netflix' },
      { title: 'Black', year: 2005, description: 'The cathartic story of a young woman who can\'t see, hear, or speak, and the teacher who brings a ray of light into her dark world.', imdbRating: 8.2, platform: 'Netflix' },
      { title: 'The Lunchbox', year: 2013, description: 'A mistaken delivery in Mumbai\'s famously efficient lunchbox delivery system connects a young housewife to an older man in the dusk of his life as they build a fantasy world together through notes in the lunchbox.', imdbRating: 7.8, platform: 'Prime Video' },
      { title: 'Piku', year: 2015, description: 'A quirky comedy about the relationship between a daughter and her aging father, whose eccentricities drive everyone crazy.', imdbRating: 7.6, platform: 'SonyLIV' },
      { title: 'Masaan', year: 2015, description: 'Four lives intersect along the Ganges: a low caste boy hopelessly in love, a daughter ridden with guilt of a sexual encounter ending in a tragedy, a hapless father with fading morality, and a spirited child yearning for a family.', imdbRating: 8.1, platform: 'Netflix' },
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
      { title: 'Asur: Welcome to Your Dark Side', year: 2020, description: 'A unique crime thriller that pits two opposing worlds against each other. The less explored, intricate world of forensic science and the deep mysticism of ancient Indian Mythology.', imdbRating: 8.5, platform: 'JioCinema' },
      { title: 'Special OPS', year: 2020, description: 'The story of a RAW agent who draws parallels between terrorist attacks and believes a single mastermind is behind them all.', imdbRating: 8.6, platform: 'Disney+' },
      { title: 'Gullak', year: 2019, description: 'A collection of disarming and relatable tales of the Mishra family.', imdbRating: 9.1, platform: 'SonyLIV' },
      { title: 'Delhi Crime', year: 2019, description: 'Based on the 2012 Delhi gang rape case, this series follows the Delhi Police investigation into finding the men who perpetrated the crime.', imdbRating: 8.5, platform: 'Netflix' },
      { title: 'Kota Factory', year: 2019, description: 'Set in Kota, a hub for many coaching centres, the show follows the life of a 16-year-old who is preparing for his entrance exams.', imdbRating: 9.0, platform: 'Netflix' },
      { title: 'Made in Heaven', year: 2019, description: 'It is the story of two wedding planners in Delhi, where tradition jostles with modern aspirations against the backdrop of big fat Indian weddings.', imdbRating: 8.3, platform: 'Prime Video' },
      { title: 'Paatal Lok', year: 2020, description: 'A down and out cop lands the case of a lifetime when four suspects are nabbed in the assassination attempt of a prime time journalist.', imdbRating: 8.0, platform: 'Prime Video' },
      { title: 'Aarya', year: 2020, description: 'When her world suddenly turns upside down, will Aarya become the very thing she has always hated?', imdbRating: 7.8, platform: 'Disney+' },
      { title: 'Rocket Boys', year: 2022, description: 'The story of two extraordinary men, Dr. Homi J. Bhabha and Dr. Vikram Sarabhai, who created history while building India\'s future.', imdbRating: 8.9, platform: 'SonyLIV' },
      { title: 'Jubilee', year: 2023, description: 'The story of the passion, dreams, ambition and love of a group of people in the world of Hindi cinema.', imdbRating: 8.3, platform: 'Prime Video' },
      { title: 'Farzi', year: 2023, description: 'An artist who gets pulled into the murky high stakes of a con job and a fiery task force officer on the mission to rid the country of his menaces in a fast-paced, edgy one-of-a-kind thriller.', imdbRating: 8.4, platform: 'Prime Video' },
      { title: 'Dahaad', year: 2023, description: 'A female inspector investigates a case of multiple women found dead in public bathrooms.', imdbRating: 7.6, platform: 'Prime Video' },
      { title: 'Aspirants', year: 2021, description: 'The story of the journey of three UPSC (public service competitive exams in India for recruitment to various civil services) aspirants and their friendship against all odds.', imdbRating: 9.2, platform: 'YouTube' },
      { title: 'Breathe: Into the Shadows', year: 2020, description: 'A 6-year old girl is kidnapped by a mysterious masked man, who demands an unusual ransom. To save his daughter, Dr. Avinash Sabharwal must kill someone.', imdbRating: 7.7, platform: 'Prime Video' },
      { title: 'Bandish Bandits', year: 2020, description: 'Radhe, a singing prodigy from a classical background, and Tamanna, a pop sensation, meet and fall in love.', imdbRating: 8.1, platform: 'Prime Video' },
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
      { title: 'Tarak Mehta Ka Ooltah Chashmah', year: 2008, description: 'The residents of a housing society help each other find solutions when they face common, real-life challenges.', imdbRating: 8.9, platform: 'SonyLIV' },
      { title: 'Shark Tank India', year: 2021, description: 'Aspiring entrepreneurs from India pitch their business models to a panel of investors and persuade them to invest money in their idea.', imdbRating: 8.8, platform: 'SonyLIV' },
      { title: 'Anupamaa', year: 2020, description: 'A devoted housewife and mother excels in her family duties, but is often taken for granted.', imdbRating: 5.4, platform: 'Disney+' },
      { title: 'Indian Idol', year: 2004, description: 'Indian version of the Pop Idol format that has aired on Sony Entertainment Television since 2004.', imdbRating: 5.6, platform: 'SonyLIV' },
      { title: 'Sarabhai vs Sarabhai', year: 2004, description: 'The shenanigans of a quintessential upper-class family in Mumbai.', imdbRating: 9.0, platform: 'Disney+' },
      { title: 'Comedy Nights with Kapil', year: 2013, description: 'A comedy show with celebrity interviews and skits.', imdbRating: 7.4, platform: 'JioCinema' },
      { title: 'Nach Baliye', year: 2005, description: 'A celebrity couple dance reality television show.', imdbRating: 6.5, platform: 'Disney+' },
      { title: 'Jhalak Dikhhla Jaa', year: 2006, description: 'A celebrity dance competition based on the format of "Dancing with the Stars".', imdbRating: 6.3, platform: 'SonyLIV' },
      { title: 'MTV Roadies', year: 2003, description: 'A youth-based reality television show.', imdbRating: 6.7, platform: 'JioCinema' },
      { title: 'MasterChef India', year: 2010, description: 'A competitive cooking reality show based on the original British MasterChef.', imdbRating: 7.5, platform: 'SonyLIV' },
      { title: 'Satyamev Jayate', year: 2012, description: 'A talk show that discusses and provides possible solutions to social issues in India.', imdbRating: 8.9, platform: 'Disney+' },
      { title: 'Yeh Rishta Kya Kehlata Hai', year: 2009, description: 'A story of a young couple, Akshara and Naitik, who live in a Marwari joint family.', imdbRating: 5.2, platform: 'Disney+' },
      { title: 'Aap Ki Adalat', year: 1993, description: 'A popular Indian talk show where prominent personalities are cross-examined in a courtroom-like setting.', imdbRating: 8.0, platform: 'YouTube' },
      { title: 'Sa Re Ga Ma Pa', year: 1995, description: 'One of the oldest running music reality shows in India.', imdbRating: 7.1, platform: 'Zee5' },
      { title: 'Khichdi', year: 2002, description: 'A sitcom about a quirky Gujarati joint family living in an old mansion.', imdbRating: 8.7, platform: 'Disney+' },
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
