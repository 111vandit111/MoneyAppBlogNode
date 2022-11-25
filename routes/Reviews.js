import express from "express";
const router = express.Router();
import  {Reviews ,ReviewsSchema , validateReviews} from "../models/Reviews.js";
import moment from "moment";

router.get("/",async(req,res)=>{
    const review = await Reviews.find().sort("Name");
    res.status(200).send(review);
})

router.get("/:id",async(req,res)=>{
    
    const review = await Reviews.findById(req.params.id);
    if (!review)
    return res.status(404).send("The review with the given ID was not found.");
    res.status(200).send(review);
})

router.post("/", async (req, res) => {
    const { error } = validateReviews(req.body);
    if (error) return res.status(400).send(error.message);
    
    let datenew = moment().format('YYYY/MM/D/H/mm/ss')

    let review = new Reviews({
      Description: req.body.Description,
      uDate: datenew,
      cDate: datenew,
      userID: req.body.userID,
      BlogID: req.body.BlogID
    });
    
    review = await review.save();
    res.status(200).send(review);
  });
 
  router.put("/:id", async (req, res) => {
    let datenew = moment().format('YYYY/MM/D/H/mm/ss')
    const review = await Reviews.findByIdAndUpdate(
      req.params.id,
      {
        Description: req.body.Description,
        uDate:datenew
      },
      {
        new: true,
      }
    );

    if (!review)
    return res.status(404).send("The review with the given ID was not found.");
  res.send(review);
});

router.delete("/:id", async (req, res) => {
    const review = await Reviews.findByIdAndRemove(req.params.id);
  
    if (!review)
      return res.status(404).send("The review with the given ID was not found.");
    res.send(review);
  });


  export default router;