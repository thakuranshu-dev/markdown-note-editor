import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-light.css';
import { useSwipeable } from 'react-swipeable';
import { FaTrash, FaEdit } from 'react-icons/fa';

const getMarkdownText = (markdown) => {
	const rawHtml = marked.parse(markdown, { breaks: true });
	return { __html: DOMPurify.sanitize(rawHtml) };
};

const StickyNotes = ({ savedNotes, setSavedNotes, mdNote, noteIndex , setMarkdown}) => {
	const [swipe, setSwipe] = useState(null);

	const handleDelete = (noteKey) => {
		const confirmDelete = window.confirm('Are you sure you want to delete this note?');
		if (!confirmDelete) {
			setSwipe(null);
			return;
		}
		const updatedNotes = [...savedNotes];
		updatedNotes.splice(noteKey, 1);
		setSavedNotes(updatedNotes);
		localStorage.setItem('notes', JSON.stringify(updatedNotes));
		setSwipe(null);
	};
	const handleEdit = (noteKey) => {
		setMarkdown(savedNotes[noteKey]);
		setSwipe(null);
	};
	const handlers = useSwipeable({
        onSwipedLeft: () => {
            setSwipe('left');
            setTimeout(() => handleEdit(noteIndex), 300); // Wait for animation
        },
        onSwipedRight: () => {
            setSwipe('right');
            setTimeout(() => handleDelete(noteIndex), 300); // Wait for animation
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

	return (
		<div
            className={`note-container relative mb-4 rounded-lg`}
			title='Swipe left to edit, right to delete'
            style={{
                background: swipe === 'right' ? '#ffdddd' : swipe === 'left' ? '#ddeeff' : '#e5e9f2',
                transition: 'background 0.3s',
                overflow: 'hidden',
            }}
            {...handlers}
        >
            {/* Background Icon */}
            {swipe === 'right' && (
                <div className="absolute left-10 inset-0 flex items-center justify-end pr-8 pointer-events-none">
                    <FaTrash size={32} color="#e53e3e" className='z-index 1000' />
                </div>
            )}
            {swipe === 'left' && (
                <div className="absolute right-10 inset-0 flex items-center justify-start pl-8 pointer-events-none">
                    <FaEdit size={32} color="#3182ce" className='z-index 1000'/>
                </div>
            )}
            {/* Foreground Note */}
            <div
                className="note relative p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer overflow-hidden z-10"
                style={{
                    transform:
                        swipe === 'right'
                            ? 'translateX(80px)'
                            : swipe === 'left'
                            ? 'translateX(-80px)'
                            : 'translateX(0)',
                    transition: 'transform 0.3s',
                }}
            >
                <div className="markdown-body p-4 rounded shadow bg-white overflow-y-auto"
                    dangerouslySetInnerHTML={getMarkdownText(mdNote)}
                />
            </div>
        </div>
	);
};

export default StickyNotes;