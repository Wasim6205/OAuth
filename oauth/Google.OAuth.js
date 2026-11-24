
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

passport.use(
  new GoogleStrategy(
    googleConfig,
    (accessToken, refreshToken, profile, done) => {
      const user = {
        provider: "google",
        id: profile.id,
        name: profile.displayName || "Google User",
        email: profile.emails?.[0]?.value || "No email",
        avatar:
          profile.photos?.[0]?.value ||
          "https://via.placeholder.com/150",
      };

      return done(null, user);
    }
  )
);
