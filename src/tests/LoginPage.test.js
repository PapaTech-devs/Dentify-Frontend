import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../routes/LoginPage";

test("Login error messages are working correctly or not.", async () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: /signin/i });
  fireEvent.click(loginButton);

  const emailError = screen.getByText("Enter a valid email");
  const passwordError = screen.getByText("Please enter a password");

  expect(emailError).toBeDefined();
  expect(passwordError).toBeDefined();
});
