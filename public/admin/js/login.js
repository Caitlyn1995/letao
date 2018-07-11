$(function(){
    // 1.校验用户名和密码是否正确
    // console.log('hahah');
    $('form').bootstrapValidator({
        // 验证用户名是否为空
        fields : {
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    stringLength:{
                        min:3,
                        max:6,
                        message:'用户名应该为3-6位'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码为6-12位'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        },
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
        }
    });

    // 发送ajax请求，用户名和密码都输入正确的情况下才发送ajax请求
    // 给表单注册一个校验成功的事件
    $('form').on('success.form.bv',function(e){
        // 表单验证成功不需要刷新页面，需要阻止默认行为
        e.preventDefault();
        // console.log(111);
        
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data: $("form").serialize(),
            success:function(info){
                // console.log(info);
                if(info.error == 1000){
                    $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(info.error == 1001){
                    $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
                if(info.success){
                    location.href = "index.html";
                }
                
            }
        })
    })

    // 点击重置按钮，登录框中的所有信息和样式都去掉
    $("[type='reset']").on('click',function(){
        $('form').data('bootstrapValidator').resetForm();
    })


})