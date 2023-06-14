import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
import Newsletter from "deco-sites/fashion/islands/Newsletter.tsx";
import type { ComponentChildren } from "preact";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
  openLinkInNewTab?: boolean;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span class="text-primary text-sm lg:text-secondary">
      {isIcon(item)
        ? (
          <div class="border-base-100 border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a
            rel="noreferrer noopener"
            target={`${item.openLinkInNewTab ? "_blank" : "_self"}`}
            href={item.href}
          >
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return (
    <div
      class={`border-t-0 border-b-0 py-6 sm:py-12 sm:px-0 lg:pt-7 lg:pb-[25px] lg:px-[70px] ${_class}`}
    >
      {children}
    </div>
  );
}

export interface Props {
  sections?: Section[];
  social: {
    image: LiveImage;
    link: string;
    /** @description If checked opens another page */
    openLinkInNewTab?: boolean;
  }[];
  titleMobile: HTML;
  titleDesktop: HTML;
  newsletter: {
    placeholderEmail?: string;
    colorButton?: string;
    textSubmitButton?: string;
    successText?: string;
    errorText?: string;
  };
}

function Footer(
  { sections = [], social, titleMobile, titleDesktop, newsletter }: Props,
) {
  return (
    <footer class="w-full bg-neutral flex flex-col divide-y divide-primary-content">
      <div>
        <div class="max-w-[unset] container w-full flex flex-col">
          <FooterContainer class="lg:hidden">
            <Newsletter title={titleMobile} {...newsletter} />
          </FooterContainer>

          <FooterContainer class="xl:px-0 xl:flex xl:justify-center">
            {/* Desktop view */}
            <div class="hidden lg:flex flex-wrap">
              <span class="2xl:mr-[102px] max-w-[250px] self-center xl:mr-[35px] lg:mr-[60px]">
                <Quilltext html={titleDesktop} />
              </span>
              <ul class="hidden sm:flex flex-row lg:gap-[50px] 2xl:gap-[102px] xl:gap-[50px] 2xl:mr-[102px] xl:mr-[35px] lg:mr-[35px]">
                {sections.map((section) => (
                  <li>
                    <div>
                      <span class="font-normal text-base text-primary">
                        {section.label}
                      </span>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } mt-[23px] flex-wrap`}
                      >
                        {section.children.map((item) => (
                          <li class="mb-[13px] leading-[16px]">
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
              <div class="flex flex-col">
                <Newsletter />

                <div class="hidden lg:flex flex-col mt-[22px]">
                  <span class="font-normal text-lg mb-[13px] text-primary">
                    Follow us
                  </span>
                  <div class="flex gap-5">
                    {social.map((socials) => (
                      <a
                        rel="noreferrer noopener"
                        target={`${
                          socials.openLinkInNewTab ? "_blank" : "_self"
                        }`}
                        href={socials.link}
                      >
                        <img src={socials.image} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile view */}
            <ul class="flex flex-col px-4 lg:hidden lg:flex-row gap-4">
              {sections.map((section) => (
                <li>
                  <span class="text-black">
                    <details>
                      <summary class="list-none flex items-center justify-between">
                        {section.label}
                        <div class="flex justify-between">
                          <Icon
                            id="Mais"
                            height={13}
                            width={13}
                            strokeWidth={0.01}
                          />
                        </div>
                      </summary>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 px-2 pt-2`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </span>
                </li>
              ))}
            </ul>

            <div class="lg:hidden flex flex-col px-4 sm:px-8 mt-3 h-[154px] border-b-[1px] border-solid border-[hsla(0,0%,40%,.4)]">
              <span class="font-normal text-lg mb-[13px] text-primary">
                Follow us
              </span>
              <div class="flex gap-5">
                {social.map((socials) => (
                  <a
                    rel="noreferrer noopener"
                    target={`${socials.openLinkInNewTab ? "_blank" : "_self"}`}
                    href={socials.link}
                  >
                    <img src={socials.image} />
                  </a>
                ))}
              </div>
            </div>

            <div class="lg:hidden">
              <p class="pt-[5px] pb-[66px] md:pb-0 px-4 text-xs font-normal w-full text-primary leading-[19px]">
                2022 Carol Bassi. Todos os direitos reservado. Guaraná Brasil
                Difusão de moda LTDA | Rua Major Paladino, 128. Vila Ribeiro de
                Barros - Galpão Modulo 10. CEP: 05307-000 - São Paulo/SP | CNPJ:
                54.877.063/0001-50
              </p>
            </div>
          </FooterContainer>

          <div class="hidden lg:block py-[18px] px-[60px] border-t-[1px] border-solid border-[hsla(0,0%,40%,.4)]">
            <p class="text-center text-xs font-normal w-full text-primary leading-[19px]">
              2022 Carol Bassi. Todos os direitos reservado. Guaraná Brasil
              Difusão de moda LTDA | Rua Major Paladino, 128. Vila Ribeiro de
              Barros - Galpão Modulo 10. CEP: 05307-000 - São Paulo/SP | CNPJ:
              54.877.063/0001-50
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
