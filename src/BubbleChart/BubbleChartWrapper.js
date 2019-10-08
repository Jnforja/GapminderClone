import React, { useCallback, useState, useEffect } from 'react';
import D3BubbleChart from './D3BubbleChart';

function BubbleChartWrapper({ chartYearIdx, selectedContinents }) {
  const [chart, setChart] = useState(null);

  const plotRef = useCallback(element => {
    // eslint-disable-next-line no-new
    setChart(new D3BubbleChart(element));
  }, []);

  useEffect(() => {
    if (chart !== null) {
      chart.update(chartYearIdx, selectedContinents);
    }
  }, [chart, chartYearIdx, selectedContinents]);

  return <div ref={plotRef} />;
}

export default BubbleChartWrapper;
