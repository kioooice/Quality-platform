import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress, Alert } from 'antd';
import {
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  ThunderboltOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  RobotOutlined,
} from '@ant-design/icons';

const topCards = {
  todayEvents: 12,
  pendingConfirm: 3,
  reusedCases: 8,
  savedHours: 18,
};

const costSaving = {
  reducedAnalysis: 36,
  savedHours: 128,
  autoReports: 18,
  newExperience: 12,
};

const recentEvents = [
  { key: '1', id: 'QE-2026-001', product: '汽车连接器A', issue: '针孔', severity: '高', status: '处理中', date: '2026-06-25' },
  { key: '2', id: 'QE-2026-002', product: '新能源端子B', issue: '漏镀', severity: '高', status: '待确认', date: '2026-06-25' },
  { key: '3', id: 'QE-2026-003', product: 'PCB连接器C', issue: '麻点', severity: '中', status: '已处理', date: '2026-06-24' },
  { key: '4', id: 'QE-2026-004', product: '手机中框D', issue: '色差', severity: '中', status: '处理中', date: '2026-06-24' },
  { key: '5', id: 'QE-2026-005', product: '散热片E', issue: '镀层厚度异常', severity: '高', status: '待分析', date: '2026-06-23' },
];

const trendData = [
  { label: '重复异常次数', thisMonth: 18, lastMonth: 24, unit: '次', lower: true },
  { label: '平均排查时间', thisMonth: 4.2, lastMonth: 6.8, unit: '小时', lower: true },
  { label: '案例复用次数', thisMonth: 36, lastMonth: 22, unit: '次', lower: false },
  { label: '报告生成数量', thisMonth: 18, lastMonth: 14, unit: '份', lower: false },
];

const riskAlerts = [
  { id: 1, text: '针孔异常本周重复发生 12 次，建议建立标准处理方案', level: 'high' as const },
  { id: 2, text: '新能源端子B 漏镀问题连续出现，建议复查前处理工序', level: 'high' as const },
  { id: 3, text: '手机中框D 色差问题与镀液参数波动有关，建议关注批次数据', level: 'medium' as const },
];

const aiStatus = {
  pendingAnalysis: 18,
  completedAnalysis: 3,
  pendingConfirm: 5,
  formedCases: 7,
};

