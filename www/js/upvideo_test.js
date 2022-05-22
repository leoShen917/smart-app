var upcheck;
// hTML5实现表单内的上传文件框，上传前预览视频，刷新预览video，使用HTML5 的File API,
// 建立一个可存取到该file的url，一个空的video标签，ID为video0,把选择的文件显示在video标签中，实现视频预览功能。
// 需要选择支持HTML API的浏览器。
function toret(){
    $("#upvideo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        console.log("objUrl = " + objUrl);
        if (objUrl) {
            $("#video2up").attr("src", objUrl);
        }
    });
    //建立一个可存取到该file的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    
    $( ".file" ).on( "change" , "input[type='file']" , function (){
        var  filePath=$( this ).val();
        if (filePath.indexOf( "mp4" )!=-1 || filePath.indexOf( "png" )!=-1){
            //修改允许类型
            $( ".fileerrorTip1" ).html( "" ).hide();
            var  arr=filePath.split( '\\' );
            var  fileName=arr[arr.length-1];
            $( ".showFileName1" ).html(fileName);
            upcheck=true;
        } else {
            $( ".showFileName1" ).html( "" );
            $( ".fileerrorTip1" ).html( "您未上传文件，或者您上传文件类型有误！" ).show();
            upcheck=false;
            return  false
        }
    })
}


// function upvideochange(){
//     alert("ok");
//     var objUrl = getObjectURL(this.files[0]);
//     console.log("objUrl = " + objUrl);
//     if (objUrl) {
//         $("#video2up").attr("src", objUrl);
//     }
//     var  filePath=$( this ).val();
//     if (filePath.indexOf( "mp4" )!=-1 || filePath.indexOf( "png" )!=-1){
//         //修改允许类型
//         $( ".fileerrorTip1" ).html( "" ).hide();
//         var  arr=filePath.split( '\\' );
//         var  fileName=arr[arr.length-1];
//         $( ".showFileName1" ).html(fileName);
//         alert("上传成功！关闭后跳转")
//         window.location.href='result_compare.html'
//         upcheck=true;
//     } else {
//         $( ".showFileName1" ).html( "" );
//         $( ".fileerrorTip1" ).html( "您未上传文件，或者您上传文件类型有误！" ).show();
//         upcheck=false;
//         alert("未选择视频或类型有误，上传失败！")
//         upcheck=false;
//     }
// }