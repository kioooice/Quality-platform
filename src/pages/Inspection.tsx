import React from 'react';
import { Table, Card, Tag, Row, Col, Statistic, Space } from 'antd';
import { ExclamationCircleOutlined, ToolOutlined } from '@ant-design/icons';
import { useRole } from '../context/RoleContext';

const tasks = [
  { key: '1', id: 'INS-2026-001', product: '汽车连接器A', batch: 'B-20260625-01', type: '外观检测', item: '针孔识别', aiResult: '发现针孔', confidence: '96.8%', abnormal: '针孔', status: '已生成质量事件', time: '2026-06-25 09:20', process: '前处理 / 镀镍' },
  { key: '2', id: 'INS-2026-002', product: '新能源端子B', batch: 'B-20260625-02', type: '膜厚检测', item: '镀层厚度', aiResult: '厚度偏低', confidence: '92.3%', abnormal: '镀层厚度异常', status: '待工程师确认', time: '2026-06-25 08:45', process: '镀铜 / 钝化' },
  { key: '3', id: 'INS-2026-003', product: 'PCB连接器C', batch: 'B-20260624-01', type: '外观检测', item: '麻点、色差', aiResult: '发现麻点', confidence: '89.5%', abnormal: '麻点', status: '已转事件', time: '2026-06-24 14:30', process: '清洗 / 镀镍' },
  { key: '4', id: 'INS-2026-004', product: '手机中框D', batch: 'B-20260624-02', type: '色差检测', item: '色差值', aiResult: '色差超标', confidence: '94.1%', abnormal: '色差', status: '处理中', time: '2026-06-24 11:00', process: '镀镍 / 电泳' },
  { key: '5', id: 'INS-2026-005', product: '散热片E', batch: 'B-20260623-01', type: '盐雾试验', item: '盐雾时间', aiResult: '待人工复核', confidence: '-', abnormal: '-', status: '进行中', time: '2026-06-23 16:00', process: '镀镍 / 镀锡' },
  { key: '6', id: 'INS-2026-006', product: '精密五金件F', batch: 'B-20260623-02', type: '结合力测试', item: '划格试验', aiResult: '正常', confidence: '98.2%', abnormal: '-', status: '已完成', time: '2026-06-23 10:20', process: '镀铜 / 镀镍 / 镀铬' },
];

const statusTag = (v: string) => {
  const m: Record<string, string> = { '已生成质量事件': 'green', '待AI分析': 'orange', '待工程师确认': 'blue', '已转事件': 'purple', '处理中': 'cyan', '进行中': 'blue', '已完成': 'green' };
  return <Tag color={m[v] || 'default'}>{v}</Tag>;
};

// ========== 经营决策层 ==========
const ExecutiveView: React.FC = () => (
  <>
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="今日检测任务" value={18} suffix="项" /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="已完成检测" value={12} suffix="项" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="异常发现" value={3} suffix="项" valueStyle={{ color: '#cf1322' }} prefix={<ExclamationCircleOutlined />} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="待复核" value={2} suffix="项" valueStyle={{ color: '#d46b08' }} /></Card></Col>
    </Row>
    <Card title="重大异常来源" style={{ marginBottom: 24 }}>
      {tasks.filter(t => t.abnormal !== '-').slice(0, 3).map(t => (
        <Card key={t.id} size="small" style={{ marginBottom: 8, borderLeft: '3px solid #cf1322' }}>
          <Row gutter={[16, 8]} align="middle">
            <Col xs={24} sm={6}><span style={{ fontWeight: 600 }}>{t.id}</span></Col>
            <Col xs={12} sm={6}>{t.product}</Col>
            <Col xs={12} sm={4}><Tag color="red">{t.abnormal}</Tag></Col>
            <Col xs={12} sm={4}>{statusTag(t.status)}</Col>
            <Col xs={12} sm={4}><a>查看质量事件</a></Col>
          </Row>
        </Card>
      ))}
    </Card>
  </>
);

