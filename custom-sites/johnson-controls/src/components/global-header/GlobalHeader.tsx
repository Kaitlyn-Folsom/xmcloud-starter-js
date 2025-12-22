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
import { UtilityBrandBar } from './UtilityBrandBar';

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
    <>
      {/* Utility Brand Bar */}
      <UtilityBrandBar />
      
      <AnimatePresence mode="wait">
        <motion.header
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'bg-background sticky top-0 z-50 flex w-full items-center justify-center border-b pt-[20px]'
        )}
      >
        <div className="xl:px-10 mx-auto flex w-full max-w-8xl items-center px-4">
          <div className="mr-8">
            {pageEditing ? (
              <Image field={logo?.jsonValue} className="h-10 w-auto" />
            ) : (
              logo?.jsonValue?.value && (
                <Link
                  href="/"
                  className="flex w-[164px] items-stretch space-x-2 [&_.image-container]:w-full"
                >
                  <Logo logo={logo?.jsonValue} className="w-full max-w-[125px]" />
                </Link>
              )
            )}
          </div>
          {/* Desktop Navigation */}
          <div className="lg:flex lg:flex-1 hidden">
          </div>
          {/* Desktop Navigation */}
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                {links &&
                  links.length > 0 &&
                  links.map((item, i) => (
                    <Fragment key={`desktop-nav-menu-list-item-${i}`}>
                      {pageEditing ? (
                        <Button variant="ghost" asChild className="font-body text-[#333740] uppercase text-sm font-bold">
                          <SitecoreLink field={item.link?.jsonValue} />
                        </Button>
                      ) : (
                        item.link?.jsonValue?.value?.href && (
                          <NavigationMenuItem>
                            <Button
                              variant="ghost"
                              asChild
                              className="font-body text-[#333740] uppercase text-sm font-bold"
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
          <div>
            <Search className="w-6 h-6 text-black" />
          </div>
          {/* Mobile Navigation */}
          <div className="lg:hidden flex flex-1 justify-end">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-transparent [&_svg]:size-8">
                  <Menu />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="[&>button_svg]:size-8">
                <nav className="mt-[70px] flex flex-col space-y-4">
                  {links &&
                    links.length > 0 &&
                    links.map(
                      (item) =>
                        item.link?.jsonValue?.value?.href && (
                          <Button
                            key={`${item.link.jsonValue.value.text}-mobile`}
                            variant="ghost"
                            asChild
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
                      variant="outline"
                      asChild
                      className="rounded-full"
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
      </motion.header>
    </AnimatePresence>
    </>
  );
};
