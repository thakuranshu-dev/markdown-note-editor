import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-light.css';
import { useSwipeable } from 'react-swipeable';

const getMarkdownText = (markdown) => {
	const rawHtml = marked.parse(markdown, { breaks: true });
	return { __html: DOMPurify.sanitize(rawHtml) };
};

const StickyNotes = ({ savedNotes, setSavedNotes, mdNote, noteIndex , setMarkdown}) => {
	const handleDelete = (noteKey) => {
		const updatedNotes = [...savedNotes];
		updatedNotes.splice(noteKey, 1);
		setSavedNotes(updatedNotes);
		localStorage.removeItem('notes');
		localStorage.setItem('notes', JSON.stringify(updatedNotes));
	};
	const handleEdit = (noteKey) => {
		setMarkdown(savedNotes[noteKey]);
	};
	const config = {
				onSwipedLeft: () => handleEdit(noteIndex),
				onSwipedRight: () => handleDelete(noteIndex),
				preventDefaultTouchmoveEvent: true,
				trackMouse: true,
			};

			const handlers = useSwipeable(config);

	return (
		<div className="note relative p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer mb-4 overflow-hidden"
			title="Swipe left to edit | Swipe right to delete"
			style={{ backgroundColor: '#e5e9f2' }}
			{...handlers}
			>
				<div className="relative z-10">
				<div className="markdown-body p-4 rounded shadow bg-white overflow-y-auto"
					dangerouslySetInnerHTML={getMarkdownText(mdNote)}
				/> </div>
		</div>
	);
};

export default StickyNotes;