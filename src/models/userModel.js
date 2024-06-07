const mongoose= require("mongoose")
const bcrypt= require("bcrypt")
const userShema= new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type:String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "superadmin"],
        default: "admin"
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userShema.pre("save", async function next(){
    const user=this
    if(user.isDirectModified('password')){
        user.password= await bcrypt.hash(user.password, 10)
    }
})

const  User= mongoose.model("User", userShema)

module.exports= User