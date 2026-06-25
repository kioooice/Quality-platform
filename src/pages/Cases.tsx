import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Space, Input, List, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined, BookOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';

// Mock data for cases
const cases = [
  {
    key: '1',
    id: 'CASE-001',
    title: '汽车连接器A外观缺陷分析',
    product: '汽车连接器A',
    category: '外观缺陷',
    severity: '高',
    status: '已解决',
    views: 1234,
    likes: 56,
    comments: 23,
    author: '质量部',
    date: '2024-01-10',
    summary: '通过AI视觉检测发现批量外观缺陷，根本原因为模具磨损导致。更换模具后问题解决。',
  },
  {
    key: '2',
    id: 'CASE-002',
    title: 'PCB连接器尺寸超差问题',
    product: 'PCB连接器',
    category: '尺寸问题',
    severity: '中',
    status: '已解决',
    views: 856,
    likes: 34,
    comments: 12,
    author: '生产部',
    date: '2024-01-08',
    summary: '尺寸偏差超出公差范围，原因为温度控制不当。调整工艺参数后恢复正常。',
  },
  {
    key: '3',
    id: 'CASE-003',
    title: '新能源端子接触不良案例',
    product: '新能源端子',
    category: '性能问题',
    severity: '高',
    status: '已解决',
    views: 1567,
    likes: 78,
    comments: 45,
    author: '研发部',
    date: '2024-01-05',
    summary: '端子接触电阻过大，导致发热问题。通过改进镀层工艺解决。',
  },
  {
    key: '4',
    id: 'CASE-004',
    title: '高压线束绝缘破损分析',
    product: '高压线束',
    category: '安全问题',
    severity: '高',
    status: '处理中',
    views: 234,
    likes: 12,
    comments: 5,
    author: '质量部',
    date: '2024-01-12',
    summary: '绝缘层在弯折测试中出现破损，正在分析材料和工艺原因。',
  },
];

const columns = [
  {
    title: '案例编号',
    dataIndex: 'id',
    key: 'id',
    width: 120,
  },
  {
    title: '案例标题',
    dataIndex: 'title',
    key: 'title',
    width: 250,
  },
  {
    title: '产品',
    dataIndex: 'product',
    key: 'product',
    width: 120,
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    width: 100,
  },
  {
    title: '严重程度',
    dataIndex: 'severity',
    key: 'severity',
    width: 100,
    render: (severity: string) => {
      const color = severity === '高' ? 'red' : severity === '中' ? 'orange' : 'green';
      return <Tag color={color}>{severity}</Tag>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: string) => {
      const color = status === '已解决' ? 'green' : 'blue';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: '浏览',
    dataIndex: 'views',
    key: 'views',
    width: 80,
  },
  {
    title: '点赞',
    dataIndex: 'likes',
    key: 'likes',
    width: 80,
  },
  {
    title: '评论',
    dataIndex: 'comments',
    key: 'comments',
    width: 80,
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    width: 100,
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 120,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: () => (
      <Space size="middle">
        <Button type="link">查看</Button>
        <Button type="link">编辑</Button>
      </Space>
    ),
  },
];

const Cases: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>案例中心</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          创建新案例
        </Button>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="案例总数" value={cases.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="已解决案例" value={cases.filter(c => c.status === '已解决').length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总浏览量" value={cases.reduce((sum, c) => sum + c.views, 0)} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="本月新增" value={2} />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card style={{ marginBottom: 24 }}>
        <Space>
          <Input placeholder="搜索案例" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <Button>搜索</Button>
          <Button>重置</Button>
        </Space>
      </Card>

      {/* 热门案例 */}
      <Card title="热门案例" style={{ marginBottom: 24 }}>
        <List
          itemLayout="horizontal"
          dataSource={cases.slice(0, 3)}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Space key="likes">
                  <LikeOutlined />
                  <span>{item.likes}</span>
                </Space>,
                <Space key="comments">
                  <MessageOutlined />
                  <span>{item.comments}</span>
                </Space>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<BookOutlined />} />}
                title={<a href="#">{item.title}</a>}
                description={item.summary}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* 案例列表 */}
      <Card>
        <Table columns={columns} dataSource={cases} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default Cases;