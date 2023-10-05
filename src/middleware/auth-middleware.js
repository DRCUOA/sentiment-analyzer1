import debug from 'debug';

//debug namespace setup
const devAuthCtrl = debug('devLog:controller_auth');
// import the dao user model
import { retrieveUserWithEmail, retrieveUserWithAuthToken } from '../models/user/user-dao.js';

// add user to locals
export async function addUserToLocals(req, res, next) {
  devAuthCtrl('attempt to add user to locals');
  const user = await retrieveUserWithAuthToken(req.cookies.authToken);

  try {
    if (user) {
      res.locals.user = user;
      devAuthCtrl(`${user.username} is active`);
      next();
    } else {
      devAuthCtrl('no user active');
      next();
    }
  } catch (err) {
    devAuthCtrl(err);
    next();
  };
};

// verify user is authenticated
export async function verifyAuthenticated(req, res, next) {
  if (res.locals.user) {
    devAuthCtrl('user is authenticated');
    next();
  } else {
    console.log('here is found but no futher perhaps')
    console.log('user is not authenticated');
  res.render('pages/index', { layout: 'main'});
  }
};

async function checkEmailInDb(email) {
  devAuthCtrl(`checking if ${email} is in the database`);
  try {
    const user = await retrieveUserWithEmail(email);
    if(user) {
      return true
    } else {
      return false
    } 
  } catch (err) {
    devAuthCtrl('Error checking email in db', err.message);
    return false;
  }
};



