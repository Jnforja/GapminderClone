import React, { useState, useEffect } from 'react';
import { Slider } from 'react-semantic-ui-range';

import { Button, Form, Checkbox, Menu } from 'semantic-ui-react';

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
    <div>
      <Menu borderless>
        <Menu.Item>Bubbles</Menu.Item>
      </Menu>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '4fr 1fr',
          paddingTop: '1rem',
          alignItems: 'center'
        }}
      >
        <div>
          <BubbleChartWrapper
            chartYearIdx={chartYearIdx}
            selectedContinents={selectedContinents}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'min-content 1fr',
              alignItems: 'center',
              paddingLeft: '1rem',
              paddingBottom: '1rem'
            }}
          >
            <Button
              icon={isPlaying ? 'pause' : 'play'}
              onClick={() => setIsPlaying(!isPlaying)}
            />
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
          </div>
        </div>
        <div>
          <Form>
            <Form.Field>Continents</Form.Field>
            {continents.map(c => (
              <Form.Field>
                <Checkbox
                  label={c.text}
                  name="checkboxRadioGroup"
                  value={c.value}
                  checked={selectedContinents.includes(c.value)}
                  onChange={(e, d) => {
                    selectedContinents.includes(d.value)
                      ? setSelectedContinents(
                          selectedContinents.filter(v => d.value !== v)
                        )
                      : setSelectedContinents([...selectedContinents, d.value]);
                  }}
                />
              </Form.Field>
            ))}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
