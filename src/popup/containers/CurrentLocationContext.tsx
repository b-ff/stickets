import { Context, createContext } from "react";

export const CurrentLocationContext: Context<URL | null> =
  createContext<URL | null>(null);
