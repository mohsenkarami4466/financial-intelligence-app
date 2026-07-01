import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const isFa = document.documentElement.lang === 'fa';
      return (
        <div className={styles.boundary}>
          <h2>{isFa ? 'خطای غیرمنتظره' : 'Something went wrong'}</h2>
          <p>{this.state.error?.message}</p>
          <button type="button" onClick={this.handleRetry}>
            {isFa ? 'تلاش مجدد' : 'Try again'}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
