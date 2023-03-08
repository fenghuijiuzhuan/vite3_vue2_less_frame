export const templateColumns = (self) =>[
    {
        title: "",
        align: "left",
        width: 200,
        renderHeader: (h, params) => {
            return h("div", [
                h("span", "属性（带"),
                h(
                    "span",
                    {
                        style: {
                            color: "#F71414",
                        },
                    },
                    "*"
                ),
                h("span", "的为必填项）"),
            ]);
        },
        render: (h, params) => {
            return h(
                "p",
                {
                    class: params.row.required
                        ? "title-required"
                        : "",
                },
                params.row.title
            );
        },
    },
    {
        title: "填写规则",
        align: "left",
        minWidth: 200,
        render: (h, params) => {
            return h("div", {
                domProps: {
                    innerHTML: params.row.cont,
                },
            });
        },
    },
]

export const passedColumns = (self) => [
    {
        title: "行数",
        align: "center",
        width: 80,
        key: "rowIndex"
    },
    {
        title: "错误原因",
        align: "left",
        minWidth: 180,
        key: "errorMsg"
    },
    {
        title: "验证结果",
        align: "center",
        minWidth: 80,
        render: (h, params) => {
            return (
                <Icon
                    type={params.row.flag == 1
                        ? "md-checkmark"
                        : "md-close"}
                    style={{
                        color: params.row.flag == 1 ? "#09C36D" : "#FF3E3E"
                    }}
                ></Icon>
            )
        }
    }
]

export const unPassedColumns = (self) => [
    {
        title: "行数",
        align: "center",
        width: 80,
        key: "rowIndex"
    },
    {
        title: "错误原因",
        align: "left",
        minWidth: 180,
        key: "errorMsg"
    },
    {
        title: "验证结果",
        align: "center",
        minWidth: 80,
        render: (h, params) => {
            return (
                <Icon
                    type={params.row.flag == 1
                        ? "md-checkmark"
                        : "md-close"}
                    style={{
                        color: params.row.flag == 1 ? "#09C36D" : "#FF3E3E"
                    }}
                ></Icon>
            )
        }
    }
]
