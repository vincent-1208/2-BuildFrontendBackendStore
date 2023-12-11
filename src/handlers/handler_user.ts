import express, { Request, Response } from 'express';
import { userType, Users } from '../models/users';
// import verifyToken from 'jsonwebtoken'
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/verify';

const { TOKEN_SECRET = '' } = process.env;
const store = new Users();

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
    const data: userType = {
      first_name: _req.body.firstname,
      last_name: _req.body.lastname,
      username: _req.body.username,
      password: _req.body.password,
      id: undefined,
    };
    const res = await store.create(data);
    _res.status(200);
    _res.json({ data: res });
  } catch (err) {
    throw new Error(`Could NOT add new user ${_req.body.username}. ${err}`);
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
    res.json({ token: token });
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const deleted = async (_req: Request, res: Response) => {
  try {
    const data = await store.delete(_req.params.id);
    if (!data) {
      res.status(404).json({ message: 'Data not found !!!' });
      return;
    }
    res.status(200);
    res.json(data);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const user_router = (app: express.Application) => {
  app.post('/user/login', authenticate);
  app.post('/user', verifyToken, create);
  app.get('/user', index);
  app.get('/user/:id', read);
  app.delete('/user/:id', deleted);
};

export default user_router;
