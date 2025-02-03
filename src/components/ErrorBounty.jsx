// ErrorBoundary.jsx
import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error information
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo, // This should now be safely stored in state
    });
  }

  render() {
    if (this.state.hasError) {
      // Only render errorInfo if it's available
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Render children if no error occurred
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
