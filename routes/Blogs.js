import express from "express";
const router = express.Router();
import {Blogs  , validateBlogs} from "../models/Blogs.js";
import moment from "moment";

router.get("/",async(req,res)=>{
    const Blog = await Blogs.find().sort("Name");
    res.status(200).send(Blog);
})

router.get("/:id",async(req,res)=>{
    
    const BlogID = req.params.id 
    let Blog = await Blogs.findById({_id:BlogID},{Title:1,Description:1,reviews:1}).populate("reviews") ;
    if (!Blog)
    return res.status(404).send("The Blog with the given ID was not found.");
    return res.status(200).json ({Blog,
    review: Blog.reviews
  });
})

router.post("/", async (req, res) => {
    const { error } = validateBlogs(req.body);
    if (error) return res.status(400).send(error.message);
    
    let datenew = moment().format('YYYY/MM/D/H/mm/ss')

    let Blog = new Blogs({
      Title: req.body.Title,
      Description:req.body.Description,
      uDate: datenew,
      cDate: datenew
    });
    
    Blog = await Blog.save();
    res.status(200).send(Blog);
  });
 
  router.put("/:id", async (req, res) => {
    let datenew = moment().format('YYYY/MM/D/H/mm/ss')
    const Blog = await Blogs.findByIdAndUpdate(
      req.params.id,
      {
        Title: req.body.Title,
        Description: req.body.Description,
        uDate:datenew
      },
      {
        new: true,
      }
    );

    if (!Blog)
    return res.status(404).send("The Blog with the given ID was not found.");
  res.send(Blog);
});

router.delete("/:id", async (req, res) => {
    const Blog = await Blogs.findByIdAndRemove(req.params.id);
  
    if (!Blog)
      return res.status(404).send("The Blog with the given ID was not found.");
    res.send(Blog);
  });


  export default router;