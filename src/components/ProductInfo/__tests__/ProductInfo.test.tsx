import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductInfo } from '../index';
import type { Product } from '../../../types/product';

// Mock the useProduct hook
vi.mock('../../../hooks/useProduct', () => ({
  useProduct: vi.fn(),
}));

import { useProduct } from '../../../hooks/useProduct';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product description',
  category: 'Electronics',
  price: 99.99,
  rating: 4.5,
  stock: 10,
  brand: 'TestBrand',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 days',
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/image1.jpg'],
};

describe('ProductInfo Component - Behavior Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renders product information when available', () => {
    it('displays product title, price, and description when data is loaded', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: mockProduct,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      render(<ProductInfo />);

      // Verify title is displayed
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Test Product'
      );

      // Verify price is displayed with proper formatting
      expect(screen.getByText('$99.99')).toBeInTheDocument();

      // Verify description is displayed
      expect(
        screen.getByText('This is a test product description')
      ).toBeInTheDocument();
    });

    it('formats price to 2 decimal places', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: { ...mockProduct, price: 100 },
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      render(<ProductInfo />);

      expect(screen.getByText('$100.00')).toBeInTheDocument();
    });
  });

  describe('Displays loading state correctly', () => {
    it('renders without crashing when product is undefined (loading state)', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
      } as any);

      const { container } = render(<ProductInfo />);

      // Component should render without crashing
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Handles error state', () => {
    it('renders without crashing when there is an error', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error('Failed to load product'),
      } as any);

      const { container } = render(<ProductInfo />);

      // Component should render without crashing
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Graceful handling of missing data', () => {
    it('handles undefined product data gracefully', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      const { container } = render(<ProductInfo />);

      // Should render empty elements without crashing
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles partial product data without crashing', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: {
          id: 1,
          title: 'Partial Product',
          price: 49.99,
        } as Product,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      const { container } = render(<ProductInfo />);

      // Should display available data
      expect(screen.getByText('Partial Product')).toBeInTheDocument();
      expect(screen.getByText('$49.99')).toBeInTheDocument();
    });
  });
});
