//选择项数据
var crop_data = [

    {
        id: "maize",
        desc: '健身操'
    },

    {
        id: 'wheat',
        desc: '跑步'
    },

    {
        id: 'rice',
        desc: '羽毛球'
    },

    {
        id: 'cotton',
        desc: '举重'
    }

];
var crop_data_part = [

    {
        id: "maize",
        desc: '玉米'
    },

    {
        id: 'wheat',
        desc: '小麦'
    }

];
var pattern_data = [

    {
        id: "density",
        desc: '密度值检测'
    },

    {
        id: "overlap",
        desc: '覆盖度检测'
    },

    {
        id: "counting",
        desc: '生产量预估'
    },

    {
        id: "pest",
        desc: '病虫害检测'
    },

    {
        id: "identification",
        desc: '品种鉴别'
    }
];
var pattern_data_part = [

    {
        id: "density",
        desc: '密度值检测'
    },

    {
        id: "overlap",
        desc: '覆盖度检测'
    },

    {
        id: "counting",
        desc: '生产量预估'
    }
];
var pattern_data_rice = [
    {
        id: "density",
        desc: '密度值检测'
    },

    {
        id: "overlap",
        desc: '覆盖度检测'
    }
]
//input
$(document).ready(function () {
    $('#selectCrop').selectPage({

        showField: 'desc',
        keyField: 'id',
        data: crop_data,
        //仅选择模式，不允许输入查询关键字
        selectOnly: true,
        //关闭分页栏，数据将会一次性在列表中展示，上限200个项目
        pagination: false,
        //关闭分页的状态下，列表显示的项目个数，其它的项目以滚动条滚动方式展现（默认10个）
        listSize: 15,
        multiple: false,
        eOpen: function (self) {
            var pattern = document.getElementById('selectPattern').value;

            if (pattern == "identification" || pattern == "pest") {
                $('#selectCrop').selectPageData([{
                    id: "maize",
                    desc: '玉米'
                }]);
            }
            else if(pattern == "counting"){
                $('#selectCrop').selectPageData(crop_data_part);
            }
            else  {
                $('#selectCrop').selectPageData(crop_data);
            }
        },
        eClear: function (data) {
            $('#selectCrop').selectPageData(crop_data);
            $('#selectPattern').selectPageData(pattern_data);
        }

    });
    $('#selectPattern').selectPage({

        showField: 'desc',
        keyField: 'id',
        data: pattern_data,
        //仅选择模式，不允许输入查询关键字
        selectOnly: true,
        //关闭分页栏，数据将会一次性在列表中展示，上限200个项目
        pagination: false,
        //关闭分页的状态下，列表显示的项目个数，其它的项目以滚动条滚动方式展现（默认10个）
        listSize: 15,
        multiple: false,
        eOpen: function (data) {
            var crop = document.getElementById('selectCrop').value;
            
            if(crop == "wheat"){
                $('#selectPattern').selectPageData(pattern_data_part);
            }
            else if(crop=="rice" || crop == "cotton"){
                $('#selectPattern').selectPageData(pattern_data_rice);
            }
            else{
                $('#selectPattern').selectPageData(pattern_data);
            }
        },
        eClear: function (data) {
            $('#selectCrop').selectPageData(crop_data);
            $('#selectPattern').selectPageData(pattern_data);
        }
    });

    /* $("button").click(function(){
        alert($(this).css("background-color"))
    }) */
})
//xml生成
var xmlDom;
var nexthref = "camera_show.html?";


function createXml(select) {
    var crop = document.getElementById('selectCrop').value;
    var pattern = document.getElementById('selectPattern').value;
    if (!crop || !pattern)
        alert("请选择作物或模式");
    else {
        nexthref = nexthref + crop + "&" + pattern;
        cameraTakePicture(select);
    }

}
//拍照
function cameraTakePicture(select) {
    var CAMERA = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA, //Camera.PictureSourceType.PHOTOLIBRARY, //照相机类型   
        //allowEdit:true, 
        //targetHeight: 800,
        //targetWidth: 600,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: false
    };
    var PHOTOLIBRARY = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY, //照相机类型   
        //allowEdit:true, 
        //targetHeight: 800,
        //targetWidth: 600,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: false
    };
    console.log("3");
    if (select == "camera")
        navigator.camera.getPicture(onSuccess, onFail, CAMERA);
    else if (select == "photolibrary")
        navigator.camera.getPicture(onSuccess, onFail, PHOTOLIBRARY);
        //HiAI.SR()
    function onSuccess(imageData) {
        //image.src = "data:image/jpeg;base64," + imageData;
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var point;
            console.log("1");
            exchange(new BMap.Point(longitude, latitude), function (lng, lat) {
                point = new BMap.Point(lng, lat);
                console.log("2");
                window.location.href = nexthref + "&" + point.lng + "&" + point.lat + "&" + imageData;
                return;
            });

            //window.open("camera_show.html") ;
        }, function (error) {

        });
    }

    function onFail(message) {
        alert('Failed because: ' + message);
        nexthref = "camera_show.html?";
    }
}

function exchange(centerPointer, callback) {
    var pointArr = [];
    console.log(centerPointer.lng);
    pointArr.push(centerPointer);
    translatecallback = function (data) {
        console.log("4");
        callback(data.points[0].lng, data.points[0].lat);
    }
    new BMap.Convertor().translate(pointArr, 1, 5, translatecallback)
    console.log("5");
}