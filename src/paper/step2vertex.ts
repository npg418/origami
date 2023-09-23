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
    const {
      from,
      to,
    } = step;
    vertex.push(from, to);
    prevLines.forEach((line) => {
      if (doesIntersect(line, [from, to])) {
        const pf = symmetricPoint(from, line);
        const pt = symmetricPoint(to, line);
        vertex.push(pf, pt);
      }
    });
    prevLines.push([
      from,
      to,
    ]);
  }
}

function getInterSection([[xa1, ya1], [xa2, ya2]]: Line, [[xb1, yb1], [xb2, yb2]]: Line) {
  const dx1 = xa2 - xa1;
  const dy1 = ya2 - ya1;
  const dx2 = xb2 - xb1;
  const dy2 = yb2 - yb1;
  const det = dx1 * dy2 - dx2 * dy1;
  if (det === 0) return null;
  const dx3 = xb1 - xa1;
  const dy3 = yb1 - ya1;
  const t = (dx3 * dy2 - dx2 * dy3) / det;
  const u = (dx1 * dy3 - dx3 * dy1) / det;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return [
    xa1 + t * dx1,
    ya1 + t * dy1,
  ];
}


function symmetricPoint([xp, yp]: Point, [[x1, y1], [x2, y2]]: Line) {
  const incline = (y2 - y1) / (x2 - x1);
  const lineFunc = (x: number) => incline * (x - x1) + y1;

  const xp$ = xp + 1;
  const yp$ = lineFunc(xp$);

  const intersection = getInterSection([
    [xp, yp],
    [xp$, yp$],
  ], [
    [x1, y1],
    [x2, y2],
  ]);

  if (!intersection) return null;
  const [ix, iy] = intersection;

  const x = 2 * ix - xp;
  const y = 2 * iy - yp;

  return [x, y];
}
