import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    time: {
      type: String, 
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // GeoJSON
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      address: {
        type: String,
        trim: true,
      },
    },
    category: {
      type: String,
      enum: ["Music", "Sports", "Meetup", "Workshop", "Festival", "Other"],
      default: "Other",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to User model
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

// Geo index for location queries
eventSchema.index({ location: "2dsphere" });

const Event = mongoose.model("Event", eventSchema);

export default Event;
