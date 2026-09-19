import { projectsData } from '../content/projects';
import { experienceData } from '../content/experience';
import { educationData } from '../content/education';
import * as d3 from 'd3-force';

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  group: 'project' | 'tech' | 'experience' | 'education';
  sublabel?: string;
  radius: number;
  color: string;
  slug?: string;
  proofType?: string;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  relation: string;
  value?: number;
}

export interface CausalGraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export function buildCausalGraph(): CausalGraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const techSet = new Set<string>();

  // 1. Projects
  projectsData.forEach((p) => {
    nodes.push({
      id: `proj-${p.id}`,
      label: p.title.split(':')[0], // Compact title
      group: 'project',
      sublabel: p.category,
      radius: p.featured ? 22 : 17,
      color: '#C6FF3D', // Electric lime
      slug: p.slug,
      proofType: p.proofType,
    });

    // Tech connections
    p.techStack.forEach((t) => {
      techSet.add(t);
      links.push({
        source: `tech-${t}`,
        target: `proj-${p.id}`,
        relation: 'powers',
      });
    });
  });

  // 2. Experience (Revolt Motors)
  experienceData.forEach((exp) => {
    const expId = `exp-${exp.id}`;
    nodes.push({
      id: expId,
      label: exp.company,
      group: 'experience',
      sublabel: exp.role,
      radius: 20,
      color: '#FF5B1F', // Signal orange
    });

    // Connect Revolt to Retail War Room & CausalEV
    links.push({
      source: expId,
      target: 'proj-retail-war-room',
      relation: 'incubated',
    });
    links.push({
      source: expId,
      target: 'proj-causal-ev',
      relation: 'inspired_by',
    });

    exp.techStack.forEach((t) => {
      techSet.add(t);
      links.push({
        source: `tech-${t}`,
        target: expId,
        relation: 'applied_in',
      });
    });
  });

  // 3. Education (PIET)
  educationData.forEach((edu) => {
    const eduId = 'edu-piet';
    nodes.push({
      id: eduId,
      label: 'PIET (2024-28)',
      group: 'education',
      sublabel: edu.field,
      radius: 18,
      color: '#60A5FA', // Blue
    });

    links.push({
      source: eduId,
      target: 'proj-cattle-breed',
      relation: 'academic_research',
    });
  });

  // 4. Tech Nodes
  techSet.forEach((tech) => {
    nodes.push({
      id: `tech-${tech}`,
      label: tech,
      group: 'tech',
      sublabel: 'Skill / Tool',
      radius: 12,
      color: '#EDEAE3', // Clean off-white
    });
  });

  return { nodes, links };
}
