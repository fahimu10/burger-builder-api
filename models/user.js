const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLenght: 5,
    maxLenght: 255,
  },
  password: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 1024,
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this.id, email: this.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "3h" }
  );
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
};

module.exports.User = model("User", userSchema);
module.exports.validate = validateUser;
