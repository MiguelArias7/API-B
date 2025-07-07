import { Router } from 'express';
import { ExpressDataRouter } from './V1/ExpressDataRouter';
import { ExpressLogRouter } from './V1/ExpressLogRouter';

const apiRouter = Router();

// This router serves as the main API entry point and includes all versioned routes.
apiRouter.use(ExpressLogRouter);
apiRouter.use(ExpressDataRouter);

export { apiRouter };