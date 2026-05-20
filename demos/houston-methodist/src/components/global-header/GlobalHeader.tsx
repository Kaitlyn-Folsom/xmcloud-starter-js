'use client';

import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { Url } from 'next/dist/shared/lib/router/router';

const utilityLinks = [
  { label: 'Academic Institute', href: '#' },
  { label: 'Giving', href: '#' },
  { label: 'International Patients', href: '#' },
  { label: 'Careers', href: '#' },
];

export const Default: React.FC<GlobalHeaderProps> = (props) => {
  const { fields, page } = props ?? {};
  const { logo, headerContact } = fields?.data?.item ?? {};
  const links = fields?.data?.item?.children?.results ?? [];
  const [isOpen, setIsOpen] = useState(false);
  const pageEditing = page.mode.isEditing;

  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-50 w-full"
      >
        {/* Utility bar – Houston Methodist pattern */}
        <div
          className="bg-primary text-primary-foreground hidden border-b border-white/10 @md:block"
          aria-label="Utility navigation"
        >
          <div className="@xl:px-8 mx-auto flex h-9 max-w-screen-xl items-center justify-between px-4 text-xs">
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {utilityLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-brand-accent-blue text-white/90 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <header
          className={cn(
            'bg-background @container flex w-full flex-col border-b border-border shadow-sm'
          )}
        >
          {/* Top row: logo + quick links + search */}
          <div className="@xl:px-8 mx-auto flex w-full max-w-screen-xl flex-col gap-3 px-4 py-3 @lg:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="shrink-0">
                {pageEditing ? (
                  <Image field={logo?.jsonValue} className="h-10 w-auto max-w-[220px]" />
                ) : (
                  logo?.jsonValue?.value && (
                    <Link
                      href="/"
                      className="flex max-w-[220px] items-stretch [&_.image-container]:w-full"
                    >
                      <Logo logo={logo?.jsonValue} className="w-full" />
                    </Link>
                  )
                )}
              </div>

              <div className="@lg:flex hidden flex-1 items-center justify-end gap-6">
                <nav className="flex flex-wrap items-center justify-end gap-4 text-sm">
                  {links.slice(0, 3).map((item, i) => (
                    <Fragment key={`utility-nav-${i}`}>
                      {pageEditing ? (
                        <SitecoreLink
                          field={item.link?.jsonValue}
                          className="text-primary font-medium hover:underline"
                        />
                      ) : (
                        item.link?.jsonValue?.value?.href && (
                          <Link
                            href={item.link.jsonValue.value.href as string}
                            className="text-primary font-medium hover:underline"
                          >
                            {item.link.jsonValue.value.text}
                          </Link>
                        )
                      )}
                    </Fragment>
                  ))}
                </nav>
                <div className="relative hidden @xl:block">
                  <Search
                    className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
                    aria-hidden
                  />
                  <input
                    type="search"
                    placeholder="Search"
                    className="border-input bg-background text-foreground h-10 w-48 rounded-default border pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Search"
                  />
                </div>
                {pageEditing ? (
                  <Button variant="default" asChild className="shrink-0">
                    <SitecoreLink field={headerContact?.jsonValue} />
                  </Button>
                ) : (
                  headerContact?.jsonValue?.value?.href && (
                    <Button variant="default" asChild className="shrink-0">
                      <Link href={headerContact.jsonValue.value.href as Url}>
                        {headerContact.jsonValue.value.text}
                      </Link>
                    </Button>
                  )
                )}
              </div>

              {/* Mobile menu */}
              <div className="@lg:hidden flex flex-1 justify-end">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary hover:bg-secondary [&_svg]:size-7"
                    >
                      <Menu />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-sm [&>button_svg]:size-8">
                    <nav className="mt-16 flex flex-col gap-1">
                      {links.map((item, i) => (
                        <Fragment key={`mobile-nav-${i}`}>
                          {pageEditing ? (
                            <Button variant="ghost" asChild className="hm-nav-link justify-start">
                              <SitecoreLink field={item.link?.jsonValue} />
                            </Button>
                          ) : (
                            item.link?.jsonValue?.value?.href && (
                              <Button
                                variant="ghost"
                                asChild
                                className="hm-nav-link justify-start"
                                onClick={() => setIsOpen(false)}
                              >
                                <Link href={item.link.jsonValue.value.href as string}>
                                  {item.link.jsonValue.value.text}
                                </Link>
                              </Button>
                            )
                          )}
                        </Fragment>
                      ))}
                      {headerContact?.jsonValue?.value?.href && (
                        <Button
                          variant="default"
                          asChild
                          className="mt-4"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href={headerContact.jsonValue.value.href as Url}>
                            {headerContact.jsonValue.value.text}
                          </Link>
                        </Button>
                      )}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Primary navigation */}
            <div className="@lg:flex hidden border-t border-border pt-3">
              <NavigationMenu className="w-full max-w-none justify-start">
                <NavigationMenuList className="flex flex-wrap gap-1">
                  {links.map((item, i) => (
                    <Fragment key={`desktop-nav-menu-list-item-${i}`}>
                      {pageEditing ? (
                        <Button variant="ghost" asChild className="hm-nav-link">
                          <SitecoreLink field={item.link?.jsonValue} />
                        </Button>
                      ) : (
                        item.link?.jsonValue?.value?.href && (
                          <NavigationMenuItem>
                            <Button variant="ghost" asChild className="hm-nav-link">
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
          </div>
        </header>
      </motion.div>
    </AnimatePresence>
  );
};
