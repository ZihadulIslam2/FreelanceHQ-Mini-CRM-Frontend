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
    <Card>
      <Title level={4}>Reminders</Title>
      <List
        loading={loading}
        dataSource={reminders}
        renderItem={(reminder) => (
          <List.Item
            actions={[
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit(reminder)}
              />,
              <Popconfirm
                title="Are you sure you want to delete this reminder?"
                onConfirm={() => handleDelete(reminder.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              title={reminder.title}
              description={
                <Space direction="vertical">
                  <Text>{reminder.description}</Text>
                  <Text type="secondary">
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