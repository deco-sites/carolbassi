import Button from "../ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

// Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// TODO: Figure out how to add it via tailwind config.
const innerStyle = `
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;

const opts = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // deno-lint-ignore no-explicit-any
    const { target } = event as any;
    const { value } = target;

    onChange?.(+value);
  };

  return (
    <div class="form-control relative">
      <select
        class={`h-8 w-[70px] pl-4 pr-2 border-[#e3e4e6] border-[.125rem] rounded-[.25rem] text-base appearance-none ${
          loading ? "loading" : ""
        }`}
        disabled={disabled}
        onChange={handleChange}
        value={quantity.toString()}
      >
        <option disabled></option>
        <option value="0">
          0 - Remover
        </option>
        {opts.map((opt) => (
          <option key={opt} value={opt} selected={+opt === quantity}>
            {opt}
          </option>
        ))}
        <option value="10" selected={quantity === 10}>10 +</option>
      </select>
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon id="ChevronDown" width={18} height={18} strokeWidth={1} />
      </div>
      {
        /* <Button
          class="btn-square btn-outline"
          onClick={decrement}
          disabled={disabled}
          loading={loading}
        >
          -
        </Button>
        <input
          class="input border-base-content border-x-0 text-center"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          max={QUANTITY_MAX_VALUE}
          min={1}
          value={quantity}
          disabled={disabled}
          onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        />
        <Button
          class="btn-square btn-outline"
          onClick={increment}
          disabled={disabled}
          loading={loading}
        >
          +
        </Button> */
      }
    </div>
  );
}

export default QuantitySelector;
