import React from 'react';
import { Table, Card, Tag, Input, Row, Col, Statistic, Alert, Space } from 'antd';
import { SearchOutlined, ExperimentOutlined, ThunderboltOutlined, CheckCircleOutlined } from '@ant-design/icons';

const inspectionTasks = [
  { key: '1', id: 'INS-2026-001', product: '汽车连接器A', batch: 'B-20260625-01', type: '外观检测', item: '针孔识别', aiResult: '发现针孔', confidence: '96.8%', abnormal: '针孔', status: '已生成质量事件', time: '2026-06-25 09:20' },
  { key: '2', id: 'INS-2026-002', product: '新能源端子B', batch: 'B-20260625-02', type: '膜厚检测', item: '镀层厚度', aiResult: '厚度偏低', confidence: '92.3%', abnormal: '镀层厚度异常', status: '待工程师确认', time: '2026-06-25 08:45' },
  { key: '3', id: 'INS-2026-003', product: 'PCB连接器C', batch: 'B-20260624-01', type: '外观检测', item: '麻点、色差', aiResult: '发现麻点', confidence: '89.5%', abnormal: '麻点', status: '已转事件', time: '2026-06-24 14:30' },
  { key: '4', id: 'INS-2026-004', product: '手机中框D', batch: 'B-20260624-02', type: '色差检测', item: '色差值', aiResult: '色差超标', confidence: '94.1%', abnormal: '色差', status: '处理中', time: '2026-06-24 11:00' },
  { key: '5', id: 'INS-2026-005', product: '散热片E', batch: 'B-20260623-01', type: '盐雾试验', item: '盐雾时间', aiResult: '待人工复核', confidence: '-', abnormal: '-', status: '进行中', time: '2026-06-23 16:00' },
  { key: '6', id: 'INS-2026-006', product: '精密五金件F', batch: 'B-20260623-02', type: '结合力测试', item: '划格试验', aiResult: '正常', confidence: '98.2%', abnormal: '-', status: '已完成', time: '2026-06-23 10:20' },
];

const columns = [
  { title: '检测编号', dataIndex: 'id', key: 'id', width: 130 },
  { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
  { title: '批次', dataIndex: 'batch', key: 'batch', width: 140 },
  { title: '检测类型', dataIndex: 'type', key: 'type', width: 100 },
  { title: '检测项目', dataIndex: 'item', key: 'item', width: 100 },
  { title: 'AI识别结果', dataIndex: 'aiResult', key: 'aiResult', width: 120, render: (v: string) => <Tag color={v === '正常' ? 'green' : v === '待人工复核' ? 'orange' : 'red'}>{v}</Tag> },
  { title: '置信度', dataIndex: 'confidence', key: 'confidence', width: 80 },
  { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 120, render: (v: string) => v === '-' ? <span style={{ color: '#ccc' }}>-</span> : <Tag color="red">{v}</Tag> },
  { title: '状态', dataIndex: 'status', key: 'status', width: 130, render: (v: string) => {
    const map: Record<string, string> = { '已生成质量事件': 'green', '待AI分析': 'orange', '待工程师确认': 'blue', '已转事件': 'purple', '处理中': 'cyan', '进行中': 'blue', '已完成': 'green' };
    return <Tag color={map[v] || 'default'}>{v}</Tag>;
  }},
  { title: '检测时间', dataIndex: 'time', key: 'time', width: 140 },
];

const Inspection: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>检测中心</h2>
      </div>

      <Alert
        message="本模块价值"
        description="集中管理电镀检测任务与AI识别结果，节省异常发现时间，降低漏检、误检风险。"
        type="info"
        showIcon
        icon={<ExperimentOutlined />}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="今日检测任务" value={6} suffix="项" /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="AI发现异常" value={4} suffix="项" valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="待工程师确认" value={1} suffix="项" valueStyle={{ color: '#d46b08' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="已完成检测" value={1} suffix="项" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      </Row>

      {/* 检测结果示例 - QE-2026-001 来源 */}
      <Card title="异常检测结果：INS-2026-001" style={{ marginBottom: 24, borderLeft: '3px solid #cf1322' }} extra={<ThunderboltOutlined style={{ color: '#d46b08' }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>产品</div><div style={{ fontWeight: 500 }}>汽车连接器A</div></Col>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>批次</div><div style={{ fontWeight: 500 }}>B-20260625-01</div></Col>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>检测类型</div><div>外观检测</div></Col>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>检测项目</div><div>针孔识别</div></Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>AI识别结果</div><div><Tag color="red">发现针孔</Tag></div></Col>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>置信度</div><div style={{ fontWeight: 600, color: '#cf1322' }}>96.8%</div></Col>
          <Col xs={12} sm={6}><div style={{ color: '#888', fontSize: 12 }}>建议动作</div><div>进入异常分析</div></Col>
          <Col xs={12} sm={6}>
            <div style={{ color: '#888', fontSize: 12 }}>操作</div>
            <Space size="small">
              <Tag color="green" icon={<CheckCircleOutlined />}>已生成质量事件 QE-2026-001</Tag>
            </Space>
          </Col>
        </Row>
        <div style={{ marginTop: 12, padding: '8px 12px', background: '#f6ffed', borderRadius: 4, fontSize: 13, borderLeft: '3px solid #52c41a' }}>
          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 4 }} />
          该检测已生成质量事件 QE-2026-001，AI分析已完成，待工程师确认。关联历史案例 CASE-2026-018。
        </div>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <Input placeholder="搜索检测任务" prefix={<SearchOutlined />} style={{ width: 300 }} />
      </Card>

      <Card title="检测任务列表">
        <Table columns={columns} dataSource={inspectionTasks} pagination={false} scroll={{ x: 1400 }} />
      </Card>
    </div>
  );
};

export default Inspection;