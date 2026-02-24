import React from 'react';

const DownloadModal = ({ open, onClose, onDownloadMd, onDownloadHtml, onDownloadPdf }) => {
    if (!open) return null;
    //  This component renders a modal for downloading notes in different formats
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-10 backdrop-blur-sm ">
            <div className="min-h-45 flex flex-col gap-2 items-center bg-gray-400 rounded-lg shadow-lg p-4 w-[90%]">
                <h2 className="text-lg text-center font-bold mb-4">Download Note</h2>
                <button
                    className="w-50 mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                    onClick={onDownloadMd}
                >
                    Download as .md
                </button>
                <button
                    className="w-50 mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                    onClick={onDownloadHtml}
                >
                    Download as .html
                </button>
                <button
                    className="w-50 mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                    onClick={onDownloadPdf}
                >
                    Download as .pdf
                </button>
                <button
                    className="w-50 px-4 py-2 bg-gray-300 rounded hover:bg-red-500"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DownloadModal;