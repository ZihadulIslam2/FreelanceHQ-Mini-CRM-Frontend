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
    <Card className="bg-white dark:bg-gray-800">
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
        className="reminder-form"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
          className="dark:text-gray-100"
        >
          <Input 
            placeholder="Enter reminder title" 
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
          className="dark:text-gray-100"
        >
          <Input.TextArea
            placeholder="Enter reminder description"
            rows={4}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: 'Please select a due date' }]}
          className="dark:text-gray-100"
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            style={{ width: '100%' }}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </Form.Item>

        <Form.Item>
          <Button.Group style={{ width: '100%' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '50%' }}
              className="dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {initialValues ? 'Update' : 'Create'}
            </Button>
            <Button
              onClick={onCancel}
              style={{ width: '50%' }}
              className="dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              Cancel
            </Button>
          </Button.Group>
        </Form.Item>
      </Form>
    </Card>
  );
}; 