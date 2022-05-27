const { type } = require("express/lib/response")
const {Schema, model, models} = require("mongoose")

const emailRegex = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/') 
const passRegex = new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/")
const nameRegex = new RegExp("/^[a-zA-Z]+$/g")
const phoneRegex = new RegExp("/^\d+$/")

const userSchema = new Schema({
    rol:{
        type: String,
        required: true,
        enum: {
            values:["admmin", "superAdmin", "user"],
            message: "invalid rol",
        }
    },
    email:{
        type: String,
        required: true,
        match: [emailRegex, "invalid email"],
        validate: [{
            validator(value){
                return models.User.findOne({email:value})
                .then((user)=>!user)
                .catch(()=>false)
            },
            message:"email already exist",
        }]
},
    password: {
        type: String,
        required: true,
        minlength: [8, "password too short"],
        match:[passRegex, "your password is not secure"]
    } ,
    name:{
        type: String,
        required: true,
        match: [nameRegex, "your name shouldn't contain numbers"],
        maxlength:[10, "name too long"]

    },
    Phone:{
        type: Number,
        required: true,
        match: [phoneRegex, "your phone number shouldn't contain letters"]
        
    },
})

const User = model("user", userSchema);

module.exports = User;