// BookCard.test.js
import { render, screen } from '@testing-library/react';
import BookCard from './BookCard';

describe('BookCard Component', () => {
  const book = {
    title: 'Test Book',
    author: 'Test Author',
    genre: 'Fiction',
    published_year: 2023
  };

  test('renders the book details', () => {
    render(<BookCard book={book} />);
    
    const title = screen.getByText('Test Book');
    const author = screen.getByText('Test Author');
    const genre = screen.getByText('Fiction');
    const year = screen.getByText('2023');

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(genre).toBeInTheDocument();
    expect(year).toBeInTheDocument();
  });
});
