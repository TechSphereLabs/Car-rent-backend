import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: [true,"First Name is required Please"],
        trim: true,
        maxLength:[30,"First Name can not exceed 30 characters"]
    },
    last_name:{
        type: String,
        required: [true,"Last Name is required Please"],
        trim: true,
        maxLength:[30,"Last Name can not exceed 30 characters"]
    },
    email:{
        type: String,
        required: [true,"Email is required Please"],
        trim: true,
        validate: [validator.isEmail,"Please enter a valid email"],
        unique: true,
        message:"Email Already Exists in Database"
    },
    username:{
        type: String,
        required: [true,"UserName is required Please"],
        trim: true,
        unique: true,
        maxLength:[30,"UserName can not exceed 30 characters"]
    },
    location:{
        type: String,
        required: [true,"Your location is required Please"],
        maxLength:[100,"Location can not exceed 100 characters"]
    },
    phone_number:{
        type: String,
        required: [true,"Phone Number is required Please"],
        trim: true,
        maxLength:[15,"Phone Number can not exceed 15 characters"]
    },
    password:{
        type: String,
        required: [true,"Password is required Please"],
        default: "User@123",
        select: false,
        minLength:[6,"Password must be atleast 6 characters"],
    },
    avatar:{
            type: String,
            required: true
    },
    role:{
        type: String,
        required: [true,"Role is required Please"],
        trim: true,
        enum: ["individual","suppliers","admin","operators"],
        default:"individual"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpires:{
        type: Date
    }
});

//hash password before saving
userSchema.pre("save",async function(next){
    if(!this.isModified()){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//generate token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//generate password reset token
userSchema.methods.generateResetPasswordToken = function(){
    //generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hash and set it to resetPasswordToken
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    //set token expire time
    this.resetPasswordExpires = Date.now()+30*60*1000;

    return resetToken;
}


export default mongoose.model("User",userSchema);