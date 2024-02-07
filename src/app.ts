import * as dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import userRoutes from './routes/userRoute';
import bookRoutes from './routes/bookRoute';
import orderRoutes from './routes/orderRoute';
import sequelize,{ testConnection } from './config/db.config';
import errorHandler from './middlewares/errorHandler';
import cloudinary from 'cloudinary';

dotenv.config();
const app = express();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

testConnection();
app.use(cors());
app.use(express.json());


const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'BookStore API',
        version: '1.0.0',
        description: 'BookStore API with Swagger',
      },
      servers: [
        {
          url: 'http://localhost:5000', // Update with your server URL
        },
      ],
    },
    apis: ['./src/routes/*.ts'], // Path to your route files
  };

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/order', orderRoutes);

sequelize.sync({force:true}).then(() => {
    console.log('Database & tables created!');
  }
);


app.use(errorHandler);

app.listen(5000, () => console.log('Listening on port 5000'));