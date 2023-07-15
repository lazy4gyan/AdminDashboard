import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ContactsOutlined
} from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../../utils/auth';

const Navbar = () => {
  const {handleLogout} = useContext(AuthContext)
  return (
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']} style={{ lineHeight: '64px' }}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="dashboard" icon={<ContactsOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<UserOutlined />} style={{ position: 'absolute', right: 0 }}>
        <Link to="/login" onClick={handleLogout}>Logout</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
