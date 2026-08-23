import type { TabDefinition } from '../../types';

// 这里维护 hello world 页的拼贴配置。
// 常改字段：
// x / y: 贴纸距离画布左上角的位置
// width / height: 贴纸宽高
// rotate: 旋转角度，单位是度
// zIndex: 图层顺序，越大越靠上
// imageSrc: 素材路径，使用 public 目录时这里写 /assets/... 即可
// hoverEffect: hover 动效，breathe 是轻微放大，swing 是左右摆动
// action: 点击行为，例如打开作品详情或打开微信弹窗
export const helloWorldTab: TabDefinition = {
  id: 'hello-world',
  label: 'hello world',
  themeClass: 'theme-lavender',
  items: [
    // 左侧工牌，hover 时左右晃动
    {
      id: 'badge-left',
      imageSrc: '/assets/tiezhi/1-card.png',
      x: -50,
      y: 5,
      width: 224,
      height: 578,
      rotate: -11,
      zIndex: 2,
      className: 'floating-cutout drop-in-from-top always-swing',
    },
    // 左侧机票
    {
      id: 'profile-card',
      imageSrc: '/assets/tiezhi/1-ticket.png',
      x: 120,
      y: 33,
      width: 279,
      height: 373,
      rotate:10,
      zIndex: 1,
      hoverEffect: 'breathe',
      className: 'floating-cutout',
    },
    //浙大校徽
    {
      id: 'xiaohuiZJU',
      imageSrc: '/assets/tiezhi/1-ZJU.png',
      x: 250,
      y: 400,
      width: 100,
      zIndex: 4,
      rotate: -10,
      hoverEffect: 'breathe',
      className: 'floating-cutout',
    },
    //公司logo
    {
      id: 'group',
      imageSrc: '/assets/tiezhi/1-group.png',
      x: 40,
      y: 700,
      width: 100,
      zIndex: 4,
      rotate: 0,
      hoverEffect: 'breathe',
      className: 'floating-cutout',
    },
    // 微信贴纸，点击后打开二维码弹窗
    {
      id: 'wechat',
      imageSrc: '/assets/tiezhi/1-wechat.png',
      x: 251,
      y: 670,
      width: 72,
      height: 72,
      zIndex: 4,
      rotate: -2,
      hoverEffect: 'breathe',
      action: { type: 'openWechat' },
      className: 'floating-cutout',
    },
    // 我的名字
    {
      id:'myname' ,
      imageSrc: '/assets/tiezhi/1-name.png',
      x: 423,
      y: 280,
      width: 300,
      zIndex: 4,
      rotate: 0,
      className: 'floating-cutout',
    },
    // 中间的自我介绍文本
    {
      id: 'intro-note',
      body: '2022年从浙江大学毕业，进入蚂蚁成为体验设计师，已有4年时间。负责业务涵盖B/C端、App/Web双端。包括：\n· 支付交易链路的设计；\n· 垂直客群的金融产品设计；\n· 平台规范的设计。\n\n同时我还有牵头业务做用户调研，不只for产品需求、设计表达，还为金融风险、关系链等做洞察。\n\n感兴趣的话和我聊聊吧～',
      x: 423,
      y: 400,
      width: 399,
      height: 195,
      className: 'plain-copy',
    },
    // 右上项目卡片
    {
      id: 'project-cover-1',
      imageSrc: '/assets/tiezhi/1-ux.png',
      x: 742,
      y: 45,
      width: 500,
      rotate: -5,
      zIndex: 3,
      hoverEffect: 'breathe',
      className: 'floating-cutout text-hidden',
    },
    // 右下木板项目
    {
      id: 'project-cover-2',
      imageSrc: '/assets/tiezhi/1-photos.png',
      x: 900,
      y: 286,
      width: 360,
      rotate: 8,
      zIndex: 2,
      hoverEffect: 'breathe',
      className: 'floating-cutout text-hidden',
    },
    // 左下终端风贴纸
    {
      id: 'terminal-card',
      imageSrc: '/assets/tiezhi/1-terminal.png',
      x: 36,
      y: 520,
      width: 300,
      height: 178,
      rotate: -3,
      zIndex: 3,
      hoverEffect: 'breathe',
      action: { type: 'openTerminalProfile' },
      className: 'floating-cutout',
    },
  ],
};
