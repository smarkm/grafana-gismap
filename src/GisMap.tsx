import React from 'react';
//import { Select } from '@grafana/ui';
import { Props, MapOptions } from 'types';
//import { BuildGetAPI } from "./API";
import 'leaflet/leaflet.css';
import * as L from 'leaflet';
//import "leaflet/leaflet-search.min.css"
//import 'leaflet-search';
// import * as L from "../lib/leaflet/leaflet"
//import "leaflet/leaflet-search.min"

//
export class GisMap<PanelData> extends React.Component<Props, PanelData> {
  mapInstance: any;
  constructor(parameters: any) {
    super(parameters);
  }

  loadMap() {
    var mapOps: MapOptions = this.props.mapOps;
    var linkWithPM = true;
    // var heatmapKPI = "CPU Util";
    // //var draggable = this.props.panelOps.draggable;
    // var showHeatmap = this.mapOps.showHeatmap;
    var rs: any = {
      data: {
        nodes: [
          {
            id: '23691',
            color: '#00ff00',
            name: 'Google',
            label: '23691',
            lat: 36.385913,
            lng: 107.446289,
            image: 'topology/img/default.png',
          },
          {
            id: '11111',
            color: '#00ff00',
            name: 'baidu',
            label: 'Google',
            lat: 36.385913,
            lng: 10.6223065,
            image: 'topology/img/default.png',
          },
          {
            id: '65072',
            color: '#00ff00',
            name: '65072',
            label: 'baidu',
            lat: 36.385913,
            lng: 10.5223065,
            image: '/topology/img/default.png',
          },
          {
            id: '65100',
            color: '#00ff00',
            name: '65100',
            label: '65100',
            lat: 36.385913,
            lng: 10.4223065,
            image: './topology/img/default.png',
          },
        ],
        links: [{ id: '', from: '11111', to: '23691', pm: 'test pm', title: 'link' }],
        ebgp: '23691',
      },
    };
    if (!mapOps.debug) {
      rs = JSON.parse(mapOps.data.series[0].fields[0].values.toArray()[0]);
    }
    var data = rs.data;

    var zoom = mapOps.zoom;
    var centerLat = mapOps.centerLat;
    var centerLng = mapOps.centerLng;
    if (data.zoom !== undefined) {
      zoom = data.zoom;
    }
    if (data.centerLat !== undefined) {
      centerLat = data.centerLat;
    }
    if (data.centerLng !== undefined) {
      centerLng = data.centerLng;
    }

    // var heatMapRadius = 0.1 / zoom;
    // var cfg = {
    // 	"radius": heatMapRadius,
    // 	"maxOpacity": .5,
    // 	"scaleRadius": true,
    // 	"useLocalExtrema": true,
    // 	latField: 'lat',
    // 	lngField: 'lng',
    // 	valueField: 'hmValue'
    // };
    //var heatmapLayer = new HeatmapOverlay(cfg);
    // var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // //	zoomControl: false,
    // 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // 	// maxZoom: 19,
    // 	// //id: 'mapbox/' + this.mapOps.mapStyle, //https://docs.mapbox.com/api/maps/#styles
    // 	// tileSize: 512,
    // 	// zoomOffset: -1,
    // })
    var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }); //.addTo(mymap);

    this.mapInstance = L.map('gisMap', {
      layers: [baseLayer /*heatmapLayer*/],
    }).setView(L.latLng(centerLat, centerLng), zoom);
    var mymap = this.mapInstance;
    this.mapInstance.on('click', function (ev: any) {
      if (mapOps.debug) {
        alert(mymap.getCenter() + ', zoom: ' + mymap.getZoom());
      }
    });
    mymap.zoomControl.setPosition(mapOps.controlPosition);

    // var searchLayer = L.layerGroup().addTo(this.mapInstance);

    // var searchControl = new L.Control.Search({
    // 	layer: searchLayer,
    // 	//zoom:zoom,
    // 	position:mapOps.controlPosition
    // });

    // searchControl.on('search_locationfound', function (e:any) {
    // 	mymap.fitBounds(e.layer.getBounds());
    // 	console.log(e)
    // 	e.layer.setStyle({ fillColor: '#00ff00', color: '#00ff00' });

    //  });
    // mymap.addControl(searchControl);
    // if (this.props.panelOps.highlightRegion) {
    // 	L.geoJson(malaysiaRegion, {
    // 		style: {
    // 			fillColor: "gray",
    // 			weight: 2,
    // 			opacity: 2,
    // 			color: 'white',
    // 			dashArray: '3',
    // 			fillOpacity: 0.7
    // 		}
    // 	}).addTo(mymap);
    // }

    renderMap(rs, mapOps);

    function renderMap(rs: any, props: MapOptions) {
      var data = rs.data;
      //processLegends(data,props)

      var nodesLatLng: any = {};
      // var hmpCatch = {};
      // var linksA = {};  //link's A end  relavent polylines {"asId":[polyline1,polyline2]}
      // var linksZ = {};
      // var heatMapData = {
      // 	max: 8,
      // 	data: []
      // };
      if (!data.nodes) {
        return;
      }
      for (var i = 0; i < data.nodes.length; i++) {
        var o = data.nodes[i];
        //var deviceId = o.id.substring(o.id.lastIndexOf("_") + 1)
        if (o.lat === '') {
          o.lag = props.centerLat;
        }
        if (o.lng === '') {
          o.lng = props.centerLng;
        }

        //var nodePosition = [o.lat, o.lng];
        // nodesLatLng[deviceId] = nodePosition
        // hmpCatch[deviceId] = { lat: o.lat, lng: o.lng, hmValue: o.hmValue };
        // heatMapData.data.push(hmpCatch[deviceId])

        var color = 'lightgreen';
        // var icon = L.icon({
        // 	iconUrl: "public" + o.image,
        // 	iconSize: [iconSize, iconSize],
        // });
        //marker = new L.Marker(new L.latLng([o.latitude,o.longitude]), {title: o.label,icon:icon} );//se property searched
        //searchLayer.addLayer(marker);
        color = o.color + '';
        if ('' === color) {
          color = 'green';
        }
        var circle = L.circle(L.latLng(o.lat, o.lng), {
          color: color,
          fillColor: color,
          fillOpacity: 1,
          radius: 30000,
          //pane:"sdf"
          //title: o.name,
          // iconSize: -1
        }).addTo(mymap);
        circle.bindTooltip(o.info);
        // searchLayer.addLayer(circle);
        // var nodeLayer = L.marker([o.lat,o.lng],
        // 	{radius: 30000,color:color,title:o.label,icon:icon,draggable:draggable,deviceId:deviceId})
        // 	//.addTo(mymap)
        // 	//.bindPopup("<button>AS Detail</button><b><a></a>")
        // 	searchLayer.addLayer(nodeLayer);
        // 	nodeLayer.bindTooltip(o.label+"<br>"+heatmapKPI+": "+o.hmValue)
        // 	.on('dragend',function(evt){
        // 		var target = evt.target;
        // 		var params = {deviceId:target.options.deviceId,lat:target._latlng.lat+"",lng:target._latlng.lng+""}
        // 		var polylinks = linksA[params.deviceId]
        // 		hmpCatch[params.deviceId].lat = params.lat
        // 		hmpCatch[params.deviceId].lng = params.lng
        // 		//console.log(polylinks)
        // 		if(polylinks) {
        // 			for(var i = 0; i < polylinks.length; i++) {
        // 				var pl = polylinks[i];
        // 				pl.setLatLngs([
        // 					[params.lat, params.lng], pl._latlngs[1]
        // 				])
        // 				//console.log(pl)

        // 			}
        // 		}
        // 		polylinks = linksZ[params.deviceId]
        // 		if(polylinks) {
        // 			for(var i = 0; i < polylinks.length; i++) {
        // 				var pl = polylinks[i];
        // 				pl.setLatLngs([pl._latlngs[0],
        // 					[params.lat, params.lng]
        // 				])
        // 				pl.addTo(mymap)
        // 				//console.log(pl)
        // 			}
        // 		}

        // 		if(showHeatmap){
        // 			heatmapLayer.remove();
        // 			mymap.addLayer(heatmapLayer)
        // 			heatMapData.data = [];
        // 			for (const i in hmpCatch) {
        // 				var o = hmpCatch[i]
        // 				heatMapData.data.push(o)
        // 			}
        // 			heatmapLayer.setData(heatMapData);
        // 		}
        // 		// $.get("/api/resource/updateDeviceLatLng",params,function(rs){
        // 		// 	//console.log(params)
        // 		// 	console.log(rs)
        // 		// })
        // 	});
      }

      // for(const i in nodesLatLng) {
      // 	var title = i;//value searched
      // 	var loc = nodesLatLng[i];		//position found
      // 	//console.log(title)

      // }

      // if (showHeatmap) {
      // 	heatmapLayer.setData(heatMapData);
      // }
      //console.log(nodesLatLng)
      for (i = 0; i < data.links.length; i++) {
        o = data.links[i];

        var from = nodesLatLng[o.from];
        var to = nodesLatLng[o.to];

        if (from && to) {
          var latlngs = [from, to];
          //sticky: true,
          var polyline = L.polyline(latlngs, { color: 'lightgreen' });

          if (linkWithPM) {
            polyline.bindTooltip(o.pm, { permanent: true });
          }

          polyline.bindPopup(o.title).addTo(mymap);
          //.openTooltip()
          // if (!linksA[o.from]) {
          // 	linksA[o.from] = []
          // }
          // linksA[o.from].push(polyline);
          // if (!linksZ[o.to]) {
          // 	linksZ[o.to] = []
          // }
          // linksZ[o.to].push(polyline);
        }
      }
    }

    // function processLegends(data:any,props:MapOptions) {
    // 	if (data["topleft"] && props.showTopleftLegend) {
    // 		var legendTopLeft = L.control({ position: 'topleft' });
    // 		legendTopLeft.onAdd = function (map:any) {
    // 			var div = L.DomUtil.create('div', 'info legend');
    // 			div.innerHTML += data["topleft"]

    // 			return div;
    // 		};
    // 		legendTopLeft.addTo(mymap);
    // 	}
    // 	if (data["bottomright"] && props.showBottomrightLegend) {
    // 		var legendBottomRight = L.control({ position: 'bottomright' });

    // 		legendBottomRight.onAdd = function (map) {
    // 			var div = L.DomUtil.create('div', 'info legend');
    // 			div.innerHTML += data["bottomright"]
    // 			return div;
    // 		};
    // 		legendBottomRight.addTo(mymap);
    // 	}
    // }
  }

  componentDidMount() {
    this.loadMap();
  }
  componentDidUpdate() {
    this.mapInstance.off();
    this.mapInstance.remove();
    this.loadMap();
  }

  render() {
    return (
      <div style={{ height: this.props.height }}>
        <div id="gisMap" style={{ height: this.props.height }}></div>
      </div>
    );
  }
}
