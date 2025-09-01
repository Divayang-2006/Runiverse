// src/models/Territory.js
import mongoose from "mongoose";

const territorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // GeoJSON for map-based claiming
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    // Claimed by user
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

// Enable geospatial queries
territorySchema.index({ location: "2dsphere" });

/* ----------------- OOP-style methods ----------------- */

// Claim territory
territorySchema.methods.capture = function (userId) {
  if (this.claimedBy) {
    throw new Error("Territory already claimed");
  }
  this.claimedBy = userId;
  return this.save();
};

// Release territory
territorySchema.methods.release = function () {
  if (!this.claimedBy) {
    throw new Error("Territory is not claimed");
  }
  this.claimedBy = null;
  return this.save();
};

export default mongoose.model("Territory", territorySchema);
