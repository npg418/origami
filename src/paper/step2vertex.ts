
type FoldingStep = {
  from: [number, number],
  to: [number, number],
  type: 'mountain' | 'valley',
} | {
  type: 'flip'
};

export type FoldingSteps = FoldingStep[];

export default function getVertex(steps: FoldingSteps) {
  let prevFn: (x: number) => number;

  const vertex: number[] = [];
  for (const step of steps) {
    if (step.type === 'flip') continue;
    vertex.push(step.from, step.to, 0);
    prevFn = (x) => ()
  }
}
