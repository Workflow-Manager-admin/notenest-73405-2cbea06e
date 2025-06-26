import React from "react";

// PUBLIC_INTERFACE
/**
 * FloatingButton - Used to add a new note
 * @param {Object} props
 * @param {function} props.onClick
 */
function FloatingButton({ onClick }) {
  return (
    <button
      className="fab"
      aria-label="Add new note"
      onClick={onClick}
      tabIndex={0}
    >
      ＋
    </button>
  );
}

export default FloatingButton;
