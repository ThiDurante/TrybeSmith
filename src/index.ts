import swaggerUi from 'swagger-ui-express';
import app from './app';
import swaggerDocs from './swagger.json';

const PORT = 3001;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

export default server;
