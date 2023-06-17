import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Card {
  image: {
    /** @description Mobile optimized image */
    mobile: LiveImage;
    /** @description Desktop optimized image */
    desktop: LiveImage;
    /** @description Image alternative text */
    alt: string;
  };
  /** @description When user clicks on the card, go to this link */
  href: string;
}

export interface Props {
  /** @description Section title */
  title: string;
  /** @description Section sub-title */
  subTitle?: string;
  cards: Card[];
  actionButton?: {
    /** @description Action button label */
    label: string;
    /** @description When user clicks on the button, go to this link */
    href?: string;
  };
}

function CardsWithAction(
  { title, subTitle, cards, actionButton }: Props,
) {
  const id = useId();

  return (
    <div class="flex flex-col mx-auto mt-[50px] mb-[50px] lg:mb-[94px]">
      <h2 class="block text-center">
        <span class="font-bold text-xl lg:text-3xl">{title}</span>
      </h2>
      {subTitle && (
        <h3 class="font-medium text-base lg:text-xl text-center mt-[10px]">
          {subTitle}
        </h3>
      )}
      <div class="mt-[50px] lg:mt-[70px] px-2 sm:px-4 2xl:px-1" id={id}>
        <Slider class="mx-auto max-w-[96rem] carousel carousel-center sm:carousel-end gap-[5px] lg:justify-center 2xl:justify-around">
          {cards.map((card, index) => (
            <Slider.Item
              index={index}
              class="carousel-item first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0 w-full sm:max-w-[50%] lg:max-w-[24%] 2xl:max-w-[377px]"
            >
              <a
                href={card.href}
                class="2xl:max-w-[357px] mx-auto lg:max-w-none relative"
              >
                <figure class="hover:opacity-95">
                  <Image
                    class="block lg:hidden"
                    src={card.image.mobile}
                    alt={card.image.alt}
                    width={346}
                    loading="lazy"
                  />
                  <Image
                    class="hidden lg:block"
                    src={card.image.desktop}
                    alt={card.image.alt}
                    width={346}
                    loading="lazy"
                  />
                </figure>
              </a>
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS rootId={id} />
      </div>
      {actionButton && (
        <a
          class="mx-auto mt-[55px] bg-info text-black w-[186px] h-11 grid place-items-center"
          href={actionButton.href}
        >
          {actionButton.label}
        </a>
      )}
    </div>
  );
}

export default CardsWithAction;
