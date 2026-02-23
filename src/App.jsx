import { useState, useEffect, Activity } from 'react';
import 'github-markdown-css/github-markdown-light.css';
import MarkdownEditor from './components/MarkdownEditor';
import { BsLayoutSidebarReverse, BsChevronRight } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import Sidebar from './components/Sidebar';

const App = () => {
    const [savedNotes, setSavedNotes] = useState([]);
    const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nThis is a simple markdown editor. Start typing your markdown here...');
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        try {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            setSavedNotes(notes);
        } catch (error) {
            setSavedNotes([]);
            console.error('Error parsing saved notes from localStorage:', error);
        }
    }, []);

    return (
        <div className="flex h-screen relative overflow-hidden">
            {/* SideBar Open/Close Icon (Top-Right) */}
            <button
                className={`absolute z-50 right-4
                transform transition-transform duration-300
                ${drawerOpen ? 'top-2' : 'top-4'}`}
                onClick={() => setDrawerOpen(!drawerOpen)}
                aria-label={drawerOpen ? "Close saved notes panel" : "Open saved notes panel"}
            >
                {/* Toggle Icon */}
                {drawerOpen ? (
                    <BsChevronRight size={24} />
                ) : (
                    <BsLayoutSidebarReverse size={24} />
                )}
            </button>

            {/* Editor Panel */}
            <div className={`h-full bg-white transition-all duration-300 ease-in-out ${drawerOpen ? 'w-[80%]' : 'w-full'}`}>
                <MarkdownEditor
                    savedNotes={savedNotes}
                    setSavedNotes={setSavedNotes}
                    markdown={markdown}
                    setMarkdown={setMarkdown} />
            </div>

            {/* Saved Notes Side Drawer / Panel */}
            <Activity
                name="Saved Notes"
                show={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <aside
                    className={`absolute right-0 top-0 h-full w-[20%] bg-gray-100 z-40 
                    transform transition-transform duration-300
                    ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
                    overflow-y-scroll shadow-lg`}>
                    
                <Sidebar
                    savedNotes={savedNotes}
                    setSavedNotes={setSavedNotes}
                    markdown={markdown}
                    setMarkdown={setMarkdown}
                />    
                </aside>
            </Activity>
        </div>
    );
};

export default App;