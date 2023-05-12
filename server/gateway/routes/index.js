import itemRouter from "./routers/item.js";
import paymentRouter from "./routers/payment.js";
import cartRouter from "./routers/cart.js";
import userRouter from "./routers/user.js";

function routers(app) {
  app.use("/items", itemRouter);
  app.use("/payment", paymentRouter);
  app.use("/orders", cartRouter);
  app.use("/users", userRouter);
}

export default routers;
