# Site plan — dentons

Show this on the approval screen. Source: industry-verticals/dentons/docs/ai/demos/dentons/demo-plan.yaml

## Page tree
| Path | Display name | Type | Purpose | Proves moment | Why this page |
|---|---|---|---|---|---|
| /Home | Home | page | Public homepage. Loop 1 leaves from here. Loop 3 returns here with the block changed. | m1, m2, m3 |  |
| /Home/insights | Knowledge | page | Knowledge listing. Articles are direct children. Loops 1 and 3 pass through it to the infrastructure article. | m1, m3 |  |
| /Home/insights/structuring-bankable-infrastructure-investment-across-africa | Structuring bankable infrastructure investment across Africa | article | The insight every loop opens. Loop 1 edits it. Loop 2 cites it. Loop 3 measures it and uses the visit as the trigger. | m1, m2, m3 |  |
| /Home/insights/foreign-credit-accommodation-in-tanzania | Foreign credit accommodation in Tanzania: the limits of regulatory non-compliance as a defence to debt recovery | article | Another insight under Knowledge, same shape as the infrastructure article. | m1 |  |
| /Home/insights/balancing-innovation-and-competition | Balancing innovation and competition: intellectual property rights under Tanzania's Fair Competition (Abuse of Dominant Position) Regulations, 2026 | article | Another insight under Knowledge, same shape as the infrastructure article. | m1 |  |
| /Home/insights/misrepresentations-in-disclosure | Misrepresentations in disclosure | article | Another insight under Knowledge, same shape as the infrastructure article. | m1 |  |
| /Home/insights/related-party-transactions-in-canada | Related party transactions in Canada: Special committee best practices | article | Another insight under Knowledge, same shape as the infrastructure article. | m1 |  |
| /Home/insights/tsx-proposes-tougher-continued-listing-requirements | TSX proposes tougher continued listing requirements: What listed issuers need to know | article | Another insight under Knowledge, same shape as the infrastructure article. | m1 |  |
| /Home/insights/the-new-decisions-facing-family-businesses | Inherit, Sell, or Diversify: The New Decisions Facing Family Businesses | article | Another insight under Knowledge, same shape as the infrastructure article. | m1 |  |
| /Home/insights/autumn-2026-aviation-update | Autumn 2026 Aviation Update | article | Another insight under Knowledge, same shape as the infrastructure article. | m1 |  |
| /Home/insights/depreciation-of-petroleum-exploration-expenditure-in-tanzania | Depreciation of petroleum exploration expenditure in Tanzania: an analysis of Commissioner General (TRA) v Beach Petroleum (Tanzania) Limited | article | Another insight under Knowledge, same shape as the infrastructure article. | m1 |  |
| /Home/search-results | Search results | page | Loop 2 search. Shows today's keyword search, not a generated answer. | m2 |  |
| /Home/global-sectors | Global sectors | page | Mirrors the header item Global sectors | (navigation page) | Header menu item |
| /Home/global-solutions | Global solutions | page | Mirrors the header item Global solutions | (navigation page) | Header menu item |
| /Home/client-experience | Client experience | page | Mirrors the header item Client experience | (navigation page) | Header menu item |
| /Home/our-professionals | Our people | page | Header item Our people, and the parent of the lawyer profiles. | (navigation page) | Header menu item |
| /Home/our-professionals/nathan-abbott | Nathan Abbott | person | Lawyer profile under Our people. This measured page sets the shape for the other profiles. | m2 |  |
| /Home/our-professionals/ulugbek-abdullaev | Ulugbek Abdullaev | person | Lawyer profile under Our people, same shape as Nathan Abbott. | m2 |  |
| /Home/our-professionals/agustin-acosta | Agustín Acosta Cárdenas | person | Lawyer profile under Our people, same shape as Nathan Abbott. | m2 |  |
| /Home/our-professionals/florencia-ahumada | Florencia Ahumada | person | Lawyer profile under Our people, same shape as Nathan Abbott. | m2 |  |
| /Home/our-professionals/catelin-aiwohi | Catelin Aiwohi | person | Lawyer profile under Our people, same shape as Nathan Abbott. | m2 |  |
| /Home/our-professionals/marcelo-alarcon | Marcelo Alarcón | person | Lawyer profile under Our people, same shape as Nathan Abbott. | m2 |  |
| /Home/our-professionals/jeanmarc-allix | Jean-Marc Allix | person | Lawyer profile under Our people, same shape as Nathan Abbott. | m2 |  |
| /Home/our-professionals/fatima-alsabahi | Fatima Al-Sabahi | person | Lawyer profile under Our people, same shape as Nathan Abbott. | m2 |  |
| /Home/our-professionals/shaun-altshuller | Shaun Altshuller | person | Lawyer profile under Our people, same shape as Nathan Abbott. | m2 |  |
| /Home/featured-insights | Featured insights | page | Hamburger link | (navigation page) | Hamburger menu item |
| /Home/about-dentons | About Dentons | page | Hamburger link | (navigation page) | Hamburger menu item |
| /Home/about-dentons/news-events-and-awards | News, events and awards | page | Parent of news, events, and recognition | (navigation page) | URL parent of hamburger links |
| /Home/about-dentons/news-events-and-awards/events | Events | page | Hamburger link | (navigation page) | Hamburger menu item |
| /Home/about-dentons/news-events-and-awards/recognition | Recognition | page | Hamburger link | (navigation page) | Hamburger menu item |
| /Home/about-dentons/news-events-and-awards/news | News | page | Hamburger link | (navigation page) | Hamburger menu item |
| /Home/global-presence | Global presence | page | Hamburger link | (navigation page) | Hamburger menu item |
| /Home/careers | Careers | page | Hamburger link | (navigation page) | Hamburger menu item |
| /Home/find-your-dentons-team | Practices | page | Hamburger link. Live label is Practices. | (navigation page) | Hamburger menu item |
| /Home/services-and-solutions | Services and solutions | page | Hamburger link | (navigation page) | Hamburger menu item |
| /Home/contact-us | Contact us | page | Hamburger link | (navigation page) | Hamburger menu item |

