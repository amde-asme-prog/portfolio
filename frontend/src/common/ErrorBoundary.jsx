import React, { Component } from "react";
import {
  ErrorMessage,
  LoadingSpinner,
  OfflineMessage,
} from "../portfolio/reusables/ErrorResponses";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isOffline: false,
      isLoading: false,
    };
  }

  // When componentDidCatch is called, we can log the error info
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
    // Optionally log error to an error reporting service like Sentry, LogRocket, etc.
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  // Detect if the app is offline
  componentDidMount() {
    window.addEventListener("offline", this.handleOffline);
    window.addEventListener("online", this.handleOnline);
  }

  componentWillUnmount() {
    window.removeEventListener("offline", this.handleOffline);
    window.removeEventListener("online", this.handleOnline);
  }

  handleOffline = () => {
    this.setState({ isOffline: true });
  };

  handleOnline = () => {
    this.setState({ isOffline: false });
  };

  render() {
    const { hasError, isOffline, isLoading, error } = this.state;

    if (isOffline) {
      return <OfflineMessage />;
    }

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (hasError) {
      return <ErrorMessage status={error?.response?.status || 500} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
