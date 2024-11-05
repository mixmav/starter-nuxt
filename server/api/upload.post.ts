// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { useRuntimeConfig } from '#imports';
// import { v4 as uuidv4 } from 'uuid';
import { defineAuthEventHandler } from '@/server/utils/auth';

export default defineAuthEventHandler(async () => {
  // let formData;
  // try {
  //   formData = await readMultipartFormData(event);
  // } catch {
  //   throw createError({
  //     statusCode: 400,
  //     message: 'Failed to parse form data',
  //   });
  // }
  // if (!formData || formData.length === 0) {
  //   throw createError({ statusCode: 400, message: 'No files uploaded' });
  // }
  // const postId = formData
  //   .find((field) => field.name === 'postId')
  //   ?.data.toString();
  // if (!postId) {
  //   throw createError({ statusCode: 400, message: 'postId is required' });
  // }
  // const config = useRuntimeConfig();
  // const {
  //   ACCOUNT_ID,
  //   ACCESS_KEY_ID,
  //   SECRET_ACCESS_KEY,
  //   BUCKET_NAME,
  //   CUSTOM_DOMAIN,
  // } = config.r2;
  // if (
  //   !ACCOUNT_ID ||
  //   !ACCESS_KEY_ID ||
  //   !SECRET_ACCESS_KEY ||
  //   !BUCKET_NAME ||
  //   !CUSTOM_DOMAIN
  // ) {
  //   throw createError({
  //     statusCode: 500,
  //     message: 'Missing required environment configuration',
  //   });
  // }
  // const s3Client = new S3Client({
  //   endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  //   region: 'auto',
  //   credentials: {
  //     accessKeyId: ACCESS_KEY_ID,
  //     secretAccessKey: SECRET_ACCESS_KEY,
  //   },
  // });
  // const uploadedFiles: { name: string; url: string }[] = [];
  // const allowedMimeTypes = [
  //   'image/jpeg',
  //   'image/png',
  //   'image/gif',
  //   'image/webp',
  // ];
  // const maxFileSize = 8 * 1024 * 1024; // 8MB
  // const fileFields = formData.filter((field) => field.filename && field.data);
  // const uploadPromises = fileFields.map(async (file) => {
  //   try {
  //     if (!file.filename || !file.data) {
  //       throw new Error('Missing file data or filename');
  //     }
  //     if (!allowedMimeTypes.includes(file.type || '')) {
  //       throw createError({ statusCode: 400, message: 'Invalid file type' });
  //     }
  //     if (file.data.length > maxFileSize) {
  //       throw createError({ statusCode: 400, message: 'File too large' });
  //     }
  //     const objectKey = `uploads/${uuidv4()}_${file.filename}`;
  //     const params = {
  //       Bucket: BUCKET_NAME,
  //       Key: objectKey,
  //       Body: file.data,
  //       ContentType: file.type,
  //     };
  //     await s3Client.send(new PutObjectCommand(params));
  //     const fileUrl = `${CUSTOM_DOMAIN}/${objectKey}`;
  //     uploadedFiles.push({ name: file.filename, url: fileUrl });
  //   } catch {
  //     throw createError({
  //       statusCode: 500,
  //       message: `Error uploading file: ${file.filename}`,
  //     });
  //   }
  // });
  // try {
  //   await Promise.all(uploadPromises);
  // } catch {
  //   throw createError({ statusCode: 500, message: 'Error uploading files' });
  // }
  const uploadedFiles = [
    {
      name: 'example.jpg',
      url: 'https://example.com/example.jpg',
    },
  ];
  return { files: uploadedFiles };
});
