(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("tex0",
{ "height":20,
 "layers":[
        {
         "data":[12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 1, 1, 12, 9, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 1, 1, 12, 13, 1, 3, 4, 4, 4, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 13, 1, 11, 12, 12, 12, 12, 12, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 17, 4, 18, 12, 12, 12, 12, 12, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20, 20, 20, 20, 20, 20, 10, 12, 12, 17, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 12, 12, 12, 12, 12, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 19, 10, 12, 12, 12, 12, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 19, 20, 20, 20, 20, 21, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         "height":20,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "renderorder":"right-down",
 "tileheight":16,
 "tilesets":[
        {
         "firstgid":1,
         "image":"..\/www\/tex0.png",
         "imageheight":128,
         "imagewidth":128,
         "margin":0,
         "name":"tex0",
         "properties":
            {

            },
         "spacing":0,
         "terrains":[
                {
                 "name":"libFloor",
                 "tile":0
                }, 
                {
                 "name":"libWall",
                 "tile":11
                }],
         "tileheight":16,
         "tiles":
            {
             "0":
                {
                 "terrain":[0, 0, 0, 0]
                },
             "10":
                {
                 "terrain":[0, 1, 0, 1]
                },
             "11":
                {
                 "terrain":[1, 1, 1, 1]
                },
             "12":
                {
                 "terrain":[1, 0, 1, 0]
                },
             "16":
                {
                 "terrain":[1, 0, 1, 1]
                },
             "17":
                {
                 "terrain":[0, 1, 1, 1]
                },
             "18":
                {
                 "terrain":[0, 1, 0, 0]
                },
             "19":
                {
                 "terrain":[1, 1, 0, 0]
                },
             "2":
                {
                 "terrain":[0, 0, 0, 1]
                },
             "20":
                {
                 "terrain":[1, 0, 0, 0]
                },
             "3":
                {
                 "terrain":[0, 0, 1, 1]
                },
             "4":
                {
                 "terrain":[0, 0, 1, 0]
                },
             "8":
                {
                 "terrain":[1, 1, 1, 0]
                },
             "9":
                {
                 "terrain":[1, 1, 0, 1]
                }
            },
         "tilewidth":16
        }],
 "tilewidth":16,
 "version":1,
 "width":20
});