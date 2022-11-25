import Joi from "joi";
import mongoose from "mongoose";

const BlogSchmea = new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    Description:{
        type:String,
        required:true,
        minlength:5,
        maxlength:250
    },
    cDate:{
        type:String,
    },
    uDate:{
        type:String,
    }
})

BlogSchmea.virtual("reviews",{
    ref:"Reviews",
    foreignField:"BlogID",
    localField:"_id"
})


const Blogs = mongoose.model("Blog", BlogSchmea);


function validateBlogs(Blog) {
    const Schema = Joi.object({
        Title:Joi.string().min(5).max(50).required(),
        Description: Joi.string().min(5).max(250).required(),
    })

    return Schema.validate(Blog);
}

export {Blogs ,BlogSchmea , validateBlogs};
