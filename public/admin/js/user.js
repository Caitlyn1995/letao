$(function(){
    var page = 1;
    var pageSize = 5;
    render();



    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                var htmlStr = template("tpl",info);
                $('tbody').html(htmlStr);
                $('.paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    numberOfPages:3,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,p){
                        page=p;
                        render(page);
                    }
                });
                
            }
        })
    }


    // 点击操作按钮时，显示出模态框
    var id;
    var isDelete;
    $('tbody').on('click','.btn',function(){
        $('#userModal').modal('show');
        id = $(this).parent().data('id');
        console.log(id);
        isDelete = $(this).hasClass('btn-success')?'1':'0';
        console.log(isDelete);
        
    })
    
    // 点击确定按钮，更改此条数据的状态
    $('.btn-confirm').on('click',function(){
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(info){
                if(info.success){
                    $('#userModal').modal('hide');
                    render();
                }
            }
        })
    })
})