import AppConfig from "../../config/app.config.js";
import { v2 } from "cloudinary";

class CloudinaryFileAdapter {
  constructor() {
    const config = {
      cloud_name: AppConfig.getOrThrow("cloudinary_cloud_name"),
      api_key: AppConfig.getOrThrow("cloudinary_api_key"),
      api_secret: AppConfig.getOrThrow("cloudinary_api_secret"),
    };

    this.fileClient = v2.config(config);
  }

  async uploadFile(file, directory) {
    const uploadOptions = {
      folder: directory,
      resource_type: "auto",
    };

    const result = await this.fileClient.uploader.upload(
      file.path,
      uploadOptions
    );

    return result.secure_url;
  }

  async uploadMultiple(files, directory) {
    const promises = files.map((file) => this.uploadFile(file, directory));
    return await Promise.all(promises);
  }

  async deleteFile(fileUrl) {
    const publicId = fileUrl.split("/").pop().split(".")[0]; // Extract public ID from the URL
    await this.fileClient.uploader.destroy(publicId);
    return true;
  }
}

export default CloudinaryFileAdapter;
