/*
 * @path        : \nita-wms-web\pages\wms\wmp\_provide\compose\Print\template\mixin.js
 * @message     :
 * @Author      : YvanGuo
 */
import { getLodop } from "../LodopFuncs";
import moment from "moment";
function get_dpi() {
    for (var i = 56; i < 2000; i++) {
        if (matchMedia("(max-resolution: " + i + "dpi)").matches === true) {
            return i;
        }
    }
}
const dpi = get_dpi();
console.log(dpi, "dpi");

export default {
    props: {
        width: {
            type: String,
            default() {
                return "";
            }
        },
        height: {
            type: String,
            default() {
                return "";
            }
        },
        margin: {
            type: String,
            default: "1cm"
        },
        isGroup: {
            type: Boolean,
            default: true
        },
        isSerial: Boolean,
        isDebug: {
            type: Boolean,
            default: () => {
                return process.env.NODE_ENV === "development";
            }
        },
        printData: {
            type: Array,
            default() {
                return [[]];
            }
        },
        bodyMaxHeight: {
            type: String,
            default: "90%"
        },
        bodyOffsetTop: {
            type: Number,
            default: 0
        },
        footerPosition: {
            type: String,
            default: "90%"
        },
        scale: {
            type: Number,
            default: 1
        },
        arrow: {
            type: Number,
            default: 1
        },
        hasBorder: Boolean,
        border: {
            type: String,
            default: "1px solid #000"
        },
        isFull: Boolean,
        isFullW: Boolean,
        isFullH: Boolean
    },
    computed: {
        printDataPost() {
            return this.printData
        },
        marginBox() {
            let res = this.margin.split(" ");
            let len = res.length;
            if (len === 1) {
                res = this.unit2mm(this.margin);
                return { l: res, r: res, t: res, b: res };
            }
            if (len === 2) {
                return {
                    l: this.unit2mm(res[1]),
                    r: this.unit2mm(res[1]),
                    t: this.unit2mm(res[0]),
                    b: this.unit2mm(res[0])
                };
            }
            if (len === 3) {
                return {
                    l: this.unit2mm(res[1]),
                    r: this.unit2mm(res[1]),
                    t: this.unit2mm(res[0]),
                    b: this.unit2mm(res[2])
                };
            }
            if (len === 4) {
                return {
                    l: this.unit2mm(res[3]),
                    r: this.unit2mm(res[1]),
                    t: this.unit2mm(res[0]),
                    b: this.unit2mm(res[2])
                };
            }
        },
        marginBoxScale() {
            let res = this.margin.split(" ");
            let len = res.length;
            if (len === 1) {
                res = parseFloat(this.unit2mm(this.margin)) * this.scale + "mm";
                return { l: res, r: res, t: res, b: res };
            }
            if (len === 2) {
                return {
                    l: parseFloat(this.unit2mm(res[1])) * this.scale + "mm",
                    r: parseFloat(this.unit2mm(res[1])) * this.scale + "mm",
                    t: parseFloat(this.unit2mm(res[0])) * this.scale + "mm",
                    b: parseFloat(this.unit2mm(res[0])) * this.scale + "mm"
                };
            }
            if (len === 3) {
                return {
                    l: parseFloat(this.unit2mm(res[1])) * this.scale + "mm",
                    r: parseFloat(this.unit2mm(res[1])) * this.scale + "mm",
                    t: parseFloat(this.unit2mm(res[0])) * this.scale + "mm",
                    b: parseFloat(this.unit2mm(res[2])) * this.scale + "mm"
                };
            }
            if (len === 4) {
                return {
                    l: parseFloat(this.unit2mm(res[3])) * this.scale + "mm",
                    r: parseFloat(this.unit2mm(res[1])) * this.scale + "mm",
                    t: parseFloat(this.unit2mm(res[0])) * this.scale + "mm",
                    b: parseFloat(this.unit2mm(res[2])) * this.scale + "mm"
                };
            }
        },
        reverseScale() {
            return 1 / this.scale;
        },
        supportUnits() {
            return ["in", "cm", "mm", "pt", "px"];
        },
        contentWidth() {
            return this.computeContentBox(
                this.width,
                this.marginBox.l,
                this.marginBox.r
            );
        },
        contentHeight() {
            return this.computeContentBox(
                this.height,
                this.marginBox.t,
                this.marginBox.b
            );
        },
        previewWidth() {
            let long = this.arrow === 2 ? this.height : this.width;
            const unit = this.supportUnits.find(unit => {
                const reg = new RegExp(unit);
                return reg.test(long);
            });
            return parseFloat(long) * this.scale + unit + "";
        },
        previewHeight() {
            let long = this.arrow === 2 ? this.width : this.height;
            const unit = this.supportUnits.find(unit => {
                const reg = new RegExp(unit);
                return reg.test(long);
            });
            return parseFloat(long) * this.scale + unit + "";
        },
        printPagePercent() {
            // return `Width:${this.scale*100}%;Height:${this.scale*100}%`
            return (1 / this.scale) * 100 + "%";
        },
        contentPreviewWidth() {
            return this.computeContentBox(
                this.previewWidth,
                this.marginBoxScale.l,
                this.marginBoxScale.r
            );
        },
        contentPreviewHeight() {
            return this.computeContentBox(
                this.previewHeight,
                this.marginBoxScale.t,
                this.marginBoxScale.b
            );
        }
    },
    methods: {
        onPrintBefore(LODOP, { name, copies }) {
            if (LODOP.VERSION < "6.2.2.6" || CLODOP.CVERSION < "3.0.8.3") {
                return;
            }
            LODOP.SET_LICENSES(
                "上海擒云数字信息技术有限公司",
                "1A181AD3AF89CE56138F8D8F4824FE43",
                "上海擒雲數字信息技術有限公司",
                "BFE555029B1DF9AE6FD2009AEAEAF3D4"
            );
            LODOP.PRINT_INIT();
            LODOP.SET_PRINT_COPIES(copies || 1);
            LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true);
        },
        onPrintEnter(LODOP, printerParams, i) {
            if (this.isSerial) {
                return this.onPrintDefault(...arguments);
            }
            return this.onPrintTable(...arguments);
        },
        onPrintAfter(LODOP, { name }) {
            console.log("打印机：", name);
            if (LODOP.CVERSION) {
                LODOP.On_Return = (TaskID, Value) => {
                    this.getPrintingStatus("PRINT_STATUS_EXIST", Value);
                };
                if (!this.isCustom) {
                    LODOP.SET_PRINT_MODE(
                        "PRINT_PAGE_PERCENT",
                        this.printPagePercent
                    );
                    if (this.isSerial) {
                        (this.isFullW || this.isFull) &&
                            LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
                        (this.isFullH || this.isFull) &&
                            LODOP.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW", true);
                    }
                }
                if (!name) {
                    // LODOP.PRINT_DESIGN();
                    LODOP.PREVIEWB();
                } else {
                    LODOP.SET_PRINTER_INDEX(name);
                    if (this.isDebug) {
                        // LODOP.PRINT_DESIGN();
                        LODOP.PREVIEWB();
                        // LODOP.PRINTB();
                    } else {
                        LODOP.PRINTB();
                    }
                }
            }
        },
        getPrintingStatus(ValueType, ValueIndex) {
            LODOP.On_Return = (TaskID, Value) => {
                console.log(JSON.stringify(Value), "队列状态", typeof Value);
                if (Value == "0" || Value == "") {
                    console.log("打印结束");
                    this.getPrintFinishStatus("PRINT_STATUS_OK", ValueIndex);
                } else {
                    console.log("打印中...");
                    this.$emit("onPrintLoading");
                }
            };
            var strResult = LODOP.GET_VALUE(ValueType, ValueIndex);
            if (!LODOP.CVERSION) {
                console.log(Value, "strResut");
                return strResult;
            } else return "";
        },
        getPrintFinishStatus(ValueType, ValueIndex) {
            LODOP.On_Return = (TaskID, Value) => {
                console.log(
                    "打印结束状态:" + JSON.stringify(Value),
                    typeof Value
                );
                this.$emit("onPrintFinish", Value);
                if (Value == "1") {
                    console.log(JSON.stringify(Value), "Value打印成功");
                    // that.$emit("onConfirm", that.newInfo);
                } else {
                    console.log(JSON.stringify(Value), "Value打印失败");
                    // this.$Message.info("打印失败，请检查打印机是否正常就绪!");
                }
            };
            LODOP.GET_VALUE(ValueType, ValueIndex);
        },
        onPrint(LODOP, printerParams) {
            return this.series(...arguments);
        },
        onPrintDefault(LODOP, printerParams, i) {
            const page = this.getElementById("print-page" + i);
            LODOP.NEWPAGEA();
            this.eachLoopBefore(...arguments);

            LODOP.SET_PRINT_PAGESIZE(
                this.arrow,
                this.unit2mm(this.width),
                this.unit2mm(this.height),
                ""
            );
            LODOP.ADD_PRINT_HTM(
                ...this.formatAddArgs(),
                this.getForHTML(page.outerHTML, 3)
            );

            this.eachLoopAfter(...arguments);
        },
        onPrintTable(LODOP, printerParams, i) {
            let header = this.getElementById("print-head" + i);
            let table = this.getElementById("print-table" + i);
            let footer = this.getElementById("print-foot" + i);
            let headerHeight = this.unit2mm(
                header.offsetHeight + this.bodyOffsetTop + "px"
            );
            let classname = `${i}`;
            LODOP.NEWPAGEA();

            LODOP.SET_PRINT_PAGESIZE(
                this.arrow,
                this.unit2mm(this.width),
                this.unit2mm(this.height),
                ""
            );
            this.eachLoopBefore(...arguments);

            LODOP.ADD_PRINT_HTM(
                ...this.formatAddArgs({ b: headerHeight }),
                this.getForHTML(header.outerHTML, 0)
            );
            LODOP.SET_PRINT_STYLEA(0, "ItemName", `head-${classname}`);
            LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);

            // LODOP.SET_PRINT_STYLEA(0, "PageIndex", "first");
            // LODOP.SET_PRINT_STYLEA(0, "PageUnIndex", "first");

            LODOP.ADD_PRINT_TABLE(
                ...this.formatAddArgs({
                    t: headerHeight,
                    b: this.bodyMaxHeight
                }),
                this.getForHTML(table.outerHTML, 1)
            );
            LODOP.SET_PRINT_STYLEA(0, "ItemName", `body-${classname}`);
            LODOP.SET_PRINT_STYLEA(0, "TableHeightScope", 1);
            LODOP.SET_PRINT_STYLEA(0, "Vorient", 0);

            LODOP.ADD_PRINT_HTM(
                ...this.formatAddArgs({ t: this.footerPosition }),
                this.getForHTML(footer.outerHTML, 2)
            );
            LODOP.SET_PRINT_STYLEA(0, "ItemName", `foot-${classname}`);
            LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);

            this.eachLoopAfter(...arguments);
        },
        series(LODOP, printerParams) {
            const oneCount = 10;
            const printData2 = this.isGroup ? this.arrayOneToTwo(this.printDataPost, oneCount) : [this.printDataPost];
            this.onPrintBefore(LODOP, printerParams);
            for (let i = 0; i < printData2.length; i++) {
                for (let j = 0; j < printData2[i].length; j++) {
                    this.onPrintEnter(...arguments, i * oneCount + j);
                }
                this.onPrintAfter(LODOP, printerParams);
            }
        },
        eachLoopBefore() {},
        eachLoopAfter() {},
        onOk(printerParams = {}) {
            let LODOP = getLodop();
            this.onPrint(LODOP, printerParams);
        },
        getMoment(date, format = "YYYY-MM-DD HH:mm") {
            if (!date) return moment(new Date()).format(format);
            return moment(date).format(format);
        },
        computeContentBox(long, m1, m2, offset = "0px") {
            let _offset = parseFloat(this.unit2mm(offset));
            let w = parseFloat(this.unit2mm(long));
            let ml = parseFloat(m1);
            let mr = parseFloat(m2);
            return w - ml - mr + _offset + "mm";
        },
        unit2mm(str, arrow = 0) {
            str = str.toString().toLowerCase();
            const unitObx = {
                in2mm: val => val * 25.4,
                cm2mm: val => val * 10,
                pt2mm: val => val / 2.83,
                px2mm: (val, arrow) => (val * 25.4) / dpi
            };

            const units = ["in", "cm", "mm", "pt", "px"];
            let unit = units.find(u => {
                return str.search(u) > -1;
            });

            if (!unit) {
                return str + "mm";
            }

            if (unit === "mm") {
                return str;
            }

            let val = parseFloat(str);

            return unitObx[unit + "2mm"](val, arrow) + "mm";
        },
        getPW(val) {
            let w =
                parseFloat(this.unit2mm(this.width)) -
                parseFloat(this.marginBox.l) -
                parseFloat(this.marginBox.r);
            if (val.search("%") > -1) {
                return (
                    ((w + parseFloat(this.marginBox.l)) * parseFloat(val)) /
                        100 +
                    "mm"
                );
            }
            return parseFloat(val) + parseFloat(this.marginBox.l) + "mm";
        },
        getPH(val) {
            let h =
                parseFloat(this.unit2mm(this.height)) -
                parseFloat(this.marginBox.t) -
                parseFloat(this.marginBox.b);
            if (val.search("%") > -1) {
                return (
                    ((h + parseFloat(this.marginBox.t)) * parseFloat(val)) /
                        100 +
                    "mm"
                );
            }
            return parseFloat(val) + parseFloat(this.marginBox.t) + "mm";
        },
        getElementById(id) {
            return document.getElementById(id) || document.createElement("div");
        },
        formatAddArgs(tlrb = {}) {
            let { t, l, r, b } = tlrb;
            let tt = t ? this.getPH(t) : this.marginBox.t;
            let ll = l ? this.getPW(l) : this.marginBox.l;
            let rr = "RightMargin:" + this.marginBox.r;
            let bb = "BottomMargin:" + this.marginBox.b;
            if (r) {
                rr = parseFloat(this.getPW(r)) - parseFloat(ll) + "mm";
            }
            if (b) {
                bb = parseFloat(this.getPH(b)) - parseFloat(tt) + "mm";
            }
            return [tt, ll, rr, bb];
        },
        getForHTML(htmlstr, inject) {
            if (inject === 0) {
                return this.getHeaderHTML(htmlstr);
            }
            if (inject === 1) {
                return this.getBodyHTML(htmlstr);
            }
            if (inject === 2) {
                return this.getFooterHTML(htmlstr);
            }
            if (inject === 3) {
                return this.getPageHTML(htmlstr);
            }
        },
        getHeaderHTML(htmlstr) {
            let style = `
                <style>
                    .yv-print__hide{display: none!important;}
                    .yv-print__show.inline{display: inline!important;}
                    .yv-print__show.block{display: block!important;}
                    .yv-print__show.flex{display: flex!important;}
                    .yv-print__show.inline-block{display: inline-block!important;}
                </style>
            `;
            // body{
            //     padding-left: ${this.marginBox.l};
            //     padding-right: ${this.marginBox.r};
            //     padding-top: ${this.marginBox.t};
            // }
            let body = `
                <body>
                    ${htmlstr}
                </body>
            `;
            return "" + style + body;
        },
        getBodyHTML(htmlstr) {
            let style = `
                <style>
                    .yv-print__hide{display: none!important;}
                    .yv-print__show.inline{display: inline!important;}
                    .yv-print__show.block{display: block!important;}
                    .yv-print__show.flex{display: flex!important;}
                    .yv-print__show.inline-block{display: inline-block!important;}
                </style>
            `;
            // body{
            //     padding-left: ${this.marginBox.l};
            //     padding-right: ${this.marginBox.r};
            // }
            let body = `
                <body>
                    ${htmlstr}
                </body>
            `;
            return "" + style + body;
        },
        getFooterHTML(htmlstr) {
            let style = `
                <style>
                    .yv-print__hide{display: none!important;}
                    .yv-print__show.inline{display: inline!important;}
                    .yv-print__show.block{display: block!important;}
                    .yv-print__show.flex{display: flex!important;}
                    .yv-print__show.inline-block{display: inline-block!important;}
                </style>
            `;
            // body{
            //     padding-left: ${this.marginBox.l};
            //     padding-right: ${this.marginBox.r};
            //     padding-bottom: ${this.marginBox.b};
            // }
            let body = `
                <body>
                    ${htmlstr}
                </body>
            `;
            return "" + style + body;
        },
        getPageHTML(htmlstr) {
            let style = `
                <style>
                    .yv-print__hide{display: none!important;}
                    .yv-print__show.inline{display: inline!important;}
                    .yv-print__show.block{display: block!important;}
                    .yv-print__show.flex{display: flex!important;}
                    .yv-print__show.inline-block{display: inline-block!important;}
                </style>
            `;
            let body = `
                <body>
                    ${htmlstr}
                </body>
            `;
            return "" + style + body;
        },
        sum(arr) {
            return arr.reduce(function(prev, curr, idx, arr) {
                return prev + curr;
            });
        },
        arrayOneToTwo(arr, len) {
            let index = 0;
            let newArr = [];
            while (index < arr.length) {
                newArr.push(arr.slice(index, (index += len)));
            }
            return newArr;
        }
    }
};
