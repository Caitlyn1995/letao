$(function(){
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategory',
            success:function(info){
                // console.log(info);
                $('.lm_left ul').html(template("tpl",info));
                renderSecond(info.rows[0].id);
                
            }
        })
    }

    //渲染二级分类
    function renderSecond(id){
        // 获取点击的id，渲染对应id的数据
       $.ajax({
           type:'get',
           url:'/category/querySecondCategory',
           data:{
               id:id
           },
           success:function(info){
               console.log(info);
               $('.lm_right ul').html(template("tpl2",info));
               
           }
       })

    }
    // 给一级分类的每个li注册点击事件（委托）
    // 点击后切换样式，获取对应的id并渲染对应id的数据
    $('.lm_left ul').on('click','li',function(){
            $(this).addClass('active').siblings().removeClass('active');
            var id=$(this).data('id');
            renderSecond(id);
    })
})