const eventColumns = [
  { title: '事件编号', dataIndex: 'id', key: 'id', width: 130 },
  { title: '产品', dataIndex: 'product', key: 'product', width: 120 },
  { title: '异常类型', dataIndex: 'issue', key: 'issue', width: 120 },
  {
    title: '严重程度',
    dataIndex: 'severity',
    key: 'severity',
    width: 90,
    render: (s: string) => <Tag color={s === '高' ? 'red' : 'orange'}>{s}</Tag>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (s: string) => {
      const map: Record<string, { color: string; icon: React.ReactNode }> = {
        '已处理': { color: 'green', icon: <CheckCircleOutlined /> },
        '处理中': { color: 'blue', icon: <ClockCircleOutlined /> },
        '待确认': { color: 'orange', icon: <ExclamationCircleOutlined /> },
        '待分析': { color: 'default', icon: <ExclamationCircleOutlined /> },
      };
      const { color, icon } = map[s] || { color: 'default', icon: null };
      return <Tag icon={icon} color={color}>{s}</Tag>;
    },
  },
  { title: '日期', dataIndex: 'date', key: 'date', width: 110 },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>电镀企业质量驾驶舱</h2>
        <span style={{ color: '#888', fontSize: 13 }}>数据更新于 2026-06-25 09:00，均为模拟业务数据</span>
      </div>

      {/* 一、顶部业务价值卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="今日质量事件"
              value={topCards.todayEvents}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ExclamationCircleOutlined />}
              suffix="件"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="待工程师确认"
              value={topCards.pendingConfirm}
              valueStyle={{ color: '#d46b08' }}
              prefix={<ClockCircleOutlined />}
              suffix="件"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已复用历史案例"
              value={topCards.reusedCases}
              valueStyle={{ color: '#1890ff' }}
              prefix={<HistoryOutlined />}
              suffix="次"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="预计节省排查时间"
              value={topCards.savedHours}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ThunderboltOutlined />}
              suffix="小时"
            />
          </Card>
        </Col>
      </Row>

      {/* 二、降本增效概览 */}
      <Card
        title="本月降本增效概览"
        style={{ marginBottom: 24 }}
        extra={
          <span style={{ color: '#888', fontSize: 12 }}>
            基于模拟业务数据，用于展示系统在异常分析、案例复用和报告生成中的价值
          </span>
        }
      >
        <Row gutter={[32, 16]}>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#1890ff' }}>{costSaving.reducedAnalysis}</div>
              <div style={{ color: '#666', marginTop: 4 }}>减少重复分析（次）</div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#3f8600' }}>{costSaving.savedHours}</div>
              <div style={{ color: '#666', marginTop: 4 }}>节省排查时间（小时）</div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#722ed1' }}>{costSaving.autoReports}</div>
              <div style={{ color: '#666', marginTop: 4 }}>自动生成报告（份）</div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#d46b08' }}>{costSaving.newExperience}</div>
              <div style={{ color: '#666', marginTop: 4 }}>新增处理经验（条）</div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 三 & 四、最近质量事件 + 质量趋势 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="最近质量事件" bodyStyle={{ padding: '12px 16px' }}>
            <Table
              columns={eventColumns}
              dataSource={recentEvents}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="质量趋势对比（本月 vs 上月）">
            <div style={{ padding: '8px 0' }}>
              {trendData.map((item, i) => {
                const improved = item.lower
                  ? item.thisMonth < item.lastMonth
                  : item.thisMonth > item.lastMonth;
                return (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: '#333' }}>{item.label}</span>
                      <span style={{ color: improved ? '#3f8600' : '#cf1322', fontSize: 13 }}>
                        {item.thisMonth} {item.unit}
                        {improved ? ' ↓' : ' ↑'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Progress
                        percent={Math.min((item.thisMonth / Math.max(item.thisMonth, item.lastMonth)) * 100, 100)}
                        showInfo={false}
                        strokeColor={improved ? '#52c41a' : '#ff4d4f'}
                        size="small"
                        style={{ flex: 1 }}
                      />
                      <span style={{ color: '#999', fontSize: 12, minWidth: 60, textAlign: 'right' }}>
                        上月 {item.lastMonth} {item.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 五、质量风险提醒 */}
      <Card
        title={<><WarningOutlined style={{ color: '#d46b08', marginRight: 8 }} />质量风险提醒</>}
        style={{ marginBottom: 24 }}
        bodyStyle={{ padding: '12px 16px' }}
      >
        {riskAlerts.map((alert) => (
          <Alert
            key={alert.id}
            message={alert.text}
            type={alert.level === 'high' ? 'error' : 'warning'}
            showIcon
            style={{ marginBottom: 8 }}
          />
        ))}
      </Card>

      {/* 六、AI辅助工作状态 */}
      <Card title={<><RobotOutlined style={{ marginRight: 8 }} />AI 辅助工作状态</>}>
        <Row gutter={[32, 16]}>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#d46b08' }}>{aiStatus.pendingAnalysis}</div>
              <div style={{ color: '#666', marginTop: 4 }}>待分析事件</div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#3f8600' }}>{aiStatus.completedAnalysis}</div>
              <div style={{ color: '#666', marginTop: 4 }}>已完成AI分析</div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#1890ff' }}>{aiStatus.pendingConfirm}</div>
              <div style={{ color: '#666', marginTop: 4 }}>待工程师确认</div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#722ed1' }}>{aiStatus.formedCases}</div>
              <div style={{ color: '#666', marginTop: 4 }}>已形成案例</div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;