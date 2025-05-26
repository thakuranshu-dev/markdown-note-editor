import React from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-light.css';
import { useSwipeable } from 'react-swipeable';

const getMarkdownText = (markdown) => {
  	const rawHtml = marked.parse(markdown, { breaks: true });
  	return { __html: DOMPurify.sanitize(rawHtml) };
};
const [saved_notes, setNotes] = useState([]);
		useEffect(() => {
			const notes = JSON.parse(localStorage.getItem('notes')) || [];
			setNotes(notes);
		}, []);
	
const Note = ({ markdownNote, noteKey}) => {
	
	const config = {
		onSwipedLeft: () => {console.log('Swiped Left')},
		onSwipedRight: () => {console.log('Swiped Right')
			saved_notes.splice(noteKey, 1);
			localStorage.setItem('notes', JSON.stringify(saved_notes));
		},
		preventDefaultTouchmoveEvent: true,
		trackMouse: true
	};
	const handlers = useSwipeable(config);
	return (
		<div className="note relative p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer mb-4 overflow-hidden"
			title="Click to edit | Right click to delete"
			style={{ backgroundColor: '#e5e9f2' }} 
			{...handlers}
			>
			<div className="relative z-10">
			<div className="markdown-body p-4 rounded shadow bg-white overflow-y-auto"
				dangerouslySetInnerHTML={ getMarkdownText(markdownNote) }
				/>
			</div>
		</div>
	);
};

export default Note;