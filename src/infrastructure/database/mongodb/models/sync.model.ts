import mongoose, { Schema } from "mongoose";

const SyncSchema = new Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export const SyncModel = mongoose.model("FailedSync", SyncSchema);