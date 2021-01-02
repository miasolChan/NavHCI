//实验数据
var ARR = ["橙汁","奶茶","可乐","苹果","橙子","香蕉","蛋糕","面包","布丁","铅笔","钢笔","橡皮","篮球","足球","排球"];
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
//实验者
var PAERTICIPANT = "x"
//实验重复 max=3
var REPETITION = 0;
//导航栏样式
var SHAPE = 0 ;
//组数 max = 3
var BLOCK=1;
//时间
var TIME =0;
//错误次数
var ERROR=0;
//当前显示数据在OPTION中的index，对应表中option
var OPT = 0;
//当前实验次数
var cnt = 36;
//
var dataCopy = [0,0,0];
var startTime = new Date();
var endTime = new Date();

//aoa
var aoa = [
    ['participant', 'option','shape', 'repetition','block','time','error'],
];
//结果集对象
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
/**
 * 导出按钮
 * 
 * */
function btn_export() {
    //导出表
    var sheet = XLSX.utils.aoa_to_sheet(aoa);
    //导出文件名
    var str = PAERTICIPANT + '样式' + SHAPE +'导出.xlsx'
    openDownloadDialog(sheet2blob(sheet), str);
}

/**
 * 设置实验者
 */
function setPart(){
    var input = document.getElementById("part");
    PAERTICIPANT = input.value;
    console.log(PAERTICIPANT);
    
}
/**
 * 插入按钮
 */

function initBtn(){
    var div = document.getElementById("opt-group");
    for(var i=0;i<15;i++){
        div.innerHTML += "<button onclick=\"getNum(this)\" type=\"button\" class=\"btn btn-primary btn-pad btn-mar\" value=\""+i+"\">"+ARR[i]+"</button>"
    }
}
/**
 * 开始实验
 */
var isStart = false
function startTest(s){
    //是否开始
    isStart = true;
    //设置shape
    SHAPE = s;
    //
    if(cnt<=getSum()){
        cnt++;
        ERROR=0;
    }else{
        console.log("实验结束");
        getTips(0);
        return;
    }
    //显示实验者姓名
    var input = document.getElementById("part");
    input.value = PAERTICIPANT;
    //开始计时
    startTime = new Date();
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
    showCnt.innerText = "实验次数："+cnt + "/"+getSum();
    //Tips显示
    getTips(1);
}
/**
 * AOA添加
 */
function addExcel(){
    aoa.push(result.toAOA(PAERTICIPANT,OPT+1,SHAPE,REPETITION,BLOCK,TIME,ERROR));
    console.log("aoa"+aoa);
}
/**
 * 获取提示文字
 */
function getTips(flag){
    var tips = document.getElementById("tips");
    if(flag){
        tips.innerText = "第"+cnt+"次，开始"
    }
    else if(cnt!=getSum()){
        tips.innerText = "结束，点击\"开始\"进行下一次"
    }else{
        tips.innerText = "本次实验结束，点击\"导出\"excel"
    }
}
/**
 * 获取当前点击的index
 */
function getNum(obj){
    if(!isStart) return;

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
                //获取提示文字
                getTips(0);
            }
        }else{
            dataCopy.unshift(data);
            console.log("点击错误");
            ERROR++;
        }
    }
    
}
/**
 * 实验总数
 */
function getSum(){
    return 3*3*10;
}
/**
 * REPETITION增加一次
 */
function addRep(){
    REPETITION++;
    if(REPETITION==4){
        REPETITION = 1;
        //重复一轮换一组option
        addOpt();
    }
}
/**
 * SHAPE增加一次
 */
function addOpt(){
    OPT++;
    if(OPT==10){
        OPT = 0;
        //重复一轮组数+1
        addBlock();
    }
}
/**
 * BLOCK增加一次
 */
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


