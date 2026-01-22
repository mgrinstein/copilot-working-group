import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductDetail } from '../index';
import type { Product } from '../../../types/product';

// Mock all child components to isolate ProductDetail behavior
vi.mock('../../ProductNavigation', () => ({
  ProductNavigation: () => <div data-testid="product-navigation">Navigation</div>,
}));

vi.mock('../../ProductImage', () => ({
  ProductImage: () => <div data-testid="product-image">Image</div>,
}));

vi.mock('../../ProductInfo', () => ({
  ProductInfo: () => <div data-testid="product-info">Info</div>,
}));

vi.mock('../../ProductMeta', () => ({
  ProductMeta: () => <div data-testid="product-meta">Meta</div>,
}));

vi.mock('../../ProductActions', () => ({
  ProductActions: () => <div data-testid="product-actions">Actions</div>,
}));

describe('ProductDetail Component', () => {
  it('renders all child components when product data is available', () => {
    render(<ProductDetail />);

    // Verify all child components are rendered
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toBeInTheDocument();
    expect(screen.getByTestId('product-info')).toBeInTheDocument();
    expect(screen.getByTestId('product-meta')).toBeInTheDocument();
    expect(screen.getByTestId('product-actions')).toBeInTheDocument();
  });

  it('maintains proper component structure with container and sections', () => {
    const { container } = render(<ProductDetail />);

    // Verify the main structure exists
    const mainContainer = container.querySelector('[class*="container"]');
    expect(mainContainer).toBeInTheDocument();

    const productSection = container.querySelector('[class*="product"]');
    expect(productSection).toBeInTheDocument();

    const infoSection = container.querySelector('[class*="infoSection"]');
    expect(infoSection).toBeInTheDocument();
  });
});
