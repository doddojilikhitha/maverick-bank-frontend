import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error) {
    console.error("App Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg border-0 p-5 text-center">
            <div style={{ fontSize: "60px" }}>
              ⚠️
            </div>

            <h3
              className="fw-bold mt-3"
              style={{ color: "#1a3c5e" }}
            >
              Something went wrong
            </h3>

            <p className="text-muted">
              Please refresh the page.
            </p>

            <button
              className="btn text-white"
              style={{
                backgroundColor: "#1a3c5e",
              }}
              onClick={() =>
                window.location.reload()
              }
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;