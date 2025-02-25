import { SignUpForm } from '../SignUpForm';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('SignUpForm', () => {
  it('should render the form', () => {
    const wrapper = render(<SignUpForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the first name field', () => {
    const wrapper = render(<SignUpForm />);
    expect(wrapper.getByLabelText('First name')).toBeInTheDocument();
  });
});
