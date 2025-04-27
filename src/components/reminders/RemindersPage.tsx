import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ReminderList } from './ReminderList';
import { ReminderForm } from './ReminderForm';
import { WeeklyReminders } from './WeeklyReminders';
import { Reminder, CreateReminderDto, UpdateReminderDto } from '../../types/reminder';
import { reminderService } from '../../services/reminderService';

export const RemindersPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | undefined>();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values: CreateReminderDto) => {
    setLoading(true);
    try {
      await reminderService.create(values);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error creating reminder:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values: UpdateReminderDto) => {
    if (!selectedReminder) return;
    setLoading(true);
    try {
      await reminderService.update(selectedReminder.id, values);
      setIsModalVisible(false);
      setSelectedReminder(undefined);
    } catch (error) {
      console.error('Error updating reminder:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedReminder(undefined);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <ReminderList onEdit={handleEdit} onRefresh={() => {}} />
        </Col>
        <Col xs={24} lg={8}>
          <WeeklyReminders />
        </Col>
      </Row>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ position: 'fixed', bottom: '24px', right: '24px' }}
      >
        New Reminder
      </Button>

      <Modal
        title={selectedReminder ? 'Edit Reminder' : 'New Reminder'}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
      >
        <ReminderForm
          initialValues={selectedReminder}
          onSubmit={selectedReminder ? handleUpdate : handleCreate}
          onCancel={handleModalCancel}
          loading={loading}
        />
      </Modal>
    </div>
  );
}; 