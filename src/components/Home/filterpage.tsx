import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  File, 
  Image, 
  FileText, 
  Video 
} from 'lucide-react';

export type FileType = 'all' | 'images' | 'documents' | 'videos' | 'others';

interface FilterComponentProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  fileFilter: FileType;
  onFilterChange: (filter: FileType) => void;
  className?: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  searchTerm,
  onSearchChange,
  fileFilter,
  onFilterChange,
}) => {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const fileTypeOptions = [
    { value: 'all', label: 'All Files', icon: <File className="w-4 h-4" /> },
    { value: 'images', label: 'Images', icon: <Image className="w-4 h-4" /> },
    { value: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { value: 'videos', label: 'Videos', icon: <Video className="w-4 h-4" /> },
    { value: 'others', label: 'Others', icon: <File className="w-4 h-4" /> }
  ];

  return (
    <div className="flex items-center gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-4" />
        <input
          type="text"
          placeholder="Search files and folders..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-3 rounded-md focus:border-blue focus:ring-2 focus:ring-blue/20 focus:outline-none"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-3 rounded-md hover:bg-gray-1 duration-200"
        >
          <Filter className="w-4 h-4" />
          {fileTypeOptions.find(opt => opt.value === fileFilter)?.label}
          <ChevronDown className={`w-4 h-4 duration-200 ${filterDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {filterDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-3 rounded-md shadow-2 z-10 py-2">
            {fileTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onFilterChange(option.value as FileType);
                  setFilterDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-1 duration-200 ${
                  fileFilter === option.value ? 'bg-blue/10 text-blue' : 'text-dark-3'
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;