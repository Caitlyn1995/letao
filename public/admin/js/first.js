$(function(){

    var page=1;
    var pageSize=5;

    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                var htmlStr = template('tpl',info);
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

    // 点击添加分类按钮，显示模态框
    $('.btn-add').click(function(){
        $('#add').modal('show');
    })
    

})