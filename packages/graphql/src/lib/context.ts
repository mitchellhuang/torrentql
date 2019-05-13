import { Connection } from 'typeorm';

export interface Context {
  user?: {
    id: string
    email: string,
  };
}
