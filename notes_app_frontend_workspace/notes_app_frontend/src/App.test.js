import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders signin prompt for unauthenticated user", () => {
  render(<App />);
  expect(screen.getByText(/Welcome to NoteNest/i)).toBeInTheDocument();
});
