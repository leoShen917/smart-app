var xmlDom;
var ip = "jc33227179.qicp.vip"//"z5b22q.natappfree.cc"//"192.168.0.104:8080"//"222.20.12.59:8080"//"192.168.0.107:8080"//"192.168.0.107:8080"//"192.168.1.100:8080" //"t2570t5466.qicp.vip"//"192.168.0.103:8080"//"t2570t5466.qicp.vip"//"222.20.13.223:8080";//'192.168.43.209:8080';

function getURL() {
    var data = location.search;
    if (data.indexOf("?") != -1) {
        var url = data.substr(1);
        $.ajax({
            url: 'http://' + ip + '/upload/return_xml.jsp',
            type: 'post',
            data: url,
            dataType: 'text',
            success: function (result) {
                xmlDom = $($.parseXml(result.substring(result.indexOf("<"), result.length)));
                var imagename = xmlDom.find("imagename").text();
                var crop;
                var task;
                var locat;
                var time;
                var result_name;
                console.log(xmlDom.find("cropinfo").text() + "   " + xmlDom.find("taskinfo").text())
                switch (xmlDom.find("cropinfo").text()) {
                    case "maize":
                        crop = "玉米";
                        break;
                    case "wheat":
                        crop = "小麦";
                        break;
                    case "rice":
                        crop = "水稻";
                        break;
                    case "cotton":
                        crop = "棉花";
                        break;
                }
                switch (xmlDom.find("taskinfo").text()) {
                    case "density":
                        task = "密度值检测";
                        result_name = "密度　　：";
                        break;
                    case "overlap":
                        task = "覆盖度检测";
                        result_name = "覆盖度　：";
                        break;
                    case "counting":
                        task = "生产量预估";
                        result_name = "预估产量：";
                        break;
                    case "pest":
                        task = "病虫害检测";
                        result_name = "病虫害　：";
                        break;
                    case "identification":
                        task = "品种鉴别";
                        result_name = "作物品种："
                        break;
                }
                $.ajax({
                    url: 'https://api.map.baidu.com/geocoder/v2/?callback=getlocation&location=' +
                        xmlDom.find("latitude").text() + "," +
                        xmlDom.find("longitude").text() +
                        '&output=xml&pois=1&ak=G2mGBB7vB0585R4MS574tePqgkYI1kHv',
                    type: 'get',
                    data: "",
                    dataType: 'text',
                    success: function (result) {
                        console.log($($.parseXml(result)).find("formatted_address").text());
                        locat = $($.parseXml(result)).find("formatted_address").text();
                        $("#date").after("<p class='info_name'>拍摄地点：</p><p class='info_show'>" + locat + "</p><br>");
                    },
                    error: function (xhr) {
                        console.log('发生错误！\n' + xhr.responseText);
                    }
                });
                var imgtime = xmlDom.find("imagetime").text();
                time = imgtime.substring(0, 4) + "-" + imgtime.substring(4, 6) + "-" + imgtime.substring(6, 8) + "  " +
                    imgtime.substring(8, 10) + ":" + imgtime.substring(10, 12) + ":" + imgtime.substring(12, 14);
                $(".picture").append("<img class='pictures' src='http://" + ip + "/upload/imageupload/" + imagename + "?version=" + Date() + "'>");
                $(".info").prepend("<p class='info_name'>模式　　：</p><p class='info_show'>" + task + "</p><br>");
                $(".info").append("<p class='info_name' >拍摄时间：</p><p class='info_show' id='date'>" + time + "</p><br>");
                //if(task!="品种鉴别"){
                $(".info").prepend("<p class='info_name'>作物种类：</p><p class='info_show'>" + crop + "</p><br>");
                $(".info").append("<p class='info_name'>" + result_name + "</p><p class='info_show'>" + xmlDom.find("resultdescriptor").text() + "</p><br>");
                /* }else{
                    $(".info").prepend("<p class='info_name'>作物种类：</p><p class='info_show'>" + xmlDom.find("resultdescriptor").text() + "</p><br>");
                } */
                $(".info").append("<p class='info_name'>建议　　：</p><p class='info_show'>" + xmlDom.find("resultadvise").text() + "</p><br>");
            },
            error: function (xhr) {
                console.log('发生错误！\n' + xhr.responseText);
            }
        });

    }
}

$(document).ready(function (){
    $(".picture").click(function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            //fs.root.getFile(xmlDom.find("imagename").text(),
            fs.root.getDirectory("HiAI",
            { create: true, exclusive: false },
            function (fileEntry) {
                console.log(fileEntry);              //调用fileTransfer插件，下载图片
                downLoadImg(fileEntry.nativeURL+"/"+xmlDom.find("imagename").text());
                },
            function(err) {
                console.log(err);
            });
         }, function(error) {
                console.log(error);
            });
    })

})
function downLoadImg(fileURL){
     var fileTransfer = new FileTransfer();       // 服务器下载地址
     var uri = encodeURI("http://" + ip + "/upload/imageupload/" + xmlDom.find("imagename").text());       // 调用download方法
     fileTransfer.download(           uri,         //uri网络下载路径
     fileURL,      //url本地存储路径
     function(entry) {
        console.log("download complete: " + entry.toURL());
        HiAI.SR(entry.toURL()+"");
      }, function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
        }       );
}

/* $(document).ready(function () {
    var imagename = xmlDom.find("imagename").text();
    $(".picture").append("<img class='pictures' src='http://222.20.13.223:8080/upload/imageupload/" + imagename + "?version='" + Date() + "'>");

}); */