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
        id: 'weightlifting',
        desc: '举重'
    }

];
/*
var crop_data_part = [

    {
        id: "maize",
        desc: '健身操'
    },

    {
        id: 'wheat',
        desc: '跑步'
    }

];*/
var pattern_data = [

    {
        id: "1_run",
        desc: '起跑'
    },

    {
        id: "2_run",
        desc: '摆臂'
    },

    {
        id: "3_run",
        desc: '迈腿'
    },
    {
        id: "1_badminton",
        desc: '挥拍'
    },

    {
        id: "2_badminton",
        desc: '脚步移动'
    },
    {
        id: "1_jianshen",
        desc: '毽子操'
    },
    {
        id: "2_jianshen",
        desc: '拉伸'
    },
    {
        id: "1_weightlifting",
        desc: '挺举'
    },
    {
        id: "2_weightlifting",
        desc: '抓举'
    },
    {
        id: "zero",
        desc: ''
    }
];
var pattern_data_part = [
    {
        id: "2_run",
        desc: '短跑'
    },
    {
        id: "3_run",
        desc: '长跑'
    }
];
var pattern_data_rice = [
    {
        id: "1_badminton",
        desc: '挥拍'
    },

    {
        id: "2_badminton",
        desc: '脚步移动'
    }
]
var pattern_data_maize = [
    {
        id: "1_jianshen",
        desc: '毽子操'
    },
    {
        id: "2_jianshen",
        desc: '拉伸'
    }
]
var pattern_data_weightlifting = [
    {
        id: "1_weightlifting",
        desc: '挺举'
    },
    {
        id: "2_weightlifting",
        desc: '抓举'
    }
]
var pattern_data_zero = [
    {
        id: "zero",
        desc: ''
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
            $('#selectCrop').selectPageData(crop_data);
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
            if (crop==""){
                alert("请选择运动");
                $('#selectPattern').selectPageData(pattern_data_zero);
            }
            else{
                if(crop == "wheat"){
                    $('#selectPattern').selectPageData(pattern_data_part);
                }
                else if(crop=="rice"){
                    $('#selectPattern').selectPageData(pattern_data_rice);
                }
                else if(crop=="maize"){
                    $('#selectPattern').selectPageData(pattern_data_maize);
                }
                else if(crop=="weightlifting"){
                    $('#selectPattern').selectPageData(pattern_data_weightlifting);
                }
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

function toret(){
    var crop = document.getElementById('selectCrop').value;
    var pattern = document.getElementById('selectPattern').value;
    if(crop && pattern){
        window.location.href='show.html'//'URL?id=11'
    }else{
        alert("请选择运动和动作");
    }
    
} 
function topra(){
    var crop = document.getElementById('selectCrop').value;
    var pattern = document.getElementById('selectPattern').value;
    if(crop && pattern){
        window.location.href='practice.html'//'URL?id=11'
    }else{
        alert("请选择运动和动作");
    }
    
} 
/*
var xmlDom;
var nexthref = "camera_show.html?";

function createXml(select) {
    var crop = document.getElementById('selectCrop').value;
    var pattern = document.getElementById('selectPattern').value;
    if (!crop || !pattern)
        alert("请选择运动和动作");
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
}*/