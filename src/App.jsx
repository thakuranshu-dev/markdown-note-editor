// App.jsx
import React, { useState, useEffect } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import StickyNotes from './components/stickyNote';
import 'github-markdown-css/github-markdown-light.css';

const App = () => {
  	const [savedNotes, setSavedNotes] = useState([]);
	const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nThis is a simple markdown editor. Start typing your markdown here...');
  	useEffect(() => {
		try {
			const notes = JSON.parse(localStorage.getItem('notes')) || [];
    		setSavedNotes(notes);
		} catch (error) {
			setSavedNotes([]);
			console.error('Error parsing saved notes from localStorage:', error);
		}
  	}, []);

  	// Pass setSavedNotes to children so they can update notes
  	return (
    	<div className="flex h-screen">
      		{/* Editor Panel */}
      		<div className={"fixed md:static top-0 left-0 w-full md:w-1/2 h-full z-20 bg-white transition-transform duration-300 ease-in-out 'translate-x-0"}
      		>
        		<MarkdownEditor savedNotes={savedNotes} 
				setSavedNotes={setSavedNotes} 
				markdown={markdown} 
				setMarkdown={setMarkdown} />
      		</div>

      		{/* Saved Notes Panel */}
			<div className="w-full md:w-1/2 p-4 overflow-y-auto bg-gray-100">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">Saved Notes...</h2>
				</div>

				{/* Using Ternary Operator */}
				{savedNotes.length === 0 ? (
					<p className="text-gray-500">No notes saved yet.</p>
				) : (savedNotes.map((markdownNote, idx) => (
						<StickyNotes
						key={idx}
						savedNotes={savedNotes}
						setSavedNotes={setSavedNotes}
						noteIndex={idx} 
						mdNote={markdownNote}
						setMarkdown={setMarkdown}
						/>
            		))
				)}
			</div>
    	</div>
  	);
};

export default App;