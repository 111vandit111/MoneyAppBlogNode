import mongoose from "mongoose";

const db= function () {
    mongoose
      .connect("mongodb://localhost/moneyappblogs")
      .then(() => console.log("Connected to MongoDB..."));
  };

export default db;