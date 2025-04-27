import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CreateInteractionLogDto } from '../../types/interactionLog';
import * as interactionLogService from '../../services/interactionLogService';

interface AddInteractionLogFormProps {
  clientId: number;
  onLogAdded: () => void;
}

const schema = yup.object().shape({
  content: yup.string().required('Content is required'),
  date: yup.string().required('Date is required'),
  interactionType: yup.string().oneOf(['meeting', 'call', 'email', 'note'] as const).required('Type is required'),
  clientId: yup.number().required(),
});

export const AddInteractionLogForm = ({ clientId, onLogAdded }: AddInteractionLogFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateInteractionLogDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      clientId,
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: CreateInteractionLogDto) => {
    try {
      setLoading(true);
      await interactionLogService.createInteractionLog(data);
      reset();
      onLogAdded();
      setError('');
    } catch (error) {
      setError('Failed to add interaction log');
      console.error('Error adding interaction log:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Add Interaction Log</h3>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            {...register('interactionType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="meeting">Meeting</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="note">Note</option>
          </select>
          {errors.interactionType && (
            <p className="mt-1 text-sm text-red-500">{errors.interactionType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            {...register('date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            {...register('content')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Log'}
          </button>
        </div>
      </form>
    </div>
  );
}; 