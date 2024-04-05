import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUpload: f({
    image: { maxFileSize: "4MB", maxFileCount: 50 },
  }).onUploadComplete(() => {
    console.log("Upload complete");
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
