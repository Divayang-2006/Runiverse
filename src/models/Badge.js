import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

badgeSchema.methods.award = function (userId) {
  if (!this.users.includes(userId)) {
    this.users.push(userId);
  }
  return this.save();
};

badgeSchema.methods.revoke = function (userId) {
  this.users = this.users.filter(
    (id) => id.toString() !== userId.toString()
  );
  return this.save();
};

export default mongoose.model("Badge", badgeSchema);
