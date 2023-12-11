import express, { Request, Response } from 'express';
import { adminType, Admins } from '../models/admins';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/verify';

const { TOKEN_SECRET = '' } = process.env;
const store = new Admins();

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
    const data: adminType = {
      username: _req.body.username,
      password: _req.body.password,
      id: undefined,
    };
    const res = await store.create(data);
    _res.status(200);
    _res.json({ data: res });
  } catch (err) {
    _res.status(400);
    _res.json({ data: `Could NOT add new admins ${_req.body.username}. ${err}` });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const u = await store.authenticate(req.body.username, req.body.password);
    if (!u) {
      res.status(401).json({ message: 'Invalid Username or Password !!!' });
      return;
    }
    const token = jwt.sign({ user: u }, TOKEN_SECRET);
    res.status(200)
    res.json({ token: token });
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const admin_router = (app: express.Application) => {
  app.post('/admin', verifyToken, create);
  app.post('/admin/login', authenticate);
  app.get('/admin', verifyToken, index);
  app.get('/admin/:id', verifyToken, read);
};

export default admin_router;
