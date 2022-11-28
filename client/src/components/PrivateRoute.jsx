import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import AddMenu from '../pages/AddMenu';

const ProtectedRoute = () => (

  withAuthenticationRequired(AddMenu, {
    onRedirecting: () => (<div>Loading....</div>)
  })
)

export default ProtectedRoute;