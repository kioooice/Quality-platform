import React from 'react';
import { Table, Card, Tag, Input, Row, Col, Statistic, Alert } from 'antd';
import { SearchOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const products = [
  { key: '1', id: 'P001', name: '汽车连接器A', process: '镀镍 + 镀金', mainRisk: '针孔、镀层厚度异常', stdImages: 24, docs: 8, historyAbnormal: 12, lastInspection: '2026-06-25' },
  { key: '2', id: 'P002', name: '新能源端子B', process: '镀锡 + 镀镍', mainRisk: '漏镀、结合力不足', stdImages: 18, docs: 6, historyAbnormal: 8, lastInspection: '2026-06-24' },
  { key: '3', id: 'P003', name: 'PCB连接器C', process: '镀金', mainRisk: '麻点、色差', stdImages: 32, docs: 12, historyAbnormal: 15, lastInspection: '2026-06-24' },
  { key: '4', id: 'P004', name: '手机中框D', process: '镀镍 + 电泳', mainRisk: '色差、烧焦', stdImages: 28, docs: 10, historyAbnormal: 6, lastInspection: '2026-06-23' },
  { key: '5', id: 'P005', name: '散热片E', process: '镀镍', mainRisk: '镀层厚度异常、盐雾异常', stdImages: 15, docs: 5, historyAbnormal: 9, lastInspection: '2026-06-22' },
  { key: '6', id: 'P006', name: '精密五金件F', process: '镀铜 + 镀镍 + 镀铬', mainRisk: '结合力不足、针孔', stdImages: 20, docs: 9, historyAbnormal: 11, lastInspection: '2026-06-21' },
];

const columns = [
  { title: '产品编号', dataIndex: 'id', key: 'id', width: 90 },
  { title: '产品名称', dataIndex: 'name', key: 'name', width: 130 },
  { title: '电镀工艺', dataIndex: 'process', key: 'process', width: 150 },
  { title: '主要质量风险', dataIndex: 'mainRisk', key: 'mainRisk', width: 200 },
  { title: '标准图片', dataIndex: 'stdImages', key: 'stdImages', width: 90, render: (v: number) => `${v}张` },
  { title: '研发资料', dataIndex: 'docs', key: 'docs', width: 90, render: (v: number) => `${v}份` },
  { title: '历史异常', dataIndex: 'historyAbnormal', key: 'historyAbnormal', width: 90, render: (v: number) => <Tag color={v > 10 ? 'red' : v > 5 ? 'orange' : 'green'}>{v}次</Tag> },
  { title: '最近检测', dataIndex: 'lastInspection', key: 'lastInspection', width: 110 },
  { title: '操作', key: 'action', width: 100, render: () => <a>查看详情</a> },
];

const Products: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>产品中心</h2>
      </div>

      <Alert
        message="本模块价值"
        description="集中管理电镀产品的工艺参数、质量风险和历史资料，节省资料查找时间，降低用错资料和版本风险。"
        type="info"
        showIcon
        icon={<SafetyCertificateOutlined />}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="产品总数" value={6} suffix="个" /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="标准图片总量" value={137} suffix="张" valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="研发资料总量" value={50} suffix="份" valueStyle={{ color: '#722ed1' }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="历史异常总量" value={61} suffix="次" valueStyle={{ color: '#cf1322' }} /></Card></Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Input placeholder="搜索产品名称或工艺" prefix={<SearchOutlined />} style={{ width: 300 }} />
      </Card>

      <Card title="电镀产品知识库">
        <Table columns={columns} dataSource={products} pagination={false} scroll={{ x: 1100 }} />
      </Card>
    </div>
  );
};

export default Products;