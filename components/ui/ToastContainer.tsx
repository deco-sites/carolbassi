import { useToast } from "deco-sites/fashion/sdk/useToast.ts";
import ToastComponent from "./ToastComponent.tsx";

function ToastContainer() {
  const { toasts } = useToast();

  const toast = toasts.value[toasts.value.length - 1];

  return (
    <div class="fixed bottom-0 left-0 w-full bg-transparent z-50 overflow-hidden">
      {toast && (
        <ToastComponent
          key={toast.id}
          toast={toast}
        />
      )}
    </div>
  );
}

export default ToastContainer;
