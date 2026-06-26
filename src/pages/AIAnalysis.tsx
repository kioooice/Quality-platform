import React from 'react';
import { Card, Row, Col, Tag, Button, Alert, Statistic, Space } from 'antd';
import { RobotOutlined, FileSearchOutlined, CheckCircleOutlined, BookOutlined, FileTextOutlined, RiseOutlined, ToolOutlined } from '@ant-design/icons';
import { useRole } from '../context/RoleContext';

const eventInfo = { id: 'QE-2026-001', product: '汽车连接器A', batch: 'B-20260625-01', abnormal: '针孔', process: '镀镍 + 镀金', detectionSource: '外观检测 INS-2026-001', confidence: '96.8%', status: '待工程师确认', detectedAt: '2026-06-25 09:20' };
const aiConclusion = { rootCause: '前处理不充分，局部残留导致针孔风险升高', checkItems: ['脱脂工序参数', '水洗记录', '镀液杂质含量', '膜厚检测数据'], handleSuggestion: '复查前处理参数，抽查同批次产品，必要时补充清洗' };
const analysisBasis = [
  { label: '已关联产品资料', value: '3份' }, { label: '已对比标准图片', value: '24张' }, { label: '已检索历史案例', value: '8条' }, { label: '相似案例命中', value: '3条' }, { label: '相关工艺记录', value: '前处理、脱脂、水洗、镀镍' },
];
const similarCases = [
  { id: 'CASE-2026-018', product: '汽车连接器A', abnormal: '针孔', rootCause: '前处理不充分', reuse: 8, savedTime: '约12小时' },
  { id: 'CASE-2026-011', product: '新能源端子B', abnormal: '漏镀', rootCause: '脱脂不彻底', reuse: 5, savedTime: '约8小时' },
  { id: 'CASE-2025-096', product: 'PCB连接器C', abnormal: '麻点', rootCause: '镀液杂质', reuse: 12, savedTime: '约16小时' },
];

