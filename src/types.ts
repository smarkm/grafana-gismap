import { PanelData } from '@grafana/data';

export interface MapOptions {
  api: string;
  mapStyle: string;
  zoom: number;
  showHeatmap: boolean;
  centerLat: number;
  centerLng: number;
  controlPosition: string;
  showTopleftLegend: boolean;
  showBottomrightLegend: boolean;
  debug: boolean;
  data: PanelData;
}
export interface Props {
  mapOps: MapOptions;
  width: number;
  height: number;
}
