import { bankProject } from './bank';
import { duizhangProject } from './duizhang';
import { hkbAIProject } from './hkbAI';
import { huikuanbaoProject } from './huikuanbao';
import { mdzxProject } from './mdzx';
import { nongcunProject } from './nongcun';
import { shejiProject } from './sheji';
import { thzrProject } from './thzr';

export const projects = [
  duizhangProject,
  hkbAIProject,
  bankProject,
  shejiProject,
  huikuanbaoProject,
  thzrProject,
  mdzxProject,
  nongcunProject,
];

export const projectMap = new Map(projects.map((project) => [project.id, project]));
