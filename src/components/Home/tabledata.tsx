import React, { useState } from "react";
import { deleteFile, getFileById } from "@/Helper/handleapi";
import {
  File,
  FileText,
  Download,
  Trash2,
  Eye,
  Folder,
} from "lucide-react";
import FileModal from "./fileModal"; // Import the modal component

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  folderId?: string;
  url: string;
  path: string;
  filename?: string;
  createdAt: Date;
}

interface ContentAreaProps {
  viewMode: "grid" | "list";
  filteredFiles: UploadedFile[];
  filteredFolders: UploadedFile[];
  selectedFiles: string[];
  onReloadFiles: () => void;
  onFileSelect: (fileId: string) => void;
  onFolderNavigate: (folderId: string) => void;
  onSelectAll: (checked: boolean) => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  viewMode,
  filteredFiles,
  filteredFolders,
  selectedFiles,
  onFileSelect,
  onFolderNavigate,
  onSelectAll,
  onReloadFiles,
}) => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
// File preview
  const handlePreviewClick = (fileId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering file selection
    setSelectedFileId(fileId);
    setIsModalOpen(true);
  };
// File download
  const handleDownloadClick = (file: UploadedFile, event: React.MouseEvent) => {
    event.stopPropagation();
    const link = document.createElement("a");
    link.href = file.path;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteClick = (fileId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    deleteFile(fileId, onReloadFiles);
  };

  return (
    <>
      <div className="min-h-[400px]">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Folders */}
            {filteredFolders.map((folder) => (
              <div
                key={folder.id}
                className="group relative p-4 border border-gray-3 rounded-lg hover:shadow-md hover:border-blue/50 duration-200 cursor-pointer bg-white"
                onDoubleClick={() => onFolderNavigate(folder.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <Folder className="w-12 h-12 text-blue mb-3" />
                  <h3 className="font-medium text-dark text-sm truncate w-full mb-1">
                    {folder.name}
                  </h3>
                  <p className="text-xs text-dark-4">
                    {folder.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}

            {/* Files */}
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`group relative p-4 border rounded-lg hover:shadow-md duration-200 cursor-pointer ${
                  selectedFiles.includes(file.id)
                    ? "border-blue bg-blue/5"
                    : "border-gray-3 bg-white hover:border-blue/50"
                }`}
                onClick={() => onFileSelect(file.id)}
              >
                <div className="flex flex-col items-center text-center">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={file.path}
                      alt={file.name}
                      className="w-8 h-8 object-cover rounded flex-shrink-0"
                    />
                  ) : file.type.startsWith("video/") ? (
                    <video
                      src={file.path}
                      className="w-8 h-8 rounded flex-shrink-0 object-cover"
                      muted
                      loop
                      playsInline
                    />
                  ) : file.type.includes("pdf") ? (
                    <iframe
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(
                        file.path
                      )}&embedded=true`}
                      className="w-12 h-12 rounded mb-3"
                      title={file.name}
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded">
                      <FileText className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <h3 className="font-medium text-dark text-sm truncate w-full mb-1">
                    {file.name}
                  </h3>
                  <p className="text-xs text-dark-4">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 duration-200">
                  <button
                    className="p-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                    title="Preview"
                    onClick={(e) => handlePreviewClick(file.id, e)}
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                  <button
                    className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                    title="Download"
                    onClick={(e) => handleDownloadClick(file, e)}
                  >
                    <Download className="w-3 h-3" />
                  </button>
                  <button
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Delete"
                    onClick={(e) => handleDeleteClick(file.id, e)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {selectedFiles.includes(file.id) && (
                  <div className="absolute top-2 left-2 w-4 h-4 bg-blue rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-3 rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-1 border-b border-gray-3 font-medium text-dark text-sm">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={
                    selectedFiles.length === filteredFiles.length &&
                    filteredFiles.length > 0
                  }
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded"
                />
              </div>
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Actions</div>
            </div>

            {/* Folders in list view */}
            {filteredFolders.map((folder) => (
              <div
                key={folder.id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-3 hover:bg-gray-1 duration-200 cursor-pointer"
                onDoubleClick={() => onFolderNavigate(folder.id)}
              >
                <div className="col-span-1"></div>
                <div className="col-span-5 flex items-center gap-3">
                  <Folder className="w-5 h-5 text-blue flex-shrink-0" />
                  <span className="font-medium text-dark truncate">
                    {folder.name}
                  </span>
                </div>
                <div className="col-span-2 text-dark-4 text-sm">—</div>
                <div className="col-span-2 text-dark-4 text-sm">
                  {folder.createdAt.toLocaleDateString()}
                </div>
              </div>
            ))}

            {/* Files in list view */}
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-3 hover:bg-gray-1 duration-200 cursor-pointer ${
                  selectedFiles.includes(file.id) ? "bg-blue/5" : ""
                }`}
              >
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => onFileSelect(file.id)}
                    className="rounded"
                  />
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={file.path}
                      alt={file.name}
                      className="w-8 h-8 object-cover rounded flex-shrink-0"
                    />
                  ) : file.type.startsWith("video/") ? (
                    <video
                      src={file.path}
                      className="w-8 h-8 rounded flex-shrink-0 object-cover"
                      muted
                      loop
                      playsInline
                    />
                  ) : file.type.includes("pdf") ? (
                    <iframe
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(
                        file.path
                      )}&embedded=true`}
                      className="w-12 h-12 rounded mb-3"
                      title={file.name}
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded">
                      <FileText className="w-5 h-5 text-gray-500" />
                    </div>
                  )}

                  <span className="font-medium text-dark truncate">
                    {file.name}
                  </span>
                </div>
                <div className="col-span-2 text-dark-4 text-sm">
                  {formatFileSize(file.size)}
                </div>
                <div className="col-span-2 text-dark-4 text-sm">
                  {file.uploadDate.toLocaleDateString()}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <button
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                    title="Preview"
                    onClick={(e) => handlePreviewClick(file.id, e)}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 text-green-500 hover:bg-green-50 rounded"
                    title="Download"
                    onClick={(e) => handleDownloadClick(file, e)}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    title="Delete"
                    onClick={(e) => handleDeleteClick(file.id, e)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredFiles.length === 0 && filteredFolders.length === 0 && (
          <div className="text-center py-12">
            <File className="w-16 h-16 text-dark-4 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark mb-2">No files found</h3>
            <p className="text-dark-4">
              Try adjusting your search or filter, or upload your first file to
              get started
            </p>
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      <FileModal
        isOpen={isModalOpen}
        fileId={selectedFileId}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFileId(null);
        }}
      />
    </>
  );
};

export default ContentArea;