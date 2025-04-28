import { useState, useEffect } from 'react';
import { InteractionLog } from '../../types/interactionLog';
import * as interactionLogService from '../../services/interactionLogService';
import { AddInteractionLogForm } from '../clients/AddInteractionLogForm';
import './InteractionLogs.css';

export const InteractionLogsPage = () => {
  const [logs, setLogs] = useState<InteractionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await interactionLogService.getAllInteractionLogs();
      setLogs(data);
      setError('');
    } catch (error) {
      setError('Failed to load interaction logs');
      console.error('Error loading interaction logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleLogAdded = () => {
    loadLogs();
  };

  if (loading) {
    return (
      <div className="interaction-logs-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="interaction-logs-container">
      <div className="interaction-logs-header">
        <h1 className="interaction-logs-title">Interaction Logs</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {logs.length === 0 ? (
        <div className="empty-state">
          <svg
            className="empty-state-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="empty-state-title">No interaction logs found</h3>
          <p className="empty-state-description">
            Start by adding your first interaction log.
          </p>
        </div>
      ) : (
        <div className="interaction-logs-grid">
          {logs.map((log) => (
            <div key={log.id} className="interaction-log-card">
              <div className="interaction-log-header">
                <span className={`interaction-type ${log.interactionType}`}>
                  {log.interactionType}
                </span>
                <span className="interaction-date">
                  {new Date(log.date).toLocaleDateString()}
                </span>
              </div>
              <p className="interaction-content">{log.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="add-interaction-form">
        <h2 className="form-title">Add New Interaction Log</h2>
        <AddInteractionLogForm onLogAdded={handleLogAdded} />
      </div>
    </div>
  );
}; 