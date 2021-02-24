import { EventEmitter } from 'events';
import { Bot } from '../client/Client';
export interface RunFunction {
  (client: Bot, ...params: unknown[]): Promise<void>;
}
export interface Event {
  name: string;
  run: RunFunction;
  emitter?: EventEmitter;
}