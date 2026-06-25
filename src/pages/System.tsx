import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Space, Input, Tabs } from 'antd';
import { PlusOutlined, SearchOutlined, SettingOutlined, UserOutlined, DatabaseOutlined, SafetyOutlined } from '@ant-design/icons';

// Mock data for system management
const users = [
  {
    key: '1',
    id: 'USER-001',
    username: 'admin',
    name: '系统管理员',
    role: '管理员',
    department: '质量部',
    status: '在线',
    lastLogin: '2024-01-15 09:30',
  },
  {
    key: '2',
    id: 'USER-002',
    username: 'zhangsan',
    name: '张工',
    role: '检测员',
    department: '生产部',
    status: '在线',
    lastLogin: '2024-01-15 09:25',
  },
  {
    key: '3',
    id: 'USER-003',
    username: 'lisi',
    name: '李工',
    role: '质量工程师',
    department: '质量部',
    status: '离线',
    lastLogin: '2024-01-14 18:30',
  },
  {
    key: '4',
    id: 'USER-004',
    username: 'wangwu',
    name: '王工',
    role: '研发工程师',
    department: '研发部',
    status: '在线',
    lastLogin: '2024-01-15 08:45',
  },
];

const systemLogs = [
  {
    key: '1',
    time: '2024-01-15 09:35',
    user: 'admin',
    action: '登录系统',
    module: '认证',
    ip: '192.168.1.100',
  },
  {
    key: '2',
    time: '2024-01-15 09:30',
    user: 'zhangsan',
    action: '创建检测任务',
    module: '检测中心',
    ip: '192.168.1.101',
  },
  {
    key: '3',
    time: '2024-01-15 09:25',
    user: 'lisi',
    action: '导出质量报告',
    module: '报告中心',
    ip: '192.168.1.102',
  },
  {
    key: '4',
    time: '2024-01-15 09:20',
    user: 'admin',
    action: '修改系统配置',
    module: '系统管理',
    ip: '192.168.1.100',
  },
];

const userColumns = [
  {
    title: '用户ID',
    dataIndex: 'id',
    key: 'id',
    width: 120,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    width: 120,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    width: 120,
    render: (role: string) => {
      let color = '';
      switch (role) {
        case '管理员':
          color = 'red';
          break;
        case '质量工程师':
          color = 'blue';
          break;
        case '检测员':
          color = 'green';
          break;
        case '研发工程师':
          color = 'purple';
          break;
        default:
          color = 'default';
      }
      return <Tag color={color}>{role}</Tag>;
    },
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: string) => {
      const color = status === '在线' ? 'green' : 'red';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: '最后登录',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
    width: 150,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: () => (
      <Space size="middle">
        <Button type="link">编辑</Button>
        <Button type="link" danger>
          禁用
        </Button>
      </Space>
    ),
  },
];

const logColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    width: 150,
  },
  {
    title: '用户',
    dataIndex: 'user',
    key: 'user',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 150,
  },
  {
    title: '模块',
    dataIndex: 'module',
    key: 'module',
    width: 120,
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    key: 'ip',
    width: 120,
  },
];

const System: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>系统管理</h2>
        <Space>
          <Button icon={<SettingOutlined />}>系统配置</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            添加用户
          </Button>
        </Space>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="用户总数" value={users.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="在线用户" value={users.filter(u => u.status === '在线').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="系统运行时间" value={99.9} suffix="%" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="数据库大小" value={2.5} suffix="GB" />
          </Card>
        </Col>
      </Row>

      {/* 系统信息 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="系统信息">
            <div style={{ padding: '16px 0' }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#666', marginBottom: 4 }}>系统版本</div>
                    <div style={{ fontWeight: 'bold' }}>v1.0.0</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#666', marginBottom: 4 }}>数据库状态</div>
                    <Tag color="green">正常</Tag>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#666', marginBottom: 4 }}>AI引擎状态</div>
                    <Tag color="green">运行中</Tag>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#666', marginBottom: 4 }}>最后备份</div>
                    <div>2024-01-15 02:00</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="快速操作">
            <div style={{ padding: '16px 0' }}>
              <Space wrap>
                <Button icon={<DatabaseOutlined />}>备份数据库</Button>
                <Button icon={<SafetyOutlined />}>安全扫描</Button>
                <Button icon={<SettingOutlined />}>清理缓存</Button>
                <Button icon={<UserOutlined />}>用户权限</Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 用户管理和系统日志 */}
      <Card>
        <Tabs
          defaultActiveKey="users"
          items={[
            {
              key: 'users',
              label: '用户管理',
              children: (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <Space>
                      <Input placeholder="搜索用户" prefix={<SearchOutlined />} style={{ width: 200 }} />
                      <Button>搜索</Button>
                      <Button>重置</Button>
                    </Space>
                  </div>
                  <Table columns={userColumns} dataSource={users} pagination={{ pageSize: 10 }} />
                </>
              ),
            },
            {
              key: 'logs',
              label: '系统日志',
              children: (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <Space>
                      <Input placeholder="搜索日志" prefix={<SearchOutlined />} style={{ width: 200 }} />
                      <Button>搜索</Button>
                      <Button>重置</Button>
                    </Space>
                  </div>
                  <Table columns={logColumns} dataSource={systemLogs} pagination={{ pageSize: 10 }} />
                </>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default System;