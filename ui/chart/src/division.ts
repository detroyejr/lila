import { chartYMax, chartYMin } from './common';
import { Division } from './interface';
import { ChartDataset } from 'chart.js';

export default function (trans: Trans, div?: Division) {
  const lines: { div: string; loc: number }[] = [];
  if (div?.middle) {
    if (div.middle > 1) lines.push({ div: trans('opening'), loc: 0 });
    lines.push({ div: trans('middlegame'), loc: div.middle - 1 });
  }
  if (div?.end) {
    if (div.end > 1 && !div?.middle) lines.push({ div: trans('middlegame'), loc: 0 });
    lines.push({ div: trans('endgame'), loc: div.end - 1 });
  }
  const annotationColor = '#707070';
  const annotations: ChartDataset<'line'>[] = lines.map(line => ({
    type: 'line',
    xAxisID: 'x',
    yAxisID: 'y',
    label: line.div,
    data: [
      { x: line.loc, y: chartYMin },
      { x: line.loc, y: chartYMax },
    ],
    pointHoverRadius: 0,
    borderWidth: 1,
    borderColor: annotationColor,
    pointRadius: 0,
    order: 1,
  }));
  return annotations;
}
