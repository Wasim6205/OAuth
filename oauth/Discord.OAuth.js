// import passport from "passport";
// import { Strategy as DiscordStrategy } from "passport-discord";

// const discordConfig = {
//    clientID: process.env.DISCORD_CLIENT_ID,
//    clientSecret: process.env.DISCORD_CLIENT_SECRET,
//    callbackURL: process.env.DISCORD_CALLBACK_URL,
//    scope: ['identify', 'email']
//    };

//    const discordStrategy = new DiscordStrategy(
//    discordConfig,
//    (accessToken, refreshToken, profile, done) => {
//       const avatarUrl = profile.avatar
//          ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
//          : 'https://cdn.discordapp.com/embed/avatars/0.png';

//       const user = {
//          provider: 'discord',
//          id: profile.id,
//          name: profile.global_name || profile.username || 'Discord User',
//          username: profile.username,
//          email: profile.email || 'No email shared',
//          avatar: avatarUrl
//       };
//       return done(null, user);
//    }
//    );

//    passport.use(discordStrategy);





import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";

const discordConfig = {
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,
  scope: ["identify", "email"],
};

const discordStrategy = new DiscordStrategy(
  discordConfig,
  (accessToken, refreshToken, profile, done) => {
    const avatarUrl = profile.avatar
      ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
      : "https://cdn.discordapp.com/embed/avatars/0.png";

    const user = {
      provider: "discord",
      id: profile.id,
      name: profile.global_name || profile.username || "Discord User",
      username: profile.username,
      email: profile.email || "No email shared",
      avatar: avatarUrl,
    };

    return done(null, user);
  }
);

passport.use(discordStrategy);
