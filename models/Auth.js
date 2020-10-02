const mongoose = require("mongoose");
const crypto = require("crypto");
const { timeStamp } = require("console");

const UserSchema = new mongoose.Schema()(
  {
    email: {
      type: "String",
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    name: {
      type: "String",
      trim: true,
      required: true,
    },
    hashed_password: {
      //Save as hash after encrypt using a function
      type: "String",
      required: true,
    },
    salt: "String",
    role: {
      type: "String",
      default: "User",
      //We also have other role like Admin
    },
    resetPasswordLink: {
      type: "String",
      default: "",
    },
  },
  { timeStamp: true }
);

//Virtual Password
UserSchema.virtual("password")
  .set(function (password) {
    //Set password note, you must use normal function not arrow function for "this"
    this.password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//Methods
UserSchema.methods = {
  //Genarate Salt
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
  //Encrypt Password
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

//Compare Passwords
