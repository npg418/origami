type FoldingStep =
  | {
      from: [number, number];
      to: [number, number];
      type: 'mountain' | 'valley';
    }
  | {
      type: 'flip';
    };

export type FoldingSteps = FoldingStep[];

export default function getVertex(steps: FoldingSteps) {
  let prevFn: null | ((x: number) => number) = null;

  const vertex: number[] = [];
  for (const step of steps) {
    if (step.type === 'flip') continue;
    const {
      from: [x1, y1],
      to: [x2, y2],
    } = step;
    vertex.push(x1, y1, 0, x2, y2, 0);
    if (prevFn) {
    }
    prevFn = (x) => ((y2 - y1) / (x2 - x1)) * (x - x1) + y1;
  }
}
