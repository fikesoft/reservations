import React from 'react'

const Error404 = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
    <div className="text-center">
      <h1 className="display-1 text-primary mb-3">404</h1>
      <p className="lead mb-4">Page Not Found</p>
      <a 
        href="/" 
        className="btn btn-primary px-4 py-2"
        style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }}
      >
        Go Home
      </a>
    </div>
  </div>
  )
}

export default Error404