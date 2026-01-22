import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductImage } from '../index';
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
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
};

describe('ProductImage Component - Behavior Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renders product image when available', () => {
    it('displays the first image from the images array', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: mockProduct,
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      render(<ProductImage />);

      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
      expect(image).toHaveAttribute('alt', 'Test Product');
    });

    it('falls back to thumbnail when images array is empty', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: { ...mockProduct, images: [] },
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      render(<ProductImage />);

      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/thumb.jpg');
    });

    it('uses alt text from product title', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: mockProduct,
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      render(<ProductImage />);

      const image = screen.getByAltText('Test Product');
      expect(image).toBeInTheDocument();
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

      const { container } = render(<ProductImage />);

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

      const { container } = render(<ProductImage />);

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
      } as unknown as ReturnType<typeof useProduct>);

      const { container } = render(<ProductImage />);

      // Should render without crashing
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles missing images array by falling back to thumbnail', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: {
          ...mockProduct,
          images: undefined as unknown as string[],
        },
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      const { container } = render(<ProductImage />);

      // Should render thumbnail as fallback
      expect(container.firstChild).toBeInTheDocument();
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/thumb.jpg');
    });

    it('handles both missing images and thumbnail gracefully', () => {
      vi.mocked(useProduct).mockReturnValue({
        data: {
          ...mockProduct,
          images: [],
          thumbnail: undefined as unknown as string,
        },
        isLoading: false,
        isError: false,
        error: null,
      } as unknown as ReturnType<typeof useProduct>);

      const { container } = render(<ProductImage />);

      // Should render without crashing even when both are missing
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
