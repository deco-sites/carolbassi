import Image from "deco-sites/std/components/Image.tsx";

export interface INavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
  images?: {
    src?: string;
    alt?: string;
    title?: string;
    href?: string;
  }[];
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, images } = item;

  return (
    <li class="group flex items-center py-[34px]">
      <a href={href} class="px-4 py-3">
        <span class="group-hover:underline group-hover:font-semibold text-lg">
          {label}
        </span>
      </a>

      {children && children.length > 0 && (
        <div class="hidden absolute top-full left-0 hover:flex group-hover:flex bg-base-100 z-50 items-start border-b-2 border-base-200 w-screen pt-[52px] pb-3 pl-[174px] h-[361px]">
          <ul class="w-[31%] border-r-[3px] border-r-[rgba(0,0,0,.13)] h-[260px] grid gap-4 grid-flow-col grid-rows-8">
            {children.map((node) => (
              <li>
                <a class="hover:underline" href={node.href}>
                  <span>{node.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div class="flex gap-20 pl-20 2xl:pl-44 pt-4">
            {images?.map((image) =>
              image?.src &&
              (
                <a
                  href={image?.href}
                  class="flex flex-col items-start gap-[14px] max-h-[250px]"
                >
                  <Image
                    class="max-w-[152px] 2xl:max-w-[229px] hover:opacity-95"
                    src={image.src}
                    alt={image?.alt}
                    width={229}
                    height={229}
                    loading="lazy"
                  />
                  {image.title && <p class="text-lg">{image.title}</p>}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export default NavItem;
