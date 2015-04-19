(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("tex1",
{ "height":6,
 "layers":[
        {
         "data":[54, 54, 65, 66, 54, 54, 54, 65, 85, 83, 66, 54, 65, 85, 49, 49, 83, 66, 81, 53, 49, 49, 51, 82, 54, 81, 53, 51, 82, 54, 54, 54, 81, 82, 54, 54],
         "height":6,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":6,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "height":0,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":4.54545,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"start",
                 "visible":true,
                 "width":6.54545,
                 "x":7.4545,
                 "y":45.0909
                }, 
                {
                 "height":4.18182,
                 "name":"Fine job brother. The brotherhood have ringed in a new era of reasoning. The game is over.",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":5.45455,
                 "x":50.0000454545455,
                 "y":46.7272636363636
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":64.9090909090909,
                 "y":46.7272727272727
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":65.2727272727273,
                 "y":54.9090909090909
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":59.6363636363636,
                 "y":32.1818181818182
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":61.0909090909091,
                 "y":60.7272727272727
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":59.0909090909091,
                 "y":53.8181818181818
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":59.2727272727273,
                 "y":44.7272727272727
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":67.0909090909091,
                 "y":37.4545454545455
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":69.4545454545454,
                 "y":48.5454545454546
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":61.8181818181818,
                 "y":38.5454545454545
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":70,
                 "y":42.7272727272727
                }, 
                {
                 "height":4.18181818181819,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":4.90909090909092,
                 "x":66.7272727272727,
                 "y":60.1818181818182
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "width":0,
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
         "imageheight":256,
         "imagewidth":256,
         "margin":0,
         "name":"tex0",
         "properties":
            {

            },
         "spacing":0,
         "terrains":[
                {
                 "name":"libFloor0",
                 "tile":0
                }, 
                {
                 "name":"libWall0",
                 "tile":5
                }, 
                {
                 "name":"libwall1",
                 "tile":53
                }, 
                {
                 "name":"libFloor1",
                 "tile":48
                }, 
                {
                 "name":"snow",
                 "tile":15
                }, 
                {
                 "name":"snowWall",
                 "tile":14
                }, 
                {
                 "name":"snowBush",
                 "tile":78
                }, 
                {
                 "name":"grass",
                 "tile":7
                }, 
                {
                 "name":"wood",
                 "tile":23
                }, 
                {
                 "name":"dirt",
                 "tile":105
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
                 "terrain":[7, 7, 8, 7]
                },
             "104":
                {
                 "terrain":[7, 9, 7, 9]
                },
             "105":
                {
                 "terrain":[9, 9, 9, 9]
                },
             "106":
                {
                 "terrain":[9, 7, 9, 7]
                },
             "107":
                {
                 "terrain":[4, 6, 4, 4]
                },
             "108":
                {
                 "terrain":[6, 6, 4, 4]
                },
             "109":
                {
                 "terrain":[6, 4, 4, 4]
                },
             "11":
                {
                 "terrain":[4, 4, 4, 5]
                },
             "110":
                {
                 "terrain":[6, 6, 6, 4]
                },
             "111":
                {
                 "terrain":[6, 6, 4, 6]
                },
             "12":
                {
                 "terrain":[4, 4, 5, 5]
                },
             "120":
                {
                 "terrain":[7, 9, 7, 7]
                },
             "121":
                {
                 "terrain":[9, 9, 7, 7]
                },
             "122":
                {
                 "terrain":[9, 7, 7, 7]
                },
             "126":
                {
                 "terrain":[6, 4, 6, 6]
                },
             "127":
                {
                 "terrain":[4, 6, 6, 6]
                },
             "13":
                {
                 "terrain":[4, 4, 5, 4]
                },
             "14":
                {
                 "terrain":[5, 5, 5, 5]
                },
             "15":
                {
                 "terrain":[4, 4, 4, 4]
                },
             "16":
                {
                 "terrain":[1, 1, 1, 0]
                },
             "17":
                {
                 "terrain":[1, 1, 0, 1]
                },
             "18":
                {
                 "terrain":[0, 1, 0, 1]
                },
             "2":
                {
                 "terrain":[0, 0, 0, 1]
                },
             "20":
                {
                 "terrain":[1, 0, 1, 0]
                },
             "23":
                {
                 "terrain":[8, 8, 8, 8]
                },
             "24":
                {
                 "terrain":[7, 8, 7, 8]
                },
             "26":
                {
                 "terrain":[8, 7, 8, 7]
                },
             "27":
                {
                 "terrain":[4, 5, 4, 5]
                },
             "29":
                {
                 "terrain":[5, 4, 5, 4]
                },
             "3":
                {
                 "terrain":[0, 0, 1, 1]
                },
             "32":
                {
                 "terrain":[1, 0, 1, 1]
                },
             "33":
                {
                 "terrain":[0, 1, 1, 1]
                },
             "34":
                {
                 "terrain":[0, 1, 0, 0]
                },
             "35":
                {
                 "terrain":[1, 1, 0, 0]
                },
             "36":
                {
                 "terrain":[1, 0, 0, 0]
                },
             "4":
                {
                 "terrain":[0, 0, 1, 0]
                },
             "40":
                {
                 "terrain":[7, 8, 7, 7]
                },
             "41":
                {
                 "terrain":[8, 8, 7, 7]
                },
             "42":
                {
                 "terrain":[8, 7, 7, 7]
                },
             "43":
                {
                 "terrain":[4, 5, 4, 4]
                },
             "44":
                {
                 "terrain":[5, 5, 4, 4]
                },
             "45":
                {
                 "terrain":[5, 4, 4, 4]
                },
             "46":
                {
                 "terrain":[5, 5, 5, 4]
                },
             "47":
                {
                 "terrain":[5, 5, 4, 5]
                },
             "48":
                {
                 "terrain":[3, 3, 3, 3]
                },
             "5":
                {
                 "terrain":[1, 1, 1, 1]
                },
             "50":
                {
                 "terrain":[3, 3, 3, 2]
                },
             "51":
                {
                 "terrain":[3, 3, 2, 2]
                },
             "52":
                {
                 "terrain":[3, 3, 2, 3]
                },
             "53":
                {
                 "terrain":[2, 2, 2, 2]
                },
             "55":
                {
                 "terrain":[9, 9, 9, 7]
                },
             "56":
                {
                 "terrain":[9, 9, 7, 9]
                },
             "57":
                {
                 "terrain":[8, 8, 8, 7]
                },
             "58":
                {
                 "terrain":[8, 8, 7, 8]
                },
             "62":
                {
                 "terrain":[5, 4, 5, 5]
                },
             "63":
                {
                 "terrain":[4, 5, 5, 5]
                },
             "64":
                {
                 "terrain":[2, 2, 2, 3]
                },
             "65":
                {
                 "terrain":[2, 2, 3, 2]
                },
             "66":
                {
                 "terrain":[3, 2, 3, 2]
                },
             "68":
                {
                 "terrain":[2, 3, 2, 3]
                },
             "7":
                {
                 "terrain":[7, 7, 7, 7]
                },
             "71":
                {
                 "terrain":[9, 7, 9, 9]
                },
             "72":
                {
                 "terrain":[7, 9, 9, 9]
                },
             "73":
                {
                 "terrain":[8, 7, 8, 8]
                },
             "74":
                {
                 "terrain":[7, 8, 8, 8]
                },
             "75":
                {
                 "terrain":[4, 4, 4, 6]
                },
             "76":
                {
                 "terrain":[4, 4, 6, 6]
                },
             "77":
                {
                 "terrain":[4, 4, 6, 4]
                },
             "78":
                {
                 "terrain":[6, 6, 6, 6]
                },
             "8":
                {
                 "terrain":[7, 7, 7, 8]
                },
             "80":
                {
                 "terrain":[2, 3, 2, 2]
                },
             "81":
                {
                 "terrain":[3, 2, 2, 2]
                },
             "82":
                {
                 "terrain":[3, 2, 3, 3]
                },
             "83":
                {
                 "terrain":[2, 2, 3, 3]
                },
             "84":
                {
                 "terrain":[2, 3, 3, 3]
                },
             "88":
                {
                 "terrain":[7, 7, 7, 9]
                },
             "89":
                {
                 "terrain":[7, 7, 9, 9]
                },
             "9":
                {
                 "terrain":[7, 7, 8, 8]
                },
             "90":
                {
                 "terrain":[7, 7, 9, 7]
                },
             "91":
                {
                 "terrain":[4, 6, 4, 6]
                },
             "93":
                {
                 "terrain":[6, 4, 6, 4]
                }
            },
         "tilewidth":16
        }],
 "tilewidth":16,
 "version":1,
 "width":6
});