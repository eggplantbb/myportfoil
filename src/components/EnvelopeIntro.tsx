import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';

type EnvelopeIntroProps = {
  onComplete: () => void;
};

type IntroState = 'closed' | 'opening' | 'revealed' | 'entering';

const BASE_TILT = 0;
const OPEN_DURATION = 620;
const ENTER_DURATION = 520;
const ENTER_THRESHOLD = -120;

export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [state, setState] = useState<IntroState>('closed');
  const [lift, setLift] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [tilt, setTilt] = useState(BASE_TILT);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStart = useRef<{ x: number; y: number; lift: number } | null>(null);
  const liftRef = useRef(0);
  const transitionTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
    },
    [],
  );

  const resetDrag = () => {
    liftRef.current = 0;
    setLift(0);
    setOffsetX(0);
    setTilt(BASE_TILT);
  };

  const openEnvelope = () => {
    if (state !== 'closed') {
      return;
    }

    resetDrag();
    setState('opening');
    transitionTimer.current = window.setTimeout(() => setState('revealed'), OPEN_DURATION);
  };

  const enterHomepage = () => {
    if (state !== 'revealed') {
      return;
    }

    setState('entering');
    transitionTimer.current = window.setTimeout(onComplete, ENTER_DURATION);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY, lift };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!pointerStart.current) {
      return;
    }

    const nextLift = Math.min(0, Math.max(-280, pointerStart.current.lift + event.clientY - pointerStart.current.y));
    const nextOffsetX = Math.min(42, Math.max(-42, (event.clientX - pointerStart.current.x) * 0.35));

    liftRef.current = nextLift;
    setLift(nextLift);
    setOffsetX(nextOffsetX);
    setTilt(BASE_TILT + nextOffsetX * 0.11);
  };

  const finishDrag = (shouldEnter: boolean) => {
    const wasDragging = pointerStart.current !== null;
    pointerStart.current = null;
    setIsDragging(false);

    if (!wasDragging) {
      return;
    }

    if (shouldEnter && liftRef.current <= ENTER_THRESHOLD) {
      enterHomepage();
      return;
    }

    resetDrag();
  };

  return (
    <main className={`envelope-stage is-${state}`}>
      <button
        type="button"
        className="envelope-seal-trigger"
        onClick={openEnvelope}
        aria-label="打开信封"
        disabled={state !== 'closed'}
      />
      <img className="envelope-image envelope-image-closed" src="/assets/intro/envelope-closed.png" alt="闭合的信封" />
      <div className="envelope-revealed-booklet">
        <img className="envelope-image envelope-image-open" src="/assets/intro/envelope-open.png" alt="打开的信封" />
        <button
          type="button"
          className={`envelope-booklet-card ${isDragging ? 'is-dragging' : ''}`}
          style={{ transform: `translate(calc(-50% + ${offsetX}px), ${lift}px) rotate(${tilt}deg)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={() => finishDrag(true)}
          onPointerCancel={() => finishDrag(false)}
          aria-label="向上拖出小册子"
          disabled={state !== 'revealed'}
        >
          <img src="/assets/intro/booklet-home.png" alt="小册子首页预览" />
        </button>
        <img className="envelope-image envelope-image-front" src="/assets/intro/envelope-front.png" alt="" aria-hidden="true" />
      </div>
    </main>
  );
}