// ========== 质量负责人 ==========
const AdminView: React.FC = () => {
  const cols = [
    { title: '检测编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '检测类型', dataIndex: 'type', key: 'type', width: 100 },
    { title: 'AI识别结果', dataIndex: 'aiResult', key: 'aiResult', width: 120, render: (v: string) => <Tag color={v === '正常' ? 'green' : v === '待人工复核' ? 'orange' : 'red'}>{v}</Tag> },
    { title: '状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => statusTag(v) },
    { title: '操作', key: 'action', width: 180, render: (_: unknown, r: Record<string, string>) => <Space><a>查看结果</a><a>查看事件</a>{r.status === '待工程师确认' && <a>分派复核</a>}</Space> },
  ];
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="今日检测任务" value={6} suffix="项" /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="AI发现异常" value={4} suffix="项" valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="待复核" value={1} suffix="项" valueStyle={{ color: '#d46b08' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="已完成检测" value={1} suffix="项" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      </Row>
      <Card title="检测任务列表"><Table columns={cols} dataSource={tasks} pagination={false} scroll={{ x: 900 }} size="small" /></Card>
    </>
  );
};

// ========== 质检员 ==========
const InspectorView: React.FC = () => {
  const cols = [
    { title: '检测编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '批次', dataIndex: 'batch', key: 'batch', width: 140 },
    { title: '检测类型', dataIndex: 'type', key: 'type', width: 100 },
    { title: '检测项目', dataIndex: 'item', key: 'item', width: 100 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => statusTag(v) },
    { title: '操作', key: 'action', width: 200, render: (_: unknown, r: Record<string, string>) => (
      <Space>
        <a>查看结果</a>
        {r.id === 'INS-2026-001' ? <a>提交质量事件</a> : r.status === '已完成' ? null : <a>补充记录</a>}
      </Space>
    )},
  ];
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="今日待检测" value={18} suffix="项" /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="已完成" value={12} suffix="项" valueStyle={{ color: '#3f8600' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="发现异常" value={3} suffix="项" valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="待复核" value={2} suffix="项" valueStyle={{ color: '#d46b08' }} /></Card></Col>
      </Row>
      <Card title="异常检测结果：INS-2026-001" style={{ marginBottom: 24, borderLeft: '3px solid #cf1322' }}>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>产品</div><div style={{ fontWeight: 500 }}>汽车连接器A</div></Col>
          <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>批次</div><div>B-20260625-01</div></Col>
          <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>异常</div><Tag color="red">针孔</Tag></Col>
          <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>AI置信度</div><div style={{ fontWeight: 600, color: '#cf1322' }}>96.8%</div></Col>
        </Row>
        <div style={{ marginTop: 12, padding: '8px 12px', background: '#fff1f0', borderRadius: 4, fontSize: 13, borderLeft: '3px solid #cf1322' }}>
          建议动作：提交质量事件 QE-2026-001，进入异常分析流程
        </div>
      </Card>
      <Card title="我的检测任务"><Table columns={cols} dataSource={tasks} pagination={false} scroll={{ x: 900 }} size="small" /></Card>
    </>
  );
};

// ========== 质量工程师 ==========
const QualityEngineerView: React.FC = () => {
  const cols = [
    { title: '检测编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 110, render: (v: string) => v === '-' ? <span style={{ color: '#ccc' }}>-</span> : <Tag color="red">{v}</Tag> },
    { title: 'AI识别结果', dataIndex: 'aiResult', key: 'aiResult', width: 120, render: (v: string) => <Tag color={v === '正常' ? 'green' : 'red'}>{v}</Tag> },
    { title: '置信度', dataIndex: 'confidence', key: 'confidence', width: 80 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => statusTag(v) },
    { title: '操作', key: 'action', width: 180, render: () => <Space><a>查看事件</a><a>查看AI分析</a></Space> },
  ];
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="已生成事件的检测" value={3} suffix="项" valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="待复核" value={1} suffix="项" valueStyle={{ color: '#d46b08' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="检测完成率" value={67} suffix="%" valueStyle={{ color: '#3f8600' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="异常发现率" value={17} suffix="%" /></Card></Col>
      </Row>
      <Card title="异常检测来源"><Table columns={cols} dataSource={tasks.filter(t => t.abnormal !== '-')} pagination={false} scroll={{ x: 900 }} size="small" /></Card>
    </>
  );
};

// ========== 工艺工程师 ==========
const ProcessEngineerView: React.FC = () => {
  const processTasks = tasks.filter(t => t.abnormal !== '-');
  const cols = [
    { title: '检测编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
    { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 120, render: (v: string) => <Tag color="red">{v}</Tag> },
    { title: '关联工艺', dataIndex: 'process', key: 'process', width: 180, render: (v: string) => v.split(' / ').map((p, i) => <Tag key={i} style={{ marginBottom: 2 }}>{p}</Tag>) },
    { title: '状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => statusTag(v) },
    { title: '操作', key: 'action', width: 180, render: () => <Space><a>查看工艺记录</a><a>提交工艺判断</a></Space> },
  ];
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="工艺相关异常检测" value={4} suffix="项" valueStyle={{ color: '#cf1322' }} prefix={<ToolOutlined />} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="膜厚/盐雾检测" value={2} suffix="项" /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="待工艺判断" value={2} suffix="项" valueStyle={{ color: '#d46b08' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="已提交建议" value={3} suffix="条" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      </Row>
      <Card title="工艺相关检测结果"><Table columns={cols} dataSource={processTasks} pagination={false} scroll={{ x: 900 }} size="small" /></Card>
    </>
  );
};

// ========== Main ==========
const Inspection: React.FC = () => {
  const { currentRole } = useRole();
  const titles: Record<string, string> = {
    executive: '检测运行总览', admin: '检测进度管理', inspector: '我的检测任务', quality_engineer: '异常检测来源', process_engineer: '工艺相关检测结果',
  };
  const subs: Record<string, string> = {
    executive: '查看检测完成率、异常发现趋势与重大异常来源',
    admin: '跟踪检测任务完成情况、异常发现与复核进度',
    inspector: '查看今日检测任务、确认异常结果并提交质量事件',
    quality_engineer: '查看质量事件对应的检测来源、检测证据与复核记录',
    process_engineer: '查看膜厚、盐雾、结合力、色差等与工艺相关的检测结果',
  };
  const ViewMap: Record<string, React.FC> = { executive: ExecutiveView, admin: AdminView, inspector: InspectorView, quality_engineer: QualityEngineerView, process_engineer: ProcessEngineerView };
  const V = ViewMap[currentRole.id] || AdminView;
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{titles[currentRole.id] || '检测中心'}</h2>
        <span style={{ color: '#aaa', fontSize: 12 }}>{subs[currentRole.id]}</span>
      </div>
      <V />
    </div>
  );
};

export default Inspection;