import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type RoleId = 'admin' | 'inspector' | 'quality_engineer' | 'process_engineer';

export interface RoleConfig {
  id: RoleId;
  name: string;
  avatar: string;
  workspaceTitle: string;
  workspaceSubtitle: string;
}

export const roles: RoleConfig[] = [
  {
    id: 'admin',
    name: '管理员',
    avatar: '管',
    workspaceTitle: '电镀质量运营中心',
    workspaceSubtitle: '面向质量事件、AI分析、案例沉淀与追溯报告的统一运营看板',
  },
  {
    id: 'inspector',
    name: '质检员',
    avatar: '检',
    workspaceTitle: '检测任务工作台',
    workspaceSubtitle: '面向每日检测任务、异常发现、复核与质量事件提交的工作台',
  },
  {
    id: 'quality_engineer',
    name: '质量工程师',
    avatar: '质',
    workspaceTitle: '质量事件处理工作台',
    workspaceSubtitle: '面向异常分析、根因确认、处置方案与案例沉淀的质量工程师工作台',
  },
  {
    id: 'process_engineer',
    name: '工艺工程师',
    avatar: '工',
    workspaceTitle: '工艺异常协同工作台',
    workspaceSubtitle: '面向电镀工艺参数、异常关联、原因排查与改善验证的协同工作台',
  },
];

interface RoleContextType {
  currentRole: RoleConfig;
  setRole: (roleId: RoleId) => void;
}

const RoleContext = createContext<RoleContextType>({
  currentRole: roles[0],
  setRole: () => {},
});

export const useRole = () => useContext(RoleContext);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<RoleConfig>(roles[0]);

  const setRole = (roleId: RoleId) => {
    const found = roles.find((r) => r.id === roleId);
    if (found) setCurrentRole(found);
  };

  return (
    <RoleContext.Provider value={{ currentRole, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};