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
