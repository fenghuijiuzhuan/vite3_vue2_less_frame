
## 删除询问弹框
使用：在接口传参时和data平级多传一个 delDialogData
> delDialogData 对象
属性：
- delDialogIcon         弹框Icon 默认：error   可选值：warning
- delDialogMsg          弹框展示信息 Object
- - title               弹框提示标题    必填
- - content             弹框提示内容

>例如
- 接口名称：delGoodsById
- 请求参数：
    form: {
        ids: "1,2,3"
    }
- 弹框配置信息：
    delData: {
        delDialogIcon: "warning",
        delDialogMsg: {
            title: "确认要清空所选的日志吗？",
            content: "清空后将无法恢复",
        }
    }
>- 则接口请求中写法为：
    let { data } = await delGoodsById(form, delData);
