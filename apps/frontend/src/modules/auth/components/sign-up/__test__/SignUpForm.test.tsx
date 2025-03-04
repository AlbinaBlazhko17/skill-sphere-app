import { SignUpForm } from '../SignUpForm';

import { Toaster } from '@/components/ui';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { log } from 'console';

describe('SignUpForm', () => {
  it('should render the form', () => {
    const wrapper = render(<SignUpForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the first name field', () => {
    const wrapper = render(<SignUpForm />);
    expect(wrapper.getByLabelText('First name')).toBeInTheDocument();
  });

  it('should render the last name field', () => {
    const wrapper = render(<SignUpForm />);
    expect(wrapper.getByLabelText('Last name')).toBeInTheDocument();
  });

  it('should render the email field', () => {
    const wrapper = render(<SignUpForm />);
    expect(wrapper.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should render the password field', () => {
    const wrapper = render(<SignUpForm />);
    expect(wrapper.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    const wrapper = render(<SignUpForm />);
    expect(wrapper.getByText('Sign up')).toBeInTheDocument();
  });

  it('should show error message when the form is submitted with invalid data inside first name field', async () => {
    const wrapper = render(<SignUpForm />);
    const submitButton = wrapper.getByText('Sign up');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('String must contain at least 8 character(s)')).toBeInTheDocument();
    });
  });

  it('should show the toast when the form is submitted', async () => {
    log('Test started');

    const wrapper = render(
      <>
        <SignUpForm />
        <Toaster />
      </>
    );

    const firstNameInput = wrapper.getByLabelText('First name');
    const lastNameInput = wrapper.getByLabelText('Last name');
    const emailInput = wrapper.getByLabelText('Email');
    const passwordInput = wrapper.getByLabelText('Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'email14@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = wrapper.getByText('Sign up');

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText(/Account created successfully/i)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
