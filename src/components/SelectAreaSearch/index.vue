<template>
    <Form :label-width="100">
        <Row>
            <Col :span="8">
                <FormItem label="所属省">
                    <Select
                        v-model="provinceValue"
                        clearable
                        placeholder="请选择省"
                        class="alysa_Select"
                        @on-change="onChangeProvince"
                        label-in-value
                        filterable
                    >
                        <Option
                            v-for="item in provinceList"
                            :value="item.id"
                            :key="item.id"
                            >{{ item.addrName }}</Option
                        >
                    </Select>
                </FormItem>
            </Col>
            <Col :span="8">
                <FormItem label="所属市">
                    <Select
                        v-model="cityValue"
                        clearable
                        label-in-value
                        class="alysa_Select"
                        placeholder="请选择市"
                        @on-open-change="onOpenCity"
                        @on-change="onChangeCity"
                        filterable
                    >
                        <Option
                            v-for="item in cityList"
                            :value="item.id"
                            :key="item.id"
                            >{{ item.addrName }}</Option
                        >
                    </Select>
                </FormItem></Col
            >
            <Col :span="8">
                <FormItem label="所属区">
                    <Select
                        v-model="countyValue"
                        clearable
                        label-in-value
                        class="alysa_Select"
                        placeholder="请选择区"
                        @on-open-change="onOpenCounty"
                        @on-change="onChangeCounty"
                        filterable
                    >
                        <Option
                            v-for="item in countyList"
                            :value="item.id"
                            :key="item.id"
                            >{{ item.addrName }}</Option
                        >
                    </Select>
                </FormItem></Col
            >
        </Row>
    </Form>
</template>

<script lang="jsx">
import { getRegion } from "@/api/wms/tms";
export default {
    name: "SelectAreaSearch",
    props: {
        province: {
            type: Number | String,
            default: "",
        },
        city: {
            type: Number | String,
            default: "",
        },
        county: {
            type: Number | String,
            default: "",
        },
    },
    data() {
        return {
            provinceValue: "",
            cityValue: "",
            countyValue: "",
            provinceList: [],
            cityList: [],
            countyList: [],
        };
    },
    mounted() {
        this.provinceValue = this.province;
        this.cityValue = this.city;
        this.countyValue = this.county;
        this.getListData();
    },
    methods: {
        //  省PROVINCE_CODE  市 CITY_CODE  区DISTRICT_CODE
        async getListData(parentId = 0, addrType = "PROVINCE_CODE") {
            const params = {
                addrType,
                parentId,
            };
            const { data: res } = await getRegion(params);
            if (res.status == "200") {
                if (addrType === "PROVINCE_CODE") this.provinceList = res.data;
                if (addrType === "CITY_CODE") this.cityList = res.data;
                if (addrType === "DISTRICT_CODE") this.countyList = res.data;
            }
        },
        // 展开城市时，需要判断有没有选择省
        onOpenCity(val) {
            if (val && !this.provinceValue) {
                this.$Message.error("请先选择省");
            }
        },
        // 展开区时，需要判断有没有选择市
        onOpenCounty(val) {
            if (val && !this.cityValue) {
                this.$Message.error("请先选择市");
            }
        },
        // 改变省时,先将市，区清空
        onChangeProvince(val) {
            this.cityValue = "";
            this.countyValue = "";
            this.cityList = [];
            this.countyList = [];
            this.$emit("update:city", "");
            this.$emit("update:county", "");
            // 如果有值，代表是选择了，否则是清空
            if (val) {
                this.$emit("update:province", val.label);
                this.getListData(val.value, "CITY_CODE");
            } else {
                this.$emit("update:province", "");
            }
        },
        // 改变市时,先将区清空
        onChangeCity(val) {
            this.countyValue = "";
            this.countyList = [];
            this.$emit("update:county", "");
            if (val) {
                this.$emit("update:city", val.label);
                this.getListData(val.value, "DISTRICT_CODE");
            } else {
                this.$emit("update:city", "");
            }
        },
        // 改变区
        onChangeCounty(val) {
            if (val) {
                this.$emit("update:county", val.label);
            } else {
                this.$emit("update:county", "");
            }
        },
        reset() {
            this.provinceValue = "";
            this.cityValue = "";
            this.countyValue = "";
        },
    },
};
</script>

<style>
</style>
