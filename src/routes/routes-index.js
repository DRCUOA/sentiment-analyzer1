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
router.use('/trans', transactionRoutes);
router.use('/category', categoryRoutes);
router.use('/category-group', categoryGroupRoutes);
router.use('/category-freq', categoryFreqRoutes);
router.use('/reports', reportRoutes);
router.use('/account', accountsRoutes);
router.use('/recon', reconciliationRoutes);

export default router;
