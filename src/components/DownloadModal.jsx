import { useState } from "react";
import { IoClose } from "react-icons/io5";
const DownloadModal = ({ open, onClose, onDownloadMd, onDownloadHtml, onDownloadPdf }) => {
	const [downloadAs, setDownloadAs] = useState(null);

	if (!open) return null;
	//  This component renders a modal for downloading notes in different formats
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-10 backdrop-blur-sm p-6">
			<div className="w-[90%] min-h-45 sm:min-h-40 flex flex-col gap-2 items-center bg-linear-to-r from-gray-100 to-blue-50 rounded-lg shadow-xl p-6 relative hover:scale-105 transition-transform duration-300">
				<h2 className="text-lg text-center font-bold mb-4">Export As</h2>

				<input type="text" name="fileName" id="filename" placeholder="Enter file name" value={downloadAs}
					onChange={(e) => setDownloadAs(e.target.value)}
					className="w-[90%] text-gray-700 placeholder:text-gray-300 px-0.5 ring ring-gray-300 focus:ring-2 focus:ring-blue-800 focus:outline-none rounded-md"
				/>

				<div className="flex flex-row flex-wrap gap-2 justify-center w-[90%]">
					<button
						className="w-full px-4 py-2 bg-linear-to-r from-pink-500 to-blue-500 text-white rounded hover:font-bold cursor-pointer transition-all duration-300"
						onClick={() => onDownloadMd(downloadAs)}
					>
						.md
					</button>
					<button
						className="w-[48%] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:font-bold cursor-pointer transition-all duration-300"
						onClick={() => onDownloadHtml(downloadAs)}
					>
						.html
					</button>
					<button
						className="w-[48%] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:font-bold cursor-pointer transition-all duration-300"
						onClick={() => onDownloadPdf(downloadAs)}
					>
						.pdf
					</button>
					<button
						className="size-5 flex items-center justify-center bg-gray-300/75 text-center hover:bg-red-500 rounded-full absolute top-1 right-1 transition-colors duration-300 cursor-pointer"
						onClick={onClose}
					>
						<IoClose size={17} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default DownloadModal;