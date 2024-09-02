import dotenv from 'dotenv';

dotenv.config();

export const APP_PORT = process.env.APP_PORT;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
