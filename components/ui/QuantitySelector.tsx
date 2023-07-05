import Button from "../ui/Button.tsx";

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
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  const handleRemove = () => {
    console.log("oi");
    onChange?.(0);
  };

  return (
    <div class="form-control">
      <div class="input-group">
        <select
          class={`h-10 border-[#e3e4e6] border-[.125rem] rounded-[.25rem] text-base ${
            loading ? "loading" : ""
          }`}
          disabled={disabled}
        >
          <option disabled></option>
          <option
            value="0"
            onSelect={handleRemove}
          >
            0 - Remover
          </option>
          {opts.map((opt) => (
            <option key={opt} value={opt} selected={quantity === +opt}>
              {opt}
            </option>
          ))}
          <option value="10" selected={quantity >= 10}>10 +</option>
        </select>
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
    </div>
  );
}

export default QuantitySelector;
