var ip = "jc33227179.qicp.vip"//"z5b22q.natappfree.cc"//"192.168.0.104:8080"//"222.20.12.59:8080"//"192.168.0.107:8080"//"192.168.0.107:8080"//"192.168.1.100:8080"//"192.168.0.103:8080"//"t2570t5466.qicp.vip" //"222.20.13.223:8080"; //"192.168.43.209:8080";
var fname;
var xmlDom;

function setimage_xml() {
  var url = location.search;
  if (url.indexOf("?") != -1) {
    var data = url.substr(1);
    var datas = data.split('&');
    var crop = datas[0];
    var pattern = datas[1];
    show_info(crop, pattern);
    var lng = datas[2];
    var lat = datas[3];
    createXml(crop, pattern, lng, lat);
    var imageData = datas[4];
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
  }
}

function show_info(crop, task) {
  var ch_crop;
  var ch_task;
  switch (crop) {
    case "maize":
      ch_crop = "玉米";
      break;
    case "wheat":
      ch_crop = "小麦";
      break;
    case "rice":
      ch_crop = "水稻";
      break;
    case "cotton":
      ch_crop = "棉花";
      break;
  }
  switch (task) {
    case "density":
      ch_task = "密度值检测";
      break;
    case "overlap":
      ch_task = "覆盖度检测";
      break;
    case "counting":
      ch_task = "生产量预估";
      break;
    case "pest":
      ch_task = "病虫害检测";
      break;
    case "identification":
      ch_task = "品种鉴别";
      break;
  }
  $("#crop").append("" + ch_crop);
  $("#task").append("" + ch_task);
  /* if(ch_task=="品种鉴别"){
    $("#crop").css("display", "none" );
    $("#name").css("display", "none" );
  } */
}

function createXml(crop, pattern, lng, lat) {
  var str = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?><project><img><imagename></imagename><imagetime></imagetime><longitude></longitude><latitude></latitude><cropinfo></cropinfo><taskinfo></taskinfo><state></state></img></project>"
  $(function () {
    var imagetime;
    var fulldate;

    function load_time() {
      var date = new Date();
      var year = date.getFullYear();
      var month;
      if (date.getMonth() + 1 < 10) {
        month = "0" + (date.getMonth() + 1);
      } else month = "" + (date.getMonth() + 1);
      var day;
      if (date.getDate() < 10) {
        day = "0" + date.getDate();
      } else day = "" + date.getDate();
      fulldate = "" + year + month + day;
      var hour;
      if (date.getHours() < 10) {
        hour = "0" + date.getHours();
      } else hour = "" + date.getHours();
      var minute;
      if (date.getMinutes() < 10) {
        minute = "0" + date.getMinutes();
      } else minute = "" + date.getMinutes();
      var second;
      if (date.getSeconds() < 10) {
        second = "0" + date.getSeconds();
      } else second = "" + date.getSeconds();
      imagetime = fulldate + hour + minute + second;
    }
    load_time();
    fname = fulldate + Random();
    xmlDom = $($.parseXml(str));
    xmlDom.find("cropinfo").appendXml("<content/>").text(crop);
    xmlDom.find("state").appendXml("<content/>").text("undo");
    xmlDom.find("taskinfo").appendXml("<content/>").text(pattern);
    xmlDom.find("imagename").appendXml("<content/>").text(fname + ".jpg");
    xmlDom.find("imagetime").appendXml("<content/>").text(imagetime);
    xmlDom.find("longitude").appendXml("<content/>").text(lng);
    xmlDom.find("latitude").appendXml("<content/>").text(lat);
    console.log(xmlDom.xml());
  });
}

function Random() {
  var random = "_";
  for (var i = 0; i < 6; i++) {
    random += Math.floor(Math.random() * 10);
  }
  return random;
}

function UpLoad() {
  var imageURI = document.getElementById('myImage').src;

  onLoadImageUploadSuccess(imageURI);
  onLoadXmlUploadSuccess();
}

function onLoadXmlUploadSuccess() {
  $.ajax({
    url: 'http://' + ip + '/upload/UpLoadXml.jsp',
    type: 'post',
    data: xmlDom.xml(), //encodeURIComponent(xmlDom.xml()),
    dataType: 'xml',
    success: function (xmlDoc) {
      var retCode = $(xmlDoc).find('retCode').text();
      alert(retCode);
    },
    error: function (xhr) {
      console.log('发生错误！\n' + xhr.responseText);
    }
  });

  return false;
}

function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
}

function onLoadImageUploadSuccess(imageURI) {
  var options = new FileUploadOptions(); //文件参数选项
  options.fileKey = "file1"; //向服务端传递的file参数的parameter name

  options.fileName = fname + '.jpg'; //文件名
  console.log(options.fileName);
  options.mimeType = "image/jpeg"; //文件格式，默认为image/jpeg

  var params = {};
  params.value1 = "test";
  params.value2 = "param";
  options.params = params;
  var ft = new FileTransfer(); //文件上传类
  ft.onprogress = function (progressEvt) { //显示上传进度条
    if (progressEvt.lengthComputable) {
      navigator.notification.progressValue(Math.round((progressEvt.loaded / progressEvt.total) * 100));
    }
  }
  navigator.notification.progressStart("提醒", "当前上传进度");
  ft.upload(imageURI, encodeURI('http://' + ip + '/upload/UpLoadImage.jsp'), function (r) {
    navigator.notification.progressStop(); //停止进度条
    navigator.notification.alert("文件上传成功！", null, "提醒");
    $(".spinner-box").css("display", "flex")
    $(".item.button-pulse").css("display", "none")
    query_state(xmlDom.find("imagename").text());
  }, function (error) {
    alert("失败：" + error.code);
  }, options);
}
var t;

function query_state(imgname) {
  $.ajax({
    url: 'http://' + ip + '/upload/query_state.jsp',
    type: 'post',
    data: imgname,
    dataType: 'text',
    success: function (data) {
      var state = data.split("?")[1];
      if (state == 'done') {
        window.location.href = "imginfo.html?" + imgname;
      } else {
      if(t==null){
        t = setTimeout(function () {
          clearTimeout(t);
          alert("失败！\n请重新拍摄，检查作物及模式是否选择正确");
          window.location.href = "camera.html";
        }, 60000)
        }
        query_state(imgname);
      }
    },
    error: function (xhr) {
      console.log('发生错误！\n' + xhr.responseText);
    }
  });
}

function change() {
  $.ajax({
    url: 'http://' + ip + '/upload/change_state.jsp',
    type: 'post',
    data: xmlDom.find("imagename").text(),
    dataType: 'text',
    success: function (state) {
      console.log(state)
    },
    error: function (xhr) {
      console.log('发生错误！\n' + xhr.responseText);
    }
  });
}