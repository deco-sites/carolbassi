import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export type FooterLink = {
  content?: string;
  href?: string;
};

export interface Props {
  mainContent?: HTML;
  image?: LiveImage;
  secondaryContent?: {
    secondaryContent?: HTML;
    secondaryImage?: LiveImage;
  };
  footerLinks?: FooterLink[];
  footerBottom?: HTML;
  menuItems?: {
    link: string;
    itemName: string;
  }[];
  imageMobileLocation?: "Below Content" | "Above Content";
}

export interface FooterProps {
  footerLinks?: FooterLink[];
  footerBottom?: HTML;
}

export interface MenuInstitucional {
  menuItems?: {
    link: string;
    itemName: string;
  }[];
  image?: LiveImage;
}

function MenuInstitucional({ menuItems, image }: MenuInstitucional) {
  return (
    <div class="w-[15%]">
      <div
        class={`flex flex-col gap-[22px] ${image ? "mt-[70px]" : "mt-[110px]"}`}
      >
        {menuItems?.map((menuItem) => (
          <div class="h-[30px]">
            <a
              class="text-base text-primary-content no-underline"
              href={menuItem.link}
            >
              <span class="whitespace-nowrap">
                {menuItem.itemName}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterInstitucional({ footerLinks, footerBottom }: FooterProps) {
  return (
    <div>
      <div class="px-2 sm:px-4">
        <div class="mt-[120px] flex justify-center gap-5 lg:mt-[150px]">
          {footerLinks?.map((links) => (
            <div>
              <a class="text-primary font-normal text-[13px]" href={links.href}>
                {links.content}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div class="mt-[15px] py-[17px] border-b-[1px] border-t-[1px] border-solid border-[#eee] lg:mb-[94px]">
        <div class="px-2 sm:px-4 mx-[30px] lg:mx-0 lg:flex lg:justify-center text-primary-content">
          {footerBottom && <Quilltext html={footerBottom} />}
        </div>
      </div>
    </div>
  );
}

function Institucional(
  {
    mainContent,
    image,
    secondaryContent,
    footerLinks,
    footerBottom,
    menuItems,
    imageMobileLocation,
  }: Props,
) {
  return (
    <>
      {/* Mobile View */}
      <div class="lg:hidden">
        <div class="px-2 sm:px-4">
          <div class="flex flex-col mt-[50px] px-2 sm:px-4 justify-between items-center">
            <div
              class={`${
                imageMobileLocation === "Below Content" ? "order-1" : "order-2"
              } mt-[10px]`}
            >
              <div class="mt-[18px] font-sans-serif text-[rgba(51,51,51,.45)]">
                {mainContent && <Quilltext html={mainContent} />}
              </div>
            </div>

            <div
              class={`${
                imageMobileLocation === "Below Content" ? "order-2" : "order-1"
              } w-full flex justify-center`}
            >
              <img class="mt-[45px] sm:max-w-[578px]" src={image} />
            </div>
          </div>
        </div>

        {secondaryContent &&
          (
            <div class="px-2 sm:px-4 2xl:px-1 max-w-[96rem] mx-auto">
              <div class="flex flex-col mt-0">
                <div class="w-full flex justify-center pt-[40px] mt-[50px]">
                  <img
                    class="max-h-[648px]"
                    src={secondaryContent?.secondaryImage}
                  />
                </div>
                <div class="px-2 w-[full]">
                  <div class="mx-auto sm:w-[611px] mt-[25px] gap-[22px] font-sans-serif text-[rgba(51,51,51,.45)]">
                    {secondaryContent.secondaryContent && (
                      <Quilltext html={secondaryContent.secondaryContent} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Desktop View */}
      <div class="hidden lg:block">
        <div class="px-2 sm:px-4">
          <div class="flex pl-[113px] pr-[30px] justify-between">
            <MenuInstitucional menuItems={menuItems} image={image} />
            <div
              class={`${
                image
                  ? "w-[35%] pr-0 mt-[75px]"
                  : "w-[90%] pr-[73px] mt-[110px]"
              }`}
            >
              <div
                class={`font-sans-serif text-[rgba(51,51,51,.45)] ${
                  image ? "mt-[18px]" : "mt-[0px]"
                }`}
              >
                {mainContent && <Quilltext html={mainContent} />}
              </div>
            </div>

            {image && (
              <div class="w-[40%] flex justify-center">
                <img
                  class="mt-[45px] w-[578px] sm:max-h-[718px]"
                  src={image}
                />
              </div>
            )}
          </div>
        </div>
        {secondaryContent &&
          (
            <div class="px-1 max-w-[96rem] mx-auto">
              <div class="flex pl-[113px] pr-[30px] mt-0">
                <div class="w-full flex justify-center pt-[40px]">
                  <img
                    class="max-h-[648px]"
                    src={secondaryContent?.secondaryImage}
                  />
                </div>
                <div class="w-[60%]">
                  <div class="w-[500px] 2xl:w-[611px] mt-[25px] gap-[22px] font-sans-serif text-[rgba(51,51,51,.45)]">
                    {secondaryContent.secondaryContent && (
                      <Quilltext html={secondaryContent.secondaryContent} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

      <FooterInstitucional
        footerLinks={footerLinks}
        footerBottom={footerBottom}
      />
    </>
  );
}

export default Institucional;
