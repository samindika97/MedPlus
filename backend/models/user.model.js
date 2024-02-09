const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  specialization:{type: String},
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (password, callback) {
  const user = this;

  bcrypt.compare(password, this.password, function (err, isMatch) {
    callback(err, isMatch);
  });
};

module.exports = mongoose.model.Users || mongoose.model("User", UserSchema);
