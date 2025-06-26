import React from "react";

// PUBLIC_INTERFACE
/**
 * TopBar - Navigation bar at top of app
 * @param {Object} props
 * @param {string} props.username
 * @param {function} props.onLogout
 * @param {string} props.search
 * @param {function} props.setSearch
 */
function TopBar({ username, onLogout, search, setSearch }) {
  return (
    <header className="top-bar">
      <div className="brand" tabIndex={0} aria-label="NoteNest Home">
        <span style={{ color: "var(--accent)", fontWeight: 900, marginRight: 6 }}>📝</span>
        <span>NoteNest</span>
      </div>
      <input
        className="search-bar"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search notes..."
        aria-label="Search notes"
        autoComplete="off"
      />
      <div className="user-block">
        <div className="user-avatar" title={username}>
          {username ? username.charAt(0).toUpperCase() : "?"}
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default TopBar;
