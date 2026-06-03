import { huikuanbaoProject } from './huikuanbao';
import { mdzxProject } from './mdzx';
import { nongcunProject } from './nongcun';
import { thzrProject } from './thzr';

export const projects = [
  huikuanbaoProject,
  thzrProject,
  mdzxProject,
  nongcunProject,
];

export const projectMap = new Map(projects.map((project) => [project.id, project]));
