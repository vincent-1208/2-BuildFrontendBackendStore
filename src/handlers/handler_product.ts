import express, { Request, Response } from 'express';
import { productType, Products } from '../models/product';
import verifyToken from '../middleware/verify';

const store = new Products();

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
    const data: productType = {
      name: _req.body.name,
      price: _req.body.price,
      category: _req.body.category,
    };
    const res = await store.create(data);
    _res.status(200);
    _res.json({ data: res });
  } catch (err) {
    _res.status(400);
    _res.json({ data: `Could NOT add new product ${_req.body.username}. ${err}` });
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

const product_router = (app: express.Application) => {
  app.post('/product', verifyToken, create);
  app.delete('/product/:id', verifyToken, deleted)
  app.get('/product', index);
  app.get('/product/:id', read);
};

export default product_router;
