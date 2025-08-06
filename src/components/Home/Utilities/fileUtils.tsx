import { FileType,UploadedFile } from "@/components/Home/home";

export const getFileType = (mimeType: string): FileType => {
  if (mimeType.startsWith("image/")) return "images";
  if (mimeType.startsWith("video/")) return "videos";
  if (
    mimeType.includes("pdf") ||
    mimeType.includes("document") ||
    mimeType.includes("text")
  )
    return "documents";
  return "others";
};

export const mapFiles = (data: any[]): UploadedFile[] =>
  data.map((file) => ({
    id: file._id,
    name: file.originalname,
    size: file.size,
    type: file.mimetype,
    uploadDate: new Date(file.uploadedAt),
    folderId: file.folder !== "root" ? file.folder : undefined,
    path: file.path,
    filename: file.filename,
  }));

export const extractFolders = (mappedFiles: UploadedFile[]) =>
  Array.from(
    new Set(
      mappedFiles
        .map((file) => file.folderId)
        .filter((folder) => folder && folder !== "root")
    )
  ).map((folderName) => ({
    id: folderName!,
    name: folderName!,
    createdAt: new Date(),
  }));
