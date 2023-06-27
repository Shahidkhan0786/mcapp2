import mongoose from "mongoose";
import { Password } from "../helper/password";

// A interface that describes the properties
//  that are requires to create new user
interface UserAttrs {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model("User", userSchema);

export { User };
