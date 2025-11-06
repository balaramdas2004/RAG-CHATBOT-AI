"use client";

import { useRef } from "react";
import Icon from "@/components/Icon.jsx";

/**
 * Sidebar component for document management and uploading with 3D effects.
 * @param {{ documents: Array<object>, onFileUpload: (document: object) => void }} props
 */
export default function Sidebar({ documents = [], onFileUpload }) {
  const fileInputRef = useRef(null);

  /**
   * Handles the file input change event. Reads the selected .txt file
   * and calls the onFileUpload callback with the new document object.
   * @param {React.ChangeEvent<HTMLInputElement>} e The change event.
   */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      const newDocument = {
        id: 'doc-' + Date.now(),
        name: file.name,
        content: content,
      };
      onFileUpload(newDocument);

      // Reset the file input to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    }

    reader.readAsText(file);
  };

  return (
    <aside className="w-full md:w-80 glass-morphism flex flex-col p-4 border-r border-emerald-500/20 transition-all duration-300 perspective-3d lighting-effect relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-600/5 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-base-content/90 text-glow">Documents</h2>
          <div className="tooltip tooltip-left" data-tip={`${documents.length} documents loaded`}>
            <div className="badge badge-primary badge-outline pulse-glow">{documents.length}</div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto -mr-2 pr-2">
          <ul className="menu p-0 space-y-1">
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <li key={doc.id} className="slide-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <a className="flex items-center space-x-3 active:bg-primary active:text-primary-content group card-3d rounded-lg p-2 transition-all duration-300">
                    <Icon name="FileText" className="w-5 h-5 text-base-content/60 group-hover:text-primary-content transition-all duration-300 group-hover:scale-110" />
                    <span className="truncate text-sm font-medium">{doc.name}</span>
                  </a>
                </li>
              ))
            ) : (
              <div className="text-center text-base-content/50 mt-10 px-4 fade-in">
                <Icon name="FileX2" className="w-12 h-12 mx-auto mb-2 float-animation"/>
                <p className="text-sm">No documents yet.</p>
                <p className="text-xs">Upload a .txt file to start.</p>
              </div>
            )}
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-emerald-500/20 relative z-10">
          <input
            type="file"
            id="file-upload"
            accept=".txt,text/plain"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            aria-hidden="true"
          />
          <label
            htmlFor="file-upload"
            className="btn btn-primary w-full cursor-pointer shadow-lg btn-3d relative overflow-hidden group"
          >
            <Icon name="UploadCloud" className="w-5 h-5 mr-2 relative z-10 group-hover:animate-bounce" />
            <span className="relative z-10">Upload .txt File</span>
            <div className="absolute inset-0 shimmer opacity-30"></div>
          </label>
        </div>
      </div>
    </aside>
  );
}