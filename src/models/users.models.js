import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        }, 
        avatar: {
            type: String, //cloudinary url
            unique: true,
            required: true
        },
        coverImage: {
            type: String, //cloudinary url
        },
        watchhistory:[{
            type: Schema.Types.ObjecId,
            ref: "Video"
        }],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshtoken: {
            type: String
        }
    }, {timestamps: true})

    
    userSchema.pre("save", async function (next) { //using middleware
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password, 10 )
    }
    next() 
}) // we can't use '() => {}' due to data access issue, we are manipulating data hence we can't use this
// jwt is a bearer token, jo usko bear krta h usey shi manglete h

userSchema.methods.generateAccesssToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }),
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
}
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id: this._id,
    }),
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
}

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)