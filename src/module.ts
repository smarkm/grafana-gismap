import { PanelPlugin } from '@grafana/data';
import { MapOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<MapOptions>(SimplePanel).setPanelOptions((builder) => {
  return (
    builder
      // .addTextInput({
      //   //API
      //   path: 'api',
      //   name: 'API',
      //   defaultValue: '/api/map/gis',
      // })
      .addTextInput({
        path: 'mapStyle',
        name: 'Map Style',
        defaultValue: '/api/map/gis',
      })
      .addNumberInput({
        path: 'zoom',
        name: 'Zoom Level',
        defaultValue: 5,
      })
      .addNumberInput({
        path: 'centerLat',
        name: 'Center Lat',
        defaultValue: 5,
      })
      .addNumberInput({
        path: 'centerLng',
        name: 'centerLng',
        defaultValue: 5,
      })
      .addBooleanSwitch({
        path: 'debug',
        name: 'Debug Model',
        defaultValue: false,
      })
      .addRadio({
        //Control Position
        path: 'controlPosition',
        defaultValue: 'topright',
        name: 'Control Position',
        settings: {
          options: [
            {
              value: 'topleft',
              label: 'Topleft',
            },
            {
              value: 'topright',
              label: 'Topright',
            },
            {
              value: 'bottomleft',
              label: 'Bottomleft',
            },
            {
              value: 'bottomright',
              label: 'Bottomright',
            },
          ],
        },
      })
  );
});
