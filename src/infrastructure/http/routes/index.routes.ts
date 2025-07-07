import { Router } from 'express';
import { ExpressDataRouter } from './V1/ExpressDataRouter';
import { ExpressLogRouter } from './V1/ExpressLogRouter';

const apiRouter = Router();

// Registrar versiones
apiRouter.use(ExpressLogRouter);
apiRouter.use(ExpressDataRouter);

export { apiRouter };