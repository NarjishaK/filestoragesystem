import React, { useState, useEffect } from "react";
import { X, Download, Trash2 } from "lucide-react";
import { getFileById } from "@/Helper/handleapi";

interface FileModalProps {
  isOpen: boolean;
  fileId: string | null;
  onClose: () => void;
  onDelete?: (fileId: string) => void;
}

const FileModal: React.FC<FileModalProps> = ({
  isOpen,
  fileId,
  onClose,
  onDelete,
}) => {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && fileId) {
      fetchFile();
    }
  }, [isOpen, fileId]);

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

  const handleDelete = () => {
    if (file?.id && onDelete) {
      onDelete(file.id);
      onClose();
    }
  };

  const renderFilePreview = () => {
    if (!file) return null;

    const fileType = file.type || "image/jpeg" || "video/mp4" || "application/pdf" || "text/plain";
    
    return (
      <div className="flex flex-col items-center text-center">
        {fileType.startsWith("image/") ? (
          <img
            src={file.path}
            alt={file.name}
            className="max-w-full max-h-[500px] object-contain rounded shadow-lg mb-6"
          />
        ) : fileType.startsWith("video/") ? (
          <video
            src={file.path}
            className="max-w-full max-h-[500px] rounded shadow-lg mb-6"
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
            className="w-full h-[500px] rounded shadow-lg mb-6"
            title={file.name}
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded shadow-lg mb-6">
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
        )}
        <h3 className="font-medium text-dark text-lg truncate w-full mb-2">
          {file.name}
        </h3>
        <p className="text-sm text-dark-4 mb-4">
          {formatFileSize(file.size)} • {fileType || 'Unknown type'}
        </p>
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
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {loading ? "Loading..." : file?.name || "File Preview"}
            </h2>
            {file && (
              <p className="text-sm text-gray-500">
                {file.size && `${formatFileSize(file.size)} • `}
                {file.type}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            {file && (
              <>
                <button
                  onClick={handleDownload}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </button>
              </>
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
        <div className="flex-1 overflow-auto p-4">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center h-64 text-center">
              <div>
                <p className="text-red-500 mb-2">{error}</p>
                <button
                  onClick={fetchFile}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
          
          {!loading && !error && file && (
            <div className="flex items-center justify-center min-h-[400px]">
              {renderFilePreview()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function (you might already have this in your ContentArea)
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default FileModal;