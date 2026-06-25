import React from 'react';
import { Table, Card, Button, Space, Tag, Input, Row, Col, Statistic, Progress } from 'antd';
import { PlusOutlined, SearchOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

// Mock data for inspection tasks
const inspectionTasks = [
  {
    key: '1',
    id: 'INS-2024-001',
    product: '汽车连接器A',
    batch: 'B2024-015',
    type: '外观检测',
    status: '进行中',
    progress: 75,
    startTime: '2024-01-15 09:30',
    inspector: '张工',
    aiResult: '合格',
  },
  {
    key: '2',
    id: 'INS-2024-002',
    product: 'PCB连接器',
    batch: 'B2024-014',
    type: '尺寸检测',
    status: '已完成',
    progress: 100,
    startTime: '2024-01-14 14:20',
    inspector: '李工',
    aiResult: '合格',
  },
  {
    key: '3',
    id: 'INS-2024-003',
    product: '新能源端子',
    batch: 'B2024-013',
    type: '性能测试',
    status: '待开始',
    progress: 0,
    startTime: '2024-01-16 10:00',
    inspector: '王工',
    aiResult: '待分析',
  },
  {
    key: '4',
    id: 'INS-2024-004',
    product: '高压线束',
    batch: 'B2024-012',
    type: '安全检测',
    status: '进行中',
    progress: 45,
    startTime: '2024-01-15 11:15',
    inspector: '赵工',
    aiResult: '待分析',
  },
];

const columns = [
  {
    title: '检测编号',
    dataIndex: 'id',
    key: 'id',
    width: 130,
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
    title: '检测类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: string) => {
      let color = '';
      let icon = null;
      switch (status) {
        case '进行中':
          color = 'blue';
          icon = <PlayCircleOutlined />;
          break;
        case '已完成':
          color = 'green';
          break;
        case '待开始':
          color = 'orange';
          icon = <PauseCircleOutlined />;
          break;
        default:
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
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
    width: 150,
    render: (progress: number) => (
      <Progress percent={progress} size="small" />
    ),
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 150,
  },
  {
    title: '检测员',
    dataIndex: 'inspector',
    key: 'inspector',
    width: 100,
  },
  {
    title: 'AI结果',
    dataIndex: 'aiResult',
    key: 'aiResult',
    width: 100,
    render: (result: string) => {
      const color = result === '合格' ? 'green' : result === '不合格' ? 'red' : 'orange';
      return <Tag color={color}>{result}</Tag>;
    },
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: () => (
      <Space size="middle">
        <Button type="link">查看</Button>
        <Button type="link">详情</Button>
      </Space>
    ),
  },
];

const Inspection: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>检测中心</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          新建检测任务
        </Button>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总检测任务" value={inspectionTasks.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="进行中" value={inspectionTasks.filter(t => t.status === '进行中').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="已完成" value={inspectionTasks.filter(t => t.status === '已完成').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="待开始" value={inspectionTasks.filter(t => t.status === '待开始').length} />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card style={{ marginBottom: 24 }}>
        <Space>
          <Input placeholder="搜索检测任务" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <Button>搜索</Button>
          <Button>重置</Button>
        </Space>
      </Card>

      {/* 检测任务列表 */}
      <Card>
        <Table columns={columns} dataSource={inspectionTasks} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default Inspection;