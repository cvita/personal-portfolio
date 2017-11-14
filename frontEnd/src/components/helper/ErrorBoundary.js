import React, { Component } from 'react';
import { Alert } from 'reactstrap';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    console.error(info);
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Alert color='danger'>
          <p className='text-center' dangerouslySetInnerHTML={{ __html: this.props.message }} />
        </Alert>
      );
    }
    return this.props.children;
  }
}


export default ErrorBoundary;
