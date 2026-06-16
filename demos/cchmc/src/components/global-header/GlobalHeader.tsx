'use client';

import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Search, ChevronDown } from 'lucide-react';
import { Link as SitecoreLink, Image } from '@sitecore-content-sdk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Default as Logo } from '@/components/logo/Logo.dev';
import { GlobalHeaderProps } from './global-header.props';
import { HeaderSearchShelf } from './HeaderSearchShelf';
import { Button } from '@/components/ui/button';
import { Url } from 'next/dist/shared/lib/router/router';

const utilityTextLinks = [
  { label: 'Schedule an Appointment', href: '#' },
  { label: 'Directions', href: '#' },
  { label: 'International', href: '#' },
  { label: 'Billing', href: '#' },
  { label: 'Sign in to MyChart', href: '#' },
];

const utilityButtonLinks = [
  { label: 'Ways to Help', href: '#', variant: 'muted' as const },
  { label: 'Donate Now', href: '#', variant: 'primary' as const },
];

export const Default: React.FC<GlobalHeaderProps> = (props) => {
  const { fields, page } = props ?? {};
  const { logo, headerContact } = fields?.data?.item ?? {};
  const links = fields?.data?.item?.children?.results ?? [];
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pageEditing = page.mode.isEditing;
  const router = useRouter();

  const searchShelfRef = useRef<HTMLDivElement>(null);
  const desktopSearchToggleRef = useRef<HTMLButtonElement>(null);
  const mobileSearchToggleRef = useRef<HTMLButtonElement>(null);

  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((open) => {
      if (open) {
        setSearchQuery('');
      }
      return !open;
    });
  }, []);

  const navigateToSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      const url = trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/site-search';
      router.push(url);
      closeSearch();
    },
    [closeSearch, router]
  );

  const handleSearchSubmit = useCallback(() => {
    navigateToSearch(searchQuery);
  }, [navigateToSearch, searchQuery]);

  const handleTermSelect = useCallback(
    (term: string) => {
      setSearchQuery(term);
      navigateToSearch(term);
    },
    [navigateToSearch]
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY < prevScrollY) {
        setVisible(true);
      } else if (currentScrollY > 10 && currentScrollY > prevScrollY) {
        setVisible(false);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (searchShelfRef.current?.contains(target)) {
        return;
      }

      if (
        desktopSearchToggleRef.current?.contains(target) ||
        mobileSearchToggleRef.current?.contains(target)
      ) {
        return;
      }

      closeSearch();
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [closeSearch, isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeSearch, isSearchOpen]);

  const searchToggleButton = (className?: string) => (
    <Button
      ref={desktopSearchToggleRef}
      type="button"
      variant="ghost"
      onClick={toggleSearch}
      className={cn(
        'text-primary hover:text-primary-hover gap-1 px-2 font-semibold normal-case tracking-normal hover:bg-transparent',
        className
      )}
      aria-expanded={isSearchOpen}
      aria-controls="header-search-shelf"
    >
      <span className="text-sm">Search</span>
      <Search className="size-[18px] shrink-0" strokeWidth={2.5} />
    </Button>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn('bg-background @container sticky top-0 z-50 w-full')}
      >
        {/* Utility navigation bar */}
        <div className="bg-secondary hidden @lg:block">
          <div className="@xl:px-8 mx-auto flex h-9 max-w-screen-xl items-stretch justify-end px-4">
            <div className="flex items-center gap-x-5">
              {utilityTextLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground/90 hover:text-primary text-[11px] font-semibold uppercase tracking-wide transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="ml-4 flex items-stretch">
              {utilityButtonLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 text-[11px] font-semibold uppercase tracking-wide transition-colors',
                    item.variant === 'primary'
                      ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                      : 'bg-utility-muted text-foreground hover:bg-utility-muted/80'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-border border-b bg-background">
          <div className="@xl:px-8 mx-auto flex min-h-[68px] w-full max-w-screen-xl items-center px-4 @lg:min-h-[76px]">
            <div className="mr-6 shrink-0 @lg:mr-10">
              {pageEditing ? (
                <Image field={logo?.jsonValue} className="h-10 w-auto" />
              ) : (
                logo?.jsonValue?.value && (
                  <Link
                    href="/"
                    className="flex w-[148px] items-stretch @lg:w-[190px] [&_.image-container]:w-full"
                  >
                    <Logo logo={logo?.jsonValue} className="w-full" />
                  </Link>
                )
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="@lg:flex @lg:flex-1 hidden">
              <NavigationMenu>
                <NavigationMenuList className="gap-0">
                  {links &&
                    links.length > 0 &&
                    links.map((item, i) => (
                      <Fragment key={`desktop-nav-menu-list-item-${i}`}>
                        {pageEditing ? (
                          <Button
                            variant="ghost"
                            asChild
                            className="text-foreground hover:text-primary px-3 py-2 text-[15px] font-medium normal-case tracking-normal hover:bg-transparent"
                          >
                            <SitecoreLink field={item.link?.jsonValue} />
                          </Button>
                        ) : (
                          item.link?.jsonValue?.value?.href && (
                            <NavigationMenuItem>
                              <Button
                                variant="ghost"
                                asChild
                                className="text-foreground hover:text-primary px-3 py-2 text-[15px] font-medium normal-case tracking-normal hover:bg-transparent"
                              >
                                <Link href={item.link.jsonValue.value.href as string}>
                                  {item.link.jsonValue.value.text}
                                </Link>
                              </Button>
                            </NavigationMenuItem>
                          )
                        )}
                      </Fragment>
                    ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop actions */}
            <div className="@lg:flex @lg:items-center @lg:gap-2 hidden">
              {searchToggleButton()}
              {pageEditing ? (
                <Button variant="magenta" asChild size="default" className="gap-1.5 normal-case">
                  <SitecoreLink field={headerContact?.jsonValue} />
                </Button>
              ) : (
                headerContact?.jsonValue?.value?.href && (
                  <Button variant="magenta" asChild size="default" className="gap-1.5 normal-case">
                    <Link href={headerContact.jsonValue.value.href as Url}>
                      {headerContact.jsonValue.value.text || 'I want to'}
                      <ChevronDown className="size-4" aria-hidden />
                    </Link>
                  </Button>
                )
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="@lg:hidden flex flex-1 items-center justify-end gap-1">
              <Button
                ref={mobileSearchToggleRef}
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="text-primary hover:text-primary-hover"
                aria-expanded={isSearchOpen}
                aria-controls="header-search-shelf"
              >
                <Search className="size-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-secondary [&_svg]:size-7">
                    <Menu />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm [&>button_svg]:size-7">
                  <nav className="mt-16 flex flex-col gap-1">
                    {links &&
                      links.length > 0 &&
                      links.map(
                        (item) =>
                          item.link?.jsonValue?.value?.href && (
                            <Button
                              key={`${item.link.jsonValue.value.text}-mobile`}
                              variant="ghost"
                              asChild
                              className="h-auto justify-start px-0 py-3 text-base font-medium normal-case tracking-normal"
                              onClick={() => setIsOpen(false)}
                            >
                              <Link href={item.link.jsonValue.value.href as string}>
                                {item.link.jsonValue.value.text}
                              </Link>
                            </Button>
                          )
                      )}
                    {headerContact?.jsonValue?.value?.href && (
                      <Button
                        variant="magenta"
                        asChild
                        className="mt-4 w-full gap-1.5 normal-case"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={headerContact.jsonValue.value.href as Url}>
                          {headerContact.jsonValue.value.text || 'I want to'}
                          <ChevronDown className="size-4" aria-hidden />
                        </Link>
                      </Button>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div id="header-search-shelf">
          <HeaderSearchShelf
            isOpen={isSearchOpen}
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearchSubmit}
            onClose={closeSearch}
            onTermSelect={handleTermSelect}
            shelfRef={searchShelfRef}
          />
        </div>
      </motion.header>
    </AnimatePresence>
  );
};
