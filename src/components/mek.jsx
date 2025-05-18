// MarkdownEditor.jsx
import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const MarkdownEditor = ({ onSave }) => {
  const [markdown, setMarkdown] = useState('');

  const handleSave = () => {
    const html = DOMPurify.sanitize(marked.parse(markdown));
    onSave(html);
    setMarkdown('');
  };

  return (
    <div className="flex flex-col h-full p-4">
      <textarea
        className="flex-grow w-full p-4 border rounded mb-4 text-sm font-mono resize-none"
        placeholder="Write your markdown here..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        Save
      </button>
    </div>
  );
};

export default MarkdownEditor;