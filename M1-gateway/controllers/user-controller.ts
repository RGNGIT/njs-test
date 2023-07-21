import { Request, Response } from 'express';
import UserService from '../services/user-service';
import User from '../../dto/user.dto';
import logger from '../../logger';

export default new class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const s = new UserService();
      const user: User = req.body;
      user.DateOfReg = new Date(Date.now());
      res.json(await s.register(user));
    } catch (e) {
      logger.log('error', (<Error>e).message, "M1-gateway");
    }
  }
  async get(req: Request, res: Response): Promise<void> {
    try {
      const s = new UserService();
      const { username } = req.params;
      const user: User = { Username: username };
      res.json(await s.get(user));
    } catch (e) {
      logger.log('error', (<Error>e).message, "M1-gateway");
    }
  }
  async edit(req: Request, res: Response): Promise<void> {
    try {
      const s = new UserService();
      const { username } = req.params;
      const user: User = req.body;
      res.json(await s.edit(user));
    } catch (e) {
      logger.log('error', (<Error>e).message, "M1-gateway");
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const s = new UserService();
      const { username } = req.params;
      const user: User = { Username: username };
      res.json(await s.delete(user));
    } catch (e) {
      logger.log('error', (<Error>e).message, "M1-gateway");
    }
  }
}