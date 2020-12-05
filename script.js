var cataurl ="https://api.kcg.gov.tw/api/service/get/c88190f2-0206-4c49-825e-4fce327bfebf";
var items = [];

$(
  $(".clinicMap").attr("src","https://www.google.com/maps/embed/v1/place?key=AIzaSyCUNleJonG4cbeBBZpWOJjK3BPOWm6Kng8&q=高雄火車站")
);

function downloadList(){
  $.ajax({
    url: cataurl,
    success: function(res){
      items = res.data;
      updateList();
    },
    error: function(){
    }
  })
}

function updateList(){
  $("ul.clinicList").html("");
  items.forEach((item,index)=>{
    var Listitem = `<li data-id="${item.seq}">
                      ${item.column1}
                      ${item.column4}
                      ${item.column48}
                      ${item.column47}
                   </li>`;
   
    var ListItemEl = $(Listitem);
    if(index>3)
      $("ul.clinicList").append(ListItemEl);
    ListItemEl.click(function(){
      locateClinic(item.column47);
      $(".clinicName").text(item.column4);
      $(".clinicTel").text(item.column48);
    });
     
  });
}

$(".district").click(function(){
    var district = $("input[name='district']").val();
    $('.clinicList li').show().filter(function(){
        return $(this).text().indexOf(district)==-1;
    }).hide();
});

$(".subject").click(function(){
    var subject = $("input[name='subject']").val();
    $('.clinicList li').show().filter(function(){
        return $(this).text().indexOf(subject)==-1;
    }).hide();
});


function hideloadList(){
  $("ul.clinicList").hide();
}
function showloadList(){
  $("ul.clinicList").show();
}

function locateClinic(addr){
  $(".clinicMap").attr("src",`https://www.google.com/maps/embed/v1/place?key=AIzaSyCUNleJonG4cbeBBZpWOJjK3BPOWm6Kng8&q=${addr}`);
}