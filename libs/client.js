import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "rik-frontend",
  apiKey: process.env.API_KEY,
});
