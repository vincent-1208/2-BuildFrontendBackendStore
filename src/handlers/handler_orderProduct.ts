import express, { Request, Response } from 'express';
import { orderProductType, orderProducts } from '../models/orderProduct';
import verifyToken from '../middleware/verify';

const store = new orderProducts();

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
    const data: orderProductType = {
      quantity: _req.body.quantity,
      order_id: _req.body.orderId,
      product_id: _req.body.productId
    };
    const res = await store.create(data);
    _res.status(200);
    _res.json({ data: res });
  } catch (err) {
    _res.status(400);
    _res.json({ data: `Could NOT add new orderProduct ${_req.body.orderId}. ${err}` });
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

const orderProduct_router = (app: express.Application) => {
  app.post('/orderproduct', verifyToken, create);
  app.delete('/orderproduct/:id', verifyToken, deleted)
  app.get('/orderproduct', index);
  app.get('/orderproduct/:id', read);
};

export default orderProduct_router;
