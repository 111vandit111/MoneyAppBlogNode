import Joi from "joi";
import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
    Description:{
        type:String,
        required:true,
        minlength:5,
        maxlength:200
    },
    cDate:{
        type:String,
    },
    uDate:{
        type:String,
    },
    userID:{
        required:true,
        type:String,
    }, 
    BlogID:{
        required:true,
        type: mongoose.Schema.Types.ObjectId
    }
})


ReviewsSchema.pre(/^find/, function(next) {
    this.populate({
        path: "BlogID",
        select: "_id",
    });
    next()
    });
    



const Reviews = mongoose.model("Reviews", ReviewsSchema);

function validateReviews(Reviews) {
    const Schema = Joi.object({
        Description:Joi.string().min(5).max(200).required(),
        userID: Joi.string().required(),
        BlogID:Joi.string().required()
    })

    return Schema.validate(Reviews);
}

export {Reviews ,ReviewsSchema , validateReviews};