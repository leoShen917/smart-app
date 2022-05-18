var ip ="jc33227179.qicp.vip"//"z5b22q.natappfree.cc"// "192.168.0.104:8080"//"222.20.12.59:8080"//"192.168.0.107:8080"//"192.168.1.100:8080"//"192.168.0.103:8080"//"t2570t5466.qicp.vip"//"222.20.13.223:8080"; //"192.168.43.209:8080";

/* function cameraTakePicture() {
   var cameraOptions = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA, //照相机类型    
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWdith: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
   };
   navigator.camera.getPicture(onSuccess, onFail, cameraOptions);

   function onSuccess(imageData) {
      //image.src = "data:image/jpeg;base64," + imageData;
      navigator.geolocation.getCurrentPosition(function (position) {
         var latitude = position.coords.latitude;
         var longitude = position.coords.longitude;
         exchange(new BMap.Point(longitude, latitude), function (lng, lat) {
            var marker = new myImgMaker(new BMap.Point(lng, lat), imageData);
            map.addOverlay(marker); // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
         });
      }, function (error) {

      });
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }
} */
var t;

function getarea() {
   //myaddr(116.324499,39.899216);
   // 进行定位
   navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      exchange(new BMap.Point(longitude, latitude), function (lng, lat) {
         myaddr(lng, lat);
      });
   }, function (error) {

   });
}

//根据定位得到的经纬度对地址进行解析
function myaddr(longitude, latitude) {
   //alert("我的地址是："+longitude+","+latitude);

   // 百度地图API功能
   var point = new BMap.Point(longitude, latitude); //34.7534880000,113.6313490000
   map.centerAndZoom(point, 12);
   var marker = new BMap.Marker(point); // 创建标注
   map.addOverlay(marker); // 将标注添加到地图中
   //把地址在地图上标出来
   var geoc = new BMap.Geocoder();
   geoc.getLocation(point, function (rs) {
      var addrmsg = rs.address;
      //var addComp = rs.addressComponents;  //详细的分省市县街道的信息
      //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);

      var opts = {
         width: 200, // 信息窗口宽度
         height: 50, // 信息窗口高度
      }
      var infoWindow = new BMap.InfoWindow("地址:" + addrmsg, opts); //创建信息窗口对象 
      map.openInfoWindow(infoWindow, point); //开启信息窗口
   });
   map.enableScrollWheelZoom(true);
}

function follow() {
   navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      exchange(new BMap.Point(longitude, latitude), function (lng, lat) {
         map.centerAndZoom(new BMap.Point(lng, lat), 20);
         drawline(lng, lat);
      }); //34.7534880000,113.6313490000

   }, function (error) {

   });
}

function drawline(longitude, latitude) {
   var curlng;
   var curlat;
   var point0 = new BMap.Point(longitude, latitude);
   navigator.geolocation.getCurrentPosition(function (position) {
      curlng = position.coords.longitude;
      curlat = position.coords.latitude;
      exchange(new BMap.Point(curlng, curlat), callback);
      //alert("我的地址是："+longitude+","+latitude);
   }, function (error) {

   });
   callback = function (lng, lat) {
      if ((lng != longitude) || (lat != latitude)) {
         var npoint = new BMap.Point(lng, lat);
         var polyline = new BMap.Polyline([
            point0,
            npoint
         ], {
            strokeColor: "blue",
            strokeWeight: 6,
            strokeOpacity: 0.5
         });
         map.addOverlay(polyline);
         t = setTimeout("drawline(" + lng + "," + lat + ")", 1000);
      } else {
         t = setTimeout("drawline(" + longitude + "," + latitude + ")", 1000);
      }
   }
}

function showmap() {
   navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      //HiAI.coolMethod("123");
      map = new BMap.Map("allmap");
      map.clearOverlays();
      map.addEventListener("dragend", function (e) {
         //console.log("1");
         this.clearOverlays();
         add_pictures(this.getBounds());
      });
      map.addEventListener("zoomend", function (e) {
         //console.log("2");
         this.clearOverlays();
         add_pictures(this.getBounds());
      });
      /* var navigationControl = new BMap.NavigationControl({
         // 靠左上角位置
         anchor: BMAP_ANCHOR_TOP_LEFT,
         // LARGE类型
         type: BMAP_NAVIGATION_CONTROL_LARGE,
         // 启用显示定位
         enableGeolocation: true
       });
       map.addControl(navigationControl); */
      // 添加定位控件
      var geolocationControl = new BMap.GeolocationControl();
      geolocationControl.addEventListener("locationSuccess", function (e) {
         // 定位成功事件
         var address = '';
         address += e.addressComponent.province;
         address += e.addressComponent.city;
         address += e.addressComponent.district;
         address += e.addressComponent.street;
         address += e.addressComponent.streetNumber;
         alert("当前定位地址为：" + address);
      });
      geolocationControl.addEventListener("locationError", function (e) {
         // 定位失败事件
         alert(e.message);
      });
      map.addControl(geolocationControl);
      /* var myCameraCtrl = new CameraCtrl();
      map.addControl(myCameraCtrl);
      var follow = new FollowCtrl();
      map.addControl(follow);
      var menu = new MenuCtrl();
      map.addControl(menu); */
      var point;
      exchange(new BMap.Point(longitude, latitude), function (lng, lat) {
         point = new BMap.Point(lng, lat);
         console.log("1");
         map.centerAndZoom(point, 12);
         add_pictures(map.getBounds());
         //map_change();
      });
   }, function (error) {

   });
}

