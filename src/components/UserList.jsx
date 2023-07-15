import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CLIENT_BASE_URL } from "../constants/constants";
import { GlobalContext } from "../store/globalStore";

const UserTable = () => {
  const { data, setData, deleteUser, loading } = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "User ID",
      dataIndex: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (_, record) => (
        <>
          {editingId !== record.id ? (
            <Button type="primary" onClick={() => handleEdit(record)}>
              Edit
            </Button>
          ) : (
            <Button type="primary" onClick={() => handleSave(record)}>
              Save
            </Button>
          )}
          <Button
            type="danger"
            style={{ marginLeft: "8px" }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Handle delete user
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this user?",
      onOk: () => deleteUser(id),
    });
  };

  // Handle edit user, update the existing record
  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  // Handle save user new user
  const handleSave = (record) => {
    form.validateFields().then((values) => {
      const url = `${CLIENT_BASE_URL}/${record.id}`;
      fetch(url, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            toast.success("User updated successfully.");
            const updatedData = data.map((user) => {
              if (user.id === record.id) {
                return { ...user, ...values };
              }
              return user;
            });
            setData(updatedData);
            setEditingId(null);
            setModalVisible(false);
          } else {
            throw new Error("Failed to update user");
          }
        })
        .catch((error) => {
          toast.error("Failed to update user: " + error.message);
        });
    });
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Add User
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
      />

      {/* Edit User Modal */}
      <Modal
        title={editingId ? "Edit User" : "Add User"}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        onOk={() => {
          form.validateFields().then((values) => {
            if (editingId) {
              handleSave(values);
            } else {
              fetch(CLIENT_BASE_URL, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(values),
              })
                .then((res) => {
                  toast.success("User added successfully.");
                })
                .catch((err) => {
                  toast.error("Failed :" + err.message);
                });

              setData((prevData) => [...prevData, values]);
              form.resetFields();
            }
            setModalVisible(false);
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="id"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
              { whitespace: true },
              { min: 3 },
              { max: 10 },
              {
                validator: (_, value) => {
                  const existingUser = data.find((user) => user.id === value);
                  if (!existingUser || existingUser.id === editingId) {
                    return Promise.resolve();
                  }
                  return Promise.reject("User ID already exists");
                },
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your user name" />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
              {
                pattern:
                  /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|yahoo)\.(com|co\.uk|fr|de|es)$/,
                message:
                  "Please enter a valid email from Gmail, Outlook, Hotmail, or Yahoo",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Select placeholder="Select your gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          {!editingId && (
            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[
                {
                  required: true,
                  message: "Please provide your date of birth",
                },
              ]}
              hasFeedback
            >
              <DatePicker
                style={{ width: "100%" }}
                picker="date"
                placeholder="Choose date of birth"
              />
            </Form.Item>
          )}

          <Form.Item name="address" label="Address">
            <Input.TextArea placeholder="Enter your address" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
