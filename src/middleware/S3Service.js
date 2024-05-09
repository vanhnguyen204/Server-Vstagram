import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
export const s3Uploadv3 = async (files) => {
  const s3client = new S3Client({ region: 'ap-southeast-2' });

  const uploadResults = await Promise.all(
    files.map(async file => {
      const fileData = fs.readFileSync(file.path);
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: fileData,
        ContentType: 'audio/mpeg'
      };

      try {
        await s3client.send(new PutObjectCommand(params));
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;

        return fileUrl;
      } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
      }
    })
  );

  return uploadResults;
};
export const s3Uploadv3Image = async (file) => {
  const s3client = new S3Client({ region: 'ap-southeast-2' });

  const fileData = fs.readFileSync(file.path);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: fileData,
    ContentType: file.mimetype // Sử dụng contentType được truyền vào từ đối số
  };

  try {
    await s3client.send(new PutObjectCommand(params));

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

export const s3UploadMultipleImage = async (files) => {
  const s3client = new S3Client({ region: 'ap-southeast-2' });

  const uploadResults = await Promise.all(
    files.map(async file => {
      const fileData = fs.readFileSync(file.path);
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: fileData,
        ContentType: file.mimetype,
      };

      try {
        await s3client.send(new PutObjectCommand(params));
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;

        return fileUrl;
      } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
      }
    })
  );

  return uploadResults;
};