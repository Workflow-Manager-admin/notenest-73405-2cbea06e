import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import TopBar from "./components/TopBar";
import SideMenu from "./components/SideMenu";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import NoteEditor from "./components/NoteEditor";
import FloatingButton from "./components/FloatingButton";
import AuthModal from "./components/AuthModal";

// Category tags for notes
const DEFAULT_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "personal", label: "Personal" },
  { key: "work", label: "Work" },
  { key: "ideas", label: "Ideas" },
];

// Helper to get localStorage notes
function loadNotes() {
  const data = localStorage.getItem("notes-app-notes");
  return data ? JSON.parse(data) : [];
}

function saveNotes(notes) {
  localStorage.setItem("notes-app-notes", JSON.stringify(notes));
}

function loadUser() {
  const data = localStorage.getItem("notes-app-user");
  return data ? JSON.parse(data) : null;
}

function saveUser(user) {
  localStorage.setItem("notes-app-user", JSON.stringify(user));
}

// PUBLIC_INTERFACE
function App() {
  // Auth state (simple username setup)
  const [user, setUser] = useState(loadUser());
  const [authOpen, setAuthOpen] = useState(!loadUser());

  // Notes app state
  const [notes, setNotes] = useState(loadNotes());
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorNote, setEditorNote] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Side effect: persist notes and user
  useEffect(() => { saveNotes(notes); }, [notes]);
  useEffect(() => { saveUser(user); }, [user]);

  // Authentication logic
  // PUBLIC_INTERFACE
  const handleLogin = (username, password) => {
    // Simple local user - no backend
    const fakeHash = btoa(username + ":" + password);
    setUser({ username, token: fakeHash });
    setAuthOpen(false);
  };

  // PUBLIC_INTERFACE
  const handleLogout = () => {
    setUser(null);
    setAuthOpen(true);
  };

  // CRUD operations
  // PUBLIC_INTERFACE
  const handleCreate = () => {
    setEditorNote(null);
    setIsEditorOpen(true);
  };

  // PUBLIC_INTERFACE
  const handleEdit = (note) => {
    setEditorNote(note);
    setIsEditorOpen(true);
  };

  // PUBLIC_INTERFACE
  const handleSave = (note) => {
    if (note.id) {
      // Edit
      setNotes(
        notes.map((n) => (n.id === note.id ? note : n))
      );
    } else {
      // New
      const id = "id" + Date.now();
      setNotes([
        { ...note, id, createdAt: new Date().toISOString() },
        ...notes,
      ]);
      setActiveNoteId(id);
    }
    setIsEditorOpen(false);
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) {
      setNotes(notes.filter((n) => n.id !== id));
      setActiveNoteId(null);
    }
  };

  // PUBLIC_INTERFACE
  const handleSelect = (id) => {
    setActiveNoteId(id);
  };

  // Filtering (category and search)
  const filteredNotes = notes.filter((n) => {
    let byCategory =
      category === "all" ? true : (n.category || "personal") === category;
    let bySearch =
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    return byCategory && bySearch;
  });

  const activeNote =
    notes.find((n) => n.id === activeNoteId) || (filteredNotes[0] || null);

  // Set document theme and favicon background
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light"); // Always light as per requirements
    document.body.style.background = "var(--bg-primary)";
  }, []);

  return (
    <div className="app-container">
      <TopBar
        username={user?.username}
        onLogout={handleLogout}
        search={search}
        setSearch={setSearch}
      />

      <div className="main-layout">
        <SideMenu
          categories={DEFAULT_CATEGORIES}
          selected={category}
          setSelected={setCategory}
        />
        <section className="notes-main">
          <NoteList
            notes={filteredNotes}
            onSelect={handleSelect}
            onEdit={handleEdit}
            activeId={activeNote?.id}
          />
          {activeNote ? (
            <NoteDetail
              note={activeNote}
              onEdit={() => handleEdit(activeNote)}
              onDelete={() => handleDelete(activeNote.id)}
            />
          ) : (
            <div className="note-detail-empty">
              <p>Select or create a note to get started.</p>
            </div>
          )}
        </section>
      </div>
      <FloatingButton onClick={handleCreate} />
      {isEditorOpen && (
        <NoteEditor
          note={editorNote}
          onSave={handleSave}
          onCancel={() => setIsEditorOpen(false)}
        />
      )}
      <AuthModal
        open={authOpen}
        onLogin={handleLogin}
        show={authOpen}
        requireAuth
      />
    </div>
  );
}

export default App;
