import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress, Alert } from 'antd';
import {
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  WarningOutlined,
  RobotOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const pendingEvents = [
  { key: '1', id: 'QE-2026-001', product: '汽车连接器A', batch: 'B-20260625-01', abnormal: '针孔', severity: '高', status: '待工程师确认', dept: '质量部 / 生产部', updated: '2026-06-25 09:25' },
  { key: '2', id: 'QE-2026-002', product: '新能源端子B', batch: 'B-20260625-02', abnormal: '漏镀', severity: '高', status: '待工程师确认', dept: '生产部', updated: '2026-06-25 08:50' },
  { key: '3', id: 'QE-2026-004', product: '手机中框D', batch: 'B-20260624-02', abnormal: '色差', severity: '中', status: '处理中', dept: '质量部', updated: '2026-06-24 14:00' },
  { key: '4', id: 'QE-2026-005', product: '散热片E', batch: 'B-20260623-01', abnormal: '镀层厚度异常', severity: '高', status: '待AI分析', dept: '生产部', updated: '2026-06-23 16:30' },
];

const aiPendingTasks = [
  { key: '1', id: 'AI-2026-001', event: 'QE-2026-001', product: '汽车连接器A', abnormal: '针孔', reason: '前处理不充分，局部残留导致针孔风险升高', similarCases: 3, status: '待工程师确认' },
  { key: '2', id: 'AI-2026-002', event: 'QE-2026-002', product: '新能源端子B', abnormal: '漏镀', reason: '脱脂工序异常，局部油污残留', similarCases: 2, status: '待工程师确认' },
];

const highRiskProducts = [
  { name: '汽车连接器A', abnormals: '针孔、镀层厚度异常', processes: '前处理、镀镍、水洗', level: '高' },
  { name: '新能源端子B', abnormals: '漏镀、色差', processes: '酸洗、镀铜、钝化', level: '中' },
  { name: 'PCB连接器C', abnormals: '麻点、划伤', processes: '清洗、镀镍、烘干', level: '中' },
];

const pendingReview = [
  { type: '报告', id: 'RPT-2026-006', name: '汽车连接器A针孔异常追溯报告', event: 'QE-2026-001', status: '待确认', updated: '2026-06-25 09:45' },
  { type: '案例', id: 'CASE-2026-018', name: '汽车连接器A针孔异常处理经验', event: 'QE-2026-001', status: '待归档', updated: '2026-06-25 09:40' },
];

const trendData = [
  { label: '质量事件数量', thisMonth: 12, lastMonth: 15, unit: '件', lower: true },
  { label: '重复异常次数', thisMonth: 18, lastMonth: 24, unit: '次', lower: true },
  { label: '平均排查时间', thisMonth: 4.2, lastMonth: 6.8, unit: '小时', lower: true },
  { label: '报告生成数量', thisMonth: 18, lastMonth: 14, unit: '份', lower: false },
];

const riskAlerts = [
  { id: 1, text: '针孔异常本周重复发生 12 次，建议建立标准处理方案', level: 'high' as const },
  { id: 2, text: '新能源端子B 漏镀问题连续出现，建议复查前处理工序', level: 'high' as const },
  { id: 3, text: '手机中框D 色差问题与镀液参数波动有关，建议关注批次数据', level: 'medium' as const },
];

const eventColumns = [
  { title: '事件编号', dataIndex: 'id', key: 'id', width: 130 },
  { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
  { title: '批次', dataIndex: 'batch', key: 'batch', width: 140 },
  { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 110 },
  { title: '严重程度', dataIndex: 'severity', key: 'severity', width: 90, render: (s: string) => <Tag color={s === '高' ? 'red' : 'orange'}>{s}</Tag> },
  { title: '当前状态', dataIndex: 'status', key: 'status', width: 130, render: (s: string) => {
    const map: Record<string, { color: string; icon: React.ReactNode }> = {
      '待工程师确认': { color: 'orange', icon: <ExclamationCircleOutlined /> },
      '处理中': { color: 'blue', icon: <ClockCircleOutlined /> },
      '待AI分析': { color: 'default', icon: <ClockCircleOutlined /> },
    };
    const { color, icon } = map[s] || { color: 'default', icon: null };
    return <Tag icon={icon} color={color}>{s}</Tag>;
  }},
  { title: '责任部门', dataIndex: 'dept', key: 'dept', width: 130 },
  { title: '更新时间', dataIndex: 'updated', key: 'updated', width: 140 },
  { title: '操作', key: 'action', width: 150, render: (_: unknown, record: { id: string }) => (
    <span>
      <a style={{ marginRight: 12 }}>查看事件</a>
      {record.id === 'QE-2026-001' && <a>查看AI分析</a>}
    </span>
  )},
];

const aiColumns = [
  { title: '分析任务', dataIndex: 'id', key: 'id', width: 120 },
  { title: '关联事件', dataIndex: 'event', key: 'event', width: 120, render: (v: string) => <a>{v}</a> },
  { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
  { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 100, render: (v: string) => <Tag color="red">{v}</Tag> },
  { title: 'AI建议原因', dataIndex: 'reason', key: 'reason', width: 280 },
  { title: '相似案例', dataIndex: 'similarCases', key: 'similarCases', width: 90, render: (v: number) => `${v}条` },
  { title: '状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => <Tag color="orange">{v}</Tag> },
];

const reviewColumns = [
  { title: '类型', dataIndex: 'type', key: 'type', width: 60, render: (v: string) => <Tag color={v === '报告' ? 'blue' : 'green'}>{v}</Tag> },
  { title: '编号', dataIndex: 'id', key: 'id', width: 130, render: (v: string) => <a>{v}</a> },
  { title: '名称', dataIndex: 'name', key: 'name', width: 250 },
  { title: '关联事件', dataIndex: 'event', key: 'event', width: 120, render: (v: string) => <a>{v}</a> },
  { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (v: string) => <Tag color="orange">{v}</Tag> },
  { title: '更新时间', dataIndex: 'updated', key: 'updated', width: 140 },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>电镀质量运营中心</h2>
        <span style={{ color: '#aaa', fontSize: 12 }}>面向电镀产品检测、质量事件、异常分析与追溯报告的统一工作台</span>
        <div style={{ color: '#ccc', fontSize: 11, marginTop: 2 }}>数据更新于 2026-06-25 09:00，均为模拟业务数据</div>
      </div>

      {/* 运行效率指标 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="重复分析减少" value={36} suffix="次" valueStyle={{ fontSize: 20 }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="平均排查时间" value={4.2} suffix="小时" valueStyle={{ fontSize: 20 }} prefix={<ThunderboltOutlined />} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="自动生成报告" value={18} suffix="份" valueStyle={{ fontSize: 20 }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="新增经验案例" value={12} suffix="条" valueStyle={{ fontSize: 20 }} /></Card>
        </Col>
      </Row>

      {/* 今日待处理质量事件 */}
      <Card title="今日待处理质量事件" style={{ marginBottom: 24 }} bodyStyle={{ padding: '12px 16px' }}>
        <Table columns={eventColumns} dataSource={pendingEvents} pagination={false} size="small" scroll={{ x: 1100 }} />
      </Card>

      {/* AI待确认分析任务 */}
      <Card title={<><RobotOutlined style={{ marginRight: 8 }} />AI 待确认分析任务</>} style={{ marginBottom: 24 }} bodyStyle={{ padding: '12px 16px' }}>
        <Table columns={aiColumns} dataSource={aiPendingTasks} pagination={false} size="small" scroll={{ x: 1000 }} />
      </Card>

      {/* 高风险产品与工艺 + 本月质量运行趋势 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={<><WarningOutlined style={{ color: '#d46b08', marginRight: 8 }} />高风险产品与工艺</>} size="small">
            {highRiskProducts.map((p, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < highRiskProducts.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontWeight: 500 }}>{p.name}</span>
                  <Tag color={p.level === '高' ? 'red' : 'orange'}>风险 {p.level}</Tag>
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>高频异常：{p.abnormals}</div>
                <div style={{ fontSize: 12, color: '#999' }}>关联工艺：{p.processes}</div>
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="本月质量运行趋势" size="small">
            <div style={{ padding: '4px 0' }}>
              {trendData.map((item, i) => {
                const improved = item.lower ? item.thisMonth < item.lastMonth : item.thisMonth > item.lastMonth;
                return (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: '#333', fontSize: 13 }}>{item.label}</span>
                      <span style={{ color: improved ? '#3f8600' : '#cf1322', fontSize: 13 }}>{item.thisMonth} {item.unit}{improved ? ' ↓' : ' ↑'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Progress percent={Math.min((item.thisMonth / Math.max(item.thisMonth, item.lastMonth)) * 100, 100)} showInfo={false} strokeColor={improved ? '#52c41a' : '#ff4d4f'} size="small" style={{ flex: 1 }} />
                      <span style={{ color: '#999', fontSize: 11, minWidth: 60, textAlign: 'right' }}>上月 {item.lastMonth}{item.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 报告与案例待审核 */}
      <Card title={<><FileTextOutlined style={{ marginRight: 8 }} />报告与案例待审核</>} style={{ marginBottom: 24 }} bodyStyle={{ padding: '12px 16px' }}>
        <Table columns={reviewColumns} dataSource={pendingReview} pagination={false} size="small" />
      </Card>

      {/* 质量风险提醒 */}
      <Card title={<><WarningOutlined style={{ color: '#d46b08', marginRight: 8 }} />质量风险提醒</>} style={{ marginBottom: 24 }} bodyStyle={{ padding: '12px 16px' }}>
        {riskAlerts.map((alert) => (
          <Alert key={alert.id} message={alert.text} type={alert.level === 'high' ? 'error' : 'warning'} showIcon style={{ marginBottom: 8 }} />
        ))}
      </Card>

      {/* AI辅助工作状态 */}
      <Card title={<><RobotOutlined style={{ marginRight: 8 }} />AI 辅助工作状态</>} size="small">
        <Row gutter={[24, 12]}>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center', padding: '8px 0' }}><div style={{ fontSize: 24, fontWeight: 600, color: '#d46b08' }}>3</div><div style={{ color: '#666', fontSize: 12 }}>待分析事件</div></div></Col>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center', padding: '8px 0' }}><div style={{ fontSize: 24, fontWeight: 600, color: '#3f8600' }}>18</div><div style={{ color: '#666', fontSize: 12 }}>已完成AI分析</div></div></Col>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center', padding: '8px 0' }}><div style={{ fontSize: 24, fontWeight: 600, color: '#1890ff' }}>5</div><div style={{ color: '#666', fontSize: 12 }}>待工程师确认</div></div></Col>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center', padding: '8px 0' }}><div style={{ fontSize: 24, fontWeight: 600, color: '#722ed1' }}>7</div><div style={{ color: '#666', fontSize: 12 }}>已形成案例</div></div></Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;