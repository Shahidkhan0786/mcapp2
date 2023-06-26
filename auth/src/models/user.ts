import mongoose from "mongoose";
import { Password } from "../helper/password";

// A interface that describes the properties
//  that are requires to create new user
interface UserAttrs {
  email: string;
  password: string;
}

// A interface that describes the properties
//  that user model have
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// A interface that describes the properties
//  that user document  has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
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

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
});
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

User.build({
  email: "shahid@gmail.com",
  password: "123455",
});
export { User };
