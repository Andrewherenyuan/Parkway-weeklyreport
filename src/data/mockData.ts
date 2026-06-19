import type { Report, Template, User, AnalyticsData } from '@/types';

export const mockUser: User = {
  id: '1',
  name: '张明医生',
  email: 'zhangming@medical.com',
  role: 'user',
};

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: '医疗周报模板',
    description: '适用于日常医疗工作汇报',
    content: `# 医疗周报

## 一、本周工作概述

## 二、重点工作内容
- 
- 
- 

## 三、数据统计
| 项目 | 数量 |
|------|------|
| 门诊接诊 |  |
| 手术台次 |  |
| 会诊次数 |  |

## 四、问题与建议

## 五、下周计划`,
    category: 'medical',
  },
  {
    id: '2',
    name: '科研报告模板',
    description: '适用于医疗科研项目汇报',
    content: `# 科研进展报告

## 一、项目概述

## 二、本周研究进展
- 
- 

## 三、实验数据
| 指标 | 结果 |
|------|------|
| 样本数量 |  |
| 成功率 |  |

## 四、遇到的问题

## 五、下一步计划`,
    category: 'research',
  },
  {
    id: '3',
    name: '部门总结模板',
    description: '适用于部门周度工作总结',
    content: `# 部门周工作总结

## 一、工作完成情况

## 二、团队协作
- 
- 

## 三、关键指标
| 指标 | 本周 | 上周 | 变化 |
|------|------|------|------|
| 效率 |  |  |  |
| 质量 |  |  |  |

## 四、待解决事项

## 五、下周重点`,
    category: 'general',
  },
];

export const mockReports: Report[] = [
  {
    id: '1',
    title: '2024年第23周医疗工作汇报',
    content: `# 2024年第23周医疗工作汇报

## 一、本周工作概述
本周共完成门诊接诊120人次，手术15台，参与会诊8次。

## 二、重点工作内容
- 完成3例复杂心脏手术
- 组织科室病例讨论2次
- 参与院级医疗质量检查

## 三、数据统计
| 项目 | 数量 |
|------|------|
| 门诊接诊 | 120 |
| 手术台次 | 15 |
| 会诊次数 | 8 |

## 四、问题与建议
建议增加门诊分诊人员配置，提高接诊效率。

## 五、下周计划
- 完成5台常规手术
- 准备季度工作总结`,
    templateId: '1',
    authorId: '1',
    authorName: '张明医生',
    status: 'published',
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: '2',
    title: '癌症研究项目进展报告',
    content: `# 癌症研究项目进展报告

## 一、项目概述
本项目致力于新型抗癌药物的研发与临床试验。

## 二、本周研究进展
- 完成第3批临床试验数据采集
- 分析了500份样本数据
- 撰写中期报告初稿

## 三、实验数据
| 指标 | 结果 |
|------|------|
| 样本数量 | 500 |
| 成功率 | 85% |

## 四、遇到的问题
部分样本采集遇到困难，需优化采集流程。

## 五、下一步计划
继续数据采集，准备论文撰写`,
    templateId: '2',
    authorId: '1',
    authorName: '张明医生',
    status: 'published',
    createdAt: new Date('2024-06-09'),
    updatedAt: new Date('2024-06-09'),
  },
  {
    id: '3',
    title: '2024年第24周工作计划',
    content: `# 2024年第24周工作计划

## 一、本周工作概述


## 二、重点工作内容


## 三、数据统计


## 四、问题与建议


## 五、下周计划`,
    templateId: '1',
    authorId: '1',
    authorName: '张明医生',
    status: 'draft',
    createdAt: new Date('2024-06-12'),
    updatedAt: new Date('2024-06-12'),
  },
];

export const mockAnalyticsData: AnalyticsData = {
  weeklyTrend: [
    { week: '第19周', count: 8 },
    { week: '第20周', count: 12 },
    { week: '第21周', count: 10 },
    { week: '第22周', count: 15 },
    { week: '第23周', count: 18 },
    { week: '第24周', count: 14 },
  ],
  completionRate: 87,
  totalReports: 156,
  publishedReports: 136,
  draftReports: 20,
};
