## 打印插件

使用：vm.\$print(options)

> options 对象
> 属性：

-   tpl 模板文件名 默认：test
-   printWay 打印方式 默认：PriviewPrint
-   -   PriviewPrint 预览打印
-   -   ChoosePrinter 不预览打印
-   printOptions 打印配置 Object
-   -   wdith 打印纸张宽度，如'210mm'，可不传
-   -   height 打印纸张高度，如'297mm'，可不传
-   -   printData 打印模板中使用的数据 Array
-   -   printerOption 打印机配置 Object
-   -   -   name 打印机名
-   -   -   copies 打印份数

### 打印模板说明

> 参数：tpl

-   bookedLabel 预约商品标签(预约)(标签)
-   receiveGuide 收货指引单(预约)(A)
-   receiveLabel 收货码盘标签(收货)(标签)
-   receiveReceipt 收货回执单(收货)(多联)
-   receiveCard 收货卡(收货)(标签)
-   receiveCardPDA PDA 收货卡推送用(收货打印中心)(标签)

-   invoice 发货单(发货)(多联)
-   pick 商品拣货单(拣货)(A)
-   pickLabel 拣货标签(拣货)(标签)

-   encasement 装箱清单(复核)(A)
-   packageLabel 封箱标签(复核)(标签)
-   truck 装车单(装车)(A)

-   dockerLabel 容器标签(库区/容器)(标签)
-   receivereturngoods 销售退货退仓单(销售退货)(A)
-   returnOrder 采购退货详情打印拣货单(采购退货)(A)

-   goodsPlace 货位标签(货位管理)(标签)
-   replenishment 补货管理，补货打印单(A)

==========================================
已确认^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
==========================================

> 新增模板
> 应放置在`此文件夹/template`下，模板文件名即为打印插件的`tpl`参数的值
