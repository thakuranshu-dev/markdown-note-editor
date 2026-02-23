import StickyNotes from "./stickyNote"

function Sidebar({savedNotes, setSavedNotes, setMarkdown}) {
  return (
    <div className="w-full h-full bg-[#e5e9f2] flex flex-col">
      <div className="flex justify-center items-center p-4 ">
        <h2 className="text-xl font-bold text-gray-800">Saved Notes</h2>
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
