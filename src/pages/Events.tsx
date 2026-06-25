import React from 'react';
import { Table, Card, Tag, Input, Row, Col, Statistic, Timeline, Alert } from 'antd';
import { SearchOutlined, AlertOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const qualityEvents = [
  { key: '1', id: 'QE-2026-001', product: '汽车连接器A', batch: 'B-20260625-01', abnormal: '针孔', severity: '高', status: '处理中', aiStatus: '已分析', dept: '质量部', time: '2026-06-25 09:20' },
  { key: '2', id: 'QE-2026-002', product: '新能源端子B', batch: 'B-20260625-02', abnormal: '漏镀', severity: '高', status: '待工程师确认', aiStatus: '已分析', dept: '生产部', time: '2026-06-25 08:45' },
  { key: '3', id: 'QE-2026-003', product: 'PCB连接器C', batch: 'B-20260624-01', abnormal: '麻点', severity: '中', status: '已形成案例', aiStatus: '已完成', dept: '质量部', time: '2026-06-24 14:30' },
  { key: '4', id: 'QE-2026-004', product: '手机中框D', batch: 'B-20260624-02', abnormal: '色差', severity: '中', status: '处理中', aiStatus: '待分析', dept: '质量部', time: '2026-06-24 11:00' },
  { key: '5', id: 'QE-2026-005', product: '散热片E', batch: 'B-20260623-01', abnormal: '镀层厚度异常', severity: '高', status: '待AI分析', aiStatus: '待分析', dept: '生产部', time: '2026-06-23 16:00' },
];

const columns = [
  { title: '事件编号', dataIndex: 'id', key: 'id', width: 130 },
  { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
  { title: '批次', dataIndex: 'batch', key: 'batch', width: 140 },
  { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 120 },
  { title: '严重程度', dataIndex: 'severity', key: 'severity', width: 90, render: (s: string) => <Tag color={s === '高' ? 'red' : 'orange'}>{s}</Tag> },
  { title: '当前状态', dataIndex: 'status', key: 'status', width: 130, render: (s: string) => {
    const map: Record<string, { color: string; icon: React.ReactNode }> = {
      '待AI分析': { color: 'orange', icon: <ClockCircleOutlined /> },
      '待工程师确认': { color: 'blue', icon: <ExclamationCircleOutlined /> },
      '处理中': { color: 'cyan', icon: <ExclamationCircleOutlined /> },
      '已形成案例': { color: 'green', icon: <CheckCircleOutlined /> },
      '已关闭': { color: 'default', icon: <CheckCircleOutlined /> },
    };
    const { color, icon } = map[s] || { color: 'default', icon: null };
    return <Tag icon={icon} color={color}>{s}</Tag>;
  }},
  { title: 'AI分析状态', dataIndex: 'aiStatus', key: 'aiStatus', width: 100, render: (s: string) => <Tag color={s === '已完成' ? 'green' : s === '已分析' ? 'blue' : 'orange'}>{s}</Tag> },
  { title: '责任部门', dataIndex: 'dept', key: 'dept', width: 90 },
  { title: '上报时间', dataIndex: 'time', key: 'time', width: 140 },
  { title: '下一步', key: 'action', width: 100, render: () => <a>查看详情</a> },
];

const Events: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>质量事件</h2>
      </div>

      <Alert
        message="本模块价值"
        description="统一管理电镀质量异常事件的发现、分析、处理和归档全流程，节省事件跟踪时间，降低问题无人跟进风险。"
        type="info"
        showIcon
        icon={<AlertOutlined />}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="本月质量事件" value={5} suffix="件" valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="待工程师确认" value={1} suffix="件" valueStyle={{ color: '#d46b08' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="处理中" value={2} suffix="件" valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="已形成案例" value={1} suffix="件" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="QE-2026-001 事件处理时间线" style={{ height: '100%' }}>
            <Timeline
              items={[
                { color: 'red', children: '09:20 检测发现汽车连接器A 针孔' },
                { color: 'blue', children: '09:22 AI关联历史案例 CASE-2026-018' },
                { color: 'blue', children: '09:25 生成原因建议：前处理不充分' },
                { color: 'orange', children: '09:30 工程师确认中' },
                { color: 'gray', children: '待形成案例记录' },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="QE-2026-002 事件处理时间线" style={{ height: '100%' }}>
            <Timeline
              items={[
                { color: 'red', children: '08:45 检测发现新能源端子B 漏镀' },
                { color: 'blue', children: '08:48 AI检索历史案例，命中2条' },
                { color: 'blue', children: '08:52 生成原因建议：前处理工序异常' },
                { color: 'orange', children: '09:00 待工程师确认' },
                { color: 'gray', children: '待处理并形成案例' },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Input placeholder="搜索事件编号、产品或异常类型" prefix={<SearchOutlined />} style={{ width: 350 }} />
      </Card>

      <Card title="质量事件列表">
        <Table columns={columns} dataSource={qualityEvents} pagination={false} scroll={{ x: 1200 }} />
      </Card>
    </div>
  );
};

export default Events;