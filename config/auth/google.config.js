const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const prisma = require('../database.config');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;

      let user = await prisma.users.findFirst({
        where: { email },
      });

      if (!user) {
        user = await prisma.users.create({
          data: {
            email,
            firstName,
            lastName,
            loginMethod: 'GOOGLE',
          },
        });
      }

      return cb(null, user);
    },
  ),
);
