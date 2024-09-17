import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('render app', () => {
  render(<App />);
  expect(screen.getByRole('button', {name: /News/i}));
  expect(screen.getByText(/SENG3011/)).toBeInTheDocument();
  expect(screen.getByText('News on weather events')).toBeInTheDocument();
  expect(screen.getByText(/Wind efficiency/)).toBeInTheDocument();
  expect(screen.getByText(/Weather information/)).toBeInTheDocument();
  expect(screen.getAllByText(/Location/)[0]).toBeInTheDocument();
  expect(screen.getAllByText(/Location/)[1]).toBeInTheDocument();
  expect(screen.getByText(/Number of hours of data/)).toBeInTheDocument();
  expect(screen.getByText(/Check locations/)).toBeInTheDocument();
  expect(screen.getByText(/Enter location to check/)).toBeInTheDocument();
  expect(screen.getAllByRole('button', {name: /Submit/i})[0]).toBeInTheDocument();
  expect(screen.getAllByRole('button', {name: /Submit/i})[1]).toBeInTheDocument();
  expect(screen.getByRole('button', {name: /Check/i}));
  expect(screen.getAllByRole('textbox'));
});

test('input', () => {
  render(<App />);
  const {container} = render(<App />);
  const inputs = container.getElementsByClassName('form-control');
  const windInput = inputs[0];
  userEvent.type(windInput, 'Yamba');
  expect(windInput).toHaveValue('Yamba');
  const weatherInput = inputs[1];
  userEvent.type(weatherInput, 'Yamba');
  expect(weatherInput).toHaveValue('Yamba');
  const hourInput = inputs[2];
  expect(hourInput).toHaveValue(1);
  const locationInput = inputs[3];
  userEvent.type(locationInput, 'Yamba');
  expect(locationInput).toHaveValue('Yamba');

});

test('click', () => {
  render(<App />);
  const newsButton = screen.getByRole('button', {name: /News on weather events/i});
  expect(newsButton).toHaveClass('w-100 btn btn-outline-primary');
  userEvent.click(newsButton);
  expect(newsButton).toHaveClass('w-100 btn btn-outline-primary collapsed');
});