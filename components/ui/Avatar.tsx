/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "bg-base-100 text-primary ring-neutral-focus",
  "disabled": "bg-neutral-content text-neutral",
  "default": "bg-base-100 text-neutral-content",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="">
      <div
        class={`relative rounded-lg w-full h-[36px] px-4 flex items-center border-[1px] border-solid border-[#e3e4e6]${
          colors[content] ?? colors[variant]
        } ${variants[variant]}`}
      >
        <span class="text-base text-primary font-normal">
          {colors[content] ? "" : content}
        </span>
        {variant === "active" &&
          (
            <div
              class={"rounded-lg border-2 border-solid border-primary absolute inset-[-0.25rem]"}
            >
            </div>
          )}
      </div>
    </div>
  );
}

export default Avatar;
