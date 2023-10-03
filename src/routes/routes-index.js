/**
 * @summary    Routes Index - This file is the index for all routes in the application. 
 * @module routes/routes-index
 * @exports module:routes/routes-index
 */

import express from 'express';
const router = express.Router();

// Import routing files using ES6 syntax
import authRouting from './auth-routes.js';
import clientInputValidation from './validation-routes.js';
import appRoutes from './app-routes.js';

// Routing prefix for all routes in this file
router.use("/", authRouting);
router.use("/validation", clientInputValidation);
router.use('/app', appRoutes);

export default router;
