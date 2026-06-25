import React from 'react';
import { Card, Row, Col, Tag, Button, Alert } from 'antd';
import { RobotOutlined, FileSearchOutlined, CheckCircleOutlined, BookOutlined, FileTextOutlined } from '@ant-design/icons';

const eventInfo = {
  id: 'QE-2026-001',
  product: '汽车连接器A',
  batch: 'B-20260625-01',
  abnormal: '针孔',
  process: '镀镍 + 镀金',
  detectionSource: '外观检测 INS-2026-001',
  confidence: '96.8%',
  status: '待工程师确认',
  detectedAt: '2026-06-25 09:20',
};

const aiConclusion = {
  rootCause: '前处理不充分，局部残留导致针孔风险升高',
  checkItems: ['脱脂工序参数', '水洗记录', '镀液杂质含量', '膜厚检测数据'],
  handleSuggestion: '复查前处理参数，抽查同批次产品，必要时补充清洗',
};

const analysisBasis = [
  { label: '已关联产品资料', value: '3份' },
  { label: '已对比标准图片', value: '24张' },
  { label: '已检索历史案例', value: '8条' },
  { label: '相似案例命中', value: '3条' },
  { label: '相关工艺记录', value: '前处理、脱脂、水洗、镀镍' },
];

const similarCases = [
  { id: 'CASE-2026-018', product: '汽车连接器A', abnormal: '针孔', rootCause: '前处理不充分', reuse: 8, savedTime: '约12小时' },
  { id: 'CASE-2026-011', product: '新能源端子B', abnormal: '漏镀', rootCause: '脱脂不彻底', reuse: 5, savedTime: '约8小时' },
  { id: 'CASE-2025-096', product: 'PCB连接器C', abnormal: '麻点', rootCause: '镀液杂质', reuse: 12, savedTime: '约16小时' },
];

const AIAnalysis: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>AI辅助异常分析</h2>
        <span style={{ color: '#666' }}>QE-2026-001 汽车连接器A 针孔异常</span>
      </div>

      <Alert
        message="本模块价值"
        description="基于历史案例和工艺数据辅助异常分析，节省异常排查时间，降低重复分析和判断失误风险。"
        type="info"
        showIcon
        icon={<RobotOutlined />}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* 左侧：事件信息 */}
        <Col xs={24} lg={7}>
          <Card title="事件信息" size="small" style={{ height: '100%' }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>事件编号</div>
              <div style={{ fontWeight: 600 }}>{eventInfo.id}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>产品</div>
              <div>{eventInfo.product}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>批次</div>
              <div>{eventInfo.batch}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>异常类型</div>
              <div><Tag color="red">{eventInfo.abnormal}</Tag></div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>检测来源</div>
              <div>{eventInfo.detectionSource}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>AI置信度</div>
              <div style={{ fontWeight: 600, color: '#cf1322' }}>{eventInfo.confidence}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>电镀工艺</div>
              <div>{eventInfo.process}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>当前状态</div>
              <div><Tag color="blue">{eventInfo.status}</Tag></div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>检测发现时间</div>
              <div>{eventInfo.detectedAt}</div>
            </div>
          </Card>
        </Col>

        {/* 中间：AI分析结论 */}
        <Col xs={24} lg={10}>
          <Card title={<><FileSearchOutlined style={{ marginRight: 8 }} />AI 分析结论</>} size="small" style={{ height: '100%' }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 4 }}>推荐原因</div>
              <div style={{ padding: '8px 12px', background: '#fff7e6', borderRadius: 4, borderLeft: '3px solid #fa8c16' }}>
                {aiConclusion.rootCause}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 4 }}>建议检查</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {aiConclusion.checkItems.map((item, i) => (
                  <Tag key={i} color="blue">{item}</Tag>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 4 }}>建议处理</div>
              <div style={{ padding: '8px 12px', background: '#f6ffed', borderRadius: 4, borderLeft: '3px solid #52c41a' }}>
                {aiConclusion.handleSuggestion}
              </div>
            </div>
          </Card>
        </Col>

        {/* 右侧：分析依据 */}
        <Col xs={24} lg={7}>
          <Card title="分析依据" size="small" style={{ height: '100%' }}>
            {analysisBasis.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#666' }}>{item.label}</span>
                <span style={{ fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* 相似历史案例 */}
      <Card title={<><BookOutlined style={{ marginRight: 8 }} />相似历史案例</>} style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          {similarCases.map((c) => (
            <Col xs={24} md={8} key={c.id}>
              <Card size="small" style={{ background: c.id === 'CASE-2026-018' ? '#fff7e6' : '#fafafa', border: c.id === 'CASE-2026-018' ? '1px solid #fa8c16' : undefined }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>{c.id} {c.id === 'CASE-2026-018' && <Tag color="orange">最佳匹配</Tag>}</div>
                <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>产品：</span>{c.product}</div>
                <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>异常：</span><Tag color="red">{c.abnormal}</Tag></div>
                <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>根因：</span>{c.rootCause}</div>
                <div style={{ marginBottom: 4 }}><span style={{ color: '#888' }}>复用：</span>{c.reuse}次</div>
                <div><span style={{ color: '#888' }}>节省排查：</span>{c.savedTime}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 操作按钮 */}
      <Card>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button type="primary" icon={<CheckCircleOutlined />}>工程师确认</Button>
          <Button icon={<FileSearchOutlined />}>生成处理记录</Button>
          <Button icon={<BookOutlined />}>加入案例中心</Button>
          <Button icon={<FileTextOutlined />}>生成追溯报告</Button>
        </div>
      </Card>
    </div>
  );
};

export default AIAnalysis;