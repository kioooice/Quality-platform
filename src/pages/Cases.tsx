import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Input, Alert } from 'antd';
import { SearchOutlined, BookOutlined, ThunderboltOutlined } from '@ant-design/icons';

const cases = [
  { key: '1', id: 'CASE-2026-018', product: '汽车连接器A', abnormal: '针孔', rootCause: '前处理不充分，局部残留', solution: '复查脱脂、水洗和镀液杂质', reuse: 8, savedTime: '约12小时', condition: '同类镀镍+镀金产品外观针孔异常', confirmer: '张工', updated: '2026-06-25', sourceEvent: 'QE-2026-001' },
  { key: '2', id: 'CASE-2026-011', product: '新能源端子B', abnormal: '漏镀', rootCause: '脱脂不彻底，局部油污', solution: '加强脱脂工序监控，增加水洗次数', reuse: 5, savedTime: '约8小时', condition: '镀锡/镀镍工艺', confirmer: '李工', updated: '2026-06-20', sourceEvent: 'QE-2026-002' },
  { key: '3', id: 'CASE-2025-096', product: 'PCB连接器C', abnormal: '麻点', rootCause: '镀液杂质超标', solution: '过滤镀液，检查阳极袋', reuse: 12, savedTime: '约16小时', condition: '镀金工艺', confirmer: '王工', updated: '2026-05-15', sourceEvent: 'QE-2025-078' },
  { key: '4', id: 'CASE-2026-005', product: '手机中框D', abnormal: '色差', rootCause: '镀液参数波动', solution: '调整电流密度，补充添加剂', reuse: 3, savedTime: '约6小时', condition: '镀镍/电泳工艺', confirmer: '张工', updated: '2026-06-18', sourceEvent: 'QE-2026-004' },
  { key: '5', id: 'CASE-2026-003', product: '散热片E', abnormal: '镀层厚度异常', rootCause: '电流分布不均', solution: '调整挂具设计，检查阳极位置', reuse: 6, savedTime: '约10小时', condition: '镀镍工艺', confirmer: '赵工', updated: '2026-06-10', sourceEvent: 'QE-2026-005' },
  { key: '6', id: 'CASE-2025-088', product: '精密五金件F', abnormal: '结合力不足', rootCause: '前处理活化不充分', solution: '优化酸洗活化时间和浓度', reuse: 9, savedTime: '约14小时', condition: '镀铜/镀镍/镀铬', confirmer: '李工', updated: '2026-04-22', sourceEvent: 'QE-2025-065' },
];

const highReuseCases = cases.filter(c => c.reuse >= 6).sort((a, b) => b.reuse - a.reuse);

const columns = [
  { title: '案例编号', dataIndex: 'id', key: 'id', width: 130 },
  { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
  { title: '异常类型', dataIndex: 'abnormal', key: 'abnormal', width: 120, render: (v: string) => <Tag color="red">{v}</Tag> },
  { title: '根因', dataIndex: 'rootCause', key: 'rootCause', width: 180 },
  { title: '处理方案', dataIndex: 'solution', key: 'solution', width: 220 },
  { title: '复用次数', dataIndex: 'reuse', key: 'reuse', width: 90, render: (v: number) => <Tag color={v >= 8 ? 'red' : v >= 5 ? 'orange' : 'blue'}>{v}次</Tag> },
  { title: '节省排查时间', dataIndex: 'savedTime', key: 'savedTime', width: 110 },
  { title: '适用条件', dataIndex: 'condition', key: 'condition', width: 200 },
  { title: '确认人', dataIndex: 'confirmer', key: 'confirmer', width: 80 },
  { title: '更新时间', dataIndex: 'updated', key: 'updated', width: 100 },
];

const Cases: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>案例中心</h2>
      </div>

      <Alert
        message="本模块价值"
        description="沉淀电镀质量异常的处理经验，减少重复分析时间，降低老师傅经验流失风险。"
        type="info"
        showIcon
        icon={<BookOutlined />}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="案例总数" value={6} suffix="条" /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="本月复用次数" value={43} suffix="次" valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="累计节省排查时间" value={66} suffix="小时" valueStyle={{ color: '#3f8600' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="本月新增案例" value={2} suffix="条" /></Card></Col>
      </Row>

      {/* 高复用案例 */}
      <Card title={<><ThunderboltOutlined style={{ color: '#d46b08', marginRight: 8 }} />高复用案例</>} style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          {highReuseCases.map((c) => (
            <Col xs={24} md={8} key={c.id}>
              <Card size="small" style={{ background: c.id === 'CASE-2026-018' ? '#fff7e6' : '#fafafa', border: c.id === 'CASE-2026-018' ? '1px solid #fa8c16' : undefined }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  {c.id} <Tag color="red">{c.abnormal}</Tag>
                  {c.id === 'CASE-2026-018' && <Tag color="orange">本次演示案例</Tag>}
                </div>
                <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>产品：</span>{c.product}</div>
                <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>根因：</span>{c.rootCause}</div>
                <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>方案：</span>{c.solution}</div>
                <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>适用条件：</span>{c.condition}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>复用 <b>{c.reuse}</b> 次</span>
                  <span style={{ color: '#3f8600' }}>节省 {c.savedTime}</span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <Input placeholder="搜索案例编号、产品或异常类型" prefix={<SearchOutlined />} style={{ width: 350 }} />
      </Card>

      <Card title="历史处理案例库">
        <Table columns={columns} dataSource={cases} pagination={false} scroll={{ x: 1500 }} />
      </Card>
    </div>
  );
};

export default Cases;