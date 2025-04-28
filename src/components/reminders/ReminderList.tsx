import React, { useEffect, useState } from 'react';
import { Reminder } from '../../types/reminder';
import { reminderService } from '../../services/reminderService';
import { format } from 'date-fns';
import { Button, Card, List, Typography, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ReminderListProps {
  onEdit: (reminder: Reminder) => void;
  onRefresh: () => void;
}

export const ReminderList: React.FC<ReminderListProps> = ({ onEdit, onRefresh }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReminders = async () => {
    try {
      const data = await reminderService.getAll();
      setReminders(data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await reminderService.delete(id);
      fetchReminders();
      onRefresh();
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  return (
    <Card className="w-full">
      <Title level={4} className="mb-4">Reminders</Title>
      <List
        loading={loading}
        dataSource={reminders}
        className="reminder-list"
        renderItem={(reminder) => (
          <List.Item
            className="p-4 hover:bg-gray-50 transition-colors duration-200"
            actions={[
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit(reminder)}
                className="text-blue-500 hover:text-blue-700"
              />,
              <Popconfirm
                title="Are you sure you want to delete this reminder?"
                onConfirm={() => handleDelete(reminder.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />}
                  className="text-red-500 hover:text-red-700"
                />
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              title={
                <Text strong className="text-lg">
                  {reminder.title}
                </Text>
              }
              description={
                <Space direction="vertical" className="mt-2">
                  <Text className="text-gray-600">{reminder.description}</Text>
                  <Text type="secondary" className="text-sm">
                    Due: {format(new Date(reminder.dueDate), 'PPP p')}
                  </Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}; 