import { useToast } from "deco-sites/fashion/sdk/useToast.ts";
import { useEffect, useRef } from "preact/hooks";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { Toast } from "deco-sites/fashion/sdk/useToast.ts";

function ToastComponent({ toast }: { toast: Toast }) {
  const ref = useRef<HTMLDivElement>(null);
  const { removeToast } = useToast();

  const handleClose = () => {
    if (ref.current) ref.current.style.transform = "translateY(100%)";

    setTimeout(() => {
      removeToast(toast.id);
    }, 150);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = "translateY(0)";
    }
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`text-white p-4 flex flex-row items-start bg-black transition-transform translate-y-full will-change-transform duration-150 delay-0`}
    >
      <span>{toast.message}</span>
      <button
        onClick={handleClose}
        className="w-4 h-4 bg px-0 m-0"
      >
        <Icon id="XMark" width={16} height={16} strokeWidth={1} />
      </button>
    </div>
  );
}

export default ToastComponent;
