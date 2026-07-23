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
    body: 'Codex重度使用者，额度够不够蹬是最关心的事。当前Codex额度查看路径长，所以自己做了一个工具，能直接在工具栏直接实时看。',
    imageSrc: '/assets/tiezhi/codex.png',
    linkText: '已开源：https://github.com/eggplantbb/CodexPeek',
    linkHref: 'https://github.com/eggplantbb/CodexPeek',
  },
  map: {
    title: '我的技术花园',
    body: '缺少系统性学习的条件下，边做边学是相对高效且能坚持的学习方法。我做了一个SKILL把每次vibe coding用到的技术都记下来并做了可视化的网页，记录、解释每个项目用到的技术。',
    imageSrc: '/assets/tiezhi/garden.png',
    linkText: '已开源：https://learn-from-vibe-coding.vercel.app/dashboard',
    linkHref: 'https://learn-from-vibe-coding.vercel.app/dashboard/',
  },
  book: {
    title: '重逢',
    body: '基于ios框架做了一个App，能导入多个阅读软件的笔记，帮助回忆阅读内容。并且打造了一个AI伴读能力，共读一个笔记、从阅读经历中分析自己的阅读人格。',
    imageSrc: '/assets/tiezhi/book.png',
    linkText: '上线复盘：https://ucneahxnyont.feishu.cn/wiki/EQcLwpHkUiUdwDkXmLAcghXdnUd',
    linkHref: 'https://ucneahxnyont.feishu.cn/wiki/EQcLwpHkUiUdwDkXmLAcghXdnUd',
  },
  jinyong: {
    title: '武林舆图',
    body: '有一天我才意识到倚天里的明教竟然在西藏，才体会围攻光明顶的难度。所以做了一个金庸武侠世界里的门派分布图和关系图。能把各门各派的链接、位置看的一清二楚。',
    imageSrc: '/assets/tiezhi/jinyong.png',
    linkText: '已开源：https://github.com/eggplantbb/wuxaiditu',
    linkHref: 'https://github.com/eggplantbb/wuxaiditu',
  },
  write: {
    title: '随便写写',
    body: '有一个爱在雨雾玻璃窗上用手指写字的小毛病。干脆做几个小场景吧，能在网页上用户鼠标涂涂写写，带走思绪。',
    imageSrc: '/assets/tiezhi/write.png',
    linkText: '已开源：https://github.com/eggplantbb/suibianxiexie',
    linkHref: 'https://github.com/eggplantbb/suibianxiexie',
  },
};
