import { v2 as cloudinary } from "cloudinary";

class CloudinaryService {
  constructor() {
    this.cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    this.apiKey = process.env.CLOUDINARY_API_KEY;
    this.apiSecret = process.env.CLOUDINARY_API_SECRET;
    this.folder = process.env.CLOUDINARY_FOLDER || "ai-tools";

    if (this.cloudName && this.apiKey && this.apiSecret) {
      cloudinary.config({
        cloud_name: this.cloudName,
        api_key: this.apiKey,
        api_secret: this.apiSecret,
      });
    }
  }

  async uploadImage(imageBuffer, options = {}) {
    const { filename = `upload-${Date.now()}.png` } = options;

    if (!this.cloudName || !this.apiKey || !this.apiSecret) {
      throw new Error(
        "Cloudinary 未配置，请设置 CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET",
      );
    }

    const base64 = imageBuffer.toString("base64");
    const dataUri = `data:image/png;base64,${base64}`;

    const publicId = filename
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .slice(0, 120);

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: this.folder,
      public_id: publicId,
      resource_type: "image",
      overwrite: false,
    });

    return result.secure_url || result.url;
  }
}

export default new CloudinaryService();
