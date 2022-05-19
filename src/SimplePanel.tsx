import React from 'react';
import { PanelProps } from '@grafana/data';
import { MapOptions } from 'types';
import { GisMap } from 'GisMap';

interface Props extends PanelProps<MapOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  options.data = data;
  return <div className="App">{<GisMap mapOps={options} height={height} width={width}></GisMap>}</div>;
};
