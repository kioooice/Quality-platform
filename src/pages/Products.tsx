import React from 'react';
import { Table, Card, Button, Space, Tag, Input, Row, Col, Statistic } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Mock data for products
const products = [
  {
    key: '1',
    id: 'P001',
    name: '汽车连接器A',
    category: '连接器',
    model: 'AC-100A',
    specification: '10A/250V',
    status: '生产中',
    qualityRate: 98.5,
    lastInspection: '2024-01-15',
    batchCount: 45,
  },
  {
    key: '2',
    id: 'P002',
    name: 'PCB连接器',
    category: '连接器',
    model: 'PCB-200B',
    specification: '5A/125V',
    status: '生产中',
    qualityRate: 99.2,
    lastInspection: '2024-01-14',
    batchCount: 32,
  },
  {
    key: '3',
    id: 'P003',
    name: '新能源端子',
    category: '端子',
    model: 'NE-300C',
    specification: '50A/600V',
    status: '研发中',
    qualityRate: 97.8,
    lastInspection: '2024-01-13',
    batchCount: 18,
  },
  {
    key: '4',
    id: 'P004',
    name: '高压线束',
    category: '线束',
    model: 'HV-400D',
    specification: '100A/1000V',
    status: '生产中',
    qualityRate: 98.9,
    lastInspection: '2024-01-12',
    batchCount: 67,
  },
  {
    key: '5',
    id: 'P005',
    name: '传感器接口',
    category: '接口',
    model: 'SI-500E',
    specification: '1A/5V',
    status: '已停产',
    qualityRate: 99.5,
    lastInspection: '2024-01-10',
    batchCount: 89,
  },
];

const columns = [
  {
    title: '产品编号',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: '产品类别',
    dataIndex: 'category',
    key: 'category',
    width: 100,
  },
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
    width: 120,
  },
  {
    title: '规格',
    dataIndex: 'specification',
    key: 'specification',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: string) => {
      let color = '';
      switch (status) {
        case '生产中':
          color = 'green';
          break;
        case '研发中':
          color = 'blue';
          break;
        case '已停产':
          color = 'red';
          break;
        default:
          color = 'default';
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: '合格率',
    dataIndex: 'qualityRate',
    key: 'qualityRate',
    width: 100,
    render: (rate: number) => `${rate}%`,
  },
  {
    title: '最后检测',
    dataIndex: 'lastInspection',
    key: 'lastInspection',
    width: 120,
  },
  {
    title: '批次数量',
    dataIndex: 'batchCount',
    key: 'batchCount',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: () => (
      <Space size="middle">
        <Button type="link" icon={<EditOutlined />}>
          编辑
        </Button>
        <Button type="link" danger icon={<DeleteOutlined />}>
          删除
        </Button>
      </Space>
    ),
  },
];

const Products: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>产品中心</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          新增产品
        </Button>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="产品总数" value={products.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="生产中" value={products.filter(p => p.status === '生产中').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="研发中" value={products.filter(p => p.status === '研发中').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="平均合格率" value={98.8} suffix="%" />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card style={{ marginBottom: 24 }}>
        <Space>
          <Input placeholder="搜索产品" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <Button>搜索</Button>
          <Button>重置</Button>
        </Space>
      </Card>

      {/* 产品列表 */}
      <Card>
        <Table columns={columns} dataSource={products} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default Products;