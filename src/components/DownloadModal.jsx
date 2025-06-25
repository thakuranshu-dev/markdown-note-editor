import React from 'react';

const DownloadModal = ({ open, onClose, onDownloadMd, onDownloadHtml, onDownloadPdf }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-10 backdrop-blur-sm">
            <div className="bg-gray-400 rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-lg font-bold mb-4">Download Note</h2>
                <button
                    className="w-full mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={onDownloadMd}
                >
                    Download as .md
                </button>
                <button
                    className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={onDownloadHtml}
                >
                    Download as .html
                </button>
                <button
                    className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={onDownloadPdf}
                >
                    Download as .pdf
                </button>
                <button
                    className="w-full px-4 py-2 bg-gray-300 rounded hover:bg-red-500"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DownloadModal;