//实验数据
var ARR = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"];
var OPTIONS = [
    [12,8,3],
    [4,7,2],
    [8,14,6],
    [13,8,5],
    [10,11,7],
    [4,6,11],
    [7,8,1],
    [3,14,4],
    [4,12,11],
    [9,5,6]
]
//实验重复 max=3
var REPETITION = 0;
//组数 max = 3
var BLOCK=1;
//时间
var TIME =0;
//错误次数
var ERROR=0;
//当前显示数据在OPTION中的index，对应表中option
var OPT = 0;
//当前实验次数
var cnt = 0;
//
var dataCopy = [0,0,0];
var startTime = new Date();
var endTime = new Date();

var aoa = [
    ['participant参与者', 'option','shape', 'repetition重复','block组数','time','error'],
];
var result ={
    "participant":"hhhh",
    "option":0,
    "shape":0,
    "repetition":0,
    "block":0,
    "time":0,
    "error":0,
    toAOA : function(participant,option,shape,repetition,block,time,error) {
        var a = [participant,option,shape,repetition,block,time,error];
        //console.log(a);
        return a;
      }
}
function btn_export() {

    var sheet = XLSX.utils.aoa_to_sheet(aoa);
    openDownloadDialog(sheet2blob(sheet), '导出.xlsx');
}
//插入按钮
function initBtn(){
    var div = document.getElementById("opt-group");
    for(var i=0;i<15;i++){
        div.innerHTML += "<button onclick=\"getNum(this)\" type=\"button\" class=\"btn btn-primary btn-pad btn-mar\" value=\""+i+"\">"+ARR[i]+"</button>"
    }
}

function startTest(){
    //开始计时
    startTime = new Date();
    //
    cnt++;
    //选出一组数据
    addRep();
    var datas = OPTIONS[OPT];
    dataCopy = datas.slice(0,3);
    //获取插入数据text
    var dataArr = document.getElementsByClassName("mydata");
    //插入数据
    // console.log("datas"+datas)
    dataArr[0].innerText= ARR[datas[0]]; 
    dataArr[1].innerText= ARR[datas[1]]; 
    dataArr[2].innerText= ARR[datas[2]]; 
    //显示实验次数
    var showCnt = document.getElementById("testCnt");
    showCnt.innerText = cnt + "/"+getSum();
}
function addExcel(){

    aoa.push(result.toAOA("hhh",OPT+1,1,REPETITION,BLOCK,TIME,ERROR));
    console.log("aoa"+aoa);
}
function calculateTime(){
    
}
//
function getNum(obj){
    var num = obj.value;
    if(dataCopy.length>0){
        var data = dataCopy.shift();
        if(num == data){
            console.log("点击正确");
            console.log(dataCopy.length);
            if(dataCopy.length==0){
                endTime = new Date();
                // 毫秒数
                TIME = endTime - startTime; 
                //写入EXCEL
                addExcel();
            }
        }else{
            dataCopy.unshift(data);
            console.log("点击错误");
            ERROR++;
        }
    }
    
}
//实验总次数
function getSum(){
    return 3*3*10;
}

function addRep(){
    REPETITION++;
    if(REPETITION==4){
        REPETITION = 1;
        //重复一轮换一组option
        addOpt();
    }
}
function addOpt(){
    OPT++;
    if(OPT==10){
        OPT = 0;
        //重复一轮组数+1
        addBlock();
    }
}
function addBlock(){
    BLOCK++;
    if(BLOCK ==4){
        BLOCK = 1;
    }
}

// //随机出一组数据
// function randomData(){
//     // 
//     var ifSelectArr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     var datas = new Array();//最终数据集
//     var index =0;
//     //
//     while(datas.length<3){
//         //生成随机数
//         index = randomNum(0,15);
//         if(ifSelectArr[index]==0){
//             ifSelectArr[index] =1;
//             datas.push(ARR[index]);
//             INDEXS[datas.length-1]=index;
//         }else{
//             console.log("重复生成"+ARR[index]);
//         }
//     }
//     console.log(datas);
//     console.log(INDEXS);
//     return datas;
// }
// //随机[min,max)
// function randomNum(Min, Max) {
//     var Range = Max - Min;
//     var Rand = Math.random();
//     var num = Min + Math.floor(Rand * Range); //舍去
//     return num;
// }


