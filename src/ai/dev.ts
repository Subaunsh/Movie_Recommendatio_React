import { config } from 'dotenv';
config();

import '@/ai/flows/generate-movie-recommendations.ts';
import '@/ai/flows/create-ai-watchlists.ts';
import '@/ai/flows/discover-hidden-gems.ts';
import '@/ai/flows/get-movies-by-mood.ts';
