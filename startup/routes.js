import express from "express"
import Blogs from "../routes/Blogs.js"
import reviews from "../routes/Reviews.js"


const routes = (app) => {
  app.use(express.json());
  app.use("/api/blog", Blogs);
  app.use("/api/reviews", reviews);
};

export default routes;