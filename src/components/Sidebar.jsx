import StickyNotes from "./stickyNote"

function Sidebar({savedNotes, setSavedNotes, setMarkdown}) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <div className="flex justify-center items-center p-4 border-b border-gray-200">
        <h2 className="h-10 text-center flex items-center text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Saved Docs</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {savedNotes.length === 0 ? (
          <p className="text-gray-500 p-4 text-center">No notes saved yet.</p>
        ) : (
          savedNotes.map((markdownNote, idx) => (
            <StickyNotes
                key={idx}
                savedNotes={savedNotes}
                setSavedNotes={setSavedNotes}
                noteIndex={idx}
                mdNote={markdownNote}
                setMarkdown={setMarkdown}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Sidebar
