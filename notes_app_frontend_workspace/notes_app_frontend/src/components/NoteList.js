import React from "react";

// PUBLIC_INTERFACE
/**
 * NoteList - List of notes in sidebar panel
 * @param {Object} props
 * @param {Array} props.notes
 * @param {function} props.onSelect
 * @param {function} props.onEdit
 * @param {string} props.activeId
 */
function NoteList({ notes, onSelect, onEdit, activeId }) {
  return (
    <aside className="note-list" aria-label="Notes List">
      <div className="note-list-head">Notes</div>
      <ul className="note-list-items">
        {notes.length === 0 ? (
          <div style={{ color: "#888", padding: "18px", fontSize: "1rem" }}>No notes found</div>
        ) : (
          notes.map((note) => (
            <li
              className={"note-list-item" + (activeId === note.id ? " selected" : "")}
              key={note.id}
              onClick={() => onSelect(note.id)}
              tabIndex={0}
              aria-current={activeId === note.id}
              aria-label={note.title}
            >
              <span className="note-title">{note.title}</span>
              <span className="note-excerpt">
                {note.content.length > 56 ? note.content.slice(0, 56) + "..." : note.content}
              </span>
              <div className="note-meta">
                {note.category && (
                  <span style={{ color: "#ffd600", fontWeight: "500" }}>{note.category}</span>
                )}
                &nbsp;{new Date(note.createdAt).toLocaleDateString()}
              </div>
              <button
                className="note-item-edit-btn"
                onClick={e => {
                  e.stopPropagation();
                  onEdit(note);
                }}
                aria-label="Edit"
                tabIndex={0}
              >
                ✎
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}

export default NoteList;
