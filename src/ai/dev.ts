import { config } from 'dotenv';
config();

import '@/ai/flows/generate-movie-recommendations.ts';
import '@/ai/flows/suggest-movies-by-mood.ts';
import '@/ai/flows/create-ai-watchlists.ts';
import '@/ai/flows/discover-hidden-gems.ts';