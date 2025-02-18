import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  deleteUserSubscription,
  getUserSubscriptions
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
  res.send({
    title: 'GET all subscriptions'
  })
});

subscriptionRouter.get('/:id', (req, res) => {
  res.send({
    title: 'GET a subscription by id'
  })
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
  res.send({
    title: 'UPDATE a subscription by id'
  })
});

subscriptionRouter.delete('/:id', authorize, deleteUserSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put(':id/cancel', (req, res) => {
  res.send({
    title: 'CANCEL a subscription by id'
  })
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.send({
    title: 'GET all upcoming renewals'
  })
})

export default subscriptionRouter;