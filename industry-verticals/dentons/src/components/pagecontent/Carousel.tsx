'use client';

import { useEffect, useState, JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  RichTextField,
  LinkField,
  Text,
  Link,
  RichText,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
  Video: ImageField;
}

export type CarouselItemProps = {
  id: string;
  fields: Fields;
};

interface CarouselComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: CarouselItemProps[];
  };
}

export const Default = (props: CarouselComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [index, setIndex] = useState(0);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex < (props.fields?.items ?? []).length - 1 ? prevIndex + 1 : 0));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : (props.fields?.items ?? []).length - 1));
  };

  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`component carousel ${sxaStyles}`} id={id ? id : undefined}>
      <div className="carousel-inner">
        {(props.fields?.items ?? []).map((item, i) => (
          <div key={i} className={'carousel-item ' + (i == index ? 'active' : '')}>
            {!isPageEditing && item.fields?.Video?.value?.src ? (
              <video
                className="object-fit-cover d-block w-100 h-100"
                key={item.id}
                autoPlay={true}
                loop={true}
                muted
                playsInline
                poster={item.fields.Image?.value?.src}
              >
                <source src={item.fields.Video.value.src} type="video/webm" />
              </video>
            ) : (
              <NextImage
                field={item.fields.Image}
                className="object-fit-cover d-block w-100 h-100"
                width={1920}
                height={800}
              />
            )}

            <div className="side-content">
              <div className="container">
                <div className="col-lg-5 col-md-6 offset-md-6 offset-lg-7">
                  <h1 className="display-6 fw-bold">
                    <Text field={item.fields.Title}></Text>
                  </h1>
                  <RichText field={item.fields.Text}></RichText>
                  {!isPageEditing && item.fields?.Link?.value?.href && (
                    <Link field={item.fields.Link} className="button button-accent"></Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ol className="carousel-indicators">
        {(props.fields?.items ?? []).map((_item, i) => (
          <li
            key={i}
            aria-label="Slide"
            className={i == index ? 'active' : ''}
            onClick={() => setIndex(i)}
          ></li>
        ))}
      </ol>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>
        <span className="visually-hidden">Next</span>
      </button>
    </section>
  );
};

type HeroSlide = {
  id?: string;
  fields?: {
    Label?: Field<string>;
    Eyebrow?: Field<string>;
    Title?: Field<string>;
    Image?: ImageField;
    Link?: LinkField;
  };
};

const TITLE_EMPHASIS = 'Dentons is here to help';

const DentonsHero = (props: CarouselComponentProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const items = (props.fields?.items ?? []) as HeroSlide[];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const slide = items[count ? index % count : 0];
  const image = slide?.fields?.Image;
  const title = slide?.fields?.Title?.value || '';
  const emphasisAt = title.indexOf(TITLE_EMPHASIS);
  const titleLead = emphasisAt > 0 ? title.slice(0, emphasisAt).trim() : title;

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), 7000);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const step = (dir: number) => {
    if (!count) return;
    setIndex((current) => (current + dir + count) % count);
  };

  return (
    <section className={`component carousel variant-dentons ${props.params?.styles || ''}`}>
      <div
        className="dentons-hero"
        style={image?.value?.src ? { backgroundImage: `url(${image.value.src})` } : undefined}
      >
        <div className="dentons-hero-copy">
          {(slide?.fields?.Eyebrow?.value || isEditing) && (
            <p className="dentons-hero-eyebrow">
              <Text field={slide?.fields?.Eyebrow} />
            </p>
          )}
          <h1>
            {emphasisAt > 0 && !isEditing ? (
              <>
                <span>{titleLead}</span>
                <span className="is-strong">{TITLE_EMPHASIS}</span>
              </>
            ) : (
              <Text field={slide?.fields?.Title} />
            )}
          </h1>
          {slide?.fields?.Link?.value?.href && (
            <Link field={slide.fields.Link} className="dentons-hero-cta" />
          )}
        </div>
        <div className="dentons-hero-controls">
          <button type="button" aria-label="Previous Item" onClick={() => step(-1)}>
            ‹
          </button>
          <button type="button" aria-label={paused ? 'Play' : 'Pause'} onClick={() => setPaused((value) => !value)}>
            {paused ? '▶' : '❚❚'}
          </button>
          <button type="button" aria-label="Next Item" onClick={() => step(1)}>
            ›
          </button>
        </div>
        <div className="dentons-hero-tabs">
          {items.map((item, itemIndex) => {
            const thumb = item.fields?.Image?.value?.src;
            return (
              <button
                key={item.id || itemIndex}
                type="button"
                className={itemIndex === index ? 'is-active' : undefined}
                aria-label={item.fields?.Label?.value}
                style={thumb ? { backgroundImage: `url(${thumb})` } : undefined}
                onClick={() => {
                  setIndex(itemIndex);
                  setPaused(true);
                }}
              >
                <span>{item.fields?.Label?.value}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Dentons = DentonsHero;
export const DentonsHeroSlide = DentonsHero;
