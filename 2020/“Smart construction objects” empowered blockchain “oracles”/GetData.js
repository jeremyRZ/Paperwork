let fs = require("fs");
//var xlsx = require('node-xlsx');
let Itemcount = 0
let returnCount = 0
var dataArray = new Array()
for(var i=1;i<6;i++){
  let path = 'C:/Users/Jeremy/Desktop/Oracle/JsonData/Data'+`${i}`+'.json'
  var data = fs.readFileSync(path, 'utf-8');
  var dataJson = data.toString()
  var s = JSON.parse(dataJson)
  dataArray[i-1] = s
}
console.log('Start find the same time');
var Item1029 = []
var Item1024 = []
var Item1030 = []
var Item1026 = dataArray[3]
var Item1025 = dataArray[4]
var timeServer = []
for(var a=0;a<dataArray[0].length;a++){
  for(var b=a;b<dataArray[1].length;b++){
    for(var c=b;c<dataArray[2].length;c++){
      if(dataArray[0][a].time_server == dataArray[1][b].time_server && dataArray[1][b].time_server== dataArray[2][c].time_server){
        timeServer.push(dataArray[2][c].time_server)
        Item1029.push(dataArray[1][b]);
        Item1024.push(dataArray[0][a]);
        Item1030.push(dataArray[2][c]);
      }
    }
  }
}

function unique(arr){
    arr.sort();
    let hash = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] != hash[hash.length-1]) {
          hash.push(arr[i]);
        }
    }
    return hash;
}
var finalTimeServer  = []
finalTimeServer = unique(timeServer)
var finalItem1029 = unique(Item1029)
var finalItem1024 = unique(Item1024)
var finalItem1030 = unique(Item1030)
var finalItem1025 = unique(Item1025)
var finalItem1026 = unique(Item1026)
let Date = Math.floor(Math.random()*10)
// console.log("The choosen date is ");
let finalDate =finalTimeServer[Date]

function findTheWinner(){
  function getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
          while (i-- > min) {
              index = Math.floor((i + 1) * Math.random());
              temp = shuffled[index];
              shuffled[index] = shuffled[i];
              shuffled[i] = temp;
          }
          return shuffled.slice(min);
      }
      var dataNumber = new Array();
      for(var i=1023;i<1032;i++){
        dataNumber.push(i);
      }
      let randomNumber = getRandomArrayElements(dataNumber, 3) ;
  function readFile() {
      //console.log("start read data");
      // 同步读取

      //console.log(finalItem1029)

      // function CountItem(array){
      //   res = {};
      //   let arr = Array.from(array);
      //   arr.forEach(item => {
      //       if(!res[item.ip_sender]) {
      //           res[item.ip_sender] = {
      //               key: item.ip_sender,
      //               len: 1
      //           }
      //       } else {
      //           res[item.ip_sender].len++;
      //       }
      //   })
      //   res = Object.values(res);
      //   return JSON.stringify(res)
      // }
      // var finalItem1024 = CountItem(Item1024)
      // var finalItem1029 = CountItem(Item1029)
      // var finalItem1030 = CountItem(Item1030)

      // console.log("The result of item1024 is " );
      // console.log(JSON.parse(finalItem1024));
      // console.log("The result of item1029 is ");
      // console.log(JSON.parse(finalItem1029));
      // console.log("The result of Item1030 is ");
      // console.log(JSON.parse(finalItem1030));
      // console.log("The same time of Items is ");
      //console.log(finalTimeServer);

      // console.log(finalDate)

      function setDate(array){
          res = {};
          let arr = Array.from(array);
          arr.forEach(item => {
              if(item.time_server == finalDate){
                res = item
              }
          })
          res = Object.values(res);
          return res
      }
      let selectItem1029 =setDate(finalItem1029)
      let selectItem1024 =setDate(finalItem1024)
      let selectItem1030 =setDate(finalItem1030)
      let selectItem1025 =setDate(finalItem1025)
      let selectItem1026 =setDate(finalItem1026)

      //console.log(selectItem1025);

      function finalData(outArray){
        function addInfo(array,sender_name_auxiliary,ip_sender,time_server,lat,lng){
          array = {
            sender_name_auxiliary,
            ip_sender,
            time_server,
            lat,
            lng
          }
          return array;
        }
        outArray = addInfo(outArray,outArray[0],outArray[1],outArray[2],outArray[3],outArray[4])
        return outArray;
      }

      let final1029 = finalData(selectItem1029)
      let final1024 = finalData(selectItem1024)
      let final1030 = finalData(selectItem1030)
      let final1025 = finalData(selectItem1025)
      let final1026 = finalData(selectItem1026)
      var randomArray = [final1029,final1024,final1030,final1025,final1026]
      var resultArray = []
      do{
        resultArray = getRandomArrayElements(randomArray,3)
        returnCount++
      } while((resultArray[0].lat !==resultArray[1].lat && resultArray[0].lat !==resultArray[2].lat))

      // console.log(resultArray);
      return resultArray
  }
  var resultArray = readFile()
  function CountJson(json, field) {
    var count = 0;
    if ("" == json) {
      return false;
    }
    if(json[0].lat==json[1].lat&&json[0].lat==json[2].lat){
      return json[0]
    }

    var obj = json,
      len = obj.length,
      result = new Array(),
      resultList = new Array();
    for (var i = 0, x = 0; i < len; i++) {
      var id = obj[i][field];
      if (result[id]) {
        resultList[x] = id;
        count = 1, x++;
      } else {
        result[id] = 1;
      }
    }
    if (count == 1) {
      //return console.log(resultList);
      for (var i = 0; i < json.length; i++) {
        if (json[i].lat == resultList) {
          return json[i]
        }
      }
    }
    return null;
  }
  let finalResult = CountJson(resultArray, 'lat')
  //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
  // console.log('Transaction has been evaluated, result is:');
  // console.log(finalResult)
  let lat = finalResult.lat
  // console.log(lat);
  let addScoreArray = []
