import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);
});

test('renders the contact form header', () => {
  render(<ContactForm />);
  const headerElement = screen.queryByText(/contact form/i);
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toBeTruthy();
  expect(headerElement).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less than 5 characters into firstname.', async () => {
  render(<ContactForm />);
  const firstNameField = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameField, '123');
  const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />);
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
  await waitFor(() => {
    const errorMessages = screen.getAllByTestId('error');
    expect(errorMessages).toHaveLength(3);
  });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />);
  const firstNameField = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameField, 'John');

  const lastNameField = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameField, 'Doe');

  const button = screen.getByRole('button');
  userEvent.click(button);

    const errorMessages = await screen.getAllByTestId('error');
    expect(errorMessages).toHaveLength[1];
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailField = screen.getByLabelText(/email*/i);
  userEvent.type(emailField, 'johndoe@example');

    const errorMessages = await screen.findByText(/email must be a valid email address./);
    expect(errorMessages).toBeInTheDocument();
});

test('renders "lastName is a required field" if last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
    const errorMessages = await screen.findByText(/lastname is a required field/i);
    expect(errorMessages).toBeInTheDocument();
});

test('renders all firstName, lastName, and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText(/first name*/i);
    const lastNameField = screen.getByLabelText(/last name*/i);
    const emailField = screen.getByLabelText(/email*/i);

    userEvent.type(firstNameField, 'Johnny');
    userEvent.type(lastNameField, 'Doe');
    userEvent.type(emailField, 'johndoe@example.com');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
      const firstNameDisplay = screen.queryByText('John');
      const lastNameDisplay = screen.queryByText('Doe');
      const emailDisplay = screen.queryByText('johndoe@example.com');
      const messageDisplay = screen.queryByTestId('messageDisplay');

      expect(firstNameDisplay).toBeInTheDocument();
      expect(lastNameDisplay).toBeInTheDocument();
      expect(emailDisplay).toBeInTheDocument();
      expect(messageDisplay).not.toBeInTheDocument();
    });
  });
  
  test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstNameFeald = screen.getByLabelText(/First Name*/i);
    const lastNameFeald = screen.getByLabelText(/Last Name*/i);
    const emailFeald = screen.getByLabelText(/Email*/i);
    const messageField = screen.getByLabelText(/Message/i);

    userEvent.type(firstNameFeald, 'Johnny');
    userEvent.type(lastNameFeald, 'Doe')
    userEvent.type(emailFeald, 'johndoe@example.com');
    userEvent.type(messageField, 'message');

    const submitButton = await screen.findByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
      const firstNameDisplay = screen.queryByText(/John/i);
      const lastNameDisplay = screen.queryByText(/Doe/i);
      const emailDisplay = screen.queryByText(/johndoe@example.com/i);
      const messageDisplay = screen.queryByText(/message/i);

      expect(firstNameDisplay).toBeInTheDocument();
      expect(lastNameDisplay).toBeInTheDocument();
      expect(emailDisplay).toBeInTheDocument();
      expect(messageDisplay).toBeInTheDocument();
    });
  });
  