function add_pictures(bounds) {
   var sw = bounds.getSouthWest();
   var ne = bounds.getNorthEast();

   $.ajax({
      url: 'http://' + ip + '/upload/show_picture.jsp',
      type: 'post',
      data: "" + sw.lng + "&" + sw.lat + "&" + ne.lng + "&" + ne.lat,
      dataType: 'text',
      success: function (result) {
         var results = result.split("&");
         for (var j = 0, len = results.length; j < len; j++) {
            add_imgmarkers(results[j]);
         }
      },
      error: function (xhr) {
         console.log('发生错误！\n' + xhr.responseText);
      }
   });
}

function add_imgmarkers(img_name) {
   $.ajax({
      url: 'http://' + ip + '/upload/return_xml.jsp',
      type: 'post',
      data: img_name,
      dataType: 'text',
      success: function (result) {
         xmlDom = $($.parseXml(result.substring(result.indexOf("<"), result.length)));
         var jpg_name = xmlDom.find("imagename").text();
         var lng = xmlDom.find("longitude").text();
         var lat = xmlDom.find("latitude").text();
         var pt = new BMap.Point(lng, lat);
         var marker = new BMap.Marker(pt); // 创建标注
         map.addOverlay(marker); // 将标注添加到地图中
         marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
         marker.addEventListener('click',function(){
            var src=jpg_name.split(".")[0]+".xml";
            //window.location.href="imginfo.html?"+src;
            window.location.href="imginfo.html?"+jpg_name;
         })
      },
      error: function (xhr) {
         console.log('发生错误！\n' + xhr.responseText);
      }
   });

}

function stop_follow() {
   clearTimeout(t);
   console.log("stop");
}

function exchange(centerPointer, callback) {
   var pointArr = [];
   pointArr.push(centerPointer);
   translatecallback = function (data) {
      callback(data.points[0].lng, data.points[0].lat);
      console.log("end");
   }
   new BMap.Convertor().translate(pointArr, 1, 5, function (data) {
        callback(data.points[0].lng, data.points[0].lat);
        console.log("end");})
}

function CameraCtrl() {
   this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
   this.defaultOffset = new BMap.Size(window.screen.width / 2 - 25, 10); // 距离左上角位置
}
// 通过JavaScript的prototype属性继承于BMap.Control
CameraCtrl.prototype = new BMap.Control();
// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
CameraCtrl.prototype.initialize = function (map) {
   // 创建一个DOM元素
   var div = document.createElement("div");
   // 添加文字说明
   var icon = document.createElement('img');
   icon.type = "image";
   console.log(icon);
   icon.src = "img/camera2.png";
   div.appendChild(icon);
   // 绑定事件,点击一次放大两级
   div.onclick = function (e) {
      cameraTakePicture();
   }
   // 添加DOM元素到地图中
   map.getContainer().appendChild(div);
   // 将DOM元素返回
   return div;
}

function FollowCtrl() {
   this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
   this.defaultOffset = new BMap.Size(10, 10); // 距离左上角位置
}
// 通过JavaScript的prototype属性继承于BMap.Control
FollowCtrl.prototype = new BMap.Control();
// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
FollowCtrl.prototype.initialize = function (map) {
   // 创建一个DOM元素
   var div = document.createElement("div");
   // 添加文字说明
   var icon = document.createElement('img');
   icon.type = "image";
   icon.src = "img/follow.png";
   div.appendChild(icon);
   // 绑定事件,点击一次放大两级
   div.onclick = function (e) {
      follow();
      var stop = new StopCtrl();
      map.addControl(stop);
   }
   // 添加DOM元素到地图中
   map.getContainer().appendChild(div);
   // 将DOM元素返回
   return div;
}

function StopCtrl() {
   this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
   this.defaultOffset = new BMap.Size(10, 10); // 距离左上角位置
}
// 通过JavaScript的prototype属性继承于BMap.Control
StopCtrl.prototype = new BMap.Control();
// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
StopCtrl.prototype.initialize = function (map) {
   // 创建一个DOM元素
   var div = document.createElement("div");
   // 添加文字说明
   var icon = document.createElement('img');
   icon.type = "image";
   icon.src = "img/stop.png";
   div.appendChild(icon);
   // 绑定事件,点击一次放大两级
   div.onclick = function (e) {
      stop_follow();
      map.removeControl(this);
   }
   // 添加DOM元素到地图中
   map.getContainer().appendChild(div);
   // 将DOM元素返回
   return div;
}

function myImgMaker(point, url) {
   this._point = point;
   this._url = url;
}

myImgMaker.prototype = new BMap.Marker();
myImgMaker.prototype.initialize = function (map) {
   this.map = map;
   var div = this._div = document.createElement("div");
   div.id = "image";
   var image = document.getElementById("image");
   console.log("initializing");
   div.onclick = function () {
      image.src = "data:image/jpeg;base64," + this._url;
   }
}

function MenuCtrl() {
   this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
   this.defaultOffset = new BMap.Size(10, 10); // 距离左上角位置
}
// 通过JavaScript的prototype属性继承于BMap.Control
MenuCtrl.prototype = new BMap.Control();
// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
MenuCtrl.prototype.initialize = function (map) {
   // 创建一个DOM元素
   var div = document.createElement("div");
   // 添加文字说明
   var icon = document.createElement('img');
   icon.type = "image";
   icon.src = "img/menu.png";
   div.appendChild(icon);
   // 绑定事件,点击一次放大两级
   div.onclick = function (e) {
      _right.open();
   }
   // 添加DOM元素到地图中
   map.getContainer().appendChild(div);
   // 将DOM元素返回
   return div;
}