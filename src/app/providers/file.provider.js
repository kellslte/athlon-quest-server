import LocalFileAdapter from "../../config/adapters/local.adapter.js";
import S3FileAdapter from "../../config/adapters/s3.adapter.js";
import CloudinaryFileAdapter from "../../config/adapters/cloudinary.adapter.js";
import AppConfig from "../../config/app.config.js";

class FileProvider {
  constructor() {
    this.adapter = this.registerAdapter(AppConfig.getOrThrow("file_adapter"));
  }

  registerAdapter(adapter) {
    if (adapter === "local") {
      return new LocalFileAdapter();
    } else if (adapter === "s3") {
      return new S3FileAdapter();
    } else if (adapter === "cloudinary") {
      return new CloudinaryFileAdapter();
    } else {
      throw new Error(`Unsupported file adapter: ${adapter}`);
    }
  }

  async uploadFile ( file, directory = '')
  {
    return await this.adapter.uploadFile(file, directory);
  }

  async uploadMultiple ( files, directory = '' )
  {
    const promises = files.map((file) =>
      this.adapter.uploadFile(file, directory)
    );
    return await Promise.all(promises);

  }

  async deleteFile ( fileUrl )
  {
    return await this.adapter.deleteFile(fileUrl);
  }
}

export default FileProvider;