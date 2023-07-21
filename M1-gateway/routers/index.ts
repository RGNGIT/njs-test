import { Router } from "express"
import UserRouter from "./user-router"

export default (router: Router): void => {
  router.use(UserRouter);
}