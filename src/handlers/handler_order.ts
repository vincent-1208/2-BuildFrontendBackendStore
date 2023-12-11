import express, { Request, Response } from 'express';
import { orderType, Orders } from '../models/order';
import verifyToken from '../middleware/verify';

const store = new Orders();

const index = async (_req: Request, res: Response) => {
  try {
    const data = await store.index();
    if (!data) {
      res.status(404).json({ message: 'Data not found !!!' });
      return;
    }
    res.json(data);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const read = async (_req: Request, res: Response) => {
  try {
    const data = await store.read(_req.params.id);
    if (!data) {
      res.status(404).json({ message: 'Data not found !!!' });
      return;
    }
    res.json(data);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const create = async (_req: Request, _res: Response) => {
  try {
    const data: orderType = {
      status: _req.body.status,
      user_id: _req.body.userId
    };
    const res = await store.create(data);
    _res.status(200);
    _res.json({ data: res });
  } catch (err) {
    _res.status(400);
    _res.json({ data: `Could NOT add new order ${_req.body.user_id}. ${err}` });
  }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleted = async (_req: Request, _res: Response) => {
    try {
        const data = await store.delete(_req.params.id);
      _res.status(200);
      _res.json(data);
    } catch (err) {
      _res.status(400);
      _res.json({ data: `Could NOT delete product ${_req.params.id}` });
    }
  };

const order_router = (app: express.Application) => {
  app.post('/order', verifyToken, create);
  app.delete('/order/:id', verifyToken, deleted)
  app.get('/order', index);
  app.get('/order/:id', read);
};

export default order_router;
