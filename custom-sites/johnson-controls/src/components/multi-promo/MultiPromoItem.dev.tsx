import { Link, Text, RichText } from '@sitecore-content-sdk/nextjs';
import { Button } from '@/components/ui/button';
import { MultiPromoItemProps } from '@/components/multi-promo/multi-promo.props';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';

const mapToItemProps = (fields: MultiPromoItemProps) => {
  return {
    title: fields?.heading?.jsonValue,
    image: fields?.image?.jsonValue,
    link: fields?.link?.jsonValue,
    description: fields?.description?.jsonValue,
    isPageEditing: fields?.isPageEditing,
  };
};

export const Default: React.FC<MultiPromoItemProps> = (props) => {
  const itemProps = mapToItemProps(props || {});
  const { title, image, link, description, isPageEditing } = itemProps || {};

  return (
    <div className="flex items-center">
      <div className="w-1/2">
        {/* Dark Blue Underline */}
        {(isPageEditing || title?.value) && (
          <div className="mb-4 h-1 w-16 bg-[#152ea9]" />
        )}

        {/* Heading */}
        {(isPageEditing || title?.value) && (
          <Text
            tag="h3"
            field={title}
            className="font-heading mb-4 text-[#152ea9] text-xl font-semibold leading-tight tracking-tight md:text-[24px]"
          />
        )}

        {/* Description */}
        {(isPageEditing || description?.value) && (
          <RichText
            field={description}
            className="prose mb-6 text-base leading-relaxed text-gray-700 md:text-lg"
          />
        )}

        {/* Button */}
        {(isPageEditing || link?.value?.href) && (
          <div className="mt-auto">
            <Button
              variant="outline"
              asChild
              className="rounded-full border-2 border-[#152ea9] bg-white text-[#152ea9] hover:border-[#00adff] hover:bg-white hover:text-[#152ea9]"
            >
              <Link field={link || {}}></Link>
            </Button>
          </div>
        )}
      </div>

      {/* Image */}
      {(isPageEditing || image?.value?.src) && (
        <div className="w-1/2">
          <ImageWrapper
            image={image}
            className="w-full object-cover"
            wrapperClass="w-full"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      )}

    </div>
  );
};
