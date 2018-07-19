$(function () {
    render();


    // 点击清空记录按钮，将localStorage中的数据清空，然后再重新渲染、
    $('.history').on('click', '.btn_empty', function () {

        mui.confirm('您是否要清空所有的历史记录？', '温馨提示', ['取消', '确定'], function (e) {
            // console.log(e);
            if (e.index == 1) {
                localStorage.removeItem('lt_search_history');
                render();
            }

        })
    })


    // 点击删除按钮，获取对应的id，然后删除对应的数据
    $('.history').on('click', '.btn_delete', function () {
        var index = $(this).data('index');
        // 获取localStorage中的数据
        var history = getHistory();
        // 删除获取的下标对应的数据
        history.splice(index, 1);
        // console.log(history);
        mui.confirm('您是否要清除此记录？', '温馨提示', ['否', '是'], function (e) {
            if (e.index == 1) {
                // 将删除后剩下的数据保存到localStorage中
                localStorage.setItem('lt_search_history', JSON.stringify(history));
                render();
               
            }
        })


    })



    //点击搜索按钮的时候， 获取输入框中的值，
    $('.mui-btn').on('click', function () {
        $search = $('.lt_search input').val();
        $('.lt_search input').val('');
        console.log($search);
        // 如果搜索框中为空，则直接return
        if ($search == '') {
            mui.toast("请输入搜索的内容");
            return;
        }
        // 将获取的值保存到localStorage中
        // 要求：
        // 1.数组中最多只能保存10条数据，一旦超出10条，则删除最后一条数据
        // 2.当搜索的关键字出现重复时，删除之前的旧记录
        var history = getHistory();
        // 获取存在的数据在数组中的下标
        var index = history.indexOf($search);
        if (index != -1) {
            // 说明存在
            history.splice(index, 1);
        }
        if (history.length > 9) {
            history.pop();
        }
        history.unshift($search);
        console.log(history);


        localStorage.setItem('lt_search_history', JSON.stringify(history));
        render();
         // 把页面跳转到列表页
         location.href="searchList.html?key="+$search;

    })

    // 封装一个函数，用来获取locationStorage中的数据
    function getHistory() {
        var result = localStorage.getItem('lt_search_history');
        // 将获取的数据转化成数组
        return JSON.parse(result) || [];

    }
    function render() {
        var history = getHistory();
        $('.history').html(template("tpl", { history: history }));
    }
})