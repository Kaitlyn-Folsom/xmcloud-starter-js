import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as Hero, ImageLeft as HeroImageLeft } from '@/components/hero/Hero';
import {
  defaultProps,
  propsWithPrimaryScheme,
  propsWithSecondaryScheme,
  propsWithTertiaryScheme,
  propsWithDarkScheme,
  propsWithoutDescription,
  propsWithoutLink,
  propsWithOnlyTitle,
  propsWithoutFeaturedImage,
  propsWithoutColorScheme,
  propsWithoutFields,
  propsEditing,
  mockPageData,
  mockPageDataEditing,
} from './Hero.mockProps';
import type { HeroProps } from '@/components/hero/hero.props';

interface MockTextProps {
  field?: { value?: string };
  tag?: string;
  className?: string;
}

interface MockEditableButtonProps {
  buttonLink?: { value?: { href?: string; text?: string } };
  className?: string;
  isPageEditing?: boolean;
}

interface MockAnimatedSectionProps {
  children?: React.ReactNode;
  direction?: string;
  className?: string;
  isPageEditing?: boolean;
  reducedMotion?: boolean;
}

interface MockImageWrapperProps {
  image?: { value?: { src?: string } };
  className?: string;
  wrapperClass?: string;
  priority?: boolean;
  sizes?: string;
}

interface MockNoDataFallbackProps {
  componentName?: string;
}

jest.mock('@/lib/utils', () => ({
  cn: (...args: Array<string | boolean | Record<string, boolean> | undefined>) => {
    return args
      .flat()
      .filter(Boolean)
      .map((arg) => {
        if (typeof arg === 'string') return arg;
        if (typeof arg === 'object') {
          return Object.keys(arg)
            .filter((key) => arg[key])
            .join(' ');
        }
        return '';
      })
      .join(' ')
      .trim();
  },
}));

const mockUseSitecore = jest.fn();
jest.mock('@sitecore-content-sdk/nextjs', () => ({
  useSitecore: () => mockUseSitecore(),
  Text: ({ field, tag, className }: MockTextProps) => {
    const Tag = tag || 'span';
    return React.createElement(Tag, { className }, field?.value || '');
  },
}));

jest.mock('@/components/button-component/ButtonComponent', () => ({
  EditableButton: ({ buttonLink, className, isPageEditing }: MockEditableButtonProps) => (
    <button
      data-testid="hero-button"
      data-href={buttonLink?.value?.href}
      data-editing={isPageEditing}
      className={className}
    >
      {buttonLink?.value?.text || 'Button'}
    </button>
  ),
}));

jest.mock('@/components/animated-section/AnimatedSection.dev', () => ({
  Default: ({
    children,
    direction,
    className,
    isPageEditing,
    reducedMotion,
  }: MockAnimatedSectionProps) => (
    <div
      data-testid="animated-section"
      data-direction={direction}
      data-editing={isPageEditing}
      data-reduced-motion={reducedMotion}
      className={className}
    >
      {children}
    </div>
  ),
}));

jest.mock('@/components/image/ImageWrapper.dev', () => ({
  Default: ({ image, className, wrapperClass, priority, sizes }: MockImageWrapperProps) => (
    <div
      data-testid="featured-image"
      data-image={image?.value?.src}
      data-priority={priority}
      data-sizes={sizes}
      className={className}
      data-wrapper-class={wrapperClass}
    />
  ),
}));

jest.mock('@/utils/NoDataFallback', () => ({
  NoDataFallback: ({ componentName }: MockNoDataFallbackProps) => (
    <div data-testid="no-data-fallback">{componentName}</div>
  ),
}));

