import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress } from 'antd';
import {
  ArrowUpOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

// Mock data
const dashboardData = {
  totalProducts: 156,
  qualifiedRate: 98.2,
  activeEvents: 12,
  aiInsights: 45,
};

const recentEvents = [
  {
    key: '1',
    id: 'QE-2024-001',
    product: '汽车连接器A',
    issue: '外观缺陷',
    severity: '高',
    status: '处理中',
    date: '2024-01-15',
  },
  {
    key: '2',
    id: 'QE-2024-002',
    product: 'PCB连接器',
    issue: '尺寸超差',
    severity: '中',
    status: '已解决',
    date: '2024-01-14',
  },
  {
    key: '3',
    id: 'QE-2024-003',
    product: '新能源端子',
    issue: '接触不良',
    severity: '高',
    status: '待处理',
    date: '2024-01-13',
  },
  {
    key: '4',
    id: 'QE-2024-004',
    product: '高压线束',
    issue: '绝缘破损',
    severity: '中',
    status: '处理中',
    date: '2024-01-12',
  },
];

const qualityTrend = [
  { month: '10月', rate: 97.8 },
  { month: '11月', rate: 98.1 },
  { month: '12月', rate: 98.5 },
  { month: '1月', rate: 98.2 },
];

const columns = [
  {
    title: '事件编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '产品',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: '问题描述',
    dataIndex: 'issue',
    key: 'issue',
  },
  {
    title: '严重程度',
    dataIndex: 'severity',
    key: 'severity',
    render: (severity: string) => {
      const color = severity === '高' ? 'red' : severity === '中' ? 'orange' : 'green';
      return <Tag color={color}>{severity}</Tag>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
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
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>质量驾驶舱</h2>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="产品总数"
              value={dashboardData.totalProducts}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="合格率"
              value={dashboardData.qualifiedRate}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃事件"
              value={dashboardData.activeEvents}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="AI洞察"
              value={dashboardData.aiInsights}
              valueStyle={{ color: '#722ed1' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 质量趋势和最近事件 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="质量趋势">
            <div style={{ padding: '20px 0' }}>
              {qualityTrend.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <span>{item.month}</span>
                  <Progress
                    percent={item.rate}
                    size="small"
                    style={{ width: '60%' }}
                    status={item.rate >= 98 ? 'success' : 'normal'}
                  />
                  <span>{item.rate}%</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="最近质量事件">
            <Table
              columns={columns}
              dataSource={recentEvents}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* 系统状态 */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="系统状态">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>
                    正常运行
                  </div>
                  <div style={{ color: '#666', marginTop: 8 }}>AI分析引擎</div>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>
                    99.9%
                  </div>
                  <div style={{ color: '#666', marginTop: 8 }}>系统可用性</div>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                    1,234
                  </div>
                  <div style={{ color: '#666', marginTop: 8 }}>今日检测次数</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;