//add Score
  function addScore() {
    resultArray.forEach(function(item) {
      if (!("score" in item)) {
        item.score = 100
      }
      if (item.lat == lat) {
        item.score += 0
      } else {
        item.score += 0
      }
    });
    return resultArray
  }
  var addScoreresult = []
  addScoreresult = addScore()

  // console.log('The result with score is:');
  // console.log(addScoreresult)
  // Choose the highest score
  let highestScore = []
  for (var i = 0; i < addScoreresult.length; i++) {
    highestScore.push(addScoreresult[i].score)
  }
  let highestNumber = Math.max.apply(null, highestScore)
  var choosenItem = []
  for (var j = 0; j < addScoreresult.length; j++) {
    if (addScoreresult[j].score == highestNumber) {
      var choosenItem = addScoreresult[j]
    }
  }

   let itemFinalResult = choosenItem
   return itemFinalResult
}

//Run 100 times
let count = 0
let finaldataArray = []
let nameData= []
let ipData = []
let latData = []
let timeData = []
//let tureItemJSON

var str1=finalItem1024
var str2=finalItem1029
var str3=finalItem1030
var str4 = [];
for (var i = 0; i < str1.length; i++) {
    str4.push(str1[i]);
}
for (var i = 0; i < str2.length; i++) {
    str4.push(str2[i]);
}
for (var i = 0; i < str3.length; i++) {
    str4.push(str3[i]);
}


//
// var str4=finalItem1030
// var str5=[]
// for (var i = 0; i < str3.length; i++) {
//     str3.push(str3[i]);
// }
// for (var i = 0; i < str4.length; i++) {
//     str3.push(str4[i]);
// }
//  console.log(str5);
var map1024 = []
var map1029 = []
var map1030 = []
for(i=0;i<100;i++){
    finaldataArray = findTheWinner()
    nameData[i] = finaldataArray.sender_name_auxiliary
    ipData[i] = finaldataArray.ip_sender
    latData[i] =finaldataArray.lat
    timeData[i] =finaldataArray.time_server
    str4.forEach(item => {
      if (!("score" in item)) {
        item.score = 50
      }
        if(nameData[i]==item.sender_name_auxiliary&& ipData[i]== item.ip_sender&&latData[i]==item.lat&&timeData[i]==finalDate ) {
          item.score += 100
          Itemcount ++
          // console.log("The score of Item");
          // console.log(item.sender_name_auxiliary);
          // console.log(item.score);
          // console.log(item.score/count)
          // console.log("    ");
          if(nameData[i]=='c1024'){
            map1024.push([item.score,Itemcount])

          }
          if(nameData[i]=='c1029'){
            map1029.push([item.score,Itemcount])

          }
          if(nameData[i]=='c1030'){
            map1030.push([item.score,Itemcount])

          }
        }
    })
}

console.log("1024");
console.log(map1024);
console.log("1029");
console.log(map1029);
console.log("1030");
console.log(map1030);
console.log("return");
console.log(returnCount);
//write data
const writeStream = fs.createWriteStream('result100.csv');
const pathName = writeStream.path;
let array = map1024.concat(map1029.concat(map1030))
console.log(array);
array.forEach(value => writeStream.write(`${value}\n`));
writeStream.on('finish', () => {
   console.log(`wrote all the array data to file ${pathName}`);
});
writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
});
writeStream.end();
