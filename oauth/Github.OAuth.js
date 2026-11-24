
// import passport from "passport";
// import { Strategy as GitHubStrategy } from "passport-github";
// import User from "../models/User.js";

// const githubConfig = {
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: process.env.GITHUB_CALLBACK_URL,
//   scope: ["user:email"],
// };

// passport.use(
//   new GitHubStrategy(
//     githubConfig,
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value || null;

//         let user = await User.findOne({
//           githubId: profile.id,
//         });

//         if (!user) {
//           user = await User.create({
//             githubId: profile.id,
//             name: profile.displayName || profile.username,
//             username: profile.username,
//             email,
//             avatar: profile.photos?.[0]?.value,
//             provider: "github",
//           });
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );




import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";

const githubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ["user:email"],
};

passport.use(
  new GitHubStrategy(
    githubConfig,
    (accessToken, refreshToken, profile, done) => {
      const user = {
        provider: "github",
        id: profile.id,
        username: profile.username,
        name: profile.displayName || profile.username || "GitHub User",
        email: profile.emails?.[0]?.value || "No email shared",
        avatar: profile.photos?.[0]?.value || null,
      };

      return done(null, user);
    }
  )
);
