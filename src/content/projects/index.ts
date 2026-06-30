import { aiBankProject } from './AIBank';
import { hkbAIProject } from './hkbAI';
import { jinyongProject } from './jinyong';
import { huikuanbaoProject } from './huikuanbao';
import { maoxuanProject } from './maoxuan';
import { mdzxProject } from './mdzx';
import { nongcunProject } from './nongcun';
import { shejiProject } from './sheji';
import { thzrProject } from './thzr';

export const projects = [
  hkbAIProject,
  aiBankProject,
  maoxuanProject,
  jinyongProject,
  shejiProject,
  huikuanbaoProject,
  thzrProject,
  mdzxProject,
  nongcunProject,
];

export const projectMap = new Map(projects.map((project) => [project.id, project]));
