import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface BoundaryProps {
  children: ReactNode;
  scope?: string;
}

interface BoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ScopedErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  public state: BoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): BoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[${this.props.scope || 'GlobalErrorBoundary'}] Error caught:`, error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[320px] flex items-center justify-center p-6 bg-slate-950 text-right">
          <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-7 h-7 shrink-0" />
              <h2 className="text-lg font-black">
                تمت حماية الجلسة من خطأ غير متوقع ({this.props.scope || 'النظام العام'})
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {this.state.error?.message || 'حدث استثناء أثناء معالجة المكوّن وتم عزله بأمان.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة المحاولة</span>
              </button>
              <a
                href="/main"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>العودة للرئيسية</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function GlobalErrorBoundary({ children }: { children: ReactNode }) {
  return <ScopedErrorBoundary scope="Global">{children}</ScopedErrorBoundary>;
}

export function RouteErrorBoundary({ children }: { children: ReactNode }) {
  return <ScopedErrorBoundary scope="Route">{children}</ScopedErrorBoundary>;
}

export function LabErrorBoundary({ children }: { children: ReactNode }) {
  return <ScopedErrorBoundary scope="Lab">{children}</ScopedErrorBoundary>;
}

export function AcademicErrorBoundary({ children }: { children: ReactNode }) {
  return <ScopedErrorBoundary scope="Academic">{children}</ScopedErrorBoundary>;
}

export default GlobalErrorBoundary;
