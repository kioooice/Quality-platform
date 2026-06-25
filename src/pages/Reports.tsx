import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Input, Alert } from 'antd';
import { SearchOutlined, FileTextOutlined, DownloadOutlined, EyeOutlined, ThunderboltOutlined } from '@ant-design/icons';

const reports = [
  { key: '1', id: 'RPT-2026-018', title: 'QE-2026-001 汽车连接器A 针孔异常追溯报告', event: 'QE-2026-001', product: '汽车连接器A', type: '异常追溯报告', method: 'AI生成初稿', status: '已发布', time: '2026-06-25' },
  { key: '2', id: 'RPT-2026-017', title: 'QE-2026-002 新能源端子B 漏镀 AI辅助分析报告', event: 'QE-2026-002', product: '新能源端子B', type: 'AI辅助分析报告', method: 'AI生成初稿', status: '待确认', time: '2026-06-25' },
  { key: '3', id: 'RPT-2026-015', title: '汽车连接器A 产品质量履历', event: '-', product: '汽车连接器A', type: '产品质量履历', method: '系统自动汇总', status: '已发布', time: '2026-06-24' },
  { key: '4', id: 'RPT-2026-012', title: '2026年6月月度质量分析报告', event: '-', product: '-', type: '月度质量分析报告', method: '工程师整理', status: '已发布', time: '2026-06-23' },
  { key: '5', id: 'RPT-2026-010', title: '客户质量说明 - PCB连接器C 麻点问题', event: 'QE-2026-003', product: 'PCB连接器C', type: '客户质量说明', method: '工程师整理', status: '待确认', time: '2026-06-22' },
];

const columns = [
  { title: '报告编号', dataIndex: 'id', key: 'id', width: 130 },
  { title: '报告名称', dataIndex: 'title', key: 'title', width: 300 },
  { title: '关联事件', dataIndex: 'event', key: 'event', width: 120, render: (v: string) => v === '-' ? <span style={{ color: '#ccc' }}>-</span> : <a>{v}</a> },
  { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
  { title: '报告类型', dataIndex: 'type', key: 'type', width: 140, render: (v: string) => {
    const map: Record<string, string> = { '异常追溯报告': 'red', 'AI辅助分析报告': 'blue', '产品质量履历': 'green', '月度质量分析报告': 'purple', '客户质量说明': 'orange' };
    return <Tag color={map[v] || 'default'}>{v}</Tag>;
  }},
  { title: '生成方式', dataIndex: 'method', key: 'method', width: 120, render: (v: string) => <Tag color={v === 'AI生成初稿' ? 'blue' : v === '系统自动汇总' ? 'green' : 'default'}>{v}</Tag> },
  { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (v: string) => <Tag color={v === '已发布' ? 'green' : 'orange'}>{v}</Tag> },
  { title: '生成时间', dataIndex: 'time', key: 'time', width: 100 },
  { title: '操作', key: 'action', width: 120, render: () => (
    <span>
      <a style={{ marginRight: 12 }}><EyeOutlined /> 查看</a>
      <a><DownloadOutlined /> 下载</a>
    </span>
  )},
];

const Reports: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>报告中心</h2>
      </div>

      <Alert
        message="本模块价值"
        description="统一管理异常追溯报告、AI分析报告和产品质量履历，节省报告整理时间，降低追溯资料缺失风险。"
        type="info"
        showIcon
        icon={<FileTextOutlined />}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="本月自动生成报告" value={18} suffix="份" valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="节省整理时间" value={32} suffix="小时" valueStyle={{ color: '#3f8600' }} prefix={<ThunderboltOutlined />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="已关联质量事件" value={27} suffix="个" /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="待确认报告" value={4} suffix="份" valueStyle={{ color: '#d46b08' }} /></Card></Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Input placeholder="搜索报告名称或编号" prefix={<SearchOutlined />} style={{ width: 300 }} />
      </Card>

      <Card title="报告列表">
        <Table columns={columns} dataSource={reports} pagination={false} scroll={{ x: 1300 }} />
      </Card>
    </div>
  );
};

export default Reports;