const express = require("express");
const userRouter = require("./routes/user.route");
const jobRouter = require("./routes/job.route");
const applicationRouter = require("./routes/application.route");
const companyRouter = require("./routes/company.route");
const authRouter = require("./routes/auth.route");
const passport = require("passport");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const educationRoutes = require('./routes/education.route');

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/companies", companyRouter);
app.use("/api/auth", authRouter);
app.use('/api/education', educationRoutes);
const version = "v1"; 
app.get("/", (req, res) => {
  res.send("Placement Portal API");
});

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Updated Google Strategy with proper callback URL
passport.use(
  new GoogleStrategy(
      {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
          try {
              // Check if user exists by email
              let user = await prisma.user.findUnique({
                  where: { email: profile.emails[0].value },
              });

              if (user) {
                // Update user profile image if needed
                user = await prisma.user.update({
                  where: { id: user.id },
                  data: { 
                    gimg: profile.photos[0].value,
                  }
                });
              } else {
                // Create new user
                user = await prisma.user.create({
                  data: {
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName || '',
                    lastName: profile.name.familyName || '',
                    gimg: profile.photos[0].value,
                    emailVerified: true
                  }
                });
              }

              // Add user ID to profile
              profile.userId = user.id;
              return done(null, profile);
          } catch (error) {
              console.error(error);
              return done(new Error("Error fetching/creating user"), null);
          }
      }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
      // Find user by email since we don't have google_id in schema
      const foundUser = await prisma.user.findUnique({
          where: { email: user.emails[0].value },
      });
      done(null, foundUser);
  } catch (error) {
      done(error, null);
  }
});

app.use(passport.initialize());

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

app.get('/auth/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: req.user.userId, 
        email: req.user.emails[0].value 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Redirect to frontend with token using STUDENT_FRONTEND_URL
    res.redirect(`${process.env.STUDENT_FRONTEND_URL}/auth/success?token=${token}`);
  }
);

// Health check endpoint
app.get("/api/" + version + "/health", async (req, res) => {
  res.json({
      status: "up and running",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
