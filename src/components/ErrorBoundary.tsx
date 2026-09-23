import { Component, type ErrorInfo, type ReactNode } from 'react';
import { STORAGE_KEY } from '../lib/config-context';
import Icon from './ui/Icon';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Erreur interceptée par ErrorBoundary :', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleResetData = (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.clear();
    } catch (e) {
      console.error('Impossible de vider le stockage local :', e);
    }
    window.location.reload();
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 select-text">
          <div className="max-w-lg w-full bg-slate-900/95 border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <Icon name="alert-triangle" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Une erreur inattendue est survenue
                </h1>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  L’application a rencontré une anomalie critique lors du rendu de vos composants.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-white/10 rounded-xl p-4 text-xs font-mono text-rose-300/90 overflow-x-auto max-h-48 leading-relaxed">
              <p className="font-semibold text-rose-400 mb-1">
                {this.state.error?.name || 'Error'}: {this.state.error?.message || 'Erreur inconnue'}
              </p>
              {this.state.errorInfo?.componentStack && (
                <p className="text-slate-500 text-[11px] whitespace-pre-wrap mt-2">
                  {this.state.errorInfo.componentStack}
                </p>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Si cette erreur est causée par une configuration ou des données corrompues dans votre navigateur, vous pouvez réinitialiser le stockage local ou tenter un rechargement simple de la page.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="error-boundary-reset-btn"
                type="button"
                onClick={this.handleResetData}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors shadow-lg shadow-rose-950/50 cursor-pointer"
              >
                <Icon name="rotate-ccw" className="w-4 h-4" />
                <span>Réinitialiser les données</span>
              </button>

              <button
                id="error-boundary-reload-btn"
                type="button"
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 font-medium text-xs transition-colors cursor-pointer"
              >
                <Icon name="refresh-cw" className="w-4 h-4" />
                <span>Recharger la page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
