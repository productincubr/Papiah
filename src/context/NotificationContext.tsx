import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  leaving: boolean;
}

interface ConfirmOptions {
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

interface ConfirmState {
  message: string;
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
}

interface NotificationContextType {
  toast: (message: string, type?: ToastType) => void;
  confirm: (message: string, options?: ConfirmOptions) => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const TOAST_LIFETIME = 3800;
const TOAST_EXIT_MS = 250;

const toastIcon: Record<ToastType, React.ReactNode> = {
  success: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const toastIconStyles: Record<ToastType, string> = {
  success: 'bg-green-50 text-green-600',
  error: 'bg-red-50 text-red-600',
  info: 'bg-[#EAD9FA] text-[#8E76B8]',
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const nextId = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_EXIT_MS);
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = 'success') => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, message, type, leaving: false }]);
      setTimeout(() => dismissToast(id), TOAST_LIFETIME);
    },
    [dismissToast]
  );

  const confirm = useCallback((message: string, options: ConfirmOptions = {}) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ message, options, resolve });
    });
  }, []);

  const resolveConfirm = (value: boolean) => {
    confirmState?.resolve(value);
    setConfirmState(null);
  };

  return (
    <NotificationContext.Provider value={{ toast, confirm }}>
      {children}

      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {/* Toast Stack */}
            <div className="fixed top-24 right-4 md:right-6 z-[9999] flex flex-col gap-3 pointer-events-none select-none">
              {toasts.map((t) => (
                <div
                  key={t.id}
                  className={`pointer-events-auto flex items-start gap-3 min-w-[260px] max-w-[360px] bg-white rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.12)] border border-[#E9E5DF] px-4 py-3.5 overflow-hidden ${
                    t.leaving ? 'animate-toast-out' : 'animate-toast-in'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${toastIconStyles[t.type]}`}>
                    {toastIcon[t.type]}
                  </div>
                  <p className="text-[13px] font-sans text-[#2D2D2D] leading-snug pt-0.5 flex-1">{t.message}</p>
                  <button
                    onClick={() => dismissToast(t.id)}
                    className="text-gray-400 hover:text-gray-600 text-[13px] font-bold shrink-0 cursor-pointer p-0.5"
                    aria-label="Dismiss notification"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Confirm Modal */}
            {confirmState && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-modal-overlay px-6">
                <div className="bg-white rounded-[24px] shadow-2xl max-w-sm w-full p-8 text-center animate-modal-pop">
                  {confirmState.options.title && (
                    <h3 className="font-serif text-[22px] font-light text-[#2D2D2D] mb-3">{confirmState.options.title}</h3>
                  )}
                  <p className="text-[14px] font-sans text-[#2D2D2D]/75 leading-relaxed mb-7">{confirmState.message}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => resolveConfirm(false)}
                      className="flex-1 h-[46px] rounded-[12px] border border-[#2D2D2D]/20 text-[#2D2D2D] font-sans font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {confirmState.options.cancelLabel || 'Cancel'}
                    </button>
                    <button
                      onClick={() => resolveConfirm(true)}
                      className={`flex-1 h-[46px] rounded-[12px] font-sans font-bold text-[11px] tracking-[0.15em] uppercase transition-colors cursor-pointer ${
                        confirmState.options.danger
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327]'
                      }`}
                    >
                      {confirmState.options.confirmLabel || 'Confirm'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>,
          document.body
        )}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotify must be used within a NotificationProvider');
  }
  return context;
};
