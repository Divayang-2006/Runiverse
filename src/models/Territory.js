import mongoose from "mongoose";

const territorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);
territorySchema.index({ location: "2dsphere" });

territorySchema.methods.capture = function (userId) {
  if (this.claimedBy) {
    throw new Error("Territory already claimed");
  }
  this.claimedBy = userId;
  return this.save();
};

territorySchema.methods.release = function () {
  if (!this.claimedBy) {
    throw new Error("Territory is not claimed");
  }
  this.claimedBy = null;
  return this.save();
};

export default mongoose.model("Territory", territorySchema);
