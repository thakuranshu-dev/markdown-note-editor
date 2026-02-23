import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-light.css';
import { useSwipeable } from 'react-swipeable';
import { FaTrash, FaEdit } from 'react-icons/fa';
import DownloadModal from './DownloadModal';
import jsPDF from 'jspdf';

// Function to convert markdown to sanitized HTML. This function uses DOMPurify to sanitize the HTML output from marked.js
const getMarkdownText = (markdown) => {
    const safeMarkdown = typeof markdown === 'string' ? markdown : '';
    const rawHtml = marked.parse(safeMarkdown, { breaks: true });
    return { __html: DOMPurify.sanitize(rawHtml) };
};

const getMarkdownHeading = (markdown) => {
    const safeMarkdown = typeof markdown === 'string' ? markdown : '';
    const lines = safeMarkdown.split('\n');
    for (let line of lines) {
        if (line.startsWith('# ')) {
            return getMarkdownText(line.replace('#', '#####'));
            // return line.replace('# ', '').trim();
        }
    }
    return getMarkdownText('##### Untitled Note');
};

const StickyNotes = ({ savedNotes, setSavedNotes, mdNote, noteIndex, setMarkdown }) => {
    const [swipe, setSwipe] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Handle delete and edit actions. These functions are called when the user swipes left or right on a note
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

    // Download handlers for different formats (Markdown, HTML, PDF). These functions create a Blob from the note content and trigger a download
    const handleDownloadMd = () => {
        const blob = new Blob([typeof mdNote === 'string' ? mdNote : ''], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `note-${noteIndex + 1}.md`;
        a.click();
        URL.revokeObjectURL(url);
        setModalOpen(false);
    };

    const handleDownloadHtml = () => {
        const htmlContent = marked.parse(typeof mdNote === 'string' ? mdNote : '');
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `note-${noteIndex + 1}.html`;
        a.click();
        URL.revokeObjectURL(url);
        setModalOpen(false);
    };

    const handleDownloadPdf = () => {
        const doc = new jsPDF({
            unit: 'mm',
            format: 'a4',
            wordWrap: 'wrap',
            orientation: 'portrait',
            putOnlyUsedFonts: true,
        });
        const htmlContent = marked.parse(typeof mdNote === 'string' ? mdNote : '');

        // Create a temporary container for the HTML to style for A4 if needed
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        tempDiv.style.width = '180mm'; // leave some margin (A4 width is 210mm)
        // tempDiv.style.fontSize = '12pt';
        document.body.appendChild(tempDiv);

        doc.html(tempDiv, {
            callback: function (doc) {
                doc.save(`note-${noteIndex + 1}.pdf`);
                document.body.removeChild(tempDiv);
            },
            x: 15, // left margin
            y: 15, // top margin
            width: 180, // content width in mm (A4 width is 210mm, so 180mm leaves 15mm margin each side)
            windowWidth: 800 // helps with scaling
        });
        setModalOpen(false);
    };

    // Long press/double click handlers
    let pressTimer = null;
    const handlePointerDown = () => {
        pressTimer = setTimeout(() => setModalOpen(true), 600);
    };
    const handlePointerUp = () => {
        clearTimeout(pressTimer);
    };
    const handleDoubleClick = () => {
        setModalOpen(true);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setSwipe('left');
            setTimeout(() => handleEdit(noteIndex), 300);
        },
        onSwipedRight: () => {
            setSwipe('right');
            setTimeout(() => handleDelete(noteIndex), 300);
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div
            className={`note-container relative bg-[#e5e9f2]`}
            title='Swipe left to edit, right to delete. Long-press or double-click to download.'
            style={{
                maxHeight: '75%',
                overflowY: 'scroll',
                overflowX: 'hidden',
                background: swipe === 'right' ? '#ffdddd' : swipe === 'left' ? '#ddeeff' : '#e5e9f2',
                transition: 'background 0.3s',
                overflow: 'hidden',
            }}
            {...handlers}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onDoubleClick={handleDoubleClick}
        >
            {/* Background Icon */}
            {swipe === 'right' && (
                <div className="absolute left-10 top-10 flex items-center justify-end pr-8 pointer-events-none">
                    <FaTrash size={32} color="#e53e3e" className='z-index 1000' />
                </div>
            )}
            {swipe === 'left' && (
                <div className="absolute right-10 top-10 flex items-center justify-start pl-8 pointer-events-none">
                    <FaEdit size={32} color="#3182ce" className='z-index 1000' />
                </div>
            )}
            {/* Foreground Note */}
            <div
                className="note relative border-b border-gray-200 shadow hover:shadow-md transition cursor-pointer overflow-y-auto z-10"
            // style={{
            //     maxHeight: '80%',
            //     overflowY: 'auto',
            // }}
            >
                {/* <div
                    className="markdown-body p-4 rounded shadow bg-white"
                    dangerouslySetInnerHTML={getMarkdownText(mdNote)}
                />
                </div> */}
                <div
                    className="markdown-body px-4 shadow bg-[#e5e9f2] h-8 flex items-center "
                    dangerouslySetInnerHTML={getMarkdownHeading(mdNote)}
                />
            </div>
            {/* Download Modal */}
            <DownloadModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onDownloadMd={handleDownloadMd}
                onDownloadHtml={handleDownloadHtml}
                onDownloadPdf={handleDownloadPdf}
            />
        </div >
    );
};

export default StickyNotes;