import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://ec680b70aaee7c553af6e078030aa551@o4511700341555200.ingest.us.sentry.io/4511729241227264",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
  tracesSampleRate: 0.2,
});
