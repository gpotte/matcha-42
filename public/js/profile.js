$(".likeBtn").hover(()=>{
  $(".likeBtn").toggleClass("btn-success");
  $(".likeBtn").toggleClass("btn-danger");
});

$(".likeBtn").click(()=>{
  $(".likeBtn").toggleClass("btn-success");
  $(".likeBtn").toggleClass("btn-danger");
  $(".likeBtn i").toggleClass("fa-thumbs-up");
  $(".likeBtn i").toggleClass("fa-thumbs-down");
});

$("#editForm").submit(()=>{
  var formdata = $('#editForm').serializeArray();
  var data = {};
  $(formdata).each(function(index, obj){
    data[obj.name] = obj.value;
  });
  ev.preventDefault();
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
