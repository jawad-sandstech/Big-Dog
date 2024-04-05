const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const prisma = require('../database.config');

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['email', 'first_name', 'last_name'],
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
            isEmailVerified: true,
            loginMethod: 'FACEBOOK',
          },
        });
      }

      return cb(null, user);
    },
  ),
);
