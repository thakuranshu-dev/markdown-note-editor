import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-light.css';

const MarkdownEditor = ({ savedNotes, setSavedNotes, markdown, setMarkdown }) => {
  	// const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nThis is a simple markdown editor. Start typing your markdown here...');

  	const handleChange = (e) => {
   		setMarkdown(e.target.value);
  	};

	const handleSave = () => {
		if (markdown.trim() !== '' &&
			markdown.trim() !== '# Welcome to Markdown Editor\n\nThis is a simple markdown editor. Start typing your markdown here...') {
			const notes = [...savedNotes, markdown];
			
			const existingNoteIndex = savedNotes.findIndex(note => note === markdown);
			if (existingNoteIndex !== -1) {
				const updatedNotes = [...savedNotes];
				updatedNotes[existingNoteIndex] = markdown;
				setSavedNotes(updatedNotes);
			} else 
				setSavedNotes(notes);

			localStorage.removeItem('notes');
			localStorage.setItem('notes', JSON.stringify(notes));
		} else {
			alert('Please write something before saving!');
		}
	};

	const getMarkdownText = () => {
		const rawHtml = marked.parse(markdown, { breaks: true });
		return { __html: DOMPurify.sanitize(rawHtml) };
	};

	return (
		<div style={styles.container}>
			<div style={styles.editorContainer}>
				<textarea
					style={styles.textarea}
					value={markdown}
					onChange={handleChange}
					placeholder="Write your markdown here..."
				/>
				<div className="markdown-body p-4 rounded shadow bg-white overflow-y-auto"
					style={styles.preview}
					dangerouslySetInnerHTML={getMarkdownText()}
				/>
			</div>
			<div className="flex justify-center">
				<button
					className="w-80 px-4 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
					style={styles.saveButton}
					onClick={handleSave}
				>
					Keep Note
				</button>
			</div>
		</div>
	);
};

const styles = {
  	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		padding: '10px',
		gap: '10px',
		boxSizing: 'border-box',
	},
	editorContainer: {
		display: 'flex',
		flex: 1,
		gap: '10px',
		overflow: 'hidden',
	},
	textarea: {
		flex: 1,
		padding: '10px',
		fontSize: '16px',
		fontFamily: 'monospace',
		border: '1px solid #ccc',
		borderRadius: '8px',
		resize: 'none',
		height: '100%',
	},
	preview: {
		flex: 1,
		padding: '10px',
		fontSize: '16px',
		border: '1px solid #ccc',
		borderRadius: '8px',
		overflowY: 'auto',
		height: '100%',
		backgroundColor: '#f9f9f9',
	},
	saveButton: {
		alignSelf: 'center',
		padding: '10px 20px',
		fontSize: '16px',
		color: 'white',
		backgroundColor: '#4CAF50',
		border: 'none',
		borderRadius: '8px',
		cursor: 'pointer',
		transition: 'background-color 0.3s',
	},
};

export default MarkdownEditor;
