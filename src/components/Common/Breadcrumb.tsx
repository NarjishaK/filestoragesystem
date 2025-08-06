import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Folder {
  id: string;
  name: string;
  createdAt: Date;
  parentId?: string;
}

interface BreadcrumbItem {
  id: string | null;
  name: string;
  isClickable?: boolean;
}

interface BreadcrumbComponentProps {
  currentFolder: string | null;
  folders: Folder[];
  onNavigate: (folderId: string | null) => void;
  className?: string;
  separator?: React.ReactNode;
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  currentFolder,
  folders,
  onNavigate,
  className = "",
  separator = <ChevronRight className="w-4 h-4 text-dark-4" />
}) => {
  // Build breadcrumb path
  const buildBreadcrumbPath = (): BreadcrumbItem[] => {
    const path: BreadcrumbItem[] = [{ id: null, name: 'Home', isClickable: true }];
    
    if (!currentFolder) return path;

    // Find the current folder and build path up to root
    const buildPath = (folderId: string): BreadcrumbItem[] => {
      const folder = folders.find(f => f.id === folderId);
      if (!folder) return [];

      const pathItems: BreadcrumbItem[] = [];
      
      // If folder has parent, recursively build path
      if (folder.parentId) {
        pathItems.push(...buildPath(folder.parentId));
      }
      
      pathItems.push({
        id: folder.id,
        name: folder.name,
        isClickable: true
      });

      return pathItems;
    };

    const folderPath = buildPath(currentFolder);
    return [...path, ...folderPath];
  };

  const breadcrumbPath = buildBreadcrumbPath();

  // Don't render if we're at root level
  if (!currentFolder) return null;

  return (
    <div className="mb-6">
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {breadcrumbPath.map((item, index) => {
          const isLast = index === breadcrumbPath.length - 1;
          
          return (
            <li key={item.id || 'home'} className="flex items-center gap-2">
              {item.isClickable && !isLast ? (
                <button
                  onClick={() => onNavigate(item.id)}
                  className="text-blue hover:underline transition-colors duration-200"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.name}
                </button>
              ) : (
                <span className={isLast ? "text-dark font-medium" : "text-dark-4"}>
                  {item.name}
                </span>
              )}
              
              {!isLast && (
                <span className="flex items-center" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
    </div>
  );
};

export default BreadcrumbComponent;