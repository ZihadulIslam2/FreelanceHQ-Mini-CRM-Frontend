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

  const handleCreate = async (values: CreateReminderDto | UpdateReminderDto) => {
    setLoading(true);
    try {
      await reminderService.create(values as CreateReminderDto);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error creating reminder:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values: CreateReminderDto | UpdateReminderDto) => {
    if (!selectedReminder) return;
    setLoading(true);
    try {
      await reminderService.update(selectedReminder.id, values as UpdateReminderDto);
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
    <div className="p-4 sm:p-6 lg:p-8">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <div className="mb-4">
            <ReminderList onEdit={handleEdit} onRefresh={() => {}} />
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div className="mb-4">
            <WeeklyReminders />
          </div>
        </Col>
      </Row>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-10 shadow-lg"
        size="large"
      >
        New Reminder
      </Button>

      <Modal
        title={selectedReminder ? 'Edit Reminder' : 'New Reminder'}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width="90%"
        style={{ maxWidth: '600px', color: 'inherit' }}
        className="reminder-modal dark:bg-gray-800"
        bodyStyle={{ padding: '24px' }}
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