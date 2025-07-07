import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import { apiRouter } from './infrastructure/http/routes/index.routes';
import { errorLoggerMiddleware } from './infrastructure/http/middleware/ErrorLoggerMiddleware';

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Middleware to log requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Router 
app.use('/api', apiRouter); // Register the API routes

// Middleware to handle errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

const PORT: string = process.env.PORT || "3000";

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world 1!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});