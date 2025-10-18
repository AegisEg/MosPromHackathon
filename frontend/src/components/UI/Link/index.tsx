import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './style.scss';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function Link({ to, children, className = '' }: LinkProps) {
  return (
    <RouterLink to={to} className={`link ${className}`}>
      {children}
    </RouterLink>
  );
}