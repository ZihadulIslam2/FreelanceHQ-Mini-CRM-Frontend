import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  disabled = false,
  required = false,
  className = '',
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          mt-1 block w-full rounded-md border-gray-300 shadow-sm
          focus:border-blue-500 focus:ring-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          dark:bg-gray-700 dark:border-gray-600 dark:text-white
          dark:placeholder-gray-400
          transition-colors duration-200
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}; 