import React from 'react';
import { Table, Card, Button, Space, Tag, Input, Row, Col, Statistic, Timeline } from 'antd';
import { PlusOutlined, SearchOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

// Mock data for quality events
const qualityEvents = [
  {
    key: '1',
    id: 'QE-2024-001',
    title: '汽车连接器A外观缺陷',
    product: '汽车连接器A',
    batch: 'B2024-015',
    severity: '高',
    status: '处理中',
    type: '外观缺陷',
    reporter: '张工',
    reportTime: '2024-01-15 09:30',
    handler: '质量部',
    deadline: '2024-01-17',
  },
  {
    key: '2',
    id: 'QE-2024-002',
    title: 'PCB连接器尺寸超差',
    product: 'PCB连接器',
    batch: 'B2024-014',
    severity: '中',
    status: '已解决',
    type: '尺寸问题',
    reporter: '李工',
    reportTime: '2024-01-14 14:20',
    handler: '生产部',
    deadline: '2024-01-16',
  },
  {
    key: '3',
    id: 'QE-2024-003',
    title: '新能源端子接触不良',
    product: '新能源端子',
    batch: 'B2024-013',
    severity: '高',
    status: '待处理',
    type: '性能问题',
    reporter: '王工',
    reportTime: '2024-01-13 10:15',
    handler: '研发部',
    deadline: '2024-01-15',
  },
  {
    key: '4',
    id: 'QE-2024-004',
    title: '高压线束绝缘破损',
    product: '高压线束',
    batch: 'B2024-012',
    severity: '中',
    status: '处理中',
    type: '安全问题',
    reporter: '赵工',
    reportTime: '2024-01-12 11:15',
    handler: '质量部',
    deadline: '2024-01-14',
  },
];

const columns = [
  {
    title: '事件编号',
    dataIndex: 'id',
    key: 'id',
    width: 130,
  },
  {
    title: '事件标题',
    dataIndex: 'title',
    key: 'title',
    width: 200,
  },
  {
    title: '产品',
    dataIndex: 'product',
    key: 'product',
    width: 120,
  },
  {
    title: '批次',
    dataIndex: 'batch',
    key: 'batch',
    width: 120,
  },
  {
    title: '严重程度',
    dataIndex: 'severity',
    key: 'severity',
    width: 100,
    render: (severity: string) => {
      const color = severity === '高' ? 'red' : severity === '中' ? 'orange' : 'green';
      return <Tag color={color}>{severity}</Tag>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: string) => {
      let icon = null;
      let color = '';
      switch (status) {
        case '已解决':
          icon = <CheckCircleOutlined />;
          color = 'green';
          break;
        case '处理中':
          icon = <ExclamationCircleOutlined />;
          color = 'blue';
          break;
        case '待处理':
          icon = <ExclamationCircleOutlined />;
          color = 'orange';
          break;
        default:
          icon = null;
          color = 'default';
      }
      return (
        <Tag icon={icon} color={color}>
          {status}
        </Tag>
      );
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  },
  {
    title: '上报人',
    dataIndex: 'reporter',
    key: 'reporter',
    width: 100,
  },
  {
    title: '上报时间',
    dataIndex: 'reportTime',
    key: 'reportTime',
    width: 150,
  },
  {
    title: '处理部门',
    dataIndex: 'handler',
    key: 'handler',
    width: 100,
  },
  {
    title: '截止日期',
    dataIndex: 'deadline',
    key: 'deadline',
    width: 120,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: () => (
      <Space size="middle">
        <Button type="link">查看</Button>
        <Button type="link">处理</Button>
      </Space>
    ),
  },
];

const Events: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>质量事件</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          上报质量事件
        </Button>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总事件数" value={qualityEvents.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="待处理" value={qualityEvents.filter(e => e.status === '待处理').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="处理中" value={qualityEvents.filter(e => e.status === '处理中').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="已解决" value={qualityEvents.filter(e => e.status === '已解决').length} />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card style={{ marginBottom: 24 }}>
        <Space>
          <Input placeholder="搜索质量事件" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <Button>搜索</Button>
          <Button>重置</Button>
        </Space>
      </Card>

      {/* 最近事件时间线 */}
      <Card title="最近事件时间线" style={{ marginBottom: 24 }}>
        <Timeline
          items={[
            {
              color: 'red',
              children: '2024-01-15 - 汽车连接器A外观缺陷事件上报',
            },
            {
              color: 'green',
              children: '2024-01-14 - PCB连接器尺寸超差问题已解决',
            },
            {
              color: 'red',
              children: '2024-01-13 - 新能源端子接触不良事件上报',
            },
            {
              color: 'blue',
              children: '2024-01-12 - 高压线束绝缘破损事件处理中',
            },
          ]}
        />
      </Card>

      {/* 事件列表 */}
      <Card>
        <Table columns={columns} dataSource={qualityEvents} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default Events;