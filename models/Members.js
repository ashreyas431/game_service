import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

const Member = mongoose.model("Member", memberSchema);
export default Member;
