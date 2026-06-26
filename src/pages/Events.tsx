import React from 'react';
import { Table, Card, Tag, Row, Col, Statistic, Timeline, Space } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, RobotOutlined, WarningOutlined } from '@ant-design/icons';
import { useRole } from '../context/RoleContext';

const qualityEvents = [
  { key: '1', id: 'QE-2026-001', product: '汽车连接器A', batch: 'B-20260625-01', abnormal: '针孔', severity: '高', status: '待工程师确认', aiStatus: '已生成建议', dept: '质量部 / 生产部', time: '2026-06-25 09:20', source: 'INS-2026-001' },
  { key: '2', id: 'QE-2026-002', product: '新能源端子B', batch: 'B-20260625-02', abnormal: '漏镀', severity: '高', status: '待工程师确认', aiStatus: '已分析', dept: '生产部', time: '2026-06-25 08:45', source: 'INS-2026-002' },
  { key: '3', id: 'QE-2026-003', product: 'PCB连接器C', batch: 'B-20260624-01', abnormal: '麻点', severity: '中', status: '已形成案例', aiStatus: '已完成', dept: '质量部', time: '2026-06-24 14:30', source: 'INS-2026-003' },
  { key: '4', id: 'QE-2026-004', product: '手机中框D', batch: 'B-20260624-02', abnormal: '色差', severity: '中', status: '处理中', aiStatus: '待分析', dept: '质量部', time: '2026-06-24 11:00', source: 'INS-2026-004' },
  { key: '5', id: 'QE-2026-005', product: '散热片E', batch: 'B-20260623-01', abnormal: '镀层厚度异常', severity: '高', status: '待AI分析', aiStatus: '待分析', dept: '生产部', time: '2026-06-23 16:00', source: 'INS-2026-005' },
];

const statusTag = (s: string) => {
  const map: Record<string, { color: string; icon: React.ReactNode }> = {
    '待AI分析': { color: 'orange', icon: <ClockCircleOutlined /> },
    '待工程师确认': { color: 'blue', icon: <ExclamationCircleOutlined /> },
    '处理中': { color: 'cyan', icon: <ExclamationCircleOutlined /> },
    '已形成案例': { color: 'green', icon: <CheckCircleOutlined /> },
    '已关闭': { color: 'default', icon: <CheckCircleOutlined /> },
  };
  const { color, icon } = map[s] || { color: 'default', icon: null };
  return <Tag icon={icon} color={color}>{s}</Tag>;
};

// ========== 经营决策层 ==========
const ExecutiveView: React.FC = () => (
  <>
    {qualityEvents.filter(e => e.severity === '高').map(e => (
      <Card key={e.id} style={{ marginBottom: 16, borderLeft: '3px solid #cf1322' }}>
        <Row gutter={[16, 8]} align="middle">
          <Col xs={24} sm={6}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{e.id}</div>
            <div style={{ color: '#666' }}>{e.product} {e.abnormal}</div>
          </Col>
          <Col xs={12} sm={4}>{statusTag(e.status)}</Col>
          <Col xs={12} sm={14}>
            <div style={{ fontSize: 13, color: '#666' }}>
              {e.id === 'QE-2026-001' ? '同类异常本周重复发生 12 次，可能影响同批次外观合格率' : '可能影响同批次产品交付'}
            </div>
            <div style={{ fontSize: 12, color: '#1890ff', marginTop: 4 }}>
              下一步：{e.id === 'QE-2026-001' ? '确认根因并沉淀标准处理案例' : '复查前处理工序'}
            </div>
          </Col>
        </Row>
      </Card>
    ))}
  </>
);

