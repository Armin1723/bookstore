import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookForm from './BookForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

jest.mock('react-toastify', () => ({
    toast: {
        loading: jest.fn(),
        update: jest.fn(),
    },
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

useRouter.mockReturnValue({ push: jest.fn() });

describe('BookForm', () => {
    const defaultProps = {
        purpose: 'create',
        book: {},
    };

    const renderComponent = (props = {}) => {
        return render(<BookForm {...defaultProps} {...props} />);
    };

    it('renders the form with default values', () => {
        renderComponent();
        expect(screen.getByPlaceholderText('Enter the title of the book.')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter the name of Author.')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Select suitable Genre.')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('year of Publication.')).toBeInTheDocument();
    });

    it('shows validation errors when required fields are empty', async () => {
        renderComponent();
        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(screen.getAllByText('Title is mandatory.')[0]).toBeInTheDocument();
            expect(screen.getAllByText('Author name is mandatory')[0]).toBeInTheDocument();
            expect(screen.getAllByText('Author name is mandatory')[0]).toBeInTheDocument();
            expect(screen.getAllByText('Invalid Year')[0]).toBeInTheDocument();
        });
    });

    it('submits the form successfully', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText(/title/i), {
            target: { value: 'Test Title' },
        });
        fireEvent.change(screen.getByPlaceholderText(/author/i), {
            target: { value: 'Test Author' },
        });
        fireEvent.change(screen.getByPlaceholderText(/genre/i), {
            target: { value: 'Test Genre' },
        });
        fireEvent.change(screen.getByPlaceholderText(/year/i), {
            target: { value: 2021 },
        });

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(toast.loading).toHaveBeenCalledWith('Adding book...');
            expect(toast.update).toHaveBeenCalledWith(undefined, {
                render: 'Book created successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000,
            });
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('handles form submission error', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Error message' }),
            })
        );

        renderComponent();

      fireEvent.change(screen.getByPlaceholderText(/title/i), {
          target: { value: 'Test Title' },
      });
      fireEvent.change(screen.getByPlaceholderText(/author/i), {
          target: { value: 'Test Author' },
      });
      fireEvent.change(screen.getByPlaceholderText(/genre/i), {
          target: { value: 'Test Genre' },
      });
      fireEvent.change(screen.getByPlaceholderText(/year/i), {
          target: { value: 2021 },
      });

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(toast.loading).toHaveBeenCalledWith('Adding book...');
            expect(toast.update).toHaveBeenCalledWith(undefined, {
                render: 'Error message',
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            });
            expect(screen.getByText('Error message')).toBeInTheDocument();
        });
    });
});