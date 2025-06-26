import React, { useState, useRef, useEffect } from "react";

// PUBLIC_INTERFACE
/**
 * NoteEditor - Modal dialog for new/edit note
 * @param {Object} props
 * @param {Object} [props.note]
 * @param {function} props.onSave
 * @param {function} props.onCancel
 */
function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [category, setCategory] = useState(note ? note.category || "personal" : "personal");
  const titleRef = useRef(null);

  useEffect(() => {
    // Focus on title field when dialog opens
    if (titleRef.current) titleRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      ...note,
      title: title.trim(),
      content: content.trim(),
      category,
      createdAt: note?.createdAt || new Date().toISOString(),
      id: note?.id,
    });
  };

  return (
    <>
      <div className="editor-modal-backdrop" onClick={onCancel} />
      <div className="editor-modal" role="dialog" aria-modal="true" tabIndex={-1}>
        <form className="editor-form" onSubmit={handleSubmit}>
          <div className="editor-label">Title</div>
          <input
            className="editor-input"
            ref={titleRef}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Note title"
            maxLength={70}
            required
            autoFocus
          />
          <div className="editor-label">Category</div>
          <select
            className="editor-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="ideas">Ideas</option>
          </select>
          <div className="editor-label">Content</div>
          <textarea
            className="editor-textarea"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your note here..."
            minLength={2}
            maxLength={850}
            required
          />
          <div className="editor-modal-buttons">
            <button className="btn-action" type="submit">
              Save
            </button>
            <button className="btn-action delete" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NoteEditor;
