import CanvasConfetti from 'canvas-confetti';

interface ConfettiOptions extends CanvasConfetti.Options {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  flat?: boolean;
  ticks?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  shapes?: CanvasConfetti.Shape[];
  zIndex?: number;
  disableForReducedMotion?: boolean;
  useWorker?: boolean;
  resize?: boolean;
  canvas?: HTMLCanvasElement | null;
  scalar?: number;
}

const confetti = (options: ConfettiOptions) => {
  if (
    options.disableForReducedMotion &&
    window.matchMedia('(prefers-reduced-motion)').matches
  ) {
    return;
  }

  const confettiInstance = options.canvas
    ? CanvasConfetti.create(options.canvas, {
        resize: options.resize ?? true,
        useWorker: options.useWorker ?? true,
      })
    : CanvasConfetti;

  confettiInstance({
    ...options,
  });
};

confetti.shapeFromPath = (options: { path: string; [key: string]: any }) => {
  return CanvasConfetti.shapeFromPath({ ...options });
};

confetti.shapeFromText = (options: { text: string; [key: string]: any }) => {
  return CanvasConfetti.shapeFromText({ ...options });
};

const realistic = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
const useConfetti = () => {
  return {
    confetti,
    realistic,
  };
};
export { useConfetti };
