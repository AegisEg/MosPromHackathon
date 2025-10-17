import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './style.scss';

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export default function Link({ to, children }: LinkProps) {
  return (
    <RouterLink to={to} className="link">
      {children}
    </RouterLink>
  );
}