import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../index';
import type { Product } from '../../../types/product';

// Mock the router
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, params, className }: any) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

// Mock the cart context
vi.mock('../../../contexts/useCartContext', () => ({
  useCartContext: () => ({
    addToCart: vi.fn(),
  }),
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test description',
  category: 'Electronics',
  price: 99.99,
  rating: 4.5,
  stock: 5, // Low stock
  brand: 'TestBrand',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 days',
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/image1.jpg'],
};

describe('ProductCard Component - Stock Indicator Alignment', () => {
  it('renders stock indicator and button in the same section', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    
    // Find the actions section
    const actionsSection = container.querySelector('[class*="actions"]');
    expect(actionsSection).toBeInTheDocument();
    
    // Check that the stock indicator is within the actions section
    const stockIndicator = screen.getByText('Only 5 left!');
    expect(stockIndicator).toBeInTheDocument();
    expect(actionsSection).toContainElement(stockIndicator);
  });

  it('renders "Add to Cart" button in the actions section', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    
    const addToCartButton = screen.getByText('Add to Cart');
    expect(addToCartButton).toBeInTheDocument();
    
    // Check that button is in the actions section
    const actionsSection = container.querySelector('[class*="actions"]');
    expect(actionsSection).toContainElement(addToCartButton);
  });

  it('displays "In Stock" for products with sufficient stock', () => {
    const highStockProduct = { ...mockProduct, stock: 50 };
    render(<ProductCard product={highStockProduct} />);
    
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    expect(screen.queryByText(/Only.*left!/)).not.toBeInTheDocument();
  });

  it('displays "Only X left!" for low stock products', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Only 5 left!')).toBeInTheDocument();
    expect(screen.queryByText('In Stock')).not.toBeInTheDocument();
  });

  it('has actionsContent wrapper with both stock and button', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    
    const actionsContent = container.querySelector('[class*="actionsContent"]');
    expect(actionsContent).toBeInTheDocument();
    
    // Both elements should be within actionsContent
    const stockIndicator = screen.getByText('Only 5 left!');
    const button = screen.getByText('Add to Cart');
    
    expect(actionsContent).toContainElement(stockIndicator);
    expect(actionsContent).toContainElement(button);
  });
});
