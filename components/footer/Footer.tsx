import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
import Newsletter from "deco-sites/fashion/islands/Newsletter.tsx";
import type { ComponentChildren } from "preact";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
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
    <span class="text-primary text-sm">
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
          <a href={item.href}>
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
    <div class={`border-t-0 border-b-0 py-6 sm:py-12 sm:px-0 ${_class}`}>
      {children}
    </div>
  );
}

export interface Props {
  sections?: Section[];
  social: LiveImage[];
  title: HTML;
}

function Footer({ sections = [], social, title }: Props) {
  return (
    <footer class="w-full bg-neutral flex flex-col divide-y divide-primary-content">
      <div>
        <div class="container w-full flex flex-col">
          <FooterContainer>
            <Newsletter title={title} />
          </FooterContainer>

          <FooterContainer>
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row gap-20">
              {sections.map((section) => (
                <li>
                  <div>
                    <span class="font-medium text-xl text-primary-content">
                      {section.label}
                    </span>

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-2 pt-2 flex-wrap`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col px-4 sm:hidden sm:flex-row gap-4">
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

            <div class="flex flex-col px-4 mt-3 h-[154px] border-b-[1px] border-solid border-[hsla(0,0%,40%,.4)]">
              <span class="font-normal text-lg mb-[13px] text-primary">
                Follow us
              </span>
              <div class="flex gap-5">
                {social.map((socials) => <img src={socials} />)}
              </div>
            </div>

            <div>
              <p class="py-[5px] px-4 text-xs font-normal w-full text-primary leading-[19px]">
                2022 Carol Bassi. Todos os direitos reservado. Guaraná Brasil
                Difusão de moda LTDA | Rua Major Paladino, 128. Vila Ribeiro de
                Barros - Galpão Modulo 10. CEP: 05307-000 - São Paulo/SP | CNPJ:
                54.877.063/0001-50
              </p>
            </div>
          </FooterContainer>
        </div>
      </div>

      <div>
        <div class="container w-full px-4">
          <FooterContainer class="flex justify-between w-full">
            <span class="flex items-center gap-1 text-primary-content">
              Powered by{" "}
              <a
                href="https://www.deco.cx"
                aria-label="powered by https://www.deco.cx"
              >
                <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
              </a>
            </span>

            <ul class="flex items-center justify-center gap-2">
              <li>
                <a
                  href="https://www.instagram.com/deco.cx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Instagram"
                    strokeWidth={1}
                  />
                </a>
              </li>
              <li>
                <a
                  href="http://www.deco.cx/discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Discord"
                    strokeWidth={5}
                  />
                </a>
              </li>
            </ul>
          </FooterContainer>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
