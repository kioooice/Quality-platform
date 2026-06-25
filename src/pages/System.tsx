import React from 'react';
import { Card, Row, Col, Tag } from 'antd';
import { UserOutlined, TeamOutlined, AppstoreOutlined, BugOutlined, RobotOutlined, FileTextOutlined } from '@ant-design/icons';

const modules = [
  { title: '用户管理', icon: <UserOutlined style={{ fontSize: 28, color: '#1890ff' }} />, desc: '管理系统用户、部门和登录信息', count: '8个用户' },
  { title: '角色配置', icon: <TeamOutlined style={{ fontSize: 28, color: '#722ed1' }} />, desc: '配置管理员、工程师、检测员等角色权限', count: '4个角色' },
  { title: '产品分类', icon: <AppstoreOutlined style={{ fontSize: 28, color: '#13c2c2' }} />, desc: '维护电镀产品分类和工艺参数模板', count: '6个产品' },
  { title: '异常类型字典', icon: <BugOutlined style={{ fontSize: 28, color: '#eb2f96' }} />, desc: '配置针孔、漏镀、麻点等异常类型和严重程度', count: '8个类型' },
  { title: 'AI分析配置', icon: <RobotOutlined style={{ fontSize: 28, color: '#fa8c16' }} />, desc: '配置AI分析规则、案例匹配策略和报告模板', count: '运行中' },
  { title: '报告模板配置', icon: <FileTextOutlined style={{ fontSize: 28, color: '#52c41a' }} />, desc: '配置异常追溯报告、AI分析报告等模板格式', count: '5个模板' },
];

const recentLogs = [
  { time: '2026-06-25 09:35', user: 'admin', action: '登录系统', module: '认证' },
  { time: '2026-06-25 09:20', user: '张工', action: '创建检测任务 INS-2026-001', module: '检测中心' },
  { time: '2026-06-25 08:45', user: '李工', action: '确认事件 QE-2026-002', module: '质量事件' },
  { time: '2026-06-24 16:30', user: '王工', action: '导出质量报告 RPT-2026-015', module: '报告中心' },
  { time: '2026-06-24 14:00', user: 'admin', action: '更新异常类型字典', module: '系统管理' },
];

const System: React.FC = () => {
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>系统管理</h2>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {modules.map((m, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ flexShrink: 0, marginTop: 4 }}>{m.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{m.title}</div>
                  <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>{m.desc}</div>
                  <Tag color="blue">{m.count}</Tag>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="最近操作日志">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 400 }}>时间</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 400 }}>用户</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 400 }}>操作</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 400 }}>模块</th>
            </tr>
          </thead>
          <tbody>
            {recentLogs.map((log, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px 12px' }}>{log.time}</td>
                <td style={{ padding: '8px 12px' }}>{log.user}</td>
                <td style={{ padding: '8px 12px' }}>{log.action}</td>
                <td style={{ padding: '8px 12px' }}><Tag>{log.module}</Tag></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default System;