import React, { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import { getFileById } from "@/Helper/handleapi";

interface FileModalProps {
  isOpen: boolean;
  fileId: string | null;
  onClose: () => void;
}
// File Modal
const FileModal: React.FC<FileModalProps> = ({
  isOpen,
  fileId,
  onClose,
}) => {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && fileId) {
      fetchFile();
    }
  }, [isOpen, fileId]);
//fetch file
  const fetchFile = async () => {
    if (!fileId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getFileById(fileId);
      setFile(response);
    } catch (err) {
      setError("Failed to load file");
      console.error("Error fetching file:", err);
    } finally {
      setLoading(false);
    }
  };
//download file 
  const handleDownload = () => {
    if (file?.path) {
      const link = document.createElement("a");
      link.href = file.path;
      link.download = file.name || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
//get file type
  const getFileType = (file: any) => {
    if (file.type && file.type.trim() !== "") {
      return file.type;
    }

    const nameOrPath = file.name || file.path || "";
    const extension = nameOrPath.split('.').pop()?.toLowerCase();

    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "webp":
        return "image/webp";
      case "svg":
        return "image/svg+xml";
      case "mp4":
        return "video/mp4";
      case "webm":
        return "video/webm";
      case "avi":
        return "video/avi";
      case "mov":
        return "video/mov";
      case "pdf":
        return "application/pdf";
      case "txt":
        return "text/plain";
      case "doc":
      case "docx":
        return "application/msword";
      case "xls":
      case "xlsx":
        return "application/vnd.ms-excel";
      case "ppt":
      case "pptx":
        return "application/vnd.ms-powerpoint";
      default:
        console.warn("Unknown file type — full file data:", file);
        return "application/octet-stream";
    }
  };

  const renderFilePreview = () => {
    if (!file) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No file selected</p>
        </div>
      );
    }

    const fileType = getFileType(file);

    return (
      <div className="w-full">
        <div className="flex flex-col items-center text-center space-y-4">
          {fileType.startsWith("image/") ? (
            <img
              src={file.path}
              alt={file.name || "File preview"}
              className="max-w-full max-h-[500px] object-contain rounded shadow-lg"
            />
          ) : fileType.startsWith("video/") ? (
            <video
              src={file.path}
              className="max-w-full max-h-[500px] rounded shadow-lg"
              controls
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          ) : fileType.includes("pdf") ? (
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                file.path
              )}&embedded=true`}
              className="w-full h-[500px] rounded shadow-lg"
              title={file.name || "PDF preview"}
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded shadow-lg">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Preview not available ({file.name?.split(".").pop()?.toUpperCase() || "Unknown"})
              </p>
            </div>
          )}

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              {file.size ? formatFileSize(file.size) : "Unknown size"} • {fileType}
            </p>
          </div>

          {!fileType.startsWith("image/") &&
            !fileType.startsWith("video/") &&
            !fileType.includes("pdf") && (
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download File
              </button>
            )}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200" style={{ padding: "1rem" }}>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {loading ? "Loading..." : file?.name || "File Preview"}
            </h2>
            {file && (
              <p className="text-sm text-gray-500">
                {file.size && `${formatFileSize(file.size)} • `}
                {getFileType(file)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4">
            {file && (
              <button
                onClick={handleDownload}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-500">Loading file...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-64 text-center">
              <div className="space-y-4">
                <p className="text-red-500">{error}</p>
                <button
                  onClick={fetchFile}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="w-full min-h-[400px] flex items-center justify-center">
              {renderFilePreview()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper: Format file size nicely
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default FileModal;
