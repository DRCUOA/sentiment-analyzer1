/* @module      dao_user
 * @description This module handles the database interactions for the app_users table.
 * @version     1.0
 * @since       2023.17.07
 * @requires    module:sql-template-strings
 * @requires    module:dbPromise
 * @requires    module:moment
 * @requires    module:debug
 * @exports     module:dao_user
 */

import SQL from 'sql-template-strings';
import dbPromise from '../../config/sqlite-db-config.js';
import moment from 'moment';
import debug from 'debug';

//debug namespace setup
const devUserDao = debug('devLog:dao_user');

/** Create New User
 * @param {user} user - user object to be created
 */
export async function createUser(user) {
  devUserDao('attempt to create new user');
  const db = await dbPromise;
  const created_at = moment(new (Date)).format('YYYY-MM-DD HH:mm:ss');
  const result = await db.run(SQL`INSERT INTO app_users(username, email, password, name, created_at) VALUES (${user.username}, ${user.email}, ${user.password}, ${user.realName}, ${created_at})`);
  // get the id generated for the new user
  user.id = result.lastID;
  return user;
};

/** Get user with the given username
 * @param {string} username - username of the user to be retrieved
 */
export async function retrieveUserWithUsername(username) {
  devUserDao(`attempt to retrieve user with username ${username}`)
  const db = await dbPromise;
  const user = await db.get(SQL`SELECT * FROM app_users WHERE username = ${username}`);
  return user;
};

/** Get user with the given authToken
 *  @param {string} authToken - authToken of the user to be retrieved
 */
export async function retrieveUserWithAuthToken(authToken) {
  devUserDao(`attempt to retrieve user with authToken ${authToken}`);
  const db = await dbPromise;
  const user = await db.get(SQL`SELECT * FROM app_users WHERE auth_token = ${authToken}`);
  if (user == undefined) {
    devUserDao(`no user found with authToken ${authToken}`);
  } else {
    devUserDao(`user ${user.username} found with authToken ${authToken}`);
  }
  return user;
};

/** Get user with the given email
 * @param {string} email - email of the user to be retrieved
 */
export async function retrieveUserWithEmail(email) {
  devUserDao(`attempt to retrieve user with email ${email}`);
  const db = await dbPromise;
  const user = await db.get(SQL`SELECT * FROM app_users WHERE email = ${email}`);
  return user;
}

/** Update existing user with new user user object
 * @param {user} user - user object to be updated
 */
export async function updateUser(user) {
  try {
    devUserDao(`attempt to update user ${user.username}`);
    if (!user || typeof user !== 'object') {
      throw new TypeError('user argument must be an object');
    }
    //update user with the valid user object
    db = await dbPromise;
    devUserDao(`attempt to update user ${user.username}`);
    const updated_at = moment(new (Date)).format('YYYY-MM-DD HH:mm:ss');
    const setClause = Object.keys(user).map(key => `${key} = ?`).join(', ');
    const values = Object.values(user).concat(updated_at, user.id);
    devUserDao(`UPDATE app_users SET ${setClause} WHERE id = ?`);
    const sql = `UPDATE app_users SET ${setClause}, updated_at = ? WHERE id = ?`;
    await db.run(sql, values);
    devUserDao(`user ${user.username} updated`);
    return true;
  } catch (err) {
    if (err instanceof TypeError) {
      devUserDao('Invalid user object', err.message);
    } else {
      devUserDao('An error occurred:', err);
    }
    return false;
  }
};

export async function factoryResetDb() {
  devUserDao('attempt to reset database');
  
  const db = await dbPromise;
  
  try {
    const sqlStatements = [
      { sql: 'DELETE FROM transaction_audit', table: 'transaction_audit' },
      { sql: 'DELETE FROM transactions', table: 'transactions' },
      { sql: 'UPDATE accounts SET current_balance = initial_balance', table: 'accounts' }
    ];

    const counts = [];

    for (const { sql, table } of sqlStatements) {
      const result = await db.run(sql);
      counts.push({ table, rowsChanged: result.changes });
    }

    devUserDao('database reset');
    return { data: { response: 'success', counts } };
  } catch (err) {
    devUserDao('An error occurred:', err);
    return;
  }
}