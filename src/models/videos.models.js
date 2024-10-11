import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // aggregation over MongoDB


const videoSchema = new mongoose.Schema({
    videofile : {
        type: String, //cloudinary url
        required: true
    },
    thumbnail : {
        type: String, //cloudinary url
        required: true
    },
    title : {
        type: String, 
        required: true
    },
    description : {
        type: String, 
        required: true
    },
    duration : {
        type: Number, //cloudinary url
        required: true
    },
    views:{
        type: Number,
        default: 0
    },
    ispublished : {
        type: Boolean, 
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, timestamp());

videoSchema.plugin(mongooseAggregatePaginate) 

export const Video = mongoose.models("Video", videoSchema);


// bcrypt and jsonwebtoken are used to encrypt the data and refrsh the token using secret and encryption
// we use 'Pre' hooks to do something before the data gets saved, like encrypting password before saving