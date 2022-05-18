var ip="jc33227179.qicp.vip"//"z5b22q.natappfree.cc"//"192.168.0.104:8080"//"222.20.12.59:8080"//"192.168.0.107:8080"//"192.168.0.107:8080"//"192.168.1.100:8080"//"192.168.0.103:8080"//"t2570t5466.qicp.vip"//"222.20.13.223:8080";//"192.168.43.209:8080"

$(document).ready(function () {
   $.ajax({
      url: 'http://'+ip+'/upload/query_history.jsp',
      type: 'post',
      data: "user_name", //可以查某一个用户的历史记录
      dataType: 'text',
      success: function (result) {
         var results = result.split("?")[1].split("&");
         for (var j = 0, len = results.length; j < len; j++) {
            var date = results[j].split("_")[0];
            if (document.getElementById(date)) {} else {
               $(".show").append("<div class='day' id='" + date + "' data-num='0'></div>");
               $("#" + date).append("<p>" + date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8) + "</p>");
            }
            $("#" + date).append("<img class='pictures' src='http://"+ip+"/upload/imageupload/" + results[j] +"?version="+ new Date().getTime() +"'>");
            var num=parseInt($("#" + date).data("num"));
            $("#" + date).data("num",""+(num+1));
            //$("#" + date).css("height",parseInt((num+3)/3)*30+"%");
            //$("#" + date+">.pictures").css("height",80/parseInt((num+3)/3)+"%");
            //$("#" + date+">.pictures").css("margin-bottom",10/parseInt((num+3)/3)+"%");
         }
      },
      error: function (xhr) {
         console.log('发生错误！\n' + xhr.responseText);
      }
   });

   $("body").on('click','.pictures',function(){
      //var src=this.src.split("?")[0].split("/")[5].split(".")[0]+".xml";
      window.location.href="imginfo.html?"+this.src.split("?")[0].split("/")[5];
   })
})