## Page by page

### /Home — Public homepage. Loop 1 leaves from here. Loop 3 returns here with the block changed.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | carousel | Default | site | Grow: However you need to grow / Dentons is here to help, Learn more to services-and-solutions/grow. Protect: Whatever you need to protect / Dentons is here to help, Learn more to protect. Operate: Wherever you need to operate / Dentons is here to help, Learn more to operate. Finance: Whenever you need to finance / Dentons is here to help, Learn more to finance. Tile label is the slide item display name. Title is the headline. Link is Learn more. |
| 2 | article-list | ThreeColumn | site | The story uses this existing featured block. The visit rule is not a new component and is not created in this environment yet. |
| 3 | heading-cta | Default | site |  |
| 4 | article-list | ThreeColumn | site |  |

### /Home/insights — Knowledge listing. Articles are direct children. Loops 1 and 3 pass through it to the infrastructure article.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | hero-banner | Default | site | Knowledge |
| 2 | article-list | ThreeColumn | site |  |

### /Home/insights/structuring-bankable-infrastructure-investment-across-africa — The insight every loop opens. Loop 1 edits it. Loop 2 cites it. Loop 3 measures it and uses the visit as the trigger.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | insight-article | Default | site |  |

### /Home/insights/foreign-credit-accommodation-in-tanzania — Another insight under Knowledge, same shape as the infrastructure article.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | insight-article | Default | site |  |

### /Home/insights/balancing-innovation-and-competition — Another insight under Knowledge, same shape as the infrastructure article.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | insight-article | Default | site |  |

### /Home/insights/misrepresentations-in-disclosure — Another insight under Knowledge, same shape as the infrastructure article.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | insight-article | Default | site |  |

### /Home/insights/related-party-transactions-in-canada — Another insight under Knowledge, same shape as the infrastructure article.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | insight-article | Default | site |  |

### /Home/insights/tsx-proposes-tougher-continued-listing-requirements — Another insight under Knowledge, same shape as the infrastructure article.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | insight-article | Default | site |  |

### /Home/insights/the-new-decisions-facing-family-businesses — Another insight under Knowledge, same shape as the infrastructure article.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | insight-article | Default | site |  |

### /Home/insights/autumn-2026-aviation-update — Another insight under Knowledge, same shape as the infrastructure article.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | insight-article | Default | site |  |

### /Home/insights/depreciation-of-petroleum-exploration-expenditure-in-tanzania — Another insight under Knowledge, same shape as the infrastructure article.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | insight-article | Default | site |  |

