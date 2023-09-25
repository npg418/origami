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

type Point = [number, number];
type Line = [Point, Point];

export default function getVertex(steps: FoldingSteps) {
  const prevLines: Line[] = [];

  const vertex: Point[] = [];
  for (const step of steps) {
    if (step.type === 'flip') continue;
    const { from, to } = step;
    vertex.push(from, to);
    prevLines.push([from, to]);
  }
}

function getCrossPoint([[xa1, ya1], [xa2, ya2]]: Line, [[xb1, yb1], [xb2, yb2]]: Line) {
  const inclineA = (ya2 - ya1) / (xa2 - xa1);
  const inclineB = (yb2 - yb1) / (xb2 - xb1);

  const interceptA = ya1 - inclineA * xa1;
  const interceptB = yb1 - inclineB * xb1;

  const x = (interceptB - interceptA) / (inclineA - inclineB);
  const y = inclineA * x + interceptA;

  return [x, y];
}

function symmetricPoint([xp, yp]: Point, [[x1, y1], [x2, y2]]: Line) {
  const incline = (y2 - y1) / (x2 - x1);
  const lineFunc = (x: number) => incline * (x - x1) + y1;
  const xp$ = xp + 1;
  const yp$ = lineFunc(xp$);
  const crossPoint = getCrossPoint(
    [
      [xp, yp],
      [xp$, yp$],
    ],
    [
      [x1, y1],
      [x2, y2],
    ]
  );
  if (!crossPoint) return null;
  const [xc, yc] = crossPoint;
  const x = 2 * xc - xp;
  const y = 2 * yc - yp;
  return [x, y];
}

console.log(
  symmetricPoint(
    [0, 3],
    [
      [0, 0],
      [1, 1],
    ]
  )
);
