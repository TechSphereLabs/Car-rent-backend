import mongoose from "mongoose";


const carsSchema = new mongoose.Schema({
    car_name:{
        type: String,
        required: [true,"Car Name is required Please"],
        trim: true,
        maxLength:[50,"Car Name can not exceed 50 characters"]
    },
    plack:{
        type: String,
        required: [true,"Plack is required Please"],
        trim: true,
        maxLength:[50,"Plack can not exceed 50 characters"],
        unique: true
    },
    serial_number:{
        type: String,
        required: [true,"Serial Number is required Please"],
        trim: true,
        maxLength:[50,"Serial Number can not exceed 50 characters"],
        unique: true
    },
    manufacture_year:{
        type: Number,
        required: [true,"Manufacture Year is required Please"],
        trim: true,
        maxLength:[10,"Manufacture Year can not exceed 10 characters"],
        index: true
    },
    car_brand:{
        type: String,
        required: [true,"Car Brand is required Please"],
        maxLength:[30,"Car brand can not exceed 30 characters"]
    },
    transmission_type:{
        type: String,
        enum: ["manual" , "automatic"],
        required: [true,"Transmission type is required Please"],
    },
    fuel_type:{
        type: String,
        required: [true,"Fuel Type is required Please"],
        enum: ["petrol" , "diesel" , "hybrid" , "electric"],
        maxLength:[30,"Car brand can not exceed 30 characters"]
    },
    rental_cost_per_day:{
        type: Number,
        required: [true,"Rental cost per day is required Please"],
    },
    current_status:{
        type: String,
        default: "available",
        enum:['available','under_use','under_maintance','sold']
    },
    images:[
        {
            type: String,
            required: true
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    },
});


export default mongoose.model("Car",carsSchema);