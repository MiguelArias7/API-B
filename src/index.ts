import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import { apiRouter } from './infrastructure/http/routes/index.routes';

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use('/api', apiRouter); // Register the API routes

// Middleware to log requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware to handle errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const PORT: string = process.env.PORT || "3000";

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world 1!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});