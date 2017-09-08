$(".likeBtn").hover(()=>{
  $(".likeBtn").toggleClass("btn-success");
  $(".likeBtn").toggleClass("btn-danger");
});

$(".likeBtn").click(()=>{
  $(".likeBtn").toggleClass("btn-success");
  $(".likeBtn").toggleClass("btn-danger");
  $(".likeBtn i").toggleClass("fa-thumbs-up");
  $(".likeBtn i").toggleClass("fa-thumbs-down");
  $(".likeBtn").attr("id", ($(".likeBtn").attr('id') === 'liked' ? "notLiked" : "liked"));
});

//LIKED AND NOTLIKED ARE REVERSED FOR THE CLICK FUNCTION

//LIKING FUNCTION
$(".container").on("click", "#liked", ()=>{
    var user = window.location.href.split('/')[4],
    photo    = $("#firstProfilePic").attr("src");
    $.ajax({
      type: 'POST',
      data: JSON.stringify({user: user, photo: photo}),
      contentType: 'application/json',
      url: 'http://localhost:3030/like',
      success: function(data) {
        if (data === "Error")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> Something went Wrong</div>");
        }
      }
    });
});

//DISLIKING FUNCTION
$(".container").on("click", "#notLiked", ()=>{
  var user = window.location.href.split('/')[4],
  photo    = $("#firstProfilePic").attr("src");
  $.ajax({
    type: 'POST',
    data: JSON.stringify({user: user, photo: photo}),
    contentType: 'application/json',
    url: 'http://localhost:3030/dislike',
    success: function(data) {
      if (data === "Error")
      {
        $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
        <strong>Error</strong> Something went Wrong</div>");
      }
    }
  });
});

$("#editForm").submit((ev)=>{
  ev.preventDefault();
  var formdata = $('#editForm').serializeArray();
  var data = {};
  $(formdata).each(function(index, obj){
    data[obj.name] = obj.value;
  });
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:3030/user/edit/',
      success: function(data) {
        $('#editModal').modal('toggle');
        if (data === "Error")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> Something went Wrong</div>");
        }
        if (data === "Success")
          location.reload();
        console.log(data);
      }
    });
});

$("#editPhotoForm").submit((ev)=>{
  ev.preventDefault();
  var formdata = $('#editPhotoForm').serializeArray();
  var data = {};
  $(formdata).each(function(index, obj){
    data[obj.name] = obj.value;
  });
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:3030/user/edit/photo',
      success: function(data) {
        if (data === "Error")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> Something went Wrong</div>");
        }
        if (data === "Success")
          location.reload();
        console.log(data);
      }
    });
});

$(".tag-close").click((e)=>{
  $.ajax({
    type: 'POST',
    data: JSON.stringify({id: e.currentTarget.id}),
    contentType: 'application/json',
    url: 'http://localhost:3030/user/remove/tag',
    success: function(data) {
      if (data === "Error")
      {
        $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
        <strong>Error</strong> Something went Wrong</div>");
      }
      console.log(data);
    }
  });
  $(e.currentTarget).parent().remove();
});

$("#newTagForm").submit((ev)=>{
  ev.preventDefault();
  var formdata = $('#newTagForm').serializeArray();
  var data = {};
  $(formdata).each(function(index, obj){
    data[obj.name] = obj.value;
  });
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:3030/user/add/tag',
      success: function(data) {
        if (data === "Error")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> Something went Wrong</div>");
        }
        if (data === "Success")
          location.reload();
        console.log(data);
      }
    });
});

$("#zipcode").submit((ev)=>{
  ev.preventDefault();
  var formdata = $("#zipcode").serializeArray();
  var data = {};
  $(formdata).each(function(index, obj){
    data[obj.name] = obj.value;
  });
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: 'http://localhost:3030/user/change/loc',
    success: function(data) {
      if (data === "Error")
      {
        $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
        <strong>Error</strong> Something went Wrong</div>");
      }
      if (data === "Success")
        location.reload();
      console.log(data);
    }
  });
});

$("#reportBtn").click(()=>{
  $.ajax({
    type: 'POST',
    data: JSON.stringify({reported: profile}),
    contentType: 'application/json',
    url: 'http://localhost:3030/user/report',
    success: function(data){
      if (data === "Success") {
      $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
      <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
      <strong>Success</strong> This account has been reported</div>");
      $("#reportModal").modal('toggle');
      }
      else {
        $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
        <strong>Error</strong> something went wrong</div>");
        $("#reportModal").modal('toggle');
      }
    }
  });
});

$("#blockBtn").click(()=>{
  $.ajax({
    type: 'POST',
    data: JSON.stringify({blocked: profile}),
    contentType: 'application/json',
    url: 'http://localhost:3030/user/block',
    success: function(data){
      if (data === "Success") {
      $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
      <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
      <strong>Success</strong> This account has been blocked</div>");
      $("#blockModal").modal('toggle');
      }
      else {
        $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
        <strong>Error</strong> something went wrong</div>");
        $("#blockModal").modal('toggle');
      }
    }
  });
});

function checkLiked(){
  $.ajax({
    type: 'POST',
    data: JSON.stringify({user: profile}),
    contentType: 'application/json',
    url: 'http://localhost:3030/getLike',
    success: function(data) {
      console.log(data);
      if (data === "Liked")
        $('#likeStatus').html("This user like you !");
      else if (data === "Match")
        $("#likeStatus").html("IT'S A MATCH <3");
      else
        $("#likeStatus").html("");
    }
  });
}
/// On load check for like ///
checkLiked();

setInterval(()=>{
  checkLiked();
}, 35000)
/// On load check for like ///
