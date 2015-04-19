(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("lvl3",
{ "height":15,
 "layers":[
        {
         "data":[24, 24, 58, 42, 59, 24, 58, 59, 24, 24, 24, 24, 24, 24, 24, 58, 42, 43, 8, 41, 42, 43, 41, 59, 58, 42, 59, 24, 24, 24, 74, 10, 10, 10, 10, 10, 10, 11, 41, 43, 8, 41, 59, 24, 24, 24, 24, 24, 58, 42, 59, 24, 27, 8, 8, 8, 8, 25, 24, 24, 24, 24, 58, 43, 8, 41, 42, 43, 8, 89, 90, 91, 41, 59, 24, 24, 58, 43, 8, 89, 91, 8, 8, 8, 105, 106, 107, 9, 75, 24, 24, 27, 8, 8, 105, 72, 90, 90, 91, 121, 57, 107, 25, 24, 24, 24, 27, 89, 91, 121, 57, 106, 106, 107, 89, 73, 107, 25, 24, 24, 24, 27, 105, 72, 91, 121, 122, 57, 107, 105, 56, 123, 25, 24, 24, 24, 27, 105, 106, 72, 90, 91, 105, 107, 121, 123, 8, 41, 59, 24, 24, 27, 105, 106, 106, 106, 107, 105, 72, 90, 90, 91, 8, 25, 24, 24, 27, 121, 122, 57, 106, 107, 105, 106, 106, 106, 107, 8, 25, 24, 24, 74, 11, 8, 121, 122, 123, 121, 122, 122, 122, 123, 8, 25, 24, 24, 24, 74, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 75, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "height":0,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":6,
                 "name":"This is it brother. The final battle against nature. If we win this, the destiny of the world will no longer be in the hands of random processer. Entropy ends here.",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"munk",
                 "visible":true,
                 "width":7.66667,
                 "x":73.6667,
                 "y":26.6667
                }, 
                {
                 "height":6,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"start",
                 "visible":true,
                 "width":9.33333,
                 "x":27.6667,
                 "y":28
                }, 
                {
                 "height":36,
                 "name":"",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"activate",
                 "visible":true,
                 "width":30,
                 "x":19,
                 "y":11.6667
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
 "width":15
});