'use client';

import { AppPlaceholder, ComponentMap, ImageField, NextImage, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX, useEffect, useRef, useState } from 'react';

export type HeaderProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
  componentMap: ComponentMap;
};

export const Default = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();

  return (
    <div className={`component header ${props.params.styles?.trimEnd()}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <AppPlaceholder name="header-left" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
        </div>
      </div>
    </div>
  );
};



export const WithLogoImage = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  
  return (
    <div className={`component header ${sxaStyles}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <a href="/"><NextImage field={props.fields.LogoImage} width={200} height={50} /></a>
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
        </div>
      </div>
    </div>
  );
};

const HEADER_MENU = [
  { label: 'Knowledge', href: '/insights' },
  { label: 'Featured insights', href: '/featured-insights' },
  { label: 'About Dentons', href: '/about-dentons' },
  { label: 'Global presence', href: '/global-presence' },
  { label: 'Careers', href: '/careers' },
  { label: 'Practices', href: '/find-your-dentons-team' },
  { label: 'Services and solutions', href: '/services-and-solutions' },
  { label: 'Events', href: '/events' },
  { label: 'Recognition', href: '/recognition' },
  { label: 'News', href: '/news' },
] as const;

const HeaderLogo = ({ field }: { field?: ImageField }): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const hasLogo = Boolean(field?.value?.src);

  if (isPageEditing || hasLogo) {
    return <NextImage field={field} width={180} height={45} />;
  }

  return <img src="/dentons-logo.svg" alt="Dentons" width={180} height={45} />;
};

/* Language pill and hamburger are hardcoded chrome. The EN control does not switch language. */
const HeaderTools = (): JSX.Element => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!languageOpen && !menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!toolsRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLanguageOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [languageOpen, menuOpen]);

  return (
    <div className="header-tools" ref={toolsRef}>
      <div className="header-language">
        <button
          type="button"
          className="header-language-toggle"
          aria-haspopup="listbox"
          aria-expanded={languageOpen}
          aria-label="Language, English"
          onClick={() => {
            setLanguageOpen((open) => !open);
            setMenuOpen(false);
          }}
        >
          <span className="header-language-bubble" aria-hidden="true">
            EN
          </span>
          <svg className="header-chevron" viewBox="0 0 12 8" width="10" height="6" aria-hidden="true">
            <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        {languageOpen && (
          <ul className="header-language-menu" role="listbox" aria-label="Language">
            <li role="option" aria-selected="true">
              <button type="button" onClick={() => setLanguageOpen(false)}>
                EN
              </button>
            </li>
          </ul>
        )}
      </div>
      <div className="header-menu">
        <button
          type="button"
          className="header-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="dentons-header-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => {
            setMenuOpen((open) => !open);
            setLanguageOpen(false);
          }}
        >
          {menuOpen ? (
            <svg viewBox="0 0 22 22" width="20" height="20" aria-hidden="true">
              <path d="M4 4 18 18M18 4 4 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 22 16" width="22" height="16" aria-hidden="true">
              <path d="M1 1.5h20M1 8h20M1 14.5h20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
        {menuOpen && (
          <nav className="header-menu-panel" id="dentons-header-menu" aria-label="More">
            <ul>
              {HEADER_MENU.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

// harness:header-kit:start Header Dentons
/* Dentons variant: logo, main navigation, language pill, search and hamburger. */
export const Dentons = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();

  return (
    <div className={`component header variant-dentons ${sxaStyles}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <a href="/">
              <HeaderLogo field={props.fields?.LogoImage} />
            </a>
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
            <HeaderTools />
          </div>
        </div>
      </div>
    </div>
  );
};
// harness:header-kit:end Header Dentons
