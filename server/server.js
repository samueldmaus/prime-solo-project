
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const heroRouter = require('./routes/hero.router');
const mapRouter = require('./routes/map.router');
const favHeroRouter = require('./routes/favHero.router');
const favMapRouter = require('./routes/favMap.router');
const teamCompRouter = require('./routes/teamComp.router');
const bnetRouter = require('./routes/bnet_user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// use the bnet strategy with cors
app.use(cors(bnetRouter))

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/hero', heroRouter);
app.use('/api/map', mapRouter);
app.use('/api/favhero', favHeroRouter);
app.use('/api/favmap', favMapRouter);
app.use('/api/teamcomp', teamCompRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
