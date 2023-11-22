//-----------Requires-----------//
const cors = require('cors');
const express = require('express');
require('dotenv').config();

//-----------Importing Controllers-----------//
const UsersController = require('./controllers/usersController');
const GroupAccountsController = require('./controllers/groupAccountsController');
const PwBookEntryController = require('./controllers/pwBookEntryController');

//-----------Importing Routers-----------//
const UsersRouter = require('./routers/usersRouter');
const GroupAccountsRouter = require('./routers/groupAccountsRouter');
const PwBookEntryRouter = require('./routers/pwBookEntryRouter');

//-----------Importing DB-----------//
const db = require('./db/models/index');
const { user, groupAccount, passwordbookEntries } = db;

//-----------Importing Middlewares-----------//
const jwtAuth = require('./middlewares/jwtAuth');

//-----------Initializing Controllers-----------//
const usersController = new UsersController(user, groupAccount);
const groupAccountsController = new GroupAccountsController(groupAccount);
const pwBookEntryController = new PwBookEntryController(passwordbookEntries);

//-----------Initializing Routers-----------//
const usersRouter = new UsersRouter(usersController, jwtAuth).routes();
const groupAccountsRouter = new GroupAccountsRouter(
  groupAccountsController
).routes();
const pwBookEntryRouter = new PwBookEntryRouter(pwBookEntryController).routes();

const PORT = process.env.DB_PORT;
const app = express();

//-----------Enable CORS access to this server-----------//
const corsOptions = {
  origin: ['http://localhost:3000', 'https://ultralock.netlify.app'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-----------Using the Routers-----------//
app.use('/user', usersRouter);
app.use('/groupaccount', groupAccountsRouter);
app.use('/pwbookentry', pwBookEntryRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
