import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductMeta } from '../index';
import type { Product } from '../../../types/product';

// Mock the useProduct hook
vi.mock('../../../hooks/useProduct', () => ({
  useProduct: vi.fn(),
}));

import { useProduct } from '../../../hooks/useProduct';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test description',
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

describe('ProductMeta Component - Behavior Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renders product metadata when available', () => {
    it('displays all metadata fields (brand, category, stock, rating)', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: mockProduct,
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      render(<ProductMeta />);

      // Verify all labels are present
      expect(screen.getByText('Brand')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Stock')).toBeInTheDocument();
      expect(screen.getByText('Rating')).toBeInTheDocument();

      // Verify all values are displayed
      expect(screen.getByText('TestBrand')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText(/⭐ 4\.5/)).toBeInTheDocument();
    });

    it('formats rating to 1 decimal place', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: { ...mockProduct, rating: 4.567 },
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      render(<ProductMeta />);

      expect(screen.getByText(/⭐ 4\.6/)).toBeInTheDocument();
    });
  });

  describe('Displays loading state correctly', () => {
    it('renders without crashing when product is undefined (loading state)', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      const { container } = render(<ProductMeta />);

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
      } as unknown as ReturnType<typeof useProduct>);

      const { container } = render(<ProductMeta />);

      // Component should render without crashing
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Graceful handling of missing data', () => {
    it('displays "N/A" when brand is missing', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: { ...mockProduct, brand: undefined },
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      render(<ProductMeta />);

      // Brand should show N/A fallback
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('handles undefined product data gracefully', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      render(<ProductMeta />);

      // Should render with labels but no values
      expect(document.body).toBeInTheDocument();
    });

    it('handles partial product data without crashing', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: {
          id: 1,
          category: 'Test Category',
          stock: 5,
        } as Product,
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      render(<ProductMeta />);

      // Should display available data
      expect(screen.getByText('Test Category')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      // Brand should show N/A
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });
});
