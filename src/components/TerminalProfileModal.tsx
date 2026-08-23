import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

type ProfileStage = {
  id: string;
  command: string;
  title: string;
  subtitle: string;
  cards: Array<{
    title: string;
    body: string;
  }>;
};

type TerminalProfileModalProps = {
  centerX?: number | null;
  onClose: () => void;
};

const profileStages: ProfileStage[] = [
  {
    id: 'zju',
    command: '浙江大学',
    title: '浙江大学',
    subtitle: '工业设计系，建立系统性的设计思维与方法、提高问题拆解和表达的基础能力。',
    cards: [
      {
        title: '工业设计背景',
        body: '主修商业服务设计，学习了定性定量的用户调研、设计思维、设计表达等基础能力。参与撰写《服务设计工程》一书。',
      },
      {
        title: '零售行业研究',
        body: '作为研究员联合36Kr研究院，针对快闪行业，采访多类行业专家（地产商/策展商/品牌方…），完成国内首份快闪行业白皮书并发布。',
      },
    ],
  },
  {
    id: 'meituan',
    command: '美团',
    title: '美团',
    subtitle: '2020.07-2020.10  2021.06-2021.09 谢谢美团的主管和导师，给了我连续2个暑期实习的机会，把我领进互联网商业设计的世界，给我打下了一定的基础。',
    cards: [
      {
        title: '餐饮商家产品设计',
        body: '参与开店宝双端体验设计，也参与部分美团餐饮BD的中后台产品设计。在这个过程中让我认识了互联网的落地设计是什么样的流程，实际参与到完整的需求闭环。',
      },
      {
        title: '内容体验质量提升项目',
        body: '与NLP算法工程师协作，拆解优质店铺描述、菜品名称等文案表达规则，辅助算法模型调优，在商家输入菜品描述等信息时为商家提优更优质的文案参考。',
      },
    ],
  },
  {
    id: 'ant',
    command: '阿里巴巴与蚂蚁集团',
    title: '阿里巴巴与蚂蚁集团',
    subtitle: '2022.04-2026.01 开始理解商业运转的逻辑以及设计在背后能做的事。设计是一种解决问题的方式和手段。',
    cards: [
      {
        title: '特色客群金融产品设计',
        body: '针对经销商/电商商家/加盟商/跨境商家等，形成从用户调研-机会洞察-设计提案的工作路径。\n\n 在理解各商业模式和经营诉求之后，对设计的推导有更扎实的支撑。',
      },
      {
        title: '支付结算与平台型产品设计',
        body: '负责转账/入金/还款等核心交易链路的体验优化，并基于平台视角定义银行App/小程序的设计规范。\n\n 在成熟的标准化链路里探索创新机会，加强了一致性的框架设计和推动能力。',
      },
      {
        title: '用户洞察与研究',
        body: '主导信贷侧相关用研，参与更前置的业务和产品方向定义，如多主体授信/农村特色客群洞察等项目。\n\n 摸索出更加“在地性”的调研方法和手段，强化跨职能的协作能力。',
      },
    ],
  },
  {
    id: 'fintech',
    command: '兴业银行总行',
    title: ' AI创新工作室',
    subtitle: '2026.01-至今 参与更广泛的设计形态、用更丰富的设计手段。',
    cards: [
      {
        title: '服务设计',
        body: '参与强线上线下服务体验的一致性，对金融服务中的体验设计有了更强的感悟。',
      },
      {
        title: '下一代 AI 产品探索',
        body: '定义一个具有高月活、多存量用户的App的AI化改造。\n\n 通过混合调研方式为AI产品方向定基础，vibe未来AI产品原型，沉淀设计规范的design.md文档，拉齐团队从"设计意图→可运行原型"的快速验证链路。',
      },
      {
        title: 'AI 学习组织',
        body: '组织部门定期开展AI分享会，学习AI知识与工作应用案例。探索多样汇报形式与工具。',
      },
    ],
  },
];

const bootLines = [
  '( •̀ ω •́ )✧ thinking...',
  '📂 读取简历与作品集...',
  '🕙 整理经历时间线...',
  '💡 profile.ready',
  '🎉 欢迎来到陈思敏的个人经历介绍',
];
const accessPassword = 'csm233';

type TerminalPhase = 'typing' | 'password' | 'verifying' | 'boot' | 'ready';

