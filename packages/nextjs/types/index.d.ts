declare module '*.png';
declare module '*.jpg';
declare module '*.json';
declare module '*.svg';

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
