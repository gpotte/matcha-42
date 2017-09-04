function searchProfiles(){
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://localhost:3030/suggestion',
    success: function(data) {
      if (data === "missing tags")
      {
        $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
        <strong>Error</strong> You have to complete your preferences in your profile</div>");
      }
      else if (data === "no results")
      {
        $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
        <strong>Error</strong> No profile corresponding to you</div>");
      }
      else
      {
        $("#suggestionsResults").empty();
        for (user of data){
          $("#suggestionsResults").append('<div class="col-lg-3 col-md-4 col-s-6">\
          <a href="/user/'+user.username+'"><div class="thumbnail" >\
          <div class="image">\
            <img class="img img-responsive full-width" src="'+user.photo[0]+'">\
          </div>\
          <div class="caption">\
            <h4>'+ user.username + " " + user.age +'</h4>\
          </div>\
        </div>\
        </a>\
        </div>');
        }
      }
    }
  });
}

searchProfiles();
