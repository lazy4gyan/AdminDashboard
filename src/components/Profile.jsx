import { Card, Avatar, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../utils/auth";
import { useContext } from "react";

const UserProfile = () => {
  const { user,loading } = useContext(AuthContext);

  // Convert the date format
  const formattedDOB = new Date(user?.dob).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dataSource = [
    { key: "1", label: "User ID", value: user?.id },
    { key: "2", label: "Full Name", value: user?.fullName },
    { key: "3", label: "Email", value: user?.email },
    { key: "4", label: "Gender", value: user?.gender },
    { key: "5", label: "Date of Birth", value: formattedDOB },
    { key: "6", label: "Address", value: user?.address },
  ];

  const columns = [
    { title: "Label", dataIndex: "label", key: "label" },
    { title: "Value", dataIndex: "value", key: "value" },
  ];

  return (
    <Card title="My Profile" style={{ width: 400 }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
      >
        <Avatar size={64} icon={<UserOutlined />} />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showHeader={false}
        loading={loading}
      />
    </Card>
  );
};

export default UserProfile;
