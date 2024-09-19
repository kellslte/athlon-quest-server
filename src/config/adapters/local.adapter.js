import { promises as fs } from "fs";
import { join } from "path";
const { unlink: unlinkAsync } = fs;

class LocalFileAdapter {
  async uploadFile(file, directory) {
    const uploadPath = join(
      `${process.cwd()}/public`,
      "uploads",
      directory,
      file.originalname
    );

    // Save file to local filesystem
    fs.writeFile(uploadPath, file.buffer);

    // Return file URL (in this case, it's a local path)
    return uploadPath;
  }

  async uploadMultiple(files, directory) {
    const promises = files.map((file) => this.uploadFile(file, directory));
    return await Promise.all(promises);
  }

  async deleteFile(fileUrl) {
    await unlinkAsync(fileUrl);
    return true;
  }
}

export default LocalFileAdapter;
