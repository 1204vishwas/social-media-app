import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../types/auth';
import { cn } from '../../utils/cn';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-2xl glass-panel shadow-2xl transition-all duration-300 animate-slideIn',
              isSuccess && 'border-purple-500/40 bg-[#120a24]/90 shadow-purple-900/40',
              isError && 'border-rose-500/40 bg-[#200914]/90 shadow-rose-950/40',
              !isSuccess && !isError && 'border-blue-500/40 bg-[#091322]/90 shadow-cyan-950/40'
            )}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-cyan-400" />}
            </div>

            <div className="flex-1 text-left">
              <h4 className="text-xs font-bold text-white tracking-wide">{toast.title}</h4>
              <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