### /Home/search-results — Loop 2 search. Shows today's keyword search, not a generated answer.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | site-search | Default | site |  |

### /Home/our-professionals/nathan-abbott — Lawyer profile under Our people. This measured page sets the shape for the other profiles.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | person-profile | Default | site |  |

### /Home/our-professionals/ulugbek-abdullaev — Lawyer profile under Our people, same shape as Nathan Abbott.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | person-profile | Default | site |  |

### /Home/our-professionals/agustin-acosta — Lawyer profile under Our people, same shape as Nathan Abbott.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | person-profile | Default | site |  |

### /Home/our-professionals/florencia-ahumada — Lawyer profile under Our people, same shape as Nathan Abbott.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | person-profile | Default | site |  |

### /Home/our-professionals/catelin-aiwohi — Lawyer profile under Our people, same shape as Nathan Abbott.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | person-profile | Default | site |  |

### /Home/our-professionals/marcelo-alarcon — Lawyer profile under Our people, same shape as Nathan Abbott.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | person-profile | Default | site |  |

### /Home/our-professionals/jeanmarc-allix — Lawyer profile under Our people, same shape as Nathan Abbott.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | person-profile | Default | site |  |

### /Home/our-professionals/fatima-alsabahi — Lawyer profile under Our people, same shape as Nathan Abbott.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | person-profile | Default | site |  |

### /Home/our-professionals/shaun-altshuller — Lawyer profile under Our people, same shape as Nathan Abbott.
| # | Component | Variant | Content from | Note |
|---|---|---|---|---|
| 1 | person-profile | Default | site |  |

