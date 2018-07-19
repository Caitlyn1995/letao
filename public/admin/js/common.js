// 在发送ajax请求的时候，需要开启进度条，结束后关闭进度条
$(document).ajaxStart(function(){
    // 在发送ajax请求时开启进度条
    NProgress.start();
})
$(document).ajaxStop(function(){
    console.log(111);
    
    setTimeout(function(){
        NProgress.done();
    },500)
})


// 第二级分类部分:显示与隐藏
$('.nav_child').prev().click(function(){
    $(this).next().slideToggle();
})


// 侧边栏的显示与隐藏
$('.icon_manu').on('click',function(){
    $('.lt_aside').toggleClass('active');
    $("body").toggleClass("active");
})

$('.icon_logout').on('click',function(){
    console.log(111);
    
    $('#logoutModal').modal("show");
})

// 退出功能，点击退出按钮，跳转到登录页面
$('.btn-logout').on('click',function(){
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        success:function(info){
            console.log(info);
            if(info.success){
                location.href='login.html'
            }
            
        }
    })
})