// ========== 质量负责人 ==========
const AdminView: React.FC = () => {
  const cols = [
    { title: '事件编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 110 },
    { title: '严重程度', dataIndex: 'severity', key: 'severity', width: 90, render: (s: string) => <Tag color={s === '高' ? 'red' : 'orange'}>{s}</Tag> },
    { title: '当前状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => statusTag(v) },
    { title: 'AI分析', dataIndex: 'aiStatus', key: 'aiStatus', width: 100, render: (s: string) => <Tag color={s === '已完成' ? 'green' : s.includes('已') ? 'blue' : 'orange'}>{s}</Tag> },
    { title: '责任部门', dataIndex: 'dept', key: 'dept', width: 120 },
    { title: '操作', key: 'action', width: 200, render: (_: unknown, r: { id: string }) => <Space><a>查看AI分析</a><a>跟进处理</a>{r.id === 'QE-2026-001' && <a>查看报告</a>}</Space> },
  ];
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="本月质量事件" value={5} suffix="件" valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="待工程师确认" value={1} suffix="件" valueStyle={{ color: '#d46b08' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="处理中" value={2} suffix="件" valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="已形成案例" value={1} suffix="件" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      </Row>
      <Card title="QE-2026-001 事件处理时间线" style={{ marginBottom: 24 }}>
        <Timeline items={[
          { color: 'red', children: '09:20 检测中心 INS-2026-001 发现针孔异常（置信度 96.8%）' },
          { color: 'blue', children: '09:22 系统生成质量事件 QE-2026-001' },
          { color: 'blue', children: '09:25 AI关联历史案例，生成原因建议' },
          { color: 'orange', children: '09:30 工程师待确认' },
          { color: 'green', children: '09:40 待沉淀案例' },
          { color: 'green', children: '09:45 待生成追溯报告' },
        ]} />
      </Card>
      <Card title="质量事件列表"><Table columns={cols} dataSource={qualityEvents} pagination={false} scroll={{ x: 1100 }} size="small" /></Card>
    </>
  );
};

// ========== 质检员 ==========
const InspectorView: React.FC = () => (
  <>
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="我提交的事件" value={2} suffix="件" /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="已接收" value={1} suffix="件" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="待确认" value={1} suffix="件" valueStyle={{ color: '#d46b08' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="需补充检测" value={0} suffix="件" /></Card></Col>
    </Row>
    {qualityEvents.filter(e => e.source === 'INS-2026-001' || e.source === 'INS-2026-002').map(e => (
      <Card key={e.id} style={{ marginBottom: 16, borderLeft: '3px solid #1890ff' }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{e.id} {e.product} <Tag color="red">{e.abnormal}</Tag></div>
        <Row gutter={[16, 8]}>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>来源检测</div><div>{e.source}</div></Col>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>状态</div>{statusTag(e.status)}</Col>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>需补充检测</div><div>否</div></Col>
          <Col xs={12} sm={6}><Space><a>查看处理状态</a><a>补充记录</a></Space></Col>
        </Row>
      </Card>
    ))}
  </>
);

// ========== 质量工程师 ==========
const QualityEngineerView: React.FC = () => {
  const cols = [
    { title: '事件编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 100, render: (v: string) => <Tag color="red">{v}</Tag> },
    { title: '严重程度', dataIndex: 'severity', key: 'severity', width: 90, render: (s: string) => <Tag color={s === '高' ? 'red' : 'orange'}>{s}</Tag> },
    { title: 'AI建议原因', dataIndex: 'aiStatus', key: 'aiStatus', width: 120, render: (s: string) => <Tag color={s.includes('已') ? 'blue' : 'orange'}>{s}</Tag> },
    { title: '当前状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => statusTag(v) },
    { title: '操作', key: 'action', width: 200, render: (_: unknown, r: { id: string }) => <Space><a>查看AI分析</a><a>确认根因</a>{r.id === 'QE-2026-001' && <a>加入案例库</a>}</Space> },
  ];
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="待确认AI分析" value={5} suffix="项" valueStyle={{ color: '#d46b08' }} prefix={<RobotOutlined />} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="待判断根因" value={3} suffix="项" valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="待制定处置方案" value={4} suffix="项" valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="待归档案例" value={2} suffix="项" valueStyle={{ color: '#722ed1' }} /></Card></Col>
      </Row>
      <Card title="我的异常处理任务"><Table columns={cols} dataSource={qualityEvents} pagination={false} scroll={{ x: 1000 }} size="small" /></Card>
    </>
  );
};

// ========== 工艺工程师 ==========
const ProcessEngineerView: React.FC = () => (
  <>
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="工艺相关事件" value={4} suffix="件" valueStyle={{ color: '#cf1322' }} prefix={<WarningOutlined />} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="涉及前处理" value={2} suffix="件" valueStyle={{ color: '#d46b08' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="待工艺判断" value={2} suffix="件" valueStyle={{ color: '#1890ff' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="已提交建议" value={3} suffix="条" valueStyle={{ color: '#3f8600' }} /></Card></Col>
    </Row>
    {qualityEvents.map(e => (
      <Card key={e.id} style={{ marginBottom: 12 }}>
        <Row gutter={[16, 8]} align="middle">
          <Col xs={24} sm={4}><span style={{ fontWeight: 600 }}>{e.id}</span></Col>
          <Col xs={12} sm={4}>{e.product}</Col>
          <Col xs={12} sm={3}><Tag color="red">{e.abnormal}</Tag></Col>
          <Col xs={12} sm={5}>
            <div style={{ color: '#888', fontSize: 11 }}>关联工艺</div>
            {e.id === 'QE-2026-001' ? '前处理 / 脱脂 / 水洗 / 镀镍' : e.id === 'QE-2026-002' ? '酸洗 / 镀铜 / 钝化' : '-'}
          </Col>
          <Col xs={12} sm={4}>{statusTag(e.status)}</Col>
          <Col xs={24} sm={4}><Space><a>查看工艺记录</a><a>提交建议</a></Space></Col>
        </Row>
      </Card>
    ))}
  </>
);

// ========== Main ==========
const Events: React.FC = () => {
  const { currentRole } = useRole();
  const titles: Record<string, string> = {
    executive: '重点质量风险事件', admin: '质量事件跟进中心', inspector: '我提交的质量事件', quality_engineer: '我的异常处理任务', process_engineer: '工艺相关质量事件',
  };
  const subs: Record<string, string> = {
    executive: '查看高风险、重复发生、影响交付的关键质量事件',
    admin: '跟踪未关闭事件、责任部门、处理状态与闭环进度',
    inspector: '查看由检测任务提交的质量事件及后续处理状态',
    quality_engineer: '处理待确认AI分析、根因判断、处置方案与案例归档',
    process_engineer: '查看涉及工艺参数、前处理、镀液与工序稳定性的质量事件',
  };
  const ViewMap: Record<string, React.FC> = { executive: ExecutiveView, admin: AdminView, inspector: InspectorView, quality_engineer: QualityEngineerView, process_engineer: ProcessEngineerView };
  const V = ViewMap[currentRole.id] || AdminView;
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{titles[currentRole.id] || '质量事件'}</h2>
        <span style={{ color: '#aaa', fontSize: 12 }}>{subs[currentRole.id]}</span>
      </div>
      <V />
    </div>
  );
};

export default Events;