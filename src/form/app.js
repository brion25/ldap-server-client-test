(function($){
    $(document).ready(function(){
        $("#btnSubmit").click(function(){
            var user = $("#txtUser").val(),
                pass = $("#txtPass").val();
            
            $.ajax({
                url:"/auth",
                method:"post",
                data:{
                    user : user,
                    pass : pass
                },
                success:function(response){
                    console.log(response);
                },
                error:function(error){
                    console.log(error);
                }
            })
        })
    });
})(jQuery);