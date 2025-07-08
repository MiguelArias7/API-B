import express, { NextFunction, Request, Response } from 'express';
import { apiRouter } from './infrastructure/http/routes/index.routes';

// Create  application
const app = express();

// Middleware to parse JSON and URL-encoded bodies
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

// Export the app for testing
export default app;

// Define the port to listen on
const PORT: string = process.env.PORT || "3000";

// Only start the server if this file is run directly (not imported)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}
