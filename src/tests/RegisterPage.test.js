import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "../routes/RegisterPage";
import userEvent from "@testing-library/user-event";

test("Register error messages are working correctly or not.", async () => {
  render(
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );

  const registerButton = screen.getByRole("button", { name: /submit/i });

  // general error checks
  fireEvent.click(registerButton);

  let nameError = screen.getByText("Please enter your full name");
  let emailError = screen.getByText("Enter a valid email");
  let phoneError = screen.getByText("Please enter your mobile number");
  let ageError = screen.getByText("Please enter your age");
  let genderError = screen.getByText("Please select your gender");
  let organizationError = screen.getByText("Please select your organization");
  let passwordError = screen.getByText(
    "Please enter a password of length 7 or more"
  );
  let confirmPasswordError = screen.getByText(
    "Please enter your password again"
  );

  expect(emailError).toBeDefined();
  expect(nameError).toBeDefined();
  expect(phoneError).toBeDefined();
  expect(ageError).toBeDefined();
  expect(genderError).toBeDefined();
  expect(organizationError).toBeDefined();
  expect(confirmPasswordError).toBeDefined();
  expect(passwordError).toBeDefined();

  // Password and confirm password does not match error
  await userEvent.type(screen.getByPlaceholderText("Password"), "password");
  await userEvent.type(
    screen.getByPlaceholderText("Confirm Password"),
    "Password"
  );

  fireEvent.click(registerButton);

  confirmPasswordError = screen.getByText("Passwords doesn't match");

  expect(emailError).toBeDefined();
  expect(nameError).toBeDefined();
  expect(phoneError).toBeDefined();
  expect(ageError).toBeDefined();
  expect(genderError).toBeDefined();
  expect(organizationError).toBeDefined();
  expect(confirmPasswordError).toBeDefined();

  // Doctor details check box
  fireEvent.click(screen.getByRole("checkbox"));
  expect(screen.getByPlaceholderText("Your designation")).toBeDefined();
  expect(screen.getByPlaceholderText("Your registration number")).toBeDefined();

  fireEvent.click(registerButton);
  let designationError = screen.getByText("Please enter your designations");
  let regNoError = screen.getByText("Please enter your registration number");

  expect(designationError).toBeDefined();
  expect(regNoError).toBeDefined();
});
