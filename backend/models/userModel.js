const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // first_name: { type: String, required: true },
  // last_name: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // createdDate: { type: Date, default: Date.now },
  // updatedDate: { type: Date, default: Date.now },

  first_name: {
    type: String,
    required: true,
    maxlength: 35,
    validate: {
        validator: function (value) {
            return /^[A-Za-z]/.test(value);
        },
        message: "First name must start with an alphabet",
    },
},
last_name: {
    required: true,
    type: String,
    maxlength: 35,
    validate: {
        validator: function (value) {
            return /^[A-Za-z]/.test(value);
        },
    },
},
email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    lowercase: true,
},
password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
        validator: function (value) {
            return (
                /[A-Z]/.test(value) &&
                /[0-9]/.test(value) &&
                /[!@#$%^&*(),.?":{}|<>]/.test(value)
            );
        },
        message:
            "Password must contain at least one uppercase letter, one number, and one special character.",
    },
},
createdDate: {
  type: Date, default: Date.now
},
updatedDate: {
  type: Date, default: Date.now
},
});


const User = mongoose.model('Puser', userSchema);

module.exports = User;
