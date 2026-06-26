import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Avatar, Dropdown, Space, Select, Tag, Drawer, Button } from 'antd';
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
  MenuOutlined,
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
  executive: '#eb2f96',
  admin: '#1890ff',
  inspector: '#52c41a',
  quality_engineer: '#722ed1',
  process_engineer: '#fa8c16',
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole, setRole } = useRole();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    if (isMobile) setDrawerOpen(false);
  };

  const menuContent = (
    <Menu
      theme={isMobile ? 'light' : 'dark'}
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={onMenuClick}
      style={isMobile ? { border: 'none' } : undefined}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sider */}
      {!isMobile && (
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
          {menuContent}
        </Sider>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          title="AI质量管理系统"
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          width={260}
          styles={{ body: { padding: 0 } }}
        >
          {menuContent}
        </Drawer>
      )}

      <Layout>
        <Header
          style={{
            padding: isMobile ? '0 12px' : '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
            height: isMobile ? 48 : 64,
            lineHeight: isMobile ? '48px' : '64px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <Space size={8}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerOpen(true)}
                style={{ fontSize: 18, width: 36, height: 36 }}
              />
            )}
            <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 500, whiteSpace: 'nowrap' }}>
              {isMobile ? 'AI质量系统' : 'AI质量管理与异常追溯系统'}
            </div>
          </Space>

          <Space size={isMobile ? 8 : 16}>
            <Select
              value={currentRole.id}
              onChange={(val) => setRole(val as RoleId)}
              style={{ width: isMobile ? 100 : 150 }}
              size="small"
              options={roles.map((r) => ({
                value: r.id,
                label: r.name,
              }))}
            />
            {!isMobile && (
              <Tag color={roleColorMap[currentRole.id]} style={{ margin: 0 }}>
                {currentRole.name}
              </Tag>
            )}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  size={isMobile ? 24 : 28}
                  style={{ backgroundColor: roleColorMap[currentRole.id], fontSize: isMobile ? 11 : 13 }}
                >
                  {currentRole.avatar}
                </Avatar>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content
          className="app-content"
          style={{
            margin: isMobile ? 8 : 24,
            padding: isMobile ? 12 : 24,
            background: colorBgContainer,
            borderRadius: isMobile ? 8 : borderRadiusLG,
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