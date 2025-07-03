import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production",

  port: 5555,
});

console.log(`🚀 Server running at ${server.url}`);
