import { Role } from "../schema/access-control.schema.js";

class RoleService {
  static async getRoles() {
    return await Role.find();
  }

  static async getRoleById(id) {
    return await Role.findById(id);
  }

  static async getRoleByName(name) {
    return await Role.findOne({ role: name });
  }

  static async createRole({ name, description, permissions }) {}

  static async createMany(payload) {
    return await Role.insertMany(payload);
  }

  static async updateRole(id, payload) {
    return await Role.findByIdAndUpdate(id, payload, { new: true });
  }

  static async deleteRole(id) {
    await Role.findByIdAndDelete(id);
  }

  static async deleteMany() {
    await Role.deleteMany();
  }
}

export default RoleService;
