import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import express from 'express';
import { toaster } from '../services/toaster.js';
import debug from 'debug';
import * as userDao from '../models/user/user-dao.js';
import crypto from 'crypto';

const router = express.Router();

// Setup debug namespaces
const devAuthRLog = debug('devLog:routing_auth');

router.post("/new-account", async (req, res) => {
  devAuthRLog('Received new account request');
  res.clearCookie('authToken');

  const saltRounds = 10;
  const password = req.body.password;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    // returns salt
    bcrypt.hash(password, salt, async (err, hash) => {
      // returns hash with salt

      const user = {
        realName: req.body.realName,
        username: req.body.username.toLowerCase(),
        password: hash,
        email: req.body.email.toLowerCase(),
      }

      try {
        devAuthRLog('Attempting to create new user');
        const userCreated = await userDao.createUser(user);
        devAuthRLog(userCreated);
        res.setToastMessage('success', 'Account created successfully');
        res.redirect('/stage-login');
      } catch (err) {
        res.setToastMessage("Account creation failed! Please try again.");
        devAuthRLog('new account creation failed', err);
        res.redirect('/stage-login');
      };
    });

  })
});


router.get("/logout", function (req, res) {
  res.clearCookie("authToken");
  res.locals.user = null;
  res.setToastMessage("Successfully logged out! Come back soon, or don't what-evs");
  res.redirect("/");
});

router.get('/stage-login', (req, res) => {
  res.locals.userCreated = true;
  console.log(res.locals.userCreated)
  res.render('pages/index');
});

router.post('/login', async (req, res) => {
  devAuthRLog('Received login request')
  try {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const user = await userDao.retrieveUserWithUsername(username);
    const hash = user.password;
    bcrypt.compare(password, hash, async (err, result) => {
      if (result) {
        devAuthRLog(`User ${user.username} Authenticated`);
        const authToken = uuid();
        user.auth_token = authToken;
        try {
          devAuthRLog('user:', user)
          await userDao.updateUser(user);
        } catch (err) {
          devAuthRLog(`User ${user.username} error on update: ${err}`)
        }
        res.cookie("authToken", authToken);
        res.locals.user = user;
        let firstLetter = user.username.charAt(0).toUpperCase();
        let username = user.username.split('');
        username.splice(0, 1, firstLetter);
        let greetName = username.join('');
        res.render('pages/homepage', { layout: 'hero', pageTitle: `Welcome ${greetName}` });

      } else {
        devAuthRLog(`User ${user.username}`)
        res.locals.user = null;
        res.redirect("/");
      }

    });
  } catch (err) {
    devAuthRLog(`User Not Found`)
    res.locals.user = null;
    res.redirect("/");
  }
});

router.get('/train-form', (req, res) => {
  res.render('pages/train-form');
}
);

router.get('/dataed', async (req, res) => {
  let results = [];
  const data = await userDao.factoryResetDb();
  for (const count of data.data.counts) {
    results.push(count.table + "," + count.rowsChanged);
  }
  res.setToastMessage('Records Updated\n' + results);
  res.render('pages/homepage', { layout: 'hero', pageTitle: 'Welcome' });
});

export default router;