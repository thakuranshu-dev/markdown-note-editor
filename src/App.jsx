import React, { useState, useEffect } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import StickyNotes from './components/stickyNote';
import { BsLayoutSidebarReverse} from "react-icons/bs";
import {IoClose } from "react-icons/io5";

import 'github-markdown-css/github-markdown-light.css';

const App = () => {
    const [savedNotes, setSavedNotes] = useState([]);
    const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nThis is a simple markdown editor. Start typing your markdown here...');
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        try {
            const notes = JSON.parse(localStorage.getItem('notes')) || []; // Retrieve saved notes from localStorage
            setSavedNotes(notes);
        } catch (error) {
            setSavedNotes([]); // If parsing fails, initialize with an empty array
            console.error('Error parsing saved notes from localStorage:', error);
        }
    }, []);

    return (
        <div className="flex h-screen relative overflow-hidden">
            {/* Hamburger/Close Icon (Top-Right) */}
            <button
                className=" fixed top-4 right-4 z-50 "
                onClick={() => setDrawerOpen(!drawerOpen)}
                aria-label={drawerOpen ? "Close saved notes panel" : "Open saved notes panel"}
            >
                {/* Toggle Icon */}
                {drawerOpen ? (
                    // <FaBars size={24} />
                    <BsLayoutSidebarReverse size={24} />
                ) : (
                    // <FaTimes size={24} />
                    <IoClose size={24} />
                )}
            </button>

            {/* Editor Panel */}
            <div className=" w-full h-full z-20 bg-white transition-transform duration-300 ease-in-out">
                <MarkdownEditor
                    savedNotes={savedNotes}
                    setSavedNotes={setSavedNotes}
                    markdown={markdown}
                    setMarkdown={setMarkdown}
                />
            </div>

            {/* Saved Notes Side Drawer / Panel */}
            <div
                className={`h-full w-full bg-gray-100 z-40 
                    ${drawerOpen ? 'hidden' : 'block'}
                    transition-transform duration-300 overflow-y-scroll`
                }
            >
                <div className="flex justify-between items-center mb-4 p-4 md:p-0">
                    <h2 className="text-2xl font-bold"> Saved Notes...</h2>
                </div>
                {savedNotes.length === 0 ? (
                    <p className="text-gray-500 p-4 md:p-0">No notes saved yet.</p>
                ) : (
                    savedNotes.map((markdownNote, idx) => (
                        <StickyNotes
                            key={idx}
                            savedNotes={savedNotes}
                            setSavedNotes={setSavedNotes}
                            noteIndex={idx}
                            mdNote={markdownNote}
                            setMarkdown={setMarkdown}
                            className="overflow-y-scroll"
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default App;