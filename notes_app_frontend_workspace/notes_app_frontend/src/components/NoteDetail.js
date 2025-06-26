import React from "react";

// PUBLIC_INTERFACE
/**
 * NoteDetail - Show the selected note
 * @param {Object} props
 * @param {Object} props.note
 * @param {function} props.onEdit
 * @param {function} props.onDelete
 */
function NoteDetail({ note, onEdit, onDelete }) {
  return (
    <div className="note-detail" aria-live="polite">
      <div className="note-detail-title">{note.title}</div>
      <div className="note-detail-category">{note.category || "Uncategorized"}</div>
      <div className="note-detail-meta">
        Created: {new Date(note.createdAt).toLocaleString()}
      </div>
      <div className="note-detail-content">{note.content}</div>
      <div className="note-detail-bar">
        <button className="btn-action" onClick={onEdit}>
          Edit
        </button>
        <button className="btn-action delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteDetail;
