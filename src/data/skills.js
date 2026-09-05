import {
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiSass,
  SiBootstrap,
  SiReactiveresume,
  SiMicropython,
  SiGit,
  SiBitbucket,
  SiJira,
  SiPostman,
  SiSwagger,
  SiJasmine,
  SiKeras,
  SiDotnet,
  SiMysql,
} from 'react-icons/si'

import { VscCode } from 'react-icons/vsc'
import { FaCode, FaServer, FaCloud, FaDatabase } from 'react-icons/fa'

export const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    tag: 'lang --list',
    skills: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', level: 92 },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', level: 90 },
      { name: 'C#', icon: FaCode, color: '#68217a', level: 78 }
    ],
  },

  {
    id: 'frontend',
    title: 'Frontend',
    tag: 'ui --stack',
    skills: [
      { name: 'Angular', icon: SiAngular, color: '#dd0031', level: 95 },
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26', level: 92 },
      { name: 'CSS3', icon: SiCss, color: '#1572b6', level: 90 },
      { name: 'SCSS', icon: SiSass, color: '#cc6699', level: 88 },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952b3', level: 85 },
      { name: 'Angular Material', icon: FaCode, color: '#1976d2', level: 85 },
    ],
  },

  {
    id: 'angular',
    title: 'Angular Ecosystem',
    tag: 'ng --stack',
    skills: [
      { name: 'Angular Signals', icon: SiAngular, color: '#dd0031', level: 88 },
      { name: 'RxJS', icon: SiReactiveresume, color: '#b7178c', level: 92 },
      { name: 'NgRx', icon: SiReactiveresume, color: '#ba2bd2', level: 85 },
      { name: 'Angular CLI', icon: SiAngular, color: '#dd0031', level: 90 },
      { name: 'Lazy Loading', icon: FaCode, color: '#22d3ee', level: 90 },
      { name: 'Angular Universal / SSR', icon: SiAngular, color: '#dd0031', level: 80 },
    ],
  },

  {
    id: 'backend',
    title: 'Backend',
    tag: 'server --run',
    skills: [
      { name: '.NET Core', icon: SiDotnet, color: '#512bd4', level: 82 },
      { name: 'ASP.NET Web API', icon: SiDotnet, color: '#512bd4', level: 82 },
      { name: 'REST APIs', icon: FaCode, color: '#22d3ee', level: 90 },
      { name: 'Microservices', icon: FaServer, color: '#64748b', level: 78 },
      { name: 'C#', icon: FaCode, color: '#68217a', level: 78 },
    ],
  },

  {
    id: 'database',
    title: 'Database',
    tag: 'db --connect',
    skills: [
      
      { name: 'SQL', icon: SiMysql, color: '#cc2927', level: 82 },
      { name: 'SQL Server', icon: SiMysql, color: '#cc2927', level: 85 },
      { name: 'DBMS', icon: FaDatabase, color: '#7c5cff', level: 82 },
      { name: 'Stored Procedures', icon: SiMysql, color: '#7c5cff', level: 82 },
      { name: 'SQL Queries', icon: SiMysql, color: '#cc2927', level: 85 },
    ],
  },

  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    tag: 'deploy --pipeline',
    skills: [
      { name: 'Microsoft Azure', icon: SiMicropython, color: '#0078d4', level: 78 },
      { name: 'Azure App Services', icon: SiMicropython, color: '#0078d4', level: 75 },
      { name: 'Azure DevOps', icon: SiMicropython, color: '#0078d4', level: 82 },
      { name: 'CI/CD Pipelines', icon: FaCloud, color: '#22d3ee', level: 82 },
      { name: 'Git', icon: SiGit, color: '#f05032', level: 90 },
      { name: 'Bitbucket', icon: SiBitbucket, color: '#0052cc', level: 85 },
    ],
  },

  {
    id: 'testing',
    title: 'Testing',
    tag: 'test --run',
    skills: [
      { name: 'Jasmine', icon: SiJasmine, color: '#8a4182', level: 82 },
      { name: 'Karma', icon: SiKeras, color: '#56b3b4', level: 80 },
      { name: 'Unit Testing', icon: FaCode, color: '#22d3ee', level: 85 },
      { name: 'Integration Testing', icon: FaCode, color: '#22d3ee', level: 75 },
    ],
  },

  {
    id: 'tools',
    title: 'Tools',
    tag: 'tools --which',
    skills: [
      { name: 'VS Code', icon: VscCode, color: '#007acc', level: 92 },
      { name: 'Postman', icon: SiPostman, color: '#ff6c37', level: 88 },
      { name: 'Swagger', icon: SiSwagger, color: '#85ea2d', level: 82 },
      { name: 'Jira', icon: SiJira, color: '#0052cc', level: 85 },
      { name: 'Git', icon: SiGit, color: '#f05032', level: 90 },
      { name: 'Bitbucket', icon: SiBitbucket, color: '#0052cc', level: 85 },
    ],
  },
]