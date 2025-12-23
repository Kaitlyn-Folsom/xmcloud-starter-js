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
        <div className="mx-auto flex w-full max-w-8xl items-center px-4 md:px-6 lg:px-8">
          <div className="mr-4 md:mr-6 lg:mr-8 shrink-0">
            {pageEditing ? (
              <Image field={logo?.jsonValue} className="h-10 w-auto" />
            ) : (
              logo?.jsonValue?.value && (
                <Link
                  href="/"
                  className="flex w-[164px] items-stretch space-x-2 [&_.image-container]:w-full"
                >
                  <Logo logo={logo?.jsonValue} className="w-full max-w-[100px] md:max-w-[110px] lg:max-w-[125px]" />
                </Link>
              )
            )}
          </div>
          {/* Desktop Navigation - Hidden on mobile/tablet, visible on lg+ */}
          <nav 
            aria-label="Main" 
            data-orientation="horizontal" 
            dir="ltr" 
            className="hidden lg:flex relative z-10 max-w-max flex-1 items-center justify-center"
          >
            <div className="relative">
              <ul 
                data-orientation="horizontal" 
                className="group flex flex-1 list-none items-center justify-center space-x-1 md:space-x-2 lg:space-x-4" 
                dir="ltr"
              >
                <li>
                  <Link 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none px-3 py-2 md:px-4 lg:px-3 rounded-full font-body text-[#333740] uppercase text-xs md:text-sm lg:text-[13px] font-bold" 
                    href="/"
                  >
                    Smart Buildings
                  </Link>
                </li>
                <li>
                  <Link 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none px-3 py-2 md:px-4 lg:px-3 rounded-full font-body text-[#333740] uppercase text-xs md:text-sm lg:text-[13px] font-bold" 
                    href="/Article-Page"
                  >
                    Products & Solutions
                  </Link>
                </li>
                <li>
                  <Link 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none px-3 py-2 md:px-4 lg:px-3 rounded-full font-body text-[#333740] uppercase text-xs md:text-sm lg:text-[13px] font-bold" 
                    href="/Article-Page"
                  >
                    Services & Support
                  </Link>
                </li>
                <li>
                  <Link 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none px-3 py-2 md:px-4 lg:px-3 rounded-full font-body text-[#333740] uppercase text-xs md:text-sm lg:text-[13px] font-bold" 
                    href="/Article-Page"
                  >
                    Industries
                  </Link>
                </li>
                <li>
                  <Link 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none px-3 py-2 md:px-4 lg:px-3 rounded-full font-body text-[#333740] uppercase text-xs md:text-sm lg:text-[13px] font-bold" 
                    href="/Article-Page"
                  >
                    Building Insights
                  </Link>
                </li>
                <li>
                  <Link 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none px-3 py-2 md:px-4 lg:px-3 rounded-full font-body text-[#333740] uppercase text-xs md:text-sm lg:text-[13px] font-bold" 
                    href="/Article-Page"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
          {/* Search Icon - Hidden on mobile, visible on md+ */}
          <div className="hidden md:block">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-black" />
          </div>
          {/* Mobile Navigation */}
          <div className="lg:hidden flex flex-1 justify-end items-center gap-2">
            {/* Search Icon - Visible on mobile only */}
            <div className="md:hidden">
              <Search className="w-5 h-5 text-black" />
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-transparent [&_svg]:size-6 md:[&_svg]:size-8">
                  <Menu />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="[&>button_svg]:size-8">
                <nav className="mt-[70px] flex flex-col space-y-4">
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setIsOpen(false)}
                    className="justify-start font-body text-[#333740] uppercase text-sm font-bold"
                  >
                    <Link href="/">Smart Buildings</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setIsOpen(false)}
                    className="justify-start font-body text-[#333740] uppercase text-sm font-bold"
                  >
                    <Link href="/Article-Page">Products & Solutions</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setIsOpen(false)}
                    className="justify-start font-body text-[#333740] uppercase text-sm font-bold"
                  >
                    <Link href="/Article-Page">Services & Support</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setIsOpen(false)}
                    className="justify-start font-body text-[#333740] uppercase text-sm font-bold"
                  >
                    <Link href="/Article-Page">Industries</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setIsOpen(false)}
                    className="justify-start font-body text-[#333740] uppercase text-sm font-bold"
                  >
                    <Link href="/Article-Page">Building Insights</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setIsOpen(false)}
                    className="justify-start font-body text-[#333740] uppercase text-sm font-bold"
                  >
                    <Link href="/Article-Page">About Us</Link>
                  </Button>
                  {headerContact?.jsonValue?.value?.href && (
                    <Button
                      variant="outline"
                      asChild
                      className="rounded-full mt-4"
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