// ========== 经营决策层 ==========
const ExecutiveView: React.FC = () => (
  <>
    <Alert message="AI分析经营摘要" description="本月AI辅助分析已在针孔、漏镀、色差等异常中产生效果。当前重点异常 QE-2026-001 汽车连接器A针孔异常，AI建议结论与历史案例高度吻合，预计可减少重复排查并形成标准处理案例。" type="info" showIcon icon={<RiseOutlined />} style={{ marginBottom: 24 }} />
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="AI已完成分析" value={18} suffix="次" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="待工程师确认" value={5} suffix="项" valueStyle={{ color: '#d46b08' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="案例命中率" value={72} suffix="%" valueStyle={{ color: '#1890ff' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="预计节省排查" value={128} suffix="小时" /></Card></Col>
    </Row>
    <Card title="重点异常AI分析结论" style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 12 }}><span style={{ fontWeight: 600 }}>QE-2026-001 汽车连接器A针孔异常</span></div>
      <div style={{ padding: '8px 12px', background: '#fff7e6', borderRadius: 4, borderLeft: '3px solid #fa8c16', marginBottom: 12 }}>
        AI建议结论：{aiConclusion.rootCause}
      </div>
      <div style={{ color: '#666', fontSize: 13 }}>
        历史案例支撑：命中 3 条相似案例，其中 CASE-2026-018 已复用 8 次，节省排查约 12 小时。<br />
        风险影响：同类异常本周重复发生 12 次，建议确认根因并沉淀标准处理案例。
      </div>
    </Card>
  </>
);

// ========== 质量负责人 ==========
const AdminView: React.FC = () => (
  <>
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="AI分析任务" value={8} suffix="项" /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="待确认" value={5} suffix="项" valueStyle={{ color: '#d46b08' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="已完成确认" value={3} suffix="项" valueStyle={{ color: '#3f8600' }} /></Card></Col>
      <Col xs={24} sm={12} md={6}><Card><Statistic title="已形成案例" value={7} suffix="条" valueStyle={{ color: '#722ed1' }} /></Card></Col>
    </Row>
    <Card title="AI分析任务列表" style={{ marginBottom: 24 }}>
      {[
        { id: 'AI-2026-001', event: 'QE-2026-001', product: '汽车连接器A', abnormal: '针孔', status: '待确认', cases: 3 },
        { id: 'AI-2026-002', event: 'QE-2026-002', product: '新能源端子B', abnormal: '漏镀', status: '待确认', cases: 2 },
      ].map(t => (
        <Card key={t.id} size="small" style={{ marginBottom: 8 }}>
          <Row gutter={[16, 8]} align="middle">
            <Col xs={12} sm={3} style={{ fontWeight: 600 }}>{t.id}</Col>
            <Col xs={12} sm={3}><a>{t.event}</a></Col>
            <Col xs={12} sm={4}>{t.product}</Col>
            <Col xs={12} sm={3}><Tag color="red">{t.abnormal}</Tag></Col>
            <Col xs={12} sm={3}>相似案例 {t.cases} 条</Col>
            <Col xs={12} sm={3}><Tag color="orange">{t.status}</Tag></Col>
            <Col xs={24} sm={5}><Space><a>查看分析</a><a>分派处理</a></Space></Col>
          </Row>
        </Card>
      ))}
    </Card>
  </>
);

// ========== 质检员 ==========
const InspectorView: React.FC = () => (
  <>
    <Card title="检测异常AI识别结果" style={{ marginBottom: 24, borderLeft: '3px solid #cf1322' }}>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>产品</div><div style={{ fontWeight: 500 }}>汽车连接器A</div></Col>
        <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>批次</div><div>B-20260625-01</div></Col>
        <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>AI识别异常</div><Tag color="red">针孔</Tag></Col>
        <Col xs={12} sm={8} md={6}><div style={{ color: '#888', fontSize: 12 }}>置信度</div><div style={{ fontWeight: 600, color: '#cf1322' }}>96.8%</div></Col>
      </Row>
      <div style={{ marginTop: 12, padding: '8px 12px', background: '#fff1f0', borderRadius: 4, fontSize: 13, borderLeft: '3px solid #cf1322' }}>
        已生成质量事件 QE-2026-001，AI分析已完成，待工程师确认
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <a>查看检测结果</a>
        <a>补充检测图片</a>
        <a>查看质量事件</a>
      </div>
    </Card>
  </>
);

// ========== 质量工程师（完整视图） ==========
const QualityEngineerView: React.FC = () => (
  <>
    <Alert message="本模块价值" description="基于历史案例和工艺数据辅助异常分析，节省异常排查时间，降低重复分析和判断失误风险。" type="info" showIcon icon={<RobotOutlined />} style={{ marginBottom: 24 }} />
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} lg={7}>
        <Card title="事件信息" size="small" style={{ height: '100%' }}>
          <div style={{ marginBottom: 12 }}><div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>事件编号</div><div style={{ fontWeight: 600 }}>{eventInfo.id}</div></div>
          <div style={{ marginBottom: 12 }}><div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>产品</div><div>{eventInfo.product}</div></div>
          <div style={{ marginBottom: 12 }}><div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>批次</div><div>{eventInfo.batch}</div></div>
          <div style={{ marginBottom: 12 }}><div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>异常类型</div><Tag color="red">{eventInfo.abnormal}</Tag></div>
          <div style={{ marginBottom: 12 }}><div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>检测来源</div><div>{eventInfo.detectionSource}</div></div>
          <div style={{ marginBottom: 12 }}><div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>AI置信度</div><div style={{ fontWeight: 600, color: '#cf1322' }}>{eventInfo.confidence}</div></div>
          <div style={{ marginBottom: 12 }}><div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>电镀工艺</div><div>{eventInfo.process}</div></div>
          <div><div style={{ color: '#888', fontSize: 12, marginBottom: 2 }}>当前状态</div><Tag color="blue">{eventInfo.status}</Tag></div>
        </Card>
      </Col>
      <Col xs={24} lg={10}>
        <Card title={<><FileSearchOutlined style={{ marginRight: 8 }} />AI 分析结论</>} size="small" style={{ height: '100%' }}>
          <div style={{ marginBottom: 16 }}><div style={{ color: '#888', fontSize: 12, marginBottom: 4 }}>推荐原因</div><div style={{ padding: '8px 12px', background: '#fff7e6', borderRadius: 4, borderLeft: '3px solid #fa8c16' }}>{aiConclusion.rootCause}</div></div>
          <div style={{ marginBottom: 16 }}><div style={{ color: '#888', fontSize: 12, marginBottom: 4 }}>建议检查</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{aiConclusion.checkItems.map((item, i) => <Tag key={i} color="blue">{item}</Tag>)}</div></div>
          <div><div style={{ color: '#888', fontSize: 12, marginBottom: 4 }}>建议处理</div><div style={{ padding: '8px 12px', background: '#f6ffed', borderRadius: 4, borderLeft: '3px solid #52c41a' }}>{aiConclusion.handleSuggestion}</div></div>
        </Card>
      </Col>
      <Col xs={24} lg={7}>
        <Card title="分析依据" size="small" style={{ height: '100%' }}>
          {analysisBasis.map((item, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}><span style={{ color: '#666' }}>{item.label}</span><span style={{ fontWeight: 500 }}>{item.value}</span></div>)}
        </Card>
      </Col>
    </Row>
    <Card title={<><BookOutlined style={{ marginRight: 8 }} />相似历史案例</>} style={{ marginBottom: 24 }}>
      <Row gutter={[16, 16]}>
        {similarCases.map(c => (
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
    <Card>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button type="primary" icon={<CheckCircleOutlined />}>确认根因</Button>
        <Button icon={<FileSearchOutlined />}>修改建议</Button>
        <Button icon={<FileSearchOutlined />}>生成处理记录</Button>
        <Button icon={<BookOutlined />}>加入案例中心</Button>
        <Button icon={<FileTextOutlined />}>生成追溯报告</Button>
      </div>
    </Card>
  </>
);

// ========== 工艺工程师 ==========
const ProcessEngineerView: React.FC = () => (
  <>
    <Card title="工艺原因辅助分析" style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>QE-2026-001 汽车连接器A 针孔异常</div>
        <div style={{ marginBottom: 8 }}><span style={{ color: '#888' }}>关联工艺链：</span>{'前处理 / 脱脂 / 水洗 / 镀镍'.split(' / ').map((p, i) => <Tag key={i}>{p}</Tag>)}</div>
        <div style={{ marginBottom: 12 }}><span style={{ color: '#888' }}>可能工艺原因：</span><span style={{ color: '#cf1322' }}>前处理不充分、局部残留、镀液杂质波动</span></div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>建议检查参数</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['脱脂时间与浓度记录', '水洗段洁净度', '镀液杂质数据', '电流密度记录', '同批次膜厚检测结果'].map((item, i) => (
            <div key={i} style={{ padding: '6px 12px', background: '#fafafa', borderRadius: 4, borderLeft: '3px solid #1890ff', fontSize: 13 }}>{i + 1}. {item}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button type="primary" icon={<ToolOutlined />}>提交工艺判断</Button>
        <Button icon={<FileSearchOutlined />}>生成改善建议</Button>
        <Button icon={<CheckCircleOutlined />}>标记验证结果</Button>
      </div>
    </Card>
  </>
);

// ========== Main ==========
const AIAnalysis: React.FC = () => {
  const { currentRole } = useRole();
  const titles: Record<string, string> = {
    executive: 'AI分析经营摘要', admin: 'AI分析跟进中心', inspector: '检测异常AI识别结果', quality_engineer: 'QE-2026-001 针孔异常辅助分析', process_engineer: '工艺原因辅助分析',
  };
  const subs: Record<string, string> = {
    executive: '查看AI辅助分析对质量风险、处理效率和知识复用的影响',
    admin: '跟踪AI分析结论、工程师确认状态与事件处理进度',
    inspector: '查看检测侧AI识别结果、复核建议与质量事件生成状态',
    quality_engineer: '基于产品资料、标准图片、历史案例和工艺记录生成原因建议',
    process_engineer: '查看异常与前处理、脱脂、水洗、镀液、膜厚等工艺因素的关联',
  };
  const ViewMap: Record<string, React.FC> = { executive: ExecutiveView, admin: AdminView, inspector: InspectorView, quality_engineer: QualityEngineerView, process_engineer: ProcessEngineerView };
  const V = ViewMap[currentRole.id] || QualityEngineerView;
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{titles[currentRole.id] || 'AI辅助异常分析'}</h2>
        <span style={{ color: '#aaa', fontSize: 12 }}>{subs[currentRole.id]}</span>
      </div>
      <V />
    </div>
  );
};

export default AIAnalysis;