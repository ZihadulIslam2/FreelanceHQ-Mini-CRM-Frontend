import { useState, useEffect } from 'react';
import { InteractionLog } from '../../types/interactionLog';
import * as interactionLogService from '../../services/interactionLogService';

interface InteractionLogTimelineProps {
  clientId: number;
}

export const InteractionLogTimeline = ({ clientId }: InteractionLogTimelineProps) => {
  const [logs, setLogs] = useState<InteractionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setLoading(true);
        const data = await interactionLogService.getAllInteractionLogs(clientId);
        setLogs(data);
        setError('');
      } catch (error) {
        setError('Failed to load interaction logs');
        console.error('Error loading interaction logs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, [clientId]);

  if (loading) return <div className="text-center">Loading logs...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Interaction History</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500 text-center">No interaction logs found.</p>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  log.interactionType === 'meeting' ? 'bg-blue-100 text-blue-800' :
                  log.interactionType === 'call' ? 'bg-green-100 text-green-800' :
                  log.interactionType === 'email' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {log.interactionType}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(log.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{log.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 