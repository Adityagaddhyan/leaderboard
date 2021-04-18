const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes=require('./src/routes/auth');
const gameRoutes=require("./src/routes/game");
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error in Database connection",err);
  });


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//routes
app.get("/",(req,res)=>{res.send("welcome!")})
app.use("/auth",authRoutes);
app.use("/game",gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening on", process.env.PORT);
});
