import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Default as Hero,
  DefaultInvert as HeroDefaultInvert,
  ImageLeft as HeroImageLeft,
} from '@/components/hero/Hero';
import {
  defaultProps,
  propsWithoutDescription,
  propsWithoutLink,
  propsWithOnlyTitle,
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

interface MockImageProps {
  field?: { value?: { src?: string; alt?: string } };
  className?: string;
}

interface MockEditableButtonProps {
  buttonLink?: { value?: { href?: string; text?: string } };
  className?: string;
  isPageEditing?: boolean;
}

interface MockImageWrapperProps {
  image?: { value?: { src?: string; alt?: string } };
  className?: string;
  priority?: boolean;
  alt?: string;
}

interface MockButtonProps {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
  onClick?: () => void;
  className?: string;
  [key: string]: unknown;
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
  Image: ({ field, className }: MockImageProps) =>
    field?.value?.src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={field.value.src} alt={field.value.alt} className={className} data-testid="hero-badge-image" />
    ) : null,
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

jest.mock('@/components/image/ImageWrapper.dev', () => ({
  Default: ({ image, className, priority }: MockImageWrapperProps) => (
    <div
      data-testid="hero-background-image-inner"
      data-image={image?.value?.src}
      data-priority={priority}
      className={className}
    />
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, size, onClick, className, ...props }: MockButtonProps) => (
    <button
      data-testid="control-button"
      data-variant={variant}
      data-size={size}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
}));

jest.mock('lucide-react', () => ({
  Play: () => React.createElement('div', { 'data-testid': 'play-icon' }, 'Play'),
  Pause: () => React.createElement('div', { 'data-testid': 'pause-icon' }, 'Pause'),
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
      expect(section).toHaveClass('hero', '@container', 'w-full');
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

    it('should render content inside the hero overlay block', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const overlay = container.querySelector('.bg-\\[\\#ba508e\\]');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toContainElement(screen.getByText('Welcome to Our Platform'));
    });
  });

  describe('Background media rendering', () => {
    it('should render Feature 1 image as the background', () => {
      render(<Hero {...defaultProps} />);

      expect(screen.getByTestId('hero-background-image')).toBeInTheDocument();
      expect(screen.getByTestId('hero-background-image-inner')).toHaveAttribute(
        'data-image',
        '/images/hero-image-1.jpg'
      );
    });

    it('should prioritize the background image for loading', () => {
      render(<Hero {...defaultProps} />);

      expect(screen.getByTestId('hero-background-image-inner')).toHaveAttribute(
        'data-priority',
        'true'
      );
    });

    it('should constrain the entire hero to 1440px', () => {
      render(<Hero {...defaultProps} />);

      expect(screen.getByTestId('hero-container')).toHaveClass('max-w-[1440px]', 'mx-auto');
    });

    it('should stack image above content on mobile and overlay from tablet up', () => {
      render(<Hero {...defaultProps} />);

      expect(screen.getByTestId('hero-container')).toHaveClass('flex-col', 'md:block');
      expect(screen.getByTestId('hero-background-image')).toHaveClass('md:absolute');
    });

    it('should render background from nested datasource fields', () => {
      const nestedProps = {
        ...defaultProps,
        fields: {
          data: {
            datasource: {
              titleRequired: { jsonValue: defaultProps.fields.titleRequired },
              descriptionOptional: { jsonValue: defaultProps.fields.descriptionOptional },
              linkOptional: { jsonValue: defaultProps.fields.linkOptional },
              heroImageOptional1: { jsonValue: defaultProps.fields.heroImageOptional1 },
              heroImageOptional2: { jsonValue: defaultProps.fields.heroImageOptional2 },
            },
          },
        },
      };

      render(<Hero {...nestedProps} />);

      expect(screen.getByTestId('hero-background-image-inner')).toHaveAttribute(
        'data-image',
        '/images/hero-image-1.jpg'
      );
      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
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

  describe('Editing mode behavior', () => {
    it('should pass editing state to EditableButton', () => {
      mockUseSitecore.mockReturnValue(mockPageDataEditing);
      render(<Hero {...propsEditing} />);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-editing', 'true');
    });

    it('should render background container in editing mode', () => {
      mockUseSitecore.mockReturnValue(mockPageDataEditing);
      render(<Hero {...propsEditing} />);

      expect(screen.getByTestId('hero-background-image')).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should apply custom styles from params', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-hero-style');
    });

    it('should apply overflow-hidden class', () => {
      render(<Hero {...defaultProps} />);

      expect(screen.getByTestId('hero-container')).toHaveClass('overflow-hidden');
    });
  });

  describe('DefaultInvert variant', () => {
    it('should align content to the right from tablet up', () => {
      render(<HeroDefaultInvert {...defaultProps} />);

      expect(screen.getByTestId('hero-container')).toHaveAttribute('data-align', 'right');
      expect(screen.getByTestId('hero-container').querySelector('.md\\:justify-end')).toBeInTheDocument();
    });

    it('should render the same hero content as Default', () => {
      render(<HeroDefaultInvert {...defaultProps} />);

      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
      expect(screen.getByTestId('hero-background-image')).toBeInTheDocument();
      expect(screen.getByTestId('hero-button')).toBeInTheDocument();
    });
  });

  describe('ImageLeft variant', () => {
    it('should render a 50-50 split layout from tablet up', () => {
      render(<HeroImageLeft {...defaultProps} />);

      const container = screen.getByTestId('hero-container');
      expect(container).toHaveAttribute('data-layout', 'split');
      expect(container).toHaveClass('md:flex-row');

      const contentPanel = container.querySelector('.bg-\\[\\#ba508e\\]');
      const imagePanel = screen.getByTestId('hero-background-image');

      expect(contentPanel).toHaveClass('md:w-1/2');
      expect(imagePanel).toHaveClass('md:w-1/2');
    });

    it('should place content before the image in document order', () => {
      render(<HeroImageLeft {...defaultProps} />);

      const container = screen.getByTestId('hero-container');
      const contentPanel = container.querySelector('.bg-\\[\\#ba508e\\]');
      const imagePanel = screen.getByTestId('hero-background-image');

      expect(contentPanel).toBeInTheDocument();
      expect(imagePanel).toBeInTheDocument();
      expect(
        contentPanel!.compareDocumentPosition(imagePanel!) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
    });

    it('should render the same hero content as Default', () => {
      render(<HeroImageLeft {...defaultProps} />);

      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
      expect(screen.getByTestId('hero-background-image')).toBeInTheDocument();
      expect(screen.getByTestId('hero-button')).toBeInTheDocument();
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
      expect(title).toHaveClass('font-heading', 'text-2xl', 'lg:text-4xl');
    });

    it('should apply correct description classes', () => {
      render(<Hero {...defaultProps} />);

      const description = screen.getByText(/Discover amazing features/);
      expect(description).toHaveClass('text-base', 'md:text-lg');
    });

    it('should style CTA for contrast on primary overlay', () => {
      render(<Hero {...defaultProps} />);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveClass('bg-background', 'text-primary');
    });
  });

  describe('Accessibility', () => {
    it('should mark background media as decorative', () => {
      render(<Hero {...defaultProps} />);

      expect(screen.getByTestId('hero-background-image')).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
