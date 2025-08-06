"use client";
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  folderId?: string;
  path: string;
  filename?: string;
}
export type FileType = "all" | "images" | "documents" | "videos" | "others";
import React, { useState, useRef } from "react";
import { Upload, FolderPlus, X, Grid, List } from "lucide-react";
import FilterComponent from "./filterpage";
import BreadcrumbComponent from "../Common/Breadcrumb";
import ContentArea from "./content";
import { fetchFiles } from "@/Helper/handleapi";
import { useEffect } from "react"; // Make sure it's imported

const FileUploadManager: React.FC = () => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [fileFilter, setFileFilter] = useState<FileType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploading, setIsUploading] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  //fetch files
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchFiles();
        const mappedFiles: UploadedFile[] = data.map((file: any) => ({
          id: file._id,
          name: file.originalname,
          size: file.size,
          type: file.mimetype,
          uploadDate: new Date(file.uploadedAt),
          folderId: file.folder !== "root" ? file.folder : undefined,
          path: file.path,
          filename: file.filename,
        }));

        setFiles(mappedFiles);

        // Dynamically generate unique folders
        const uniqueFolders = Array.from(
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

        setFolders(uniqueFolders);
      } catch (err) {
        console.error("Failed to fetch files", err);
      }
    };

    getData();
  }, []);

  // File type detection
  const getFileType = (mimeType: string): FileType => {
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
  // Filter files
  const filteredFiles = files.filter((file) => {
    const matchesFolder = currentFolder
      ? file.folderId === currentFolder
      : !file.folderId;
    const matchesFilter =
      fileFilter === "all" || getFileType(file.type) === fileFilter;
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFolder && matchesFilter && matchesSearch;
  });
  // Filter folders
  const filteredFolders = folders.filter((folder) => {
    const isRoot = currentFolder === null || currentFolder === "root";
    const isNotRoot = folder.id !== "root";
    const matchesSearch = folder.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // Only show subfolders in root view
    return isRoot && isNotRoot && matchesSearch;
  });

  // search
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    console.log("Search term:", term);
  };
  // filter
  const handleFilterChange = (filter: FileType) => {
    setFileFilter(filter);
    console.log("Filter changed to:", filter);
  };
  //breadcrumb
  const handleNavigate = (folderId: string | null) => {
    setCurrentFolder(folderId);
    console.log("Navigating to folder:", folderId || "Home");
  };
  // File selection handler
  const handleFileSelect = (fileId: string) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles((prev) => prev.filter((id) => id !== fileId));
    } else {
      setSelectedFiles((prev) => [...prev, fileId]);
    }
  };
  // Select all handler
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(filteredFiles.map((f) => f.id));
    } else {
      setSelectedFiles([]);
    }
  };

  // Folder navigation handler
  const handleFolderNavigate = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-2 border border-gray-3">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div
          className="flex flex-wrap items-center gap-3"
          style={{ paddingTop: "100px" }}
        >
          <button
            onClick={() => setShowNewFolderModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-1 text-dark border border-gray-3 rounded-md hover:bg-gray-2 duration-200"
          >
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded-md hover:bg-blue/90 duration-200 disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {isUploading ? "Uploading..." : "Upload Files"}
          </button>

          <button
            onClick={() => folderInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-blue/10 text-blue border border-blue/20 rounded-md hover:bg-blue/20 duration-200 disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            Upload Folder
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6 p-4 bg-gray-1 rounded-lg">
        {/* Search */}
        <div className="w-full max-w-7xl mx-auto p-6">
          <FilterComponent
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            fileFilter={fileFilter}
            onFilterChange={handleFilterChange}
            className="mb-6"
          />
        </div>
        {/* View Mode Toggle */}
        <div className="flex items-center bg-white border border-gray-3 rounded-md overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 duration-200 ${
              viewMode === "grid"
                ? "bg-blue text-white"
                : "text-dark-4 hover:bg-gray-1"
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 duration-200 ${
              viewMode === "list"
                ? "bg-blue text-white"
                : "text-dark-4 hover:bg-gray-1"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Breadcrumb */}
      <BreadcrumbComponent
        currentFolder={currentFolder}
        folders={folders}
        onNavigate={handleNavigate}
        className="mb-4 p-3 bg-gray-1 rounded-lg"
      />
      {/* Drop Zone */}
      <div className="border-2 border-dashed border-gray-3 rounded-lg p-8 mb-6 text-center hover:border-blue/50 hover:bg-blue/5 duration-200">
        <Upload className="w-12 h-12 text-dark-4 mx-auto mb-4" />
        <p className="text-dark-3 mb-2">
          Drag and drop files here or click to browse
        </p>
        <p className="text-dark-4 text-sm">Supports all file types</p>
      </div>
      {/* Content Area */}
      <ContentArea
        viewMode={viewMode}
        filteredFiles={filteredFiles}
        filteredFolders={filteredFolders}
        selectedFiles={selectedFiles}
        onFileSelect={handleFileSelect}
        onFolderNavigate={handleFolderNavigate}
        onSelectAll={handleSelectAll}
      />
      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-3">
              <h3 className="text-lg font-medium text-dark">
                Create New Folder
              </h3>
              <button
                onClick={() => {
                  setShowNewFolderModal(false);
                  setNewFolderName("");
                }}
                className="p-1 text-dark-4 hover:text-dark hover:bg-gray-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-3 rounded-md focus:border-blue focus:ring-2 focus:ring-blue/20 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-3">
              <button
                onClick={() => {
                  setShowNewFolderModal(false);
                  setNewFolderName("");
                }}
                className="px-4 py-2 text-dark-4 hover:bg-gray-1 rounded-md duration-200"
              >
                Cancel
              </button>
              <button
                disabled={!newFolderName.trim()}
                className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue/90 duration-200 disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadManager;
