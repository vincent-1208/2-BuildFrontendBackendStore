import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import admin_router from './handlers/handler_admins';
import user_router from './handlers/handler_user';
import orderProduct_router from './handlers/handler_orderProduct';
import order_router from './handlers/handler_order';
import product_router from './handlers/handler_product';
const { PORT ='3000' } = process.env

const app: express.Application = express();
const port: string = `${PORT}`;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Welcome to my home');
});

admin_router(app);
user_router(app);
orderProduct_router(app);
order_router(app)
product_router(app)

app.listen(PORT, function () {
  console.log(`starting app on: ${port}`);
});

export default app
