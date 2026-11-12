import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="admin-surface m-6 rounded-xl p-8">
          <h3 className="text-xl font-bold text-[#151240] mb-4">
            Something went wrong
          </h3>
          <p className="text-[#645F70] mb-6">
            Unable to load the page. Please try again or go back to the dashboard.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#964A21] text-white px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-[#7d3d1b]"
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary