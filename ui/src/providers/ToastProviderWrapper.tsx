"use client"; // Add this at the top

import { createContext, useContext, useState, ReactNode } from "react";
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";

type ToastContextType = {
  addToast: (toast: { title: string; description: string; duration?: number }) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProviderWrapper({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<{ title: string; description: string }[]>([]);

  const addToast = (toast: { title: string; description: string; duration?: number }) => {
    setToasts((prevToasts) => [...prevToasts, toast]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1)); // Remove toast after the duration
    }, toast.duration || 4000); // Default duration of 4 seconds
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <ToastProvider> 
        {children}
        <ToastViewport /> 
        {toasts.map((toast, index) => (
        <Toast key={index}>
            <div className="toast-container">
            <ToastTitle className="toast-title">{toast.title}</ToastTitle>
            <ToastDescription className="toast-description">{toast.description}</ToastDescription>
            </div>
            <ToastClose className="toast-close" />
        </Toast>
        ))}
      </ToastProvider>
    </ToastContext.Provider>
  );
}
