import React, { useEffect, useState } from 'react';
import { Reminder } from '../../types/reminder';
import { reminderService } from '../../services/reminderService';
import { format } from 'date-fns';
import { Card, List, Typography, Space, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const WeeklyReminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWeeklyReminders = async () => {
    try {
      const data = await reminderService.getDueThisWeek();
      setReminders(data);
    } catch (error) {
      console.error('Error fetching weekly reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyReminders();
  }, []);

  const getReminderStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { color: 'red', text: 'Overdue' };
    } else if (diffDays === 0) {
      return { color: 'orange', text: 'Due Today' };
    } else if (diffDays <= 3) {
      return { color: 'gold', text: 'Due Soon' };
    } else {
      return { color: 'green', text: 'Upcoming' };
    }
  };

  return (
    <Card>
      <Title level={4}>
        <ClockCircleOutlined /> Reminders Due This Week
      </Title>
      <List
        loading={loading}
        dataSource={reminders}
        renderItem={(reminder) => {
          const status = getReminderStatus(reminder.dueDate);
          return (
            <List.Item>
              <List.Item.Meta
                title={
                  <Space>
                    {reminder.title}
                    <Tag color={status.color}>{status.text}</Tag>
                  </Space>
                }
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
          );
        }}
      />
    </Card>
  );
}; 