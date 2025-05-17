const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
       
        lowercase: true,
        trim: true, 
        maxlength: [20, "First name should be less than or equal to 20 characters"]
    },

    lastName: {
        type: String,
       
        lowercase: true,
        trim: true, 
        maxlength: [20, "First name should be less than or equal to 20 characters"]
    },

    contactNumber: {
        type: String,
        required: true,
        unique: true
      },
      
    email: {
        type: String,
        trim: true,
        required: [true, "Email should be provoided"],
        unique: [true, "Email is already in use"],
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
        minlength: [6, "Password should be minimum 6 character long"]
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    address: {
        type: String
    }
}, {
    timestamps: true
});


userSchema.pre('save', async function () {

    //mongodb m save hon t pehla encryot hoja ga password kyunki pre wala middleware use kra h

 
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});


const User = mongoose.model("User", userSchema);  // ab User object hee use hoga hr jagah

module.exports = User;