import React from 'react';
import { getStatusBgColor, getStatusLabel } from '@/app/utils/helpers';
import { Status } from '@/types/pdi';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor(status)} ${className}`}>
      {getStatusLabel(status)}
    </span>
  );
}
