import React from 'react';
import './styles/notfound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="page-not-found">
        <h1>404 Not Found</h1>
      </div>
    );
  }
}

export default NotFound;
