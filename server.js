
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./oauth/Google.OAuth.js";
import "./oauth/Discord.OAuth.js";
import "./oauth/Github.OAuth.js";
import { signToken } from "./utils/jwt.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

// Google login
app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    const token = signToken(req.user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/");
  }
);



// Discord login
app.get(
  "/auth/discord",
  passport.authenticate("discord", {
    session: false,
  })
);

// Discord callback
app.get(
  "/auth/discord/callback",
  passport.authenticate("discord", {
    session: false,
  }),
  (req, res) => {
    const token = signToken(req.user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/");
  }
);




// GitHub login
app.get(
  "/auth/github",
  passport.authenticate("github", {
    session: false,
    scope: ["user:email"],
  })
);

// GitHub callback
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
  }),
  (req, res) => {
    const token = signToken(req.user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/");
  }
);





app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
