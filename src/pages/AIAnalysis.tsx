import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Progress, Button, Space } from 'antd';
import { RobotOutlined, CheckCircleOutlined, ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';

// Mock data for AI analysis
const aiModels = [
  {
    key: '1',
    id: 'MODEL-001',
    name: '外观缺陷检测模型',
    type: '图像识别',
    version: 'v2.1.0',
    accuracy: 98.5,
    status: '运行中',
    lastTrained: '2024-01-10',
    predictions: 1234,
  },
  {
    key: '2',
    id: 'MODEL-002',
    name: '尺寸预测模型',
    type: '回归分析',
    version: 'v1.5.2',
    accuracy: 97.8,
    status: '运行中',
    lastTrained: '2024-01-08',
    predictions: 856,
  },
  {
    key: '3',
    id: 'MODEL-003',
    name: '质量趋势预测模型',
    type: '时间序列',
    version: 'v1.2.1',
    accuracy: 95.2,
    status: '训练中',
    lastTrained: '2024-01-12',
    predictions: 432,
  },
  {
    key: '4',
    id: 'MODEL-004',
    name: '异常检测模型',
    type: '异常检测',
    version: 'v1.0.0',
    accuracy: 96.7,
    status: '维护中',
    lastTrained: '2024-01-05',
    predictions: 678,
  },
];

const recentAnalyses = [
  {
    key: '1',
    id: 'ANA-2024-001',
    product: '汽车连接器A',
    model: '外观缺陷检测模型',
    result: '合格',
    confidence: 99.2,
    time: '2024-01-15 09:35',
    issues: 0,
  },
  {
    key: '2',
    id: 'ANA-2024-002',
    product: 'PCB连接器',
    model: '尺寸预测模型',
    result: '合格',
    confidence: 98.7,
    time: '2024-01-15 09:30',
    issues: 0,
  },
  {
    key: '3',
    id: 'ANA-2024-003',
    product: '新能源端子',
    model: '异常检测模型',
    result: '异常',
    confidence: 87.5,
    time: '2024-01-15 09:25',
    issues: 2,
  },
];

const modelColumns = [
  {
    title: '模型ID',
    dataIndex: 'id',
    key: 'id',
    width: 120,
  },
  {
    title: '模型名称',
    dataIndex: 'name',
    key: 'name',
    width: 180,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  },
  {
    title: '版本',
    dataIndex: 'version',
    key: 'version',
    width: 100,
  },
  {
    title: '准确率',
    dataIndex: 'accuracy',
    key: 'accuracy',
    width: 150,
    render: (accuracy: number) => (
      <Progress percent={accuracy} size="small" />
    ),
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
        case '运行中':
          color = 'green';
          icon = <CheckCircleOutlined />;
          break;
        case '训练中':
          color = 'blue';
          break;
        case '维护中':
          color = 'orange';
          icon = <ExclamationCircleOutlined />;
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
    title: '最后训练',
    dataIndex: 'lastTrained',
    key: 'lastTrained',
    width: 120,
  },
  {
    title: '预测次数',
    dataIndex: 'predictions',
    key: 'predictions',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: () => (
      <Space size="middle">
        <Button type="link">详情</Button>
        <Button type="link">重新训练</Button>
      </Space>
    ),
  },
];

const analysisColumns = [
  {
    title: '分析ID',
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
    title: '使用模型',
    dataIndex: 'model',
    key: 'model',
    width: 180,
  },
  {
    title: '结果',
    dataIndex: 'result',
    key: 'result',
    width: 100,
    render: (result: string) => {
      const color = result === '合格' ? 'green' : 'red';
      return <Tag color={color}>{result}</Tag>;
    },
  },
  {
    title: '置信度',
    dataIndex: 'confidence',
    key: 'confidence',
    width: 120,
    render: (confidence: number) => `${confidence}%`,
  },
  {
    title: '分析时间',
    dataIndex: 'time',
    key: 'time',
    width: 150,
  },
  {
    title: '问题数量',
    dataIndex: 'issues',
    key: 'issues',
    width: 100,
    render: (issues: number) => (
      <Tag color={issues > 0 ? 'red' : 'green'}>{issues}</Tag>
    ),
  },
];

const AIAnalysis: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>AI分析</h2>
        <Space>
          <Button icon={<ReloadOutlined />}>刷新模型状态</Button>
          <Button type="primary" icon={<RobotOutlined />}>
            新建分析任务
          </Button>
        </Space>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="AI模型总数" value={aiModels.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="运行中模型" value={aiModels.filter(m => m.status === '运行中').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="今日分析次数" value={recentAnalyses.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="平均置信度" value={95.1} suffix="%" />
          </Card>
        </Col>
      </Row>

      {/* AI模型列表 */}
      <Card title="AI模型管理" style={{ marginBottom: 24 }}>
        <Table columns={modelColumns} dataSource={aiModels} pagination={false} />
      </Card>

      {/* 最近分析结果 */}
      <Card title="最近分析结果">
        <Table columns={analysisColumns} dataSource={recentAnalyses} pagination={false} />
      </Card>
    </div>
  );
};

export default AIAnalysis;