import React from 'react';

const DEFAULT_IMAGE = '/paperTexture02.jpg';

const Note = ({ noteId, title, description, onClick, onContextMenu }) => (
  <div
    className="note relative p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer mb-4 overflow-hidden"
    title="Click to edit | Right click to delete"
    onClick={onClick}
    onContextMenu={onContextMenu}
    style={{
      backgroundColor: '#e5e9f2', // cold and neutral bg (light blue-gray)
    }}
  >
    {/* Blended default background image */}
    <img
      src={DEFAULT_IMAGE}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay pointer-events-none select-none"
      draggable="false"
    />
    <div className="relative z-10">
      
    </div>
  </div>
);

export default Note;