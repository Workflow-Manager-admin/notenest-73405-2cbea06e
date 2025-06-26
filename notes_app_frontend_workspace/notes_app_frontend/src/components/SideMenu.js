import React from "react";

// PUBLIC_INTERFACE
/**
 * SideMenu - Category selector sidebar
 * @param {Object} props
 * @param {Array} props.categories
 * @param {string} props.selected
 * @param {function} props.setSelected
 */
function SideMenu({ categories, selected, setSelected }) {
  return (
    <nav className="side-menu" aria-label="Note Categories">
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.key}>
            <button
              className={"category" + (selected === cat.key ? " selected" : "")}
              onClick={() => setSelected(cat.key)}
              aria-current={selected === cat.key ? "page" : undefined}
              tabIndex={0}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideMenu;
