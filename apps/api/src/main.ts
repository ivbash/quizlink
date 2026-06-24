import 'dotenv/config';
import { handleShutdown, start } from './app';

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

void start();
