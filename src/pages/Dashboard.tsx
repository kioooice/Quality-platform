import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress, Alert, Space } from 'antd';
import {
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  WarningOutlined,
  RobotOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { useRole } from '../context/RoleContext';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

// Mobile card list for events
const MobileEventList: React.FC<{ data: Array<{ id: string; product: string; abnormal: string; severity: string; status: string; dept?: string; updated?: string }> }> = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {data.map((item) => (
        <Card key={item.id} size="small" style={{ borderLeft: item.severity === '高' ? '3px solid #cf1322' : '3px solid #fa8c16' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{item.id}</span>
            <Tag color={item.severity === '高' ? 'red' : 'orange'} style={{ fontSize: 11 }}>{item.severity}</Tag>
          </div>
          <div style={{ fontSize: 13, marginBottom: 4 }}>{item.product} · {item.abnormal}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tag color={item.status.includes('确认') ? 'orange' : item.status.includes('处理') ? 'blue' : 'default'} style={{ fontSize: 11 }}>{item.status}</Tag>
            <Space size={8}>
              <a style={{ fontSize: 12 }}>查看</a>
              {item.id === 'QE-2026-001' && <a style={{ fontSize: 12 }}>AI分析</a>}
            </Space>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Mobile card list for AI tasks
const MobileAITaskList: React.FC<{ data: Array<{ id: string; event: string; product: string; abnormal: string; reason: string; cases: number }> }> = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {data.map((item) => (
        <Card key={item.id} size="small" style={{ borderLeft: '3px solid #d46b08' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{item.id}</span>
            <a style={{ fontSize: 12 }}>{item.event}</a>
          </div>
          <div style={{ fontSize: 13, marginBottom: 4 }}>{item.product} · <Tag color="red" style={{ fontSize: 11 }}>{item.abnormal}</Tag></div>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>AI建议：{item.reason}</div>
          <div style={{ fontSize: 12, color: '#999' }}>相似案例 {item.cases} 条</div>
        </Card>
      ))}
    </div>
  );
};

// ========== Admin View ==========
const AdminView: React.FC = () => {
  const isMobile = useIsMobile();
  const pendingEvents = [
    { key: '1', id: 'QE-2026-001', product: '汽车连接器A', batch: 'B-20260625-01', abnormal: '针孔', severity: '高', status: '待工程师确认', dept: '质量部 / 生产部', updated: '2026-06-25 09:25' },
    { key: '2', id: 'QE-2026-002', product: '新能源端子B', batch: 'B-20260625-02', abnormal: '漏镀', severity: '高', status: '待工程师确认', dept: '生产部', updated: '2026-06-25 08:50' },
    { key: '3', id: 'QE-2026-004', product: '手机中框D', batch: 'B-20260624-02', abnormal: '色差', severity: '中', status: '处理中', dept: '质量部', updated: '2026-06-24 14:00' },
    { key: '4', id: 'QE-2026-005', product: '散热片E', batch: 'B-20260623-01', abnormal: '镀层厚度异常', severity: '高', status: '待AI分析', dept: '生产部', updated: '2026-06-23 16:30' },
  ];

  const aiPending = [
    { key: '1', id: 'AI-2026-001', event: 'QE-2026-001', product: '汽车连接器A', abnormal: '针孔', reason: '前处理不充分，局部残留导致针孔风险升高', cases: 3, status: '待工程师确认' },
    { key: '2', id: 'AI-2026-002', event: 'QE-2026-002', product: '新能源端子B', abnormal: '漏镀', reason: '脱脂工序异常，局部油污残留', cases: 2, status: '待工程师确认' },
  ];

  const highRisk = [
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

  const eventCols = [
    { title: '事件编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '批次', dataIndex: 'batch', key: 'batch', width: 140 },
    { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 110 },
    { title: '严重程度', dataIndex: 'severity', key: 'severity', width: 90, render: (s: string) => <Tag color={s === '高' ? 'red' : 'orange'}>{s}</Tag> },
    { title: '当前状态', dataIndex: 'status', key: 'status', width: 130, render: (s: string) => {
      const m: Record<string, { c: string; i: React.ReactNode }> = { '待工程师确认': { c: 'orange', i: <ExclamationCircleOutlined /> }, '处理中': { c: 'blue', i: <ClockCircleOutlined /> }, '待AI分析': { c: 'default', i: <ClockCircleOutlined /> } };
      const { c, i } = m[s] || { c: 'default', i: null };
      return <Tag icon={i} color={c}>{s}</Tag>;
    }},
    { title: '责任部门', dataIndex: 'dept', key: 'dept', width: 130 },
    { title: '更新时间', dataIndex: 'updated', key: 'updated', width: 140 },
    { title: '操作', key: 'action', width: 150, render: (_: unknown, r: { id: string }) => <span><a style={{ marginRight: 12 }}>查看事件</a>{r.id === 'QE-2026-001' && <a>查看AI分析</a>}</span> },
  ];

  const aiCols = [
    { title: '分析任务', dataIndex: 'id', key: 'id', width: 120 },
    { title: '关联事件', dataIndex: 'event', key: 'event', width: 120, render: (v: string) => <a>{v}</a> },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 100, render: (v: string) => <Tag color="red">{v}</Tag> },
    { title: 'AI建议原因', dataIndex: 'reason', key: 'reason', width: 280 },
    { title: '相似案例', dataIndex: 'cases', key: 'cases', width: 90, render: (v: number) => `${v}条` },
    { title: '状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => <Tag color="orange">{v}</Tag> },
  ];

  const reviewCols = [
    { title: '类型', dataIndex: 'type', key: 'type', width: 60, render: (v: string) => <Tag color={v === '报告' ? 'blue' : 'green'}>{v}</Tag> },
    { title: '编号', dataIndex: 'id', key: 'id', width: 130, render: (v: string) => <a>{v}</a> },
    { title: '名称', dataIndex: 'name', key: 'name', width: 250 },
    { title: '关联事件', dataIndex: 'event', key: 'event', width: 120, render: (v: string) => <a>{v}</a> },
    { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (v: string) => <Tag color="orange">{v}</Tag> },
    { title: '更新时间', dataIndex: 'updated', key: 'updated', width: 140 },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="重复分析减少" value={36} suffix="次" valueStyle={{ fontSize: 20 }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="平均排查时间" value={4.2} suffix="小时" valueStyle={{ fontSize: 20 }} prefix={<ThunderboltOutlined />} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="自动生成报告" value={18} suffix="份" valueStyle={{ fontSize: 20 }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="新增经验案例" value={12} suffix="条" valueStyle={{ fontSize: 20 }} /></Card></Col>
      </Row>

      <Card title="今日待处理质量事件" style={{ marginBottom: 24 }} bodyStyle={{ padding: isMobile ? '8px' : '12px 16px' }}>
        {isMobile ? <MobileEventList data={pendingEvents} /> : <Table columns={eventCols} dataSource={pendingEvents} pagination={false} size="small" scroll={{ x: 1100 }} />}
      </Card>

      <Card title={<><RobotOutlined style={{ marginRight: 8 }} />AI 待确认分析任务</>} style={{ marginBottom: 24 }} bodyStyle={{ padding: isMobile ? '8px' : '12px 16px' }}>
        {isMobile ? <MobileAITaskList data={aiPending} /> : <Table columns={aiCols} dataSource={aiPending} pagination={false} size="small" scroll={{ x: 1000 }} />}
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={<><WarningOutlined style={{ color: '#d46b08', marginRight: 8 }} />高风险产品与工艺</>} size="small">
            {highRisk.map((p, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
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
          </Card>
        </Col>
      </Row>

      <Card title={<><FileTextOutlined style={{ marginRight: 8 }} />报告与案例待审核</>} style={{ marginBottom: 24 }} bodyStyle={{ padding: '12px 16px' }}>
        <Table columns={reviewCols} dataSource={pendingReview} pagination={false} size="small" />
      </Card>

      <Card title={<><WarningOutlined style={{ color: '#d46b08', marginRight: 8 }} />质量风险提醒</>} style={{ marginBottom: 24 }} bodyStyle={{ padding: isMobile ? '8px' : '12px 16px' }}>
        <Alert message="针孔异常本周重复发生 12 次，建议建立标准处理方案" type="error" showIcon style={{ marginBottom: 8 }} />
        <Alert message="新能源端子B 漏镀问题连续出现，建议复查前处理工序" type="error" showIcon style={{ marginBottom: 8 }} />
        <Alert message="手机中框D 色差问题与镀液参数波动有关，建议关注批次数据" type="warning" showIcon />
      </Card>

      <Card title={<><RobotOutlined style={{ marginRight: 8 }} />AI 辅助工作状态</>} size="small">
        <Row gutter={[isMobile ? 12 : 24, 12]}>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center', padding: '8px 0' }}><div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: '#d46b08' }}>3</div><div style={{ color: '#666', fontSize: 12 }}>待分析事件</div></div></Col>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center', padding: '8px 0' }}><div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: '#3f8600' }}>18</div><div style={{ color: '#666', fontSize: 12 }}>已完成AI分析</div></div></Col>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center', padding: '8px 0' }}><div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: '#1890ff' }}>5</div><div style={{ color: '#666', fontSize: 12 }}>待工程师确认</div></div></Col>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center', padding: '8px 0' }}><div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: '#722ed1' }}>7</div><div style={{ color: '#666', fontSize: 12 }}>已形成案例</div></div></Col>
        </Row>
      </Card>
    </>
  );
};

// ========== Inspector View ==========
const InspectorView: React.FC = () => {
  const tasks = [
    { key: '1', id: 'INS-2026-001', product: '汽车连接器A', batch: 'B-20260625-01', type: '外观检测', item: '针孔识别', status: '已发现异常' },
    { key: '2', id: 'INS-2026-002', product: '新能源端子B', batch: 'B-20260625-02', type: '膜厚检测', item: '镀层厚度', status: '检测中' },
    { key: '3', id: 'INS-2026-007', product: 'PCB连接器C', batch: 'B-20260625-03', type: '外观检测', item: '麻点识别', status: '待检测' },
    { key: '4', id: 'INS-2026-008', product: '手机中框D', batch: 'B-20260625-04', type: '色差检测', item: '色差值', status: '待检测' },
    { key: '5', id: 'INS-2026-009', product: '散热片E', batch: 'B-20260625-05', type: '盐雾试验', item: '盐雾时间', status: '待检测' },
  ];

  const taskCols = [
    { title: '检测任务编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '批次', dataIndex: 'batch', key: 'batch', width: 140 },
    { title: '检测类型', dataIndex: 'type', key: 'type', width: 100 },
    { title: '检测项目', dataIndex: 'item', key: 'item', width: 100 },
    { title: '当前状态', dataIndex: 'status', key: 'status', width: 120, render: (v: string) => {
      const m: Record<string, string> = { '已发现异常': 'red', '检测中': 'blue', '待检测': 'default' };
      return <Tag color={m[v] || 'default'}>{v}</Tag>;
    }},
    { title: '操作', key: 'action', width: 180, render: (_: unknown, r: { id: string }) => (
      <span>
        {r.id === 'INS-2026-001' ? <><a style={{ marginRight: 12 }}>查看检测结果</a><a>提交质量事件</a></> : <a>开始检测</a>}
      </span>
    )},
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="今日待检测任务" value={18} suffix="项" /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="已完成检测" value={12} suffix="项" valueStyle={{ color: '#3f8600' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="发现异常" value={3} suffix="项" valueStyle={{ color: '#cf1322' }} prefix={<ExclamationCircleOutlined />} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="待复核结果" value={2} suffix="项" valueStyle={{ color: '#d46b08' }} /></Card></Col>
      </Row>

      {/* 异常检测结果 */}
      <Card title="异常检测结果" style={{ marginBottom: 24, borderLeft: '3px solid #cf1322' }} extra={<ExperimentOutlined style={{ color: '#cf1322' }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>产品</div><div style={{ fontWeight: 500 }}>汽车连接器A</div></Col>
          <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>批次</div><div>B-20260625-01</div></Col>
          <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>异常类型</div><div><Tag color="red">针孔</Tag></div></Col>
          <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>AI识别置信度</div><div style={{ fontWeight: 600, color: '#cf1322' }}>96.8%</div></Col>
        </Row>
        <div style={{ marginTop: 12, padding: '8px 12px', background: '#fff1f0', borderRadius: 4, fontSize: 13, borderLeft: '3px solid #cf1322' }}>
          建议动作：提交质量事件 QE-2026-001，进入异常分析流程
        </div>
      </Card>

      <Card title="今日检测任务">
        <Table columns={taskCols} dataSource={tasks} pagination={false} size="small" scroll={{ x: 900 }} />
      </Card>
    </>
  );
};

// ========== Quality Engineer View ==========
const QualityEngineerView: React.FC = () => {
  const events = [
    { key: '1', id: 'QE-2026-001', product: '汽车连接器A', abnormal: '针孔', severity: '高', aiReason: '前处理不充分，局部残留导致针孔风险升高', status: '待工程师确认', action: '查看AI分析 / 确认根因' },
    { key: '2', id: 'QE-2026-002', product: '新能源端子B', abnormal: '漏镀', severity: '高', aiReason: '脱脂工序异常，局部油污残留', status: '待工程师确认', action: '查看AI分析 / 确认根因' },
    { key: '3', id: 'QE-2026-004', product: '手机中框D', abnormal: '色差', severity: '中', aiReason: '待分析', status: '待AI分析', action: '等待AI分析' },
  ];

  const eventCols = [
    { title: '事件编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 100, render: (v: string) => <Tag color="red">{v}</Tag> },
    { title: '严重程度', dataIndex: 'severity', key: 'severity', width: 90, render: (s: string) => <Tag color={s === '高' ? 'red' : 'orange'}>{s}</Tag> },
    { title: 'AI建议原因', dataIndex: 'aiReason', key: 'aiReason', width: 300 },
    { title: '当前状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => <Tag color={v === '待工程师确认' ? 'orange' : 'default'}>{v}</Tag> },
    { title: '操作', dataIndex: 'action', key: 'action', width: 200, render: (v: string) => <span>{v.split(' / ').map((a, i) => <span key={i}>{i > 0 && <span style={{ margin: '0 4px', color: '#ccc' }}>/</span>}<a>{a}</a></span>)}</span> },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="待确认AI分析" value={5} suffix="项" valueStyle={{ color: '#d46b08' }} prefix={<RobotOutlined />} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="待判断根因" value={3} suffix="项" valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="待制定处置方案" value={4} suffix="项" valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="待归档案例" value={2} suffix="项" valueStyle={{ color: '#722ed1' }} /></Card></Col>
      </Row>

      <Card title="待处理质量事件" style={{ marginBottom: 24 }} bodyStyle={{ padding: '12px 16px' }}>
        <Table columns={eventCols} dataSource={events} pagination={false} size="small" scroll={{ x: 1100 }} />
      </Card>

      <Card title={<><RobotOutlined style={{ marginRight: 8 }} />AI分析待确认</>} style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ background: '#fff7e6', border: '1px solid #fa8c16' }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>AI-2026-001 关联 QE-2026-001</div>
              <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>产品：</span>汽车连接器A</div>
              <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>异常：</span><Tag color="red">针孔</Tag></div>
              <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>相似案例：</span>3条</div>
              <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>已关联资料：</span>产品资料、标准图片、历史案例、工艺记录</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#888' }}>状态：</span><Tag color="orange">待确认</Tag></div>
              <div><a>查看完整AI分析</a></div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small">
              <div style={{ fontWeight: 600, marginBottom: 8 }}>AI-2026-002 关联 QE-2026-002</div>
              <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>产品：</span>新能源端子B</div>
              <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>异常：</span><Tag color="red">漏镀</Tag></div>
              <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>相似案例：</span>2条</div>
              <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>已关联资料：</span>产品资料、标准图片、历史案例</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#888' }}>状态：</span><Tag color="orange">待确认</Tag></div>
              <div><a>查看完整AI分析</a></div>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

// ========== Process Engineer View ==========
const ProcessEngineerView: React.FC = () => {
  const processEvents = [
    { key: '1', id: 'QE-2026-001', product: '汽车连接器A', abnormal: '针孔', process: '前处理 / 脱脂 / 水洗 / 镀镍', cause: '前处理不充分、局部残留', status: '待工艺确认' },
    { key: '2', id: 'QE-2026-002', product: '新能源端子B', abnormal: '漏镀', process: '酸洗 / 镀铜 / 钝化', cause: '脱脂不彻底、油污残留', status: '待工艺确认' },
    { key: '3', id: 'QE-2026-005', product: '散热片E', abnormal: '镀层厚度异常', process: '镀镍 / 镀锡', cause: '电流分布不均', status: '待排查' },
    { key: '4', id: 'QE-2026-004', product: '手机中框D', abnormal: '色差', process: '镀镍 / 电泳', cause: '镀液参数波动', status: '待排查' },
  ];

  const eventCols = [
    { title: '事件编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 110, render: (v: string) => <Tag color="red">{v}</Tag> },
    { title: '关联工艺', dataIndex: 'process', key: 'process', width: 200, render: (v: string) => v.split(' / ').map((p, i) => <Tag key={i} style={{ marginBottom: 2 }}>{p}</Tag>) },
    { title: '可能原因', dataIndex: 'cause', key: 'cause', width: 200 },
    { title: '当前状态', dataIndex: 'status', key: 'status', width: 120, render: (v: string) => <Tag color={v === '待工艺确认' ? 'orange' : 'blue'}>{v}</Tag> },
    { title: '操作', key: 'action', width: 180, render: () => <span><a style={{ marginRight: 12 }}>查看工艺记录</a><a>提交工艺建议</a></span> },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="待排查工艺异常" value={4} suffix="项" valueStyle={{ color: '#d46b08' }} prefix={<ToolOutlined />} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="涉及前处理问题" value={2} suffix="项" valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="待验证改善措施" value={3} suffix="项" valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card size="small"><Statistic title="已反馈工艺建议" value={6} suffix="条" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      </Row>

      <Card title="工艺相关异常" style={{ marginBottom: 24 }} bodyStyle={{ padding: '12px 16px' }}>
        <Table columns={eventCols} dataSource={processEvents} pagination={false} size="small" scroll={{ x: 1100 }} />
      </Card>

      <Card title="工艺检查建议（QE-2026-001 针孔异常）" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            '检查脱脂时间与浓度记录',
            '复核水洗段洁净度',
            '检查镀液杂质数据',
            '对比同批次膜厚检测结果',
            '抽查同工艺产品异常分布',
          ].map((item, i) => (
            <div key={i} style={{ padding: '8px 12px', background: '#fafafa', borderRadius: 4, borderLeft: '3px solid #1890ff', fontSize: 13 }}>
              {i + 1}. {item}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

// ========== Main Dashboard ==========
const Dashboard: React.FC = () => {
  const { currentRole } = useRole();

  const ViewMap: Record<string, React.FC> = {
    admin: AdminView,
    inspector: InspectorView,
    quality_engineer: QualityEngineerView,
    process_engineer: ProcessEngineerView,
  };

  const CurrentView = ViewMap[currentRole.id] || AdminView;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{currentRole.workspaceTitle}</h2>
        <span style={{ color: '#aaa', fontSize: 12 }}>{currentRole.workspaceSubtitle}</span>
        <div style={{ color: '#ccc', fontSize: 11, marginTop: 2 }}>数据更新于 2026-06-25 09:00，均为模拟业务数据</div>
      </div>
      <CurrentView />
    </div>
  );
};

export default Dashboard;