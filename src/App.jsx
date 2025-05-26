// App.jsx
import React, { useState, useEffect } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import StickyNote from './components/stickyNote';
import 'github-markdown-css/github-markdown-light.css';

const App = () => {
  	const [savedNotes, setSavedNotes] = useState([]);
  	useEffect(() => {
    	const notes = JSON.parse(localStorage.getItem('notes')) || [];
    	setSavedNotes(notes);
  	}, []);

  	return (
    	<div className="flex h-screen">
      		{/* Editor Panel */}
      		<div className={"fixed md:static top-0 left-0 w-full md:w-1/2 h-full z-20 bg-white transition-transform duration-300 ease-in-out 'translate-x-0"}
      		>
        		<MarkdownEditor />
      		</div>

      		{/* Saved Notes Panel */}
			<div className="w-full md:w-1/2 p-4 overflow-y-auto bg-gray-100">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">Saved Notes...</h2>
				</div>

				{/* Using Ternary Operator */}
				{savedNotes.length === 0 ? (
					<p className="text-gray-500">No notes saved yet.</p>
				) : (
					savedNotes.map((note, index) => (
						<StickyNote
						key={index}
						noteId={index + 1}
						markdownNote={note}
						/>
					))
				)}
			</div>
    	</div>
  	);
};

export default App;