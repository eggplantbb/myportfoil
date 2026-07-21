# Personal Collage Site

当前版本是桌面端优先的纯静态站骨架，支持：

- 5 个 tab 栏目切换
- 拼贴式元素配置
- 普通元素 hover 呼吸放大
- 工牌类元素 hover 摆动
- 微信二维码弹窗
- 信封开场与上拉进入动效
- AI 产品介绍弹窗
- 作品整页沉浸式展示
- Keynote 长图与完整 HTML 单页两种作品详情模式

## 启动

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
```

输出目录是 `dist/`，适合部署到大陆外的静态托管。

## 内容配置

- `src/content/tabs/`
  - 配置每个 tab 的拼贴元素、位置、旋转角度、hover 效果、点击行为
- `src/content/projects/`
  - 每个作品一个文件，分别配置自己的详情内容
- `src/content/projects/index.ts`
  - 汇总所有作品

### 长图作品

把导出的图片放到 `public/project-images/`，然后在对应作品文件里配置：

```ts
detail: {
  type: 'image',
  images: ['/project-images/your-project-01.png']
}
```

### HTML 作品

把完整单页放到 `public/project-html/your-project/`，然后在对应作品文件里配置：

```ts
detail: {
  type: 'html',
  src: '/project-html/your-project/index.html'
}
```

## 项目用到的能力

### 技术能力

- React 18 组件化开发
- TypeScript 类型约束
- Vite 本地开发与静态打包
- 纯静态站点部署，无后端依赖

### 展示与交互能力

- 多 tab 栏目切换
- 拼贴式画布布局
- 元素绝对定位、旋转、层级控制
- hover 动效（呼吸放大、摆动）
- 点击卡片进入作品详情
- 从卡片位置展开和收起的沉浸式转场
- 弹窗展示微信二维码
- 自定义鼠标样式与视觉素材接入

### 内容组织能力

- tab 级内容配置，按栏目组织页面内容
- project 级内容配置，按作品组织详情数据
- 支持图片长图作品展示
- 支持嵌入完整 HTML 单页作品
- 公共素材、项目图片、项目 HTML 分目录管理

### 设计接入能力

- 可替换字体、贴纸、背景纹理等视觉资产
- 可根据 Figma 产出继续调整布局、尺寸、角度和样式