## New components (not in the library: built for this demo)
| Name | Kind | Editable in CMS | Where | Why new | Behaviour |
|---|---|---|---|---|---|
| InsightArticle | simple | yes | /Home/insights/structuring-bankable-infrastructure-investment-across-africa (body) | Title, body, one image, and a reference to one lawyer. No registry component has that shape. A download button is not part of this component. | Title, the article body, and one image. Lawyer is a reference to one person item. The lawyer is not copied onto the article. There is no download field. |
| InsightArticle | simple | yes | /Home/insights/foreign-credit-accommodation-in-tanzania (body) | Title, body, one image, and a reference to one lawyer. No registry component has that shape. A download button is not part of this component. | Title, the article body, and one image. Lawyer is a reference to one person item. The lawyer is not copied onto the article. There is no download field. |
| InsightArticle | simple | yes | /Home/insights/balancing-innovation-and-competition (body) | Title, body, one image, and a reference to one lawyer. No registry component has that shape. A download button is not part of this component. | Title, the article body, and one image. Lawyer is a reference to one person item. The lawyer is not copied onto the article. There is no download field. |
| InsightArticle | simple | yes | /Home/insights/misrepresentations-in-disclosure (body) | Title, body, one image, and a reference to one lawyer. No registry component has that shape. A download button is not part of this component. | Title, the article body, and one image. Lawyer is a reference to one person item. The lawyer is not copied onto the article. There is no download field. |
| InsightArticle | simple | yes | /Home/insights/related-party-transactions-in-canada (body) | Title, body, one image, and a reference to one lawyer. No registry component has that shape. A download button is not part of this component. | Title, the article body, and one image. Lawyer is a reference to one person item. The lawyer is not copied onto the article. There is no download field. |
| InsightArticle | simple | yes | /Home/insights/tsx-proposes-tougher-continued-listing-requirements (body) | Title, body, one image, and a reference to one lawyer. No registry component has that shape. A download button is not part of this component. | Title, the article body, and one image. Lawyer is a reference to one person item. The lawyer is not copied onto the article. There is no download field. |
| InsightArticle | simple | yes | /Home/insights/the-new-decisions-facing-family-businesses (body) | Title, body, one image, and a reference to one lawyer. No registry component has that shape. A download button is not part of this component. | Title, the article body, and one image. Lawyer is a reference to one person item. The lawyer is not copied onto the article. There is no download field. |
| InsightArticle | simple | yes | /Home/insights/autumn-2026-aviation-update (body) | Title, body, one image, and a reference to one lawyer. No registry component has that shape. A download button is not part of this component. | Title, the article body, and one image. Lawyer is a reference to one person item. The lawyer is not copied onto the article. There is no download field. |
| InsightArticle | simple | yes | /Home/insights/depreciation-of-petroleum-exploration-expenditure-in-tanzania (body) | Title, body, one image, and a reference to one lawyer. No registry component has that shape. A download button is not part of this component. | Title, the article body, and one image. Lawyer is a reference to one person item. The lawyer is not copied onto the article. There is no download field. |
| SiteSearch | list | yes | /Home/search-results (body) | A keyword box, a refine panel, and a result list. No registry component searches. | The query filters the child results. Generated answers are not part of this component. |
| PersonProfile | list | yes | /Home/our-professionals/nathan-abbott (body) | Name, role, office, photo, contact, and the About, Experience, and Recognition bands are one profile. No registry component has that shape. | Profile header, then About, Experience, Recognition, and areas of focus as child items. |
| PersonProfile | list | yes | /Home/our-professionals/ulugbek-abdullaev (body) | Name, role, office, photo, contact, and the About, Experience, and Recognition bands are one profile. No registry component has that shape. | Profile header, then About, Experience, Recognition, and areas of focus as child items. |
| PersonProfile | list | yes | /Home/our-professionals/agustin-acosta (body) | Name, role, office, photo, contact, and the About, Experience, and Recognition bands are one profile. No registry component has that shape. | Profile header, then About, Experience, Recognition, and areas of focus as child items. |
| PersonProfile | list | yes | /Home/our-professionals/florencia-ahumada (body) | Name, role, office, photo, contact, and the About, Experience, and Recognition bands are one profile. No registry component has that shape. | Profile header, then About, Experience, Recognition, and areas of focus as child items. |
| PersonProfile | list | yes | /Home/our-professionals/catelin-aiwohi (body) | Name, role, office, photo, contact, and the About, Experience, and Recognition bands are one profile. No registry component has that shape. | Profile header, then About, Experience, Recognition, and areas of focus as child items. |
| PersonProfile | list | yes | /Home/our-professionals/marcelo-alarcon (body) | Name, role, office, photo, contact, and the About, Experience, and Recognition bands are one profile. No registry component has that shape. | Profile header, then About, Experience, Recognition, and areas of focus as child items. |
| PersonProfile | list | yes | /Home/our-professionals/jeanmarc-allix (body) | Name, role, office, photo, contact, and the About, Experience, and Recognition bands are one profile. No registry component has that shape. | Profile header, then About, Experience, Recognition, and areas of focus as child items. |
| PersonProfile | list | yes | /Home/our-professionals/fatima-alsabahi (body) | Name, role, office, photo, contact, and the About, Experience, and Recognition bands are one profile. No registry component has that shape. | Profile header, then About, Experience, Recognition, and areas of focus as child items. |
| PersonProfile | list | yes | /Home/our-professionals/shaun-altshuller (body) | Name, role, office, photo, contact, and the About, Experience, and Recognition bands are one profile. No registry component has that shape. | Profile header, then About, Experience, Recognition, and areas of focus as child items. |

## Header area
| Feature | Delivery | Note |
|---|---|---|
| logo-and-main-menu | reuse (Header) | White bar, purple logo, four links: Global sectors, Global solutions, Client experience, Our people. |
| main-navigation | reuse (Navigation) | Top level only. Those four items have no dropdown. |
| language-switcher | reuse (LanguageSwitcher) | EN control in the header. The demo is English. |
| header-search | hardcoded-variant | Search icon in the header. The results page is SiteSearch. |
| hamburger-menu | hardcoded-variant | Knowledge, About, offices, careers, practices, services, news, and contact. Not the main Navigation datasource. |
| help-band | reuse (PromoCta) | How can the world's largest global law firm help you today? Contact us and find an office. Sits in the Footer partial above SiteFooter, so every page inherits it. |
| mega-menu-panels | not-built | The four main items have no dropdown. Secondary links are the hamburger panel. |

Hardcoded or not built elements are not editable in the CMS: say so at the gate.

## Manual work to expect
- Only the fixed "Always" lines (thumbnails, layout icons) and what a person alone can do (editing host login). Variants, partial designs, page designs, datasources, theme and images are built by the run.
- Navigation pages (menu items no moment needs) are created as placeholders; nothing pauses the build for checks