describe('Hero Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSitecore.mockReturnValue(mockPageData);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  describe('Basic rendering', () => {
    it('should render hero with all fields', () => {
      render(<Hero {...defaultProps} />);

      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Discover amazing features and transform your experience with our innovative solutions.'
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId('hero-button')).toBeInTheDocument();
    });

    it('should render as section element', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('hero', '@container');
    });

    it('should render title as h1 tag', () => {
      render(<Hero {...defaultProps} />);

      const title = screen.getByText('Welcome to Our Platform');
      expect(title.tagName).toBe('H1');
    });

    it('should render description as p tag', () => {
      render(<Hero {...defaultProps} />);

      const description = screen.getByText(/Discover amazing features/);
      expect(description.tagName).toBe('P');
    });
  });

  describe('Color scheme variants', () => {
    it('should apply light color scheme classes', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-background', 'text-foreground');
    });

    it('should apply primary color scheme classes', () => {
      const { container } = render(<Hero {...propsWithPrimaryScheme} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('should apply secondary color scheme classes', () => {
      const { container } = render(<Hero {...propsWithSecondaryScheme} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-secondary', 'text-foreground');
    });

    it('should apply tertiary color scheme classes', () => {
      const { container } = render(<Hero {...propsWithTertiaryScheme} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-tertiary', 'text-foreground');
    });

    it('should apply dark color scheme classes', () => {
      const { container } = render(<Hero {...propsWithDarkScheme} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-dark', 'text-dark-foreground');
    });

    it('should apply default primary scheme when colorScheme is not provided', () => {
      const { container } = render(<Hero {...propsWithoutColorScheme} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('should apply correct text color for description with primary scheme', () => {
      render(<Hero {...propsWithPrimaryScheme} />);

      const description = screen.getByText(/Discover amazing features/);
      expect(description).toHaveClass('text-primary-foreground');
    });

    it('should apply correct text color for description with non-primary schemes', () => {
      render(<Hero {...propsWithSecondaryScheme} />);

      const description = screen.getByText(/Discover amazing features/);
      expect(description).toHaveClass('text-muted-foreground');
    });

    it('should apply correct button classes for primary scheme', () => {
      render(<Hero {...propsWithPrimaryScheme} />);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveClass('text-primary', 'bg-white', 'hover:bg-gray-100');
    });
  });

  describe('Optional fields handling', () => {
    it('should render without description field', () => {
      render(<Hero {...propsWithoutDescription} />);

      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
      expect(screen.queryByText(/Discover amazing features/)).not.toBeInTheDocument();
      expect(screen.getByTestId('hero-button')).toBeInTheDocument();
    });

    it('should render without link field', () => {
      render(<Hero {...propsWithoutLink} />);

      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
      expect(screen.getByText(/Discover amazing features/)).toBeInTheDocument();
      expect(screen.queryByTestId('hero-button')).not.toBeInTheDocument();
    });

    it('should render with only title', () => {
      render(<Hero {...propsWithOnlyTitle} />);

      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
      expect(screen.queryByText(/Discover amazing features/)).not.toBeInTheDocument();
      expect(screen.queryByTestId('hero-button')).not.toBeInTheDocument();
    });
  });

  describe('Featured image rendering', () => {
    it('should render the featured image', () => {
      render(<Hero {...defaultProps} />);

      const featuredImage = screen.getByTestId('featured-image');
      expect(featuredImage).toBeInTheDocument();
      expect(featuredImage).toHaveAttribute('data-image', '/images/hero-image-1.jpg');
    });

    it('should render featured image with cover layout classes', () => {
      render(<Hero {...defaultProps} />);

      const featuredImage = screen.getByTestId('featured-image');
      expect(featuredImage.className).toContain('object-cover');
      expect(featuredImage).toHaveAttribute('data-priority', 'true');
    });

    it('should not render featured image when image is missing', () => {
      render(<Hero {...propsWithoutFeaturedImage} />);

      expect(screen.queryByTestId('featured-image')).not.toBeInTheDocument();
    });
  });

  describe('Editing mode behavior', () => {
    it('should render fields in editing mode even without values', () => {
      mockUseSitecore.mockReturnValue(mockPageDataEditing);
      render(<Hero {...propsEditing} />);

      expect(screen.getByTestId('animated-section')).toHaveAttribute('data-editing', 'true');
    });

    it('should pass editing state to EditableButton', () => {
      mockUseSitecore.mockReturnValue(mockPageDataEditing);
      render(<Hero {...propsEditing} />);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-editing', 'true');
    });
  });

  describe('AnimatedSection integration', () => {
    it('should render content in AnimatedSection', () => {
      render(<Hero {...defaultProps} />);

      const animatedSection = screen.getByTestId('animated-section');
      expect(animatedSection).toBeInTheDocument();
      expect(animatedSection).toHaveAttribute('data-direction', 'up');
    });
  });

  describe('Component structure', () => {
    it('should apply custom styles from params', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-hero-style');
    });

    it('should apply container query classes', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('@container');
    });

    it('should use split hero layout grid with featured image proportions', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const grid = container.querySelector('.\\@lg\\:grid-cols-\\[2fr_3fr\\]');
      expect(grid).toBeInTheDocument();
    });

    it('should apply overflow-hidden class', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('overflow-hidden');
    });
  });

  describe('Edge cases and fallbacks', () => {
    it('should render NoDataFallback when fields is null', () => {
      render(<Hero {...propsWithoutFields} />);

      const fallback = screen.getByTestId('no-data-fallback');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('Hero');
    });

    it('should render NoDataFallback when fields is undefined', () => {
      const propsWithUndefinedFields = {
        ...defaultProps,
        fields: undefined as unknown as HeroProps['fields'],
      };

      render(<Hero {...propsWithUndefinedFields} />);

      const fallback = screen.getByTestId('no-data-fallback');
      expect(fallback).toBeInTheDocument();
    });
  });

  describe('CSS classes and styling', () => {
    it('should apply correct title classes', () => {
      render(<Hero {...defaultProps} />);

      const title = screen.getByText('Welcome to Our Platform');
      expect(title).toHaveClass(
        'font-heading',
        'text-3xl',
        'font-bold',
        'leading-tight',
        'tracking-tight'
      );
    });

    it('should apply correct description classes', () => {
      render(<Hero {...defaultProps} />);

      const description = screen.getByText(/Discover amazing features/);
      expect(description).toHaveClass('font-body', '@md:text-lg', 'text-base', 'leading-relaxed');
    });

    it('should apply solid primary background to hero content panel', () => {
      const { container } = render(<Hero {...propsWithPrimaryScheme} />);

      const contentPanel = container.querySelector('.bg-primary');
      expect(contentPanel).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should respect prefers-reduced-motion setting', () => {
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      render(<Hero {...defaultProps} />);

      const animatedSection = screen.getByTestId('animated-section');
      expect(animatedSection).toHaveAttribute('data-reduced-motion', 'true');
    });
  });

  describe('ImageLeft variant', () => {
    it('should render hero content and featured image', () => {
      render(<HeroImageLeft {...defaultProps} />);

      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
      expect(screen.getByTestId('featured-image')).toBeInTheDocument();
    });

    it('should use image-left grid proportions', () => {
      const { container } = render(<HeroImageLeft {...defaultProps} />);

      const grid = container.querySelector('.\\@lg\\:grid-cols-\\[3fr_2fr\\]');
      expect(grid).toBeInTheDocument();
    });

    it('should render image before text content in the DOM', () => {
      const { container } = render(<HeroImageLeft {...defaultProps} />);

      const grid = container.querySelector('.\\@lg\\:grid-cols-\\[3fr_2fr\\]');
      expect(grid?.children[0]).toContainElement(screen.getByTestId('featured-image'));
      expect(grid?.children[1]).toContainElement(screen.getByText('Welcome to Our Platform'));
    });
  });
});
