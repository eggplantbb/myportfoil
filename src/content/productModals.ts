import type { ProductModalId } from '../types';

export type ProductModalContent = {
  title: string;
  body: string;
  imageSrc?: string;
  linkText?: string;
  linkHref?: string;
};

export const productModalContent: Record<ProductModalId, ProductModalContent> = {
  codex: {
    title: 'Codex Peek',
    body: 'Codex重度使用者，自己做了一个工具，能够对当前的额度消耗有直观的感知，不用再产品里多步点击查看。已开源',
    imageSrc: '/assets/tiezhi/codex.png',
    linkText: 'eggplantbb/CodexPeek',
    linkHref: 'https://github.com/eggplantbb/CodexPeek',
  },
  map: {
    title: 'learn from vibe coding',
    body: '先做再学是相对高效的学习方法。我最为技术小白做了一个SKILL，把每次vibe coding用到的技术都记录下来，形成一个“技术花园”，记录、解释每个项目用到的技术和可避免的问题。',
    imageSrc: '/assets/tiezhi/garden.png',
    linkText: 'learn-from-vibe-coding.vercel.app/dashboard',
    linkHref: 'https://learn-from-vibe-coding.vercel.app/dashboard/',
  },
  book: {
    title: '重逢',
    body: '基于ios框架做了一个App，能导入多阅读软件的笔记，帮助回忆阅读的过往，并从书籍阅读经历中分析自己的阅读人格。',
    imageSrc: '/assets/tiezhi/book.png',
    linkText: 'App Store上线失败（复盘：）',
  },
  jinyong: {
    title: 'jinyong',
    body: '这里是一句产品介绍占位，后续替换成对应产品的核心价值。',
  },
  write: {
    title: 'write',
    body: '这里是一句产品介绍占位，后续替换成对应产品的核心价值。',
  },
};
