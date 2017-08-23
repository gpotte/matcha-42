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
    photo    = $("#profilePic").attr("src");
    $.ajax({
      type: 'POST',
      data: JSON.stringify({user: user, photo: photo}),
      contentType: 'application/json',
      url: 'http://85c1a8a7.ngrok.io/like',
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
      url: 'http://85c1a8a7.ngrok.io/user/edit/',
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
      url: 'http://85c1a8a7.ngrok.io/user/edit/photo',
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
    url: 'http://85c1a8a7.ngrok.io/user/remove/tag',
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
      url: 'http://85c1a8a7.ngrok.io/user/add/tag',
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
    url: 'http://85c1a8a7.ngrok.io/user/change/loc',
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
