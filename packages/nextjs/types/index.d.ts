declare module '*.png';
declare module '*.jpg';
declare module '*.json';
declare module '*.svg';
declare module '*.md';

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
