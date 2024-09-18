import { Schema, model } from "mongoose";

const PermissionSchema = new Schema({
  resource: { type: String, required: true },
  actions: [{ type: String, enum: ["create", "read", "update", "delete"] }],
});

const RoleSchema = new Schema({
  role: { type: String, required: true, unique: true },
  permissions: [PermissionSchema],
});

export const Role = model("Role", RoleSchema);
