import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-light.css';

const MarkdownEditor = ({ savedNotes, setSavedNotes, markdown, setMarkdown }) => {
  	const [loading, setLoading] = useState(false);
	const [isAIDocs, setIsAIDocs] = useState(false);

  	const handleChange = (e) => {
		// Check if the input starts with '@ai_docs'. If it does, set isAIDocs to true, otherwise false
		// Continuously update the markdown state to reflect the current input value
   		const value = e.target.value;
   		setIsAIDocs(value.startsWith('@ai_docs'));
   		setMarkdown(value);
  	};

	// Function to handle saving the markdown content
  // It checks if the markdown string is not empty and not equal to the default welcome message
	const handleSave = () => {
		const markdownStr = typeof markdown === 'string' ? markdown : JSON.stringify(markdown);

		{ /* Check if the markdown string is not empty and not equal to the default welcome message */ }
		if (
			markdownStr.trim() !== '' &&
			markdownStr.trim() !== '# Welcome to Markdown Editor\n\nThis is a simple markdown editor. Start typing your markdown here...'
		) {
			// Check if the note already exists in savedNotes
			let notes;
			const existingNoteIndex = savedNotes.findIndex(note => note === markdownStr);
			if (existingNoteIndex !== -1) {
				notes = [...savedNotes];
				notes[existingNoteIndex] = markdownStr;
				setSavedNotes(notes);
			} else {
				notes = [...savedNotes, markdownStr];
				setSavedNotes(notes);
			}
			localStorage.setItem('notes', JSON.stringify(notes)); // Save updated notes to localStorage
		} else {
			alert('Please write something before saving!'); // Alert if the markdown is empty or equals the default message
		}
	};

	//  Function to handle AI documentation generation
  // It checks if the input starts with '@ai_docs' and sends the rest of the
	const handleGenerate = async () => {
		// Extract the prompt text and send it to the AI API
		let promptText = markdown.replace(/^@ai_docs\s*/, '');
		if (promptText.trim().length > 0) {
			setLoading(true);
			promptText = promptText + "Here is the link of the GitHub repository. Write a detailed documentation based on this repo in markdown format. No need to say anything else. Just write the documentation";
			try {
				// Send the prompt text to the AI API
				const response = await fetch('https://flask-api-md-editor.onrender.com/solve', { // Replace with your server address
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ text: promptText }),
				}); 
				const data = await response.json();
				console.log('AI response:', data);
				// Check if the response contains a solution starting with "```markdown". If it does, extract the markdown content and set it to the markdown state
				if (data && data.solution.startsWith("```markdown")) {
					let finalResponse = data.solution.replace("```markdown", "");
	 				setMarkdown(finalResponse || "Error: Unable to generate response.");
				}
				else
				// If the response does not contain a valid markdown solution, set an error message
					setMarkdown("Error: Invalid prompt! \nExample: @ai_docs <your github repo link>");
			} catch (err) {
				setMarkdown('Error fetching AI docs.');
			}
			setLoading(false);
		}
	};

	  // Function to get the markdown text as sanitized HTML
	const getMarkdownText = () => {
		// Use marked to parse the markdown and DOMPurify to sanitize the HTML
		const rawHtml = marked.parse(markdown, { breaks: true });
		return { __html: DOMPurify.sanitize(rawHtml) };
	};

	return (
		<div style={styles.container}>
			{/* Markdown Editor Component */}
			<div style={styles.editorContainer}>
				<textarea
					style={styles.textarea}
					value={markdown}
					onChange={handleChange}
					placeholder="Write your markdown here..."
					disabled={loading}
				/>
				<div className="markdown-body p-4 rounded shadow bg-white overflow-y-auto"
					style={styles.preview}
					dangerouslySetInnerHTML={getMarkdownText()}
				/>
			</div>
			   {/* Save or Generate Button */}
			<div className="flex justify-center">
				{isAIDocs ? (
					<button
						className="w-80 px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
						onClick={handleGenerate}
						disabled={loading}
					>
						{loading ? 'Generating...' : 'Generate'}
					</button> // If generating AI docs, show the generate button
				) : (
					<button
						className="w-80 px-4 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
						style={styles.saveButton}
						onClick={handleSave}
					>
						Keep Note
					</button>
					// If not generating AI docs, show the save button
				)}
			</div>
			   {/* Loading Indicator */}
			{loading && <div className="text-blue-600 mt-2">Generating with AI...</div>}
		</div>
	);
};

// Styles for the MarkdownEditor component. These styles are used to style the container, editor, textarea, preview, and buttons
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
