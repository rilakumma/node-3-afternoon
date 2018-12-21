const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const swagController = require("./controllers/swag_controller");
const authController = require("./controllers/auth_controller");
const cartController = require("./controllers/cart_controller");
const checkForSession = require("./middlewares/checkForSession");

const app = express();
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/api/swag", swagController.read);

app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);

app.post("/api/cart", cartController.add);
app.post("/api/cart/checkout", cartController.checkout);
app.delete("/api/cart", cartController.delete);
