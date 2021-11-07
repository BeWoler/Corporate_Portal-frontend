import React from 'react';
import LoginForm from '../components/LoginForm';
import PrivateComponent from '../components/PrivateComponent';
import RegistrationForm from '../components/RegistrationForm';

export interface Route {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export const PublicRoutes: Route[] = [
  {path: '/login', exact: true, component: LoginForm},
  {path: '/registration', exact: true, component: RegistrationForm}
]

export const PrivateRoutes: Route[] = [
  {path: '/private', exact: true, component: PrivateComponent}
]