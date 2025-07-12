import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://your-frontend-domain.amplifyapp.com']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/test', (req, res) => {
  res.send("hello world");
});

app.use('/api', routes);

export const handler = serverless(app);