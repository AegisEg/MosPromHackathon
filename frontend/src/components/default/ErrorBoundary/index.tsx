import React, { Component, ErrorInfo, ReactNode } from 'react';
import Error from '../../../pages/Error';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <Error />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
