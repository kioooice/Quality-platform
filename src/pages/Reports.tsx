import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Space, Input, DatePicker } from 'antd';
import { PlusOutlined, SearchOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

// Mock data for reports
const reports = [
  {
    key: '1',
    id: 'RPT-2024-001',
    title: '2024年1月质量月报',
    type: '月报',
    period: '2024-01',
    status: '已发布',
    author: '质量部',
    createTime: '2024-01-31',
    publishTime: '2024-02-01',
    downloads: 456,
    pages: 28,
  },
  {
    key: '2',
    id: 'RPT-2024-002',
    title: '汽车连接器A质量分析报告',
    type: '专项报告',
    period: '2024-01-15',
    status: '已发布',
    author: '质量部',
    createTime: '2024-01-16',
    publishTime: '2024-01-16',
    downloads: 123,
    pages: 15,
  },
  {
    key: '3',
    id: 'RPT-2024-003',
    title: '2023年第四季度质量报告',
    type: '季报',
    period: '2023-Q4',
    status: '已发布',
    author: '质量部',
    createTime: '2024-01-05',
    publishTime: '2024-01-10',
    downloads: 789,
    pages: 42,
  },
  {
    key: '4',
    id: 'RPT-2024-004',
    title: '2024年1月第二周质量周报',
    type: '周报',
    period: '2024-W02',
    status: '草稿',
    author: '质量部',
    createTime: '2024-01-14',
    publishTime: '-',
    downloads: 0,
    pages: 12,
  },
];

const columns = [
  {
    title: '报告编号',
    dataIndex: 'id',
    key: 'id',
    width: 130,
  },
  {
    title: '报告标题',
    dataIndex: 'title',
    key: 'title',
    width: 250,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
    render: (type: string) => {
      let color = '';
      switch (type) {
        case '月报':
          color = 'blue';
          break;
        case '季报':
          color = 'purple';
          break;
        case '周报':
          color = 'cyan';
          break;
        case '专项报告':
          color = 'orange';
          break;
        default:
          color = 'default';
      }
      return <Tag color={color}>{type}</Tag>;
    },
  },
  {
    title: '报告周期',
    dataIndex: 'period',
    key: 'period',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: string) => {
      const color = status === '已发布' ? 'green' : 'orange';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 120,
  },
  {
    title: '发布时间',
    dataIndex: 'publishTime',
    key: 'publishTime',
    width: 120,
  },
  {
    title: '下载次数',
    dataIndex: 'downloads',
    key: 'downloads',
    width: 100,
  },
  {
    title: '页数',
    dataIndex: 'pages',
    key: 'pages',
    width: 80,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: () => (
      <Space size="middle">
        <Button type="link" icon={<EyeOutlined />}>
          查看
        </Button>
        <Button type="link" icon={<DownloadOutlined />}>
          下载
        </Button>
      </Space>
    ),
  },
];

const Reports: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>报告中心</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          生成新报告
        </Button>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="报告总数" value={reports.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="已发布" value={reports.filter(r => r.status === '已发布').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="本月新增" value={2} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总下载量" value={reports.reduce((sum, r) => sum + r.downloads, 0)} />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card style={{ marginBottom: 24 }}>
        <Space>
          <Input placeholder="搜索报告" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <RangePicker style={{ width: 250 }} />
          <Button>搜索</Button>
          <Button>重置</Button>
        </Space>
      </Card>

      {/* 报告列表 */}
      <Card>
        <Table columns={columns} dataSource={reports} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default Reports;