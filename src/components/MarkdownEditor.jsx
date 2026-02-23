import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import mermaid from 'mermaid';
import 'katex/dist/katex.min.css';
import 'github-markdown-css/github-markdown-light.css';

const MarkdownEditor = ({ savedNotes, setSavedNotes, markdown, setMarkdown }) => {
  	const [loading, setLoading] = useState(false);
	const [isAIDocs, setIsAIDocs] = useState(false);
	const previewRef = React.useRef(null);

	// Initialize marked with KaTeX extension and configure mermaid
	useEffect(() => {
		marked.use(markedKatex({
			throwOnError: false
		}));
		
		// Configure marked renderer for mermaid code blocks
		const renderer = {
			code({text, lang}) {
				// If code block has language 'mermaid', render it as mermaid diagram
				if (lang === 'mermaid') {
					return `<pre class="mermaid">${text}</pre>`;
				}
				// Otherwise use default code block rendering
				return `<pre><code class="language-${lang || 'plaintext'}">${text}</code></pre>`;
			}
		};
		marked.use({ renderer });
		
		// Initialize mermaid for diagram rendering
		mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });
	}, []);

	// Effect to render mermaid diagrams whenever markdown changes
	useEffect(() => {
		if (previewRef.current && markdown) {
			// Use setTimeout to ensure DOM is updated before running mermaid
			setTimeout(() => {
				mermaid.run();
			}, 0);
		}
	}, [markdown]);

  	const handleChange = (e) => {
		// Check if the input starts with '@ai_docs'. If it does, set isAIDocs to true, otherwise false
		// Continuously update the markdown state to reflect the current input value
   		const value = e.target.value;
   		// setIsAIDocs(value.startsWith('@ai_docs'));
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

	  // Function to get the markdown text as sanitized HTML with Mermaid support
	const getMarkdownText = () => {
		// Use marked to parse the markdown and DOMPurify to sanitize the HTML
		const rawHtml = marked.parse(markdown, { breaks: true });
		
		// Sanitize HTML while allowing mermaid diagrams (SVG elements and pre tags with mermaid class)
		const sanitizedHtml = DOMPurify.sanitize(rawHtml, { 
			ALLOWED_TAGS: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'code', 'span', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'hr', 'br', 'img', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'svg', 'g', 'text', 'line', 'path', 'circle', 'ellipse', 'polygon', 'polyline', 'rect', 'defs', 'style', 'marker', 'tspan', 'title', 'desc'],
			ALLOWED_ATTR: ['class', 'href', 'src', 'alt', 'title', 'id', 'xmlns', 'viewBox', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'x', 'y', 'd', 'fill', 'stroke', 'stroke-width', 'text-anchor', 'data-*', 'style', 'transform', 'preserveAspectRatio', 'role', 'aria-label']
		});
		
		return { __html: sanitizedHtml };
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
					ref={previewRef}
					style={styles.preview}
					dangerouslySetInnerHTML={getMarkdownText()}
				/>
			</div>
			   {/* Save or Generate Button */}
			<div className="flex justify-center px-4">
				{isAIDocs && 
					<button
						className="w-full md:w-96 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:shadow-lg transition text-lg font-semibold"
						onClick={handleGenerate}
						disabled={loading}
						style={{
							boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
							transform: 'translateZ(0)',
						}}
					>
						{loading ? '⏳ Generating...' : '✨ Generate'}
					</button>
				}
				{!isAIDocs && 
					<button
						className="w-full md:w-96 h-10 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:shadow-lg transition text-lg font-semibold"
						onClick={handleSave}
						style={{
							boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
							transform: 'translateZ(0)',
							fontSize: '1rem',
							fontWeight: '600',
						}}
					>
						Save Doc
					</button>
				}
			</div>
			   {/* Loading Indicator */}
			{loading && <div className="text-blue-600 mt-2 text-sm md:text-base text-center font-medium">⚡ Generating with AI...</div>}
		</div>
	);
};

// Styles for the MarkdownEditor component. These styles are used to style the container, editor, textarea, preview, and buttons
const styles = {
  	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		padding: '12px',
		gap: '12px',
		boxSizing: 'border-box',
		background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
	},
	editorContainer: {
		display: 'flex',
		flex: 1,
		gap: '12px',
		overflow: 'hidden',
		flexDirection: 'row',
	},
	textarea: {
		flex: 1,
		padding: '16px',
		fontSize: '15px',
		fontFamily: "'Fira Code', 'Courier New', monospace",
		border: 'none',
		borderRadius: '12px',
		resize: 'none',
		height: '100%',
		backgroundColor: 'white',
		boxShadow: '0 4px 15px rgba(102, 126, 234, 0.1)',
		outline: 'none',
		transition: 'all 0.3s ease',
		color: '#333',
		lineHeight: '1.6',
	},
	preview: {
		flex: 1,
		padding: '16px',
		fontSize: '15px',
		border: 'none',
		borderRadius: '12px',
		overflowY: 'auto',
		height: '100%',
		backgroundColor: 'white',
		boxShadow: '0 4px 15px rgba(102, 126, 234, 0.1)',
		lineHeight: '1.7',
	},
	saveButton: {
		alignSelf: 'center',
		padding: '12px 28px',
		fontSize: '16px',
		fontWeight: '600',
		color: 'white',
		backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		border: 'none',
		borderRadius: '50px',
		cursor: 'pointer',
		transition: 'all 0.3s ease',
		boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
	},
};

export default MarkdownEditor;