export function TerminalProfileModal({ centerX, onClose }: TerminalProfileModalProps) {
  const [activeStageId, setActiveStageId] = useState(profileStages[0].id);
  const [typedCommand, setTypedCommand] = useState('');
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [phase, setPhase] = useState<TerminalPhase>('typing');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const authTimersRef = useRef<number[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const command = 'introduce 陈思敏 --mode 基本背景';
    const timers: number[] = [];

    for (let index = 0; index < command.length; index += 1) {
      timers.push(window.setTimeout(() => setTypedCommand(command.slice(0, index + 1)), 36 * (index + 1)));
    }

    timers.push(window.setTimeout(() => setPhase('password'), 36 * command.length + 300));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (phase !== 'password') {
      return;
    }

    passwordInputRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    if (phase !== 'boot') {
      return;
    }

    const timers = bootLines.map((_, index) =>
      window.setTimeout(() => setVisibleLineCount(index + 1), index * 340),
    );
    timers.push(window.setTimeout(() => setPhase('ready'), bootLines.length * 340 + 240));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [phase]);

  useEffect(
    () => () => authTimersRef.current.forEach((timer) => window.clearTimeout(timer)),
    [],
  );

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== 'password') {
      return;
    }

    setPhase('verifying');
    setAuthMessage('verifying...');

    authTimersRef.current.push(
      window.setTimeout(() => {
        if (password === accessPassword) {
          setAuthMessage('access granted');
          authTimersRef.current.push(
            window.setTimeout(() => {
              setAuthMessage(null);
              setPhase('boot');
            }, 460),
          );
          return;
        }

        setAuthMessage('access denied');
        authTimersRef.current.push(
          window.setTimeout(() => {
            setPassword('');
            setAuthMessage(null);
            setPhase('password');
          }, 720),
        );
      }, 520),
    );
  };

  const activeStage = profileStages.find((stage) => stage.id === activeStageId) ?? profileStages[0];
  const modalStyle: CSSProperties | undefined =
    centerX == null
      ? undefined
      : {
          left: centerX,
          position: 'fixed',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="terminal-profile-modal"
        role="dialog"
        aria-modal="true"
        aria-label="个人经历介绍"
        style={modalStyle}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="terminal-window-bar">
          <div className="terminal-window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="terminal-window-title">profile.init</span>
          <button type="button" className="terminal-window-close" onClick={onClose} aria-label="关闭弹窗">
            ×
          </button>
        </div>

        <div className="terminal-profile-body">
          <div className="terminal-line">
            <span className="terminal-prompt">$</span>
            <span>{typedCommand}</span>
            {phase === 'typing' ? <span className="terminal-cursor" aria-hidden="true" /> : null}
          </div>

          {phase === 'password' || phase === 'verifying' ? (
            <form
              className="terminal-password-block"
              onSubmit={handlePasswordSubmit}
              onClick={() => passwordInputRef.current?.focus()}
            >
              <div className="terminal-muted-line">protected_content.detected</div>
              <label className="terminal-password-label" htmlFor="terminal-profile-password">
                password required
              </label>
              <div className="terminal-password-line">
                <span className="terminal-prompt">&gt;</span>
                <span className="terminal-password-slots" aria-hidden="true">
                  {Array.from({ length: accessPassword.length }, (_, index) => (
                    <span
                      className={`terminal-password-slot ${
                        index < password.length ? 'is-filled' : ''
                      } ${
                        phase === 'password' && index === password.length ? 'is-cursor' : ''
                      }`}
                      key={index}
                    />
                  ))}
                </span>
                <input
                  ref={passwordInputRef}
                  id="terminal-profile-password"
                  className="terminal-password-input"
                  type="password"
                  value={password}
                  maxLength={accessPassword.length}
                  autoComplete="off"
                  aria-describedby="terminal-password-status"
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  disabled={phase === 'verifying'}
                />
              </div>
              <div
                id="terminal-password-status"
                className={`terminal-auth-message ${
                  authMessage === 'access denied' ? 'is-error' : ''
                } ${authMessage === 'access granted' ? 'is-success' : ''}`}
                aria-live="polite"
              >
                {authMessage}
              </div>
            </form>
          ) : null}

          <div className="terminal-boot-lines" aria-live="polite">
            {bootLines.slice(0, visibleLineCount).map((line) => (
              <div className="terminal-muted-line" key={line}>
                {line}
              </div>
            ))}
          </div>

          {phase === 'ready' ? (
            <div className="terminal-stage-workspace">
              <div className="terminal-model-usage" aria-label="模型额度使用情况">
                <span className="terminal-model-segment terminal-model-name">
                  <span className="terminal-prompt">$</span>
                  chensimin-233
                </span>
                <span className="terminal-model-segment terminal-model-context">51.1K/1M</span>
                <span className="terminal-model-segment terminal-model-progress">
                  <span aria-hidden="true">[</span>
                  <span
                    className="terminal-model-meter"
                    role="progressbar"
                    aria-label="模型额度已使用"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={5}
                  >
                    <span className="terminal-model-meter-fill" />
                  </span>
                  <span aria-hidden="true">]</span>
                  <strong>5%</strong>
                </span>
                <span className="terminal-model-segment terminal-model-duration">34m</span>
                <span className="terminal-model-segment terminal-model-time">◷ 1m 35s</span>
              </div>

              <div className="terminal-stage-tabs" role="tablist" aria-label="经历阶段">
                {profileStages.map((stage) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeStage.id === stage.id}
                    className={`terminal-stage-tab ${activeStage.id === stage.id ? 'is-active' : ''}`}
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                  >
                    <span aria-hidden="true">/</span>
                    {stage.command}
                  </button>
                ))}
              </div>

              <div className="terminal-stage-panel" role="tabpanel" key={activeStage.id}>
                <h2>{activeStage.title}</h2>
                <p>{activeStage.subtitle}</p>
                <div className="terminal-profile-cards">
                  {activeStage.cards.map((card) => (
                    <article className="terminal-profile-card" key={card.title}>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
