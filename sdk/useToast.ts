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

const createToast = (message: string, options?: ToastOptions) => {
  const toast: Toast = {
    id: Date.now().toString(),
    message,
    duration: options?.duration || 4000,
  };

  toasts.value = [...toasts.value, toast];
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
