import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET
});

export class Cloudinary {
  static async uploadFile(file: File) {
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const imageType = file.type.split('/')[1];

    const response = await cloudinary.uploader.upload(`data:image/${imageType};base64,${base64Image}`);

    return response.secure_url;
  }

  static async deleteFile(secureUrl: string) {
    try {
      const imageName = secureUrl.split('/').pop() ?? '';
      const publicId = imageName.split('.')[0];

      const resDeleted = await cloudinary.uploader.destroy(publicId);

      console.log({ resDeleted });

      return true;
    } catch (error) {
      console.log('Error at deleteFile', error);
      return false;
    }
  }
}
