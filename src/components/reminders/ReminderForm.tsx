import React from 'react';
import { Form, Input, DatePicker, Button, Card } from 'antd';
import { Reminder, CreateReminderDto, UpdateReminderDto } from '../../types/reminder';
import dayjs from 'dayjs';

interface ReminderFormProps {
  initialValues?: Reminder;
  onSubmit: (values: CreateReminderDto | UpdateReminderDto) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate.toISOString(),
    };
    await onSubmit(formattedValues);
    form.resetFields();
  };

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={
          initialValues
            ? {
                ...initialValues,
                dueDate: dayjs(initialValues.dueDate),
              }
            : undefined
        }
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter reminder title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea
            placeholder="Enter reminder description"
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: 'Please select a due date' }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item>
          <Button.Group style={{ width: '100%' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '50%' }}
            >
              {initialValues ? 'Update' : 'Create'}
            </Button>
            <Button
              onClick={onCancel}
              style={{ width: '50%' }}
            >
              Cancel
            </Button>
          </Button.Group>
        </Form.Item>
      </Form>
    </Card>
  );
}; 