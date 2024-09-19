import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import AppConfig from "../../config/app.config.js";
import { randomUUID } from "crypto";

class S3FileAdapter {
  constructor() {
    this.fileClient = new S3Client({
      region: AppConfig.getOrThrow("s3_region"),
      endpoint: AppConfig.getOrThrow("s3_endpoint"),
    });
    this.bucketName = AppConfig.getOrThrow("s3_bucket_name");
  }

  async uploadFile(file, directory) {
    return await this.fileClient.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: randomUUID(),
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );
  }

  async uploadFiles(files, directory) {
    const promises = files.map((file) => this.uploadFile(file, directory));
    return await Promise.all(promises);
  }

  async deleteFile(fileUrl) {
    await this.fileClient.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: fileUrl.split("/").pop(),
      })
    );
  }
}

export default S3FileAdapter;
