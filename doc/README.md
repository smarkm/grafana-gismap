# Grafana GisMap

This is sample gis map, easy for customized base on options and your api

## Fetures
- cutomized node & link
- hightlight region status support
- flexiable tips information present base on defineded api result
- cutomized support


## Getting started
1. Install [JSON API](https://grafana.com/grafana/plugins/marcusolsson-json-datasource/)
2. Config datasource named `GISMap API` with **JSON API**
3. Select API datasource and and path
![config data source](https://github.com/smarkm/grafana-gismap-doc/blob/master/apiConfig.png?raw=true)
4. Config result field, Just give a `$` to get the api result
![config field](https://github.com/smarkm/grafana-gismap-doc/blob/master/fieldConfig.png?raw=true)



## API result format defined
all `optional` if not settle will use the default setting in panel setting

   **Top Result data format**
```json
{
   "code":0, // please keep 0 always meaning success
   "msg":"success",
   "data":{
      "zoom": 5, //optional
      "centerLat":5, //optional
      "centerLng":5, //optional
      "nodes":[], //please follow Node format
      "links":[]  //please follow Link format
   }
}
```
**Node format**
```json
{
   "title":"show on hourver",
   "name":"",
   "color":"#00ff00", // optional default green
   "lat":5,
   "lng":5
}
```
**Link format**
```json
{
   "title":"show on hourver",
   "name":"",
   "color":"#00ffff", // optional default lightblue
   "lat":5,
   "lng":5
}
```
## Contact
Cutomized & issue support

<img src="https://github.com/smarkm/grafana-gismap-doc/blob/master/contact.png?raw=true" width="164"/>



