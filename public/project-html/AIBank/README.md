# 资金管家原型嵌入包

入口文件：`prototype/index.html`

整个 `portfolio-embed` 文件夹需要原样放进作品集项目的静态资源目录，不能只复制 `index.html`。

## 推荐目录

```text
你的作品集项目/
└── public/
    └── demos/
        └── fund-manager/   ← 将 portfolio-embed 内的文件放到这里
```

## HTML 嵌入

```html
<iframe
  src="/demos/fund-manager/prototype/index.html"
  title="资金管家原型"
  style="display:block;width:100%;height:calc(100vh - 64px);border:0;"
></iframe>
```

## React / Vite 嵌入

```jsx
<iframe
  src={`${import.meta.env.BASE_URL}demos/fund-manager/prototype/index.html`}
  title="资金管家原型"
  className="prototype-frame"
/>
```

```css
.prototype-frame {
  display: block;
  width: 100%;
  height: calc(100vh - 64px);
  min-height: 1000px;
  border: 0;
}
```

嵌入版按 `1086 × 1000px` 原尺寸展示，不会缩小手机内部的文字和控件。建议详情页使用全屏布局；浏览器空间不足时会出现页面滚动。
