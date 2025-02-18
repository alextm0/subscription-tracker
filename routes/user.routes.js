import {Router} from "express";
import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', authorize, getUsers);
userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => {
  res.send({
    title: "CREATE user"
  });
});

userRouter.delete('/:id', (req, res) => {
  res.send({
    title: "DELETE user by id"
  });
})

userRouter.put('/:id', (req, res) => {
  res.send({
    title: "UPDATE user by id"
  })
})

export default userRouter;