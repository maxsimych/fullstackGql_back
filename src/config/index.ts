import dotenv from 'dotenv';

const envFound = dotenv.config({ path: '../.env'});
if (envFound.error) {
  throw new Error('env not found');
}

export const GH_TOKEN = process.env.GH_TOKEN!;
export const DATABASE = process.env.DATABASE!;