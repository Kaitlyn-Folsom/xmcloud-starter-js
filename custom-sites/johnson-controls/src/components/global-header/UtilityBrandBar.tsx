'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, X, Search, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const brandCategories = [
  {
    name: 'HVAC Equipment',
    brands: [
      { name: 'Johnson Controls', url: 'https://www.johnsoncontrols.com/', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/jci-logo_global-brands.png?la=en&h=320&w=720&hash=85C28FE570C2A03DF9C05B5CF78E72F6', alt: 'JCI logo' },
      { name: 'YORK', url: 'https://www.york.com/', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/york-process-system-logo.png?la=en&h=320&w=720&hash=DE3B4D308E0AF9291A1AEA3A1072E7BE', alt: 'york-process-system-logo' },
      { name: 'Envirotec', url: 'https://www.enviro-tec.com/', logo: '/-/media/project/jci-global/brand-logos/envirotec.png?la=en&h=320&w=720&hash=33823EA13B406FF2F3D296E5EFE5E5B0', alt: 'Enviro-Tec logo' },
      { name: 'Miller-Picking', url: 'https://www.miller-picking.com/', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/miller-picking-logo.png?la=en&h=320&w=720&hash=4E1DC75FED807A501E446C2663C6012A', alt: '' },
      { name: 'Pace', url: 'https://www.pace-airsystems.com/', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/pace_logo_bw.png?la=en&h=320&w=720&hash=33651F95A96FCE0C115EB528CFD76997', alt: '' },
      { name: 'Quantech', url: 'https://www.quantech-hvac.com/', logo: '/-/media/project/jci-global/brand-logos/quantech.png?la=en&h=320&w=720&hash=3AEDC31AD567D56F6238A22BECFABA5B', alt: 'Quantech logo' },
      { name: 'Silent-Aire', url: 'https://www.silent-aire.com/', logo: '/-/media/project/jci-global/brand-logos/silentaire.png?la=en&h=320&w=720&hash=045901C2572A0ACCBD25B2E4E0F9CB71', alt: 'SilentAire Logo' },
    ],
  },
  {
    name: 'Industrial Refrigeration',
    brands: [
      { name: 'YORK', url: 'https://www.york.com/', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/york-process-system-logo.png?la=en&h=320&w=720&hash=DE3B4D308E0AF9291A1AEA3A1072E7BE', alt: 'york-process-system-logo' },
      { name: 'Frick', url: 'https://www.frickcold.com/', logo: '/-/media/project/jci-global/brand-logos/frick.jpg?la=en&h=1119&w=2317&hash=8F825153386D61961E40AE3C383027B3', alt: 'Frick Industrial Refrigeration logo' },
      { name: 'M&M Carnot', url: 'https://mmcarnot.com/', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/mm-carnot-logo.png?la=en&h=320&w=720&hash=1DDE4560FC55B814004EBAE7590299EE', alt: '' },
      { name: 'Sabroe', url: 'https://www.sabroe.com/', logo: '/-/media/project/jci-global/brand-logos/sabroe-brand-logo.png?la=en&h=320&w=720&hash=617718ED02F2220177DC8BC0E978FB94', alt: 'Sabroe logo' },
    ],
  },
  {
    name: 'Digital Solutions',
    brands: [
      { name: 'OpenBlue', url: 'https://www.johnsoncontrols.com/openblue', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/openblue-logo-globalbrands.jpg?la=en&h=320&w=720&hash=52D4F44D33FF0206E30A0C338C57A1C2', alt: 'OpenBlue Logo' },
      { name: 'FM:Systems', url: 'https://fmsystems.com', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/fm-system-logo.png?la=en&h=320&w=720&hash=187D553FC4D414E35A71B68D67730849', alt: '' },
    ],
  },
  {
    name: 'Building Automation and Controls',
    brands: [
      { name: 'Johnson Controls', url: 'https://www.johnsoncontrols.com/building-automation-and-controls', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/jci-logo_global-brands.png?la=en&h=320&w=720&hash=85C28FE570C2A03DF9C05B5CF78E72F6', alt: 'JCI logo' },
      { name: 'Metasys', url: 'https://www.johnsoncontrols.com/building-automation-and-controls/building-automation-systems-bas', logo: '/-/media/project/jci-global/brand-logos/jci_metasys_blue_rgb_2.png?la=en&h=320&w=720&hash=327DDC34DEBA2BC79F820DE22A9346D4', alt: 'Metasys icon' },
      { name: 'Facility Explorer', url: 'https://www.johnsoncontrols.com/building-automation-and-controls/facility-explorer', logo: '/-/media/project/jci-global/brand-logos/jci_facility_explorer_blue_rgb_2.png?la=en&h=320&w=720&hash=40B8CA7191A71457E4DD738EBADDC6EC', alt: 'facility explorer' },
      { name: 'EasyIO', url: 'https://www.johnsoncontrols.com/easyio/easyio', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/easy-io-logo1.png?la=en&h=320&w=720&hash=50AB66A827F1A21AB92A6D5DFDEE062B', alt: 'Easyio Logo' },
      { name: 'PENN', url: 'https://penncontrols.com/', logo: '/-/media/project/jci-global/brand-logos/jci_penn_blue_rgb_2.png?la=en&h=320&w=720&hash=309040FB9859ABA1376E163899BCC6E5', alt: 'penn' },
    ],
  },
  {
    name: 'Retail Solutions',
    brands: [
      { name: 'Sensormatic', url: 'https://www.sensormatic.com/', logo: '/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/sensormatic-logo.png?la=en&h=320&w=720&hash=9B3A83C2572E33B11DEB002458BD87F3', alt: '' },
    ],
  },
  {
    name: 'Fire Suppression',
    brands: [
      { name: 'Tyco Fire', url: 'https://tyco-fire.com/', logo: '/-/media/project/jci-global/brands/tyco-logo-(1).jpg?la=en&h=320&w=720&hash=244C75B74F0F77521D56164450973BCD', alt: 'tyco' },
      { name: 'Ansul', url: 'https://www.ansul.com/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/italy-johnson-controls/brands/ansul.jpg?la=en&h=320&w=720&hash=61CB02EFAE874C98F456F4EE1527561E', alt: 'Ansul' },
      { name: 'Chemguard', url: 'https://www.chemguard.com/', logo: '/-/media/project/jci-global/brand-logos/chemguard.jpg?la=en&h=320&w=720&hash=05E9D2DE3272A93BF89466822E764917', alt: 'Chemguard logo' },
      { name: 'Skum', url: 'https://www.skum.com/', logo: '/-/media/project/jci-global/brand-logos/skum_logo.jpg?la=en&h=320&w=720&hash=152371488BB4ABD30DEFFC19842834AC', alt: 'Skum logo' },
      { name: 'Hygood', url: 'https://hygood.com/', logo: '/-/media/project/jci-global/brand-logos/hygood-logo.png?la=en&h=320&w=720&hash=34BA089DDA60C018269FB958FDF0DC79', alt: 'Hygood logo' },
      { name: 'Grinnell', url: 'https://grinnell.com/', logo: '/-/media/project/jci-global/brand-logos/grinell.jpg?la=en&h=320&w=720&hash=1E1877B56C20956AF04BA16814E624D4', alt: 'Grinell logo' },
      { name: 'SprinkCAD', url: 'https://sprinkcad.com/', logo: '/-/media/project/jci-global/brand-logos/sprinkcad.jpg?la=en&h=320&w=720&hash=266FCA73097DA0B747C96AB4F13C9C43', alt: 'SprinkCAD logo' },
      { name: 'Pyro Chem', url: 'https://www.pyrochem.com/', logo: '/-/media/project/jci-global/brand-logos/pyrochem.jpg?la=en&h=320&w=720&hash=D11654AD5FB8870117B786E17B2CD812', alt: 'Pyro-Chem logo' },
      { name: 'AquaMist', url: 'https://www.tycoaquamist.com/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/image/de/aquamist.png?la=en&h=320&w=720&hash=E4BC257950B2A8C18665D35D9C380DAF', alt: 'aquamist_logo' },
    ],
  },
  {
    name: 'Fire Detection',
    brands: [
      { name: 'Autocall', url: 'https://www.autocall.com/', logo: '/-/media/project/jci-global/brand-logos/autocall.png?la=en&h=128&w=288&hash=7F6C5B56B5FA3285D4D33BB9B3004BE5', alt: 'Ansul logo' },
      { name: 'FireClass', url: 'https://fireclass.co.uk/en/emea/Pages/Default.aspx', logo: '/-/media/project/jci-global/brand-logos/fireclass.png?la=en&h=128&w=288&hash=EC6E7F29B72CBBD530C835AA551DED64', alt: 'FireClass logo' },
      { name: 'Simplex', url: 'https://www.simplexfire.com/', logo: '/-/media/project/jci-global/brand-logos/simplex1.png?la=en&h=128&w=288&hash=004ABE76AA59F711F70F131E23BECB5F', alt: 'Simplex logo' },
      { name: 'Zettler', url: 'https://www.zettlerfire.com', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/image/de/zettler.png?la=en&h=320&w=720&hash=454FD08C789F0A687456FEDDC6E528E8', alt: 'Zettler logo' },
      { name: 'Vigilant', url: 'https://www.tycosafetyproducts-anz.com/', logo: '/-/media/project/jci-global/brand-logos/vigilant.png?la=en&h=128&w=288&hash=45D43BB516E5A0FEE4082D430CD88DE7', alt: 'Vigilant logo' },
      { name: 'DBE', url: 'https://www.dbefire.com/', logo: '/-/media/project/jci-global/brand-logos/dbe.png?la=en&h=128&w=288&hash=AC988B232C1538AE4B92271ECA35FF79', alt: 'DBE written on a white background' },
    ],
  },
  {
    name: 'Security',
    brands: [
      { name: 'American Dynamics', url: 'https://www.americandynamics.net/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/our-brands/screenshot_2025-12-09_181133-removebg-preview-(1).jpg?la=en&h=310&w=720&hash=8D9823F26AA80B2B75C3E4B2E61770DC', alt: 'ad' },
      { name: 'DSC', url: 'https://www.dsc.com/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/our-brands/dsc-logo1.png?la=en&h=319&w=720&hash=DC9D826A9DEE65B750CC1ADD01A1A88D', alt: 'dsc' },
      { name: 'Exacq', url: 'https://www.exacq.com/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/our-brands/exacq-logo.jpg?la=en&h=321&w=720&hash=A9ECF9862C1378C6308738851674AF15', alt: 'Exacq' },
      { name: 'Illustra', url: 'https://illustracameras.com/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/our-brands/illustrach-(1).jpg?la=en&h=320&w=719&hash=13CA7E4AA3E453809B6726B561F2F4DD', alt: 'illustra' },
      { name: 'Kantech', url: 'https://www.kantech.com/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/our-brands/kantech-logo720-(1).jpg?la=en&h=306&w=720&hash=F21A7CD3C49EFBF4D41F00691D09AEAC', alt: 'kantech' },
      { name: 'IQ', url: 'https://iqsecurityproducts.com/products/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/our-brands/iq-logo_resized__1_-removebg-preview.png?la=en&h=320&w=719&hash=706333BE0B6B14B34AF90D91964F6B9D', alt: 'IQ' },
      { name: 'Software House', url: 'https://www.swhouse.com/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/our-brands/software-house-logo-(3).png?la=en&h=320&w=720&hash=18CFCCD916C92D922F600511FABD775D', alt: 'Software House' },
      { name: 'Bentel Security', url: 'https://www.bentelsecurity.com/', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/our-brands/bentel-logo1.png?la=en&h=319&w=720&hash=BCF2F49192BDE828FE63072BB7447341', alt: 'bentel' },
      { name: 'CEM Systems', url: 'https://www.cemsys.com/', logo: '/-/media/project/jci-global/brand-logos/cem-systems-logo.png?la=en&h=320&w=720&hash=77316D5C6FC746E4ACD5F88EC48A5AB0', alt: 'CEM Systems  logo' },
      { name: 'Visonic', url: 'https://www.visonic.com', logo: '/-/media/project/jci-global/johnson-controls/ce-region/switzerland-johnson-controls/our-brands/visonic-logo1.png?la=en&h=320&w=720&hash=03C268233FAE49F89A77558E5B6EA981', alt: 'visonic' },
    ],
  },
];

const countryRegions = [
  {
    name: 'AFRICA',
    countries: [{ name: 'South Africa - English', url: 'https://me.johnsoncontrols.com/' }],
  },
  {
    name: 'ASIA - PACIFIC',
    countries: [
      { name: 'Australia - English', url: 'https://www.johnsoncontrols.com.au' },
      { name: 'China - 简体中文', url: 'https://cn.johnsoncontrols.com' },
      { name: 'Hong Kong, China - English', url: 'https://www.johnsoncontrols.hk' },
      { name: 'Taiwan, China - 繁體中文', url: 'https://www.johnsoncontrols.tw' },
      { name: 'India - English', url: 'https://www.johnsoncontrols.in' },
      { name: 'Indonesia - English', url: 'https://www.johnsoncontrols.co.id/' },
      { name: 'Japan - 日本語', url: 'https://www.johnsoncontrols.co.jp/' },
      { name: 'Korea – 한국어', url: 'https://www.johnsoncontrols.kr/' },
      { name: 'Malaysia - English', url: 'https://www.johnsoncontrols.my/' },
      { name: 'New Zealand - English', url: 'https://www.johnsoncontrols.nz/' },
      { name: 'Singapore - English', url: 'https://www.johnsoncontrols.sg/' },
      { name: 'Thailand - ภาษาไทย', url: 'https://www.johnsoncontrols.co.th/' },
      { name: 'Philippines - English', url: 'https://www.johnsoncontrols.sg/philippines-english' },
      { name: 'Thailand - English', url: 'https://www.johnsoncontrols.co.th/en' },
      { name: 'Vietnam - English', url: 'https://www.johnsoncontrols.sg/vietnam_english' },
    ],
  },
  {
    name: 'CARIBBEAN',
    countries: [
      { name: 'Anguilla - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Antigua & Barbuda - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Aruba - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Bahamas - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Barbados - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'British Virgin Islands - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Cayman - Islands - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Curacao - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Dominica - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Dominican Republic - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Grenada - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Guadeloupe - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Haiti - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Jamaica - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Martinique - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Puerto Rico - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Puerto Rico - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Saint Barthélemy - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Saint Kitts and Nevis - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Saint Lucia - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Saint Martin - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Trinidad & Tobago - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Virgin Islands - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Saint Vincent & The Grenadines - English', url: 'https://www.latam.johnsoncontrols.com/en' },
    ],
  },
  {
    name: 'CENTRAL AMERICA',
    countries: [
      { name: 'Belize - English', url: 'https://www.latam.johnsoncontrols.com/en' },
      { name: 'Costa Rica - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'El Salvador - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Guatemala - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Honduras - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Nicaragua - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Panama - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
    ],
  },
  {
    name: 'EUROPE',
    countries: [
      { name: 'Austria - Deutsch', url: 'https://www.johnsoncontrols.at/' },
      { name: 'Belgium - Français', url: 'https://www.johnsoncontrols.be/fr' },
      { name: 'Belgium - Nederlands', url: 'https://www.johnsoncontrols.be/' },
      { name: 'Bosnia & Herzegovina - English', url: 'https://www.johnsoncontrols.ba/' },
      { name: 'Bulgaria - English', url: 'https://www.johnsoncontrols.bg/' },
      { name: 'Croatia - English', url: 'https://www.johnsoncontrols.hr/' },
      { name: 'Czech Republic - Čeština', url: 'https://www.johnsoncontrols.cz/' },
      { name: 'Denmark - Dansk', url: 'https://www.johnsoncontrols.dk/' },
      { name: 'Finland - Suomeksi', url: 'https://www.johnsoncontrols.fi/' },
      { name: 'France - Français', url: 'https://www.johnsoncontrols.fr/' },
      { name: 'Germany - Deutsch', url: 'https://www.johnsoncontrols.de/' },
      { name: 'Greece - English', url: 'https://www.johnsoncontrols.gr/' },
      { name: 'Hungary - Magyarország', url: 'https://www.johnsoncontrols.hu/' },
      { name: 'Ireland - English', url: 'https://www.johnsoncontrols.ie/' },
      { name: 'Italy - Italiano', url: 'https://www.johnsoncontrols.it/' },
      { name: 'Macedonia - English', url: 'https://www.johnsoncontrols.com.mk/' },
      { name: 'Netherlands - Dutch', url: 'https://www.johnsoncontrols.nl/' },
      { name: 'Norway - Norge', url: 'https://www.johnsoncontrols.no/' },
      { name: 'Poland - Polski', url: 'https://www.johnsoncontrols.pl/' },
      { name: 'Portugal - Português', url: 'https://www.johnsoncontrols.pt/' },
      { name: 'Romania - Romanian', url: 'https://www.johnsoncontrols.ro/' },
      { name: 'Russia - Русский', url: 'https://ru.johnsoncontrols.com/' },
      { name: 'Serbia - English', url: 'https://www.johnsoncontrols.rs/' },
      { name: 'Slovakia - Slovenčina', url: 'https://www.johnsoncontrols.sk/' },
      { name: 'Spain - Espanol', url: 'https://www.johnsoncontrols.es/' },
      { name: 'Sweden - Swedish', url: 'https://www.johnsoncontrols.se/' },
      { name: 'Switzerland - Deutsch', url: 'https://www.johnsoncontrols.ch/' },
      { name: 'Switzerland - Français', url: 'https://www.johnsoncontrols.ch/fr' },
      { name: 'Switzerland - Italiano', url: 'https://www.johnsoncontrols.ch/it' },
      { name: 'Ukraine - Ukrainian', url: 'https://www.johnsoncontrols.ua/' },
      { name: 'United Kingdom - English', url: 'https://www.johnsoncontrols.co.uk/' },
    ],
  },
  {
    name: 'MIDDLE EAST',
    countries: [
      { name: 'Bahrain - English', url: 'https://me.johnsoncontrols.com/' },
      { name: 'Kuwait - English', url: 'https://me.johnsoncontrols.com/' },
      { name: 'Oman - English', url: 'https://me.johnsoncontrols.com/' },
      { name: 'Qatar - English', url: 'https://me.johnsoncontrols.com/' },
      { name: 'Turkey - Türkçe', url: 'https://www.johnsoncontrols.com.tr/' },
      { name: 'UAE - English', url: 'https://me.johnsoncontrols.com/' },
    ],
  },
  {
    name: 'NORTH AMERICA',
    countries: [
      { name: 'United States - English', url: 'https://www.johnsoncontrols.com/' },
      { name: 'Canada - English', url: 'https://www.johnsoncontrols.ca/' },
      { name: 'Canada - French', url: 'https://www.johnsoncontrols.ca/fr' },
      { name: 'Mexico - Spanish', url: 'https://www.latam.johnsoncontrols.com/es' },
    ],
  },
  {
    name: 'SOUTH AMERICA',
    countries: [
      { name: 'Argentina - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Bolivia - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Brazil - Português', url: 'https://www.johnsoncontrols.com.br/' },
      { name: 'Chile - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Colombia - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Ecuador - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Paraguay - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Peru - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Uruguay - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
      { name: 'Venezuela - Español', url: 'https://www.latam.johnsoncontrols.com/es' },
    ],
  },
];

export const UtilityBrandBar = () => {
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const filteredCountries = countryRegions.map((region) => ({
    ...region,
    countries: region.countries.filter((country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase())
    ),
  }));

  return (
    <div className="bg-white border-b border-gray-200 hidden md:block">
      <div className="mx-auto max-w-8xl px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center py-2">
          {/* Brand Dropdown - Left */}
          <div className="lg:col-span-3">
            <DropdownMenu open={isBrandDropdownOpen} onOpenChange={setIsBrandDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm  text-black hover:text-[#333740] hover:bg-transparent p-0 h-auto semibold"
                >
                  View Our Brands
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[600px] max-h-[80vh] overflow-y-auto p-4">
                <p className="text-sm font-semibold text-[#333740] mb-4">Global Directory</p>
                <ul className="space-y-2">
                  {brandCategories.map((category) => (
                    <li key={category.name}>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="text-sm font-normal text-[#333740]">
                          {category.name}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-[500px] p-4">
                          <ul className="space-y-3">
                            {category.brands.map((brand) => (
                              <li key={brand.name}>
                                <Link
                                  href={brand.url}
                                  target={brand.url.startsWith('http') ? '_blank' : undefined}
                                  rel={brand.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  className="flex items-center gap-3 text-sm font-normal text-[#333740] hover:text-primary transition-colors"
                                >
                                  <span>{brand.name}</span>
                                  {brand.logo && (
                                    <Image
                                      src={`https://www.johnsoncontrols.com${brand.logo}`}
                                      alt={brand.alt || brand.name}
                                      width={120}
                                      height={53}
                                      className="ml-auto h-auto"
                                    />
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </li>
                  ))}
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Brand Logo Center - Empty */}
          <div className="lg:col-span-5 hidden lg:block"></div>

          {/* Utility Links and Language Selector - Right */}
          <div className="lg:col-span-4 flex items-center justify-end gap-4">
            {/* Desktop Utility Links */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="https://investors.johnsoncontrols.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal text-black hover:text-primary transition-colors hover:underline"
              >
                Investors
              </Link>
              <div>|</div>
              <Link
                href="https://jobs.johnsoncontrols.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal text-black hover:text-primary transition-colors hover:underline"
              >
                Careers
              </Link>
              <div>|</div>
              <Link
                href="https://www.johnsoncontrols.com/media-center/news"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal text-black hover:text-primary transition-colors hover:underline"
              >
                Media Center
              </Link>
              <div>|</div>
            </div>

            {/* Language/Country Selector */}
            <DropdownMenu open={isCountrySelectorOpen} onOpenChange={setIsCountrySelectorOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-normal text-[#333740] hover:text-[#333740] hover:bg-transparent p-0 h-auto"
                >
                 <Globe /> US | EN
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[400px] max-h-[80vh] overflow-y-auto p-4">
                <div className="mb-4">
                  <Input
                    type="search"
                    placeholder="Search Countries"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    className="w-full"
                    aria-label="Search Countries"
                  />
                  <Button
                    variant="ghost"
                    className="mt-2 text-xs text-primary hover:text-primary"
                    onClick={() => setCountrySearch('')}
                  >
                    See Full List
                  </Button>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#333740]">Global Directory</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setIsCountrySelectorOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Accordion type="multiple" className="w-full">
                  {filteredCountries.map((region) => (
                    <AccordionItem key={region.name} value={region.name}>
                      <AccordionTrigger className="text-sm font-normal text-[#333740] py-2">
                        {region.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-4">
                          {region.countries.map((country) => (
                            <li key={country.name}>
                              <Link
                                href={country.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-normal text-[#333740] hover:text-primary transition-colors"
                              >
                                {country.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Utility Links */}
        <div className="md:hidden pb-2">
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link
                href="https://investors.johnsoncontrols.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal text-[#333740] hover:text-primary transition-colors"
              >
                Investors
              </Link>
            </li>
            <li>
              <Link
                href="https://jobs.johnsoncontrols.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal text-[#333740] hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="https://www.johnsoncontrols.com/media-center/news"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal text-[#333740] hover:text-primary transition-colors"
              >
                Media Center
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

