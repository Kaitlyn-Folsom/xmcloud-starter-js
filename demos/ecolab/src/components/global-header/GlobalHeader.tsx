'use client';

import { Fragment, useState, useEffect } from 'react';
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
import { getFieldValue } from '@/lib/component-props';

const UTILITY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Investors', href: '/investors' },
  { label: 'Newsroom', href: '/newsroom' },
  { label: 'Careers', href: '/careers' },
  { label: 'Locations', href: '/locations' },
];

export const Default: React.FC<GlobalHeaderProps> = (props) => {
  const { fields, page } = props ?? {};
  const { logo, headerContact } = fields?.data?.item ?? {};
  const links = fields?.data?.item?.children?.results ?? [];
  const logoField = getFieldValue(logo);
  const headerContactField = getFieldValue(headerContact);
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
        className="@container sticky top-0 z-50 w-full"
      >
        {/* Utility bar */}
        <div className="bg-dark text-dark-foreground hidden @md:block">
          <div className="@xl:px-8 mx-auto flex h-9 max-w-screen-xl items-center justify-end gap-6 px-4">
            {UTILITY_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-dark-foreground/90 hover:text-dark-foreground text-xs font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Main navigation */}
        <header className="bg-background border-border flex h-[72px] w-full items-center justify-center border-b shadow-sm">
          <div className="@xl:px-8 mx-auto flex h-full w-full max-w-screen-xl items-center px-4">
            <div className="mr-8 shrink-0">
              {pageEditing ? (
                <Image field={logoField} className="h-8 w-auto" />
              ) : (
                logoField?.value && (
                  <Link
                    href="/"
                    className="flex w-[140px] items-stretch space-x-2 [&_.image-container]:w-full"
                  >
                    <Logo logo={logoField} className="w-full" />
                  </Link>
                )
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="@lg:flex @lg:flex-1 hidden">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {links &&
                    links.length > 0 &&
                    links.map((item, i) => {
                      const linkField = getFieldValue(item.link);

                      return (
                        <Fragment key={`desktop-nav-menu-list-item-${i}`}>
                          {pageEditing ? (
                            linkField ? (
                              <Button
                                variant="ghost"
                                asChild
                                className="text-foreground hover:text-primary font-body text-sm font-medium"
                              >
                                <SitecoreLink field={linkField} />
                              </Button>
                            ) : null
                          ) : (
                            linkField?.value?.href && (
                              <NavigationMenuItem>
                                <Button
                                  variant="ghost"
                                  asChild
                                  className="text-foreground hover:text-primary font-body text-sm font-medium"
                                >
                                  <Link href={linkField.value.href as string}>
                                    {linkField.value.text}
                                  </Link>
                                </Button>
                              </NavigationMenuItem>
                            )
                          )}
                        </Fragment>
                      );
                    })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop actions */}
            <div className="@lg:flex @lg:items-center @lg:gap-3 hidden">
              <Button variant="ghost" size="icon" aria-label="Search" className="text-primary">
                <Search className="size-5" />
              </Button>
              {pageEditing ? (
                headerContactField ? (
                  <Button variant="outline" asChild className="font-heading text-sm font-medium">
                    <SitecoreLink field={headerContactField} />
                  </Button>
                ) : null
              ) : (
                headerContactField?.value?.href && (
                  <Button variant="outline" asChild className="font-heading text-sm font-medium">
                    <Link href={headerContactField.value.href as Url}>
                      {headerContactField.value.text}
                    </Link>
                  </Button>
                )
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="@lg:hidden flex flex-1 items-center justify-end gap-2">
              <Button variant="ghost" size="icon" aria-label="Search" className="text-primary">
                <Search className="size-5" />
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-transparent [&_svg]:size-6">
                    <Menu />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="[&>button_svg]:size-6">
                  <nav className="mt-[70px] flex flex-col space-y-1">
                    {links &&
                      links.length > 0 &&
                      links.map((item) => {
                        const linkField = getFieldValue(item.link);

                        return (
                          linkField?.value?.href && (
                            <Button
                              key={`${linkField.value.text}-mobile`}
                              variant="ghost"
                              asChild
                              className="justify-start text-base"
                              onClick={() => setIsOpen(false)}
                            >
                              <Link href={linkField.value.href as string}>
                                {linkField.value.text}
                              </Link>
                            </Button>
                          )
                        );
                      })}
                    <div className="border-border my-4 border-t pt-4">
                      {UTILITY_LINKS.map((item) => (
                        <Button
                          key={item.label}
                          variant="ghost"
                          asChild
                          className="text-muted-foreground justify-start text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </Button>
                      ))}
                    </div>
                    {headerContactField?.value?.href && (
                      <Button
                        variant="default"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={headerContactField.value.href as Url}>
                          {headerContactField.value.text}
                        </Link>
                      </Button>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      </motion.div>
    </AnimatePresence>
  );
};
