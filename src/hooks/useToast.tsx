import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ToastFn = (message: string) => void;

const ToastContext = createContext<ToastFn>(() => {});

export function useToast(): ToastFn {
  return useContext(ToastContext);
}

/** Lightweight toast host — fixed bottom-center, auto-dismisses. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((msg: string) => {
    setMessage(msg);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setMessage(null), 2200);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className={`pointer-events-none fixed inset-x-0 z-[60] flex justify-center px-4 transition-all duration-300 ${
          message
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        } bottom-[5.5rem] sm:bottom-8`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message && (
          <span className="rounded-md border border-white/10 bg-ink px-4 py-2.5 font-mono text-[12px] text-faint shadow-lg shadow-ink/40">
            {message}
          </span>
        )}
      </div>
    </ToastContext.Provider>
  );
}
