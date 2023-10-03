import express from 'express';
import debug from 'debug';
import * as userDao from '../models/user/user-dao.js';

const router = express.Router();

// Set up debug namespace
const devClientInputVal = debug('devLog:clientside_input_validation');

router.get("/email_check", async (req, res) => {
  const userEmail = await userDao.retrieveUserWithEmail(req.query.email);
  devClientInputVal(`email_check: ${userEmail}`);
  if (userEmail) {
    res.json({message: "inuse"});
  } else {
    res.json({message: ""});
  }
});

router.get("/username_check", async (req, res) => {
  const user = await userDao.retrieveUserWithUsername(req.query.username);
  if (user) {
    res.json({message: "taken"});
  } else {
    res.json({message: ""});
  }
});

export default router;
