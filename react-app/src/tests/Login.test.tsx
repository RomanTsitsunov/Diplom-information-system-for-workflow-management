import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/login';

test('renders login page', () => {
  render(<Login />);
  expect(screen.getByText("Вход в систему")).toBeInTheDocument();
});