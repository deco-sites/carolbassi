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
  footerLinks?: FooterLink[];
  footerBottom?: HTML;
}

export interface FooterProps {
  footerLinks?: FooterLink[];
  footerBottom?: HTML;
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
  { mainContent, image, footerLinks, footerBottom }: Props,
) {
  return (
    <>
      <div>
        <div class="px-2 sm:px-4">
          <div class="flex flex-col mt-[50px] px-2 sm:px-4 justify-between items-center">
            <div class="mt-[10px]">
              <div class="mt-[18px] font-sans-serif text-[rgba(51,51,51,.45)]">
                {mainContent && <Quilltext html={mainContent} />}
              </div>
            </div>

            <div class="w-full flex justify-center">
              <img class="mt-[45px] sm:max-w-[578px]" src={image} />
            </div>
          </div>
        </div>
      </div>

      <FooterInstitucional
        footerLinks={footerLinks}
        footerBottom={footerBottom}
      />
    </>
  );
}

export default Institucional;
