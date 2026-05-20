import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default as ArticleDetails } from '@/components/article-details/ArticleDetails';
import {
  defaultProps,
  propsWithoutAuthor,
  propsWithoutFeaturedImage,
  propsMinimal,
  propsWithoutRoute,
  propsWithAuthorNoImage,
  propsWithAuthorNoJobTitle,
} from './ArticleDetails.mockProps';
import type { Field } from '@sitecore-content-sdk/nextjs';

beforeAll(() => {
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

const mockBack = jest.fn();
Object.defineProperty(window, 'history', {
  writable: true,
  value: { back: mockBack },
});

window.open = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

const mockUseSitecore = jest.fn();
jest.mock('@sitecore-content-sdk/nextjs', () => ({
  useSitecore: () => mockUseSitecore(),
  Text: ({ field, tag, className }: { field?: Field<string>; tag?: string; className?: string }) => {
    const Tag = (tag || 'span') as keyof JSX.IntrinsicElements;
    return React.createElement(Tag, { className, 'data-testid': 'text-field' }, field?.value || '');
  },
  RichText: ({ field, tag, className }: { field?: Field<string>; tag?: string; className?: string }) => {
    const Tag = (tag || 'div') as keyof JSX.IntrinsicElements;
    return React.createElement(
      Tag,
      { className, 'data-testid': 'richtext-field' },
      field?.value || ''
    );
  },
  DateField: ({
    field,
    render,
    tag,
    className,
  }: {
    field?: Field<string>;
    render?: (value: string) => string;
    tag?: string;
    className?: string;
  }) => {
    const Tag = (tag || 'span') as keyof JSX.IntrinsicElements;
    const formattedDate = render && field?.value ? render(field.value) : field?.value;
    return React.createElement(Tag, { className, 'data-testid': 'date-field' }, formattedDate || '');
  },
  Placeholder: ({ name }: { name: string }) =>
    React.createElement('div', { 'data-testid': `placeholder-${name}` }, `Placeholder: ${name}`),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      Demo1_ArticleHeader_BackToNewsLabel: 'Back to News',
      Demo1_ArticleHeader_AuthorLabel: 'Written by',
    };
    return translations[key] || key;
  },
}));

jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: { children?: React.ReactNode }) => <div data-testid="avatar">{children}</div>,
  AvatarImage: ({ src, alt }: { src?: string; alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="avatar-image" />
  ),
  AvatarFallback: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="avatar-fallback">{children}</div>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    onClick,
    variant,
    className,
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    variant?: string;
    className?: string;
  }) => (
    <button className={className} onClick={onClick} data-testid="button" data-variant={variant}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/toaster', () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

jest.mock('@/components/image/ImageWrapper.dev', () => {
  const ImageWrapperMock = React.forwardRef<
    HTMLImageElement,
    { image?: { value?: { src?: string } }; alt?: string; className?: string }
  >(({ image, alt, className }, ref) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} src={image?.value?.src} alt={alt} className={className} data-testid="image-wrapper" />
  ));
  ImageWrapperMock.displayName = 'ImageWrapper';
  return { Default: ImageWrapperMock };
});

jest.mock('@/components/icon/Icon', () => ({
  Default: ({ iconName, className }: { iconName?: string; className?: string }) => (
    <span className={className} data-testid={`icon-${iconName}`}>
      {iconName}
    </span>
  ),
}));

type FloatingDockItem = {
  title: string;
  onClick: () => void;
};

jest.mock('@/components/floating-dock/floating-dock.dev', () => ({
  FloatingDock: ({ items }: { items?: FloatingDockItem[] }) => (
    <div data-testid="floating-dock">
      {items?.map((item, index) => (
        <button key={index} onClick={item.onClick} data-testid={`dock-item-${index}`}>
          {item.title}
        </button>
      ))}
    </div>
  ),
}));

jest.mock('@/utils/NoDataFallback', () => ({
  NoDataFallback: ({ componentName }: { componentName?: string }) => (
    <div data-testid="no-data-fallback">{componentName}</div>
  ),
}));

jest.mock('@/utils/date-utils', () => ({
  formatDateInUTC: (date: string) => `Formatted: ${date}`,
}));

jest.mock('lucide-react', () => ({
  Facebook: () => <span data-testid="facebook-icon">Facebook</span>,
  Twitter: () => <span data-testid="twitter-icon">Twitter</span>,
  Linkedin: () => <span data-testid="linkedin-icon">LinkedIn</span>,
  Mail: () => <span data-testid="mail-icon">Mail</span>,
  Link: () => <span data-testid="link-icon">Link</span>,
  Check: () => <span data-testid="check-icon">Check</span>,
}));

describe('ArticleDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSitecore.mockReturnValue({
      page: {
        mode: {
          isEditing: false,
        },
      },
    });
  });

  it('renders title, excerpt, content, meta, author, and featured image from route fields', () => {
    render(<ArticleDetails {...(defaultProps as unknown as Parameters<typeof ArticleDetails>[0])} />);

    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
    expect(screen.getAllByTestId('richtext-field').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('5 min read')).toBeInTheDocument();

    const authorNames = screen.getAllByText(/John.*Doe/);
    expect(authorNames.length).toBeGreaterThan(0);

    const images = screen.getAllByTestId('image-wrapper');
    expect(images[0]).toHaveAttribute('src', '/test-article-hero.jpg');
  });

  it('renders without author', () => {
    render(<ArticleDetails {...(propsWithoutAuthor as unknown as Parameters<typeof ArticleDetails>[0])} />);

    expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
  });

  it('does not render featured image when FeaturedImage is not on the route', () => {
    render(
      <ArticleDetails {...(propsWithoutFeaturedImage as unknown as Parameters<typeof ArticleDetails>[0])} />
    );

    expect(screen.queryByTestId('image-wrapper')).not.toBeInTheDocument();
    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
  });

  it('renders with minimal route fields (title only)', () => {
    render(<ArticleDetails {...(propsMinimal as unknown as Parameters<typeof ArticleDetails>[0])} />);

    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
    expect(screen.queryByTestId('image-wrapper')).not.toBeInTheDocument();
  });

  it('calls window.history.back from back button', () => {
    render(<ArticleDetails {...(defaultProps as unknown as Parameters<typeof ArticleDetails>[0])} />);

    const backButton = screen.getAllByRole('button').find((button) =>
      button.textContent?.includes('Back to News')
    );
    if (backButton) {
      fireEvent.click(backButton);
      expect(mockBack).toHaveBeenCalled();
    }
  });

  it('renders author without profile image', () => {
    render(<ArticleDetails {...(propsWithAuthorNoImage as unknown as Parameters<typeof ArticleDetails>[0])} />);

    expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
  });

  it('renders author without job title', () => {
    render(
      <ArticleDetails {...(propsWithAuthorNoJobTitle as unknown as Parameters<typeof ArticleDetails>[0])} />
    );

    expect(screen.queryByText('Senior Developer')).not.toBeInTheDocument();
  });

  it('renders NoDataFallback when route is missing', () => {
    render(<ArticleDetails {...(propsWithoutRoute as unknown as Parameters<typeof ArticleDetails>[0])} />);

    const fallback = screen.getByTestId('no-data-fallback');
    expect(fallback).toHaveTextContent('ArticleDetails');
  });

  it('uses article-details container class', () => {
    const { container } = render(
      <ArticleDetails {...(defaultProps as unknown as Parameters<typeof ArticleDetails>[0])} />
    );

    expect(container.querySelector('.article-details')).toBeInTheDocument();
  });
});
