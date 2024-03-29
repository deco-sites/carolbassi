import { signal } from "@preact/signals";

export interface Toast {
  id: string;
  message: string;
  duration?: number;
}

interface ToastOptions {
  duration?: number;
}

const toasts = signal<Toast[]>([]);

const createToast = (
  { message, options, openDelay = 0 }: {
    message: string;
    options?: ToastOptions;
    openDelay?: number;
  },
) => {
  const toast: Toast = {
    id: Date.now().toString(),
    message,
    duration: options?.duration || 4000,
  };

  const create = () => toasts.value = [...toasts.value, toast];

  if (openDelay !== 0) {
    setTimeout(create, openDelay);
  } else {
    create();
  }
};

const removeToast = (id: string) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

const state = {
  toasts,
  createToast,
  removeToast,
};

export const useToast = () => state;
