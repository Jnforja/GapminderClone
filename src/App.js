import React, { useState, useEffect } from 'react';
import { Slider } from 'react-semantic-ui-range';

import { Button, Icon, Dropdown } from 'semantic-ui-react';

import BubbleChartWrapper from './BubbleChart/BubbleChartWrapper';

const continents = [
  { key: 'Europe', value: 'europe', text: 'Europe' },
  { key: 'Asia', value: 'asia', text: 'Asia' },
  { key: 'Americas', value: 'americas', text: 'Americas' },
  { key: 'Africa', value: 'africa', text: 'Africa' }
];

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [chartYearIdx, setChartYearIdx] = useState(0);
  const [selectedContinents, setSelectedContinents] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        setChartYearIdx(chartYearIdx < 214 ? chartYearIdx + 1 : 0);
      }
    }, 100);
    return () => clearInterval(timer);
  });

  return (
    <div className="App">
      <BubbleChartWrapper
        chartYearIdx={chartYearIdx}
        selectedContinents={selectedContinents}
      />
      <Button
        icon
        labelPosition="left"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <Icon name={isPlaying ? 'pause' : 'play'} />
        {isPlaying ? 'pause' : 'play'}
      </Button>
      <Button icon="repeat" onClick={() => setChartYearIdx(0)} />

      <Slider
        color="orange"
        value={chartYearIdx}
        settings={{
          start: 0,
          min: 0,
          max: 214,
          step: 1,
          onChange: value => {
            setChartYearIdx(value);
          }
        }}
      />
      <Dropdown
        placeholder="Continents"
        fluid
        multiple
        selection
        options={continents}
        onChange={(event, data) => setSelectedContinents(data.value)}
      />
    </div>
  );
}

export default App;
