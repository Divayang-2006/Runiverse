// src/models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // relation to User
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// OOP-style methods
taskSchema.methods.markCompleted = function () {
  this.isCompleted = true;
  return this.save();
};

taskSchema.methods.unmarkCompleted = function () {
  this.isCompleted = false;
  return this.save();
};

export default mongoose.model("Task", taskSchema);
