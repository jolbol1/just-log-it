import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffix, ...props }, ref) => {
    return (
      <div className="flex rounded-md group ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 focus-visible:outline-none text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50',
            className,
            {
              'rounded-md': !suffix
            }
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 text-gray-600 dark:text-gray-400 bg-muted/50  sm:text-sm">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
