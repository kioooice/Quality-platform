import React, { useState } from 'react';
import { Layout, Menu, theme, Avatar, Dropdown, Space, Select, Tag } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  ShopOutlined,
  ExperimentOutlined,
  AlertOutlined,
  RobotOutlined,
  BookOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RoleProvider, useRole, roles, type RoleId } from '../context/RoleContext';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem('质量驾驶舱', '/', <DashboardOutlined />),
  getItem('产品中心', '/products', <ShopOutlined />),
  getItem('检测中心', '/inspection', <ExperimentOutlined />),
  getItem('质量事件', '/events', <AlertOutlined />),
  getItem('AI分析', '/ai-analysis', <RobotOutlined />),
  getItem('案例中心', '/cases', <BookOutlined />),
  getItem('报告中心', '/reports', <FileTextOutlined />),
  getItem('系统管理', '/system', <SettingOutlined />),
];

const userMenuItems: MenuProps['items'] = [
  { key: 'profile', icon: <UserOutlined />, label: '个人中心' },
  { type: 'divider' },
  { key: 'logout', icon: <LogoutOutlined />, label: '退出登录' },
];

const roleColorMap: Record<RoleId, string> = {
  admin: '#1890ff',
  inspector: '#52c41a',
  quality_engineer: '#722ed1',
  process_engineer: '#fa8c16',
};

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole, setRole } = useRole();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: '#001529' }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: collapsed ? 16 : 18,
            fontWeight: 'bold',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {collapsed ? 'QM' : 'AI质量管理系统'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 500 }}>
            AI质量管理与异常追溯系统
          </div>
          <Space size={16}>
            <Select
              value={currentRole.id}
              onChange={(val) => setRole(val as RoleId)}
              style={{ width: 150 }}
              size="small"
              options={roles.map((r) => ({
                value: r.id,
                label: (
                  <Space size={6}>
                    <span>{r.name}</span>
                  </Space>
                ),
              }))}
            />
            <Tag color={roleColorMap[currentRole.id]} style={{ margin: 0 }}>
              {currentRole.name}
            </Tag>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  size={28}
                  style={{ backgroundColor: roleColorMap[currentRole.id], fontSize: 13 }}
                >
                  {currentRole.avatar}
                </Avatar>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

const MainLayout: React.FC = () => (
  <RoleProvider>
    <AppLayout />
  </RoleProvider>
);

export default MainLayout;