import * as dotenv from 'dotenv';
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

import { Bot } from './client/Client';

new Bot().start();