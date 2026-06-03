# Personal Collage Site

当前版本是桌面端优先的纯静态站骨架，支持：

- 5 个 tab 栏目切换
- 拼贴式元素配置
- 普通元素 hover 呼吸放大
- 工牌类元素 hover 摆动
- 微信二维码弹窗
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

- `src/content/tabs.ts`
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

## 视觉接入

等你提供 Figma 链接后，下一轮主要会改这几处：

- `src/styles.css`
- `src/content/tabs.ts`
- `public/assets/`

也就是把占位布局替换成你的真实拼贴素材、尺寸、角度、层级和字体样式。
