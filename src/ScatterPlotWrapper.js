import React, { useCallback } from 'react';
import D3ScatterPlot from './D3ScatterPlot';

function ScatterPlotWrapper() {
  const plotRef = useCallback(element => {
    // eslint-disable-next-line no-new
    new D3ScatterPlot(element);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center'
      }}
      ref={plotRef}
    />
  );
}

export default ScatterPlotWrapper;
