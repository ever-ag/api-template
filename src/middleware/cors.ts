import * as cors from 'cors';

const developmentOrigins = ['http://localhost:4200'];
const productionOrigins = ['https://productionapp.example.com'];

const corsMiddleware = cors({
    origin: process.env.NODE_ENV === 'development' ? developmentOrigins : productionOrigins,
    credentials: true,
});

export default corsMiddleware;
