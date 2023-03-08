import Vue from "vue";
import DataDict from "./dict";
import { getDicts } from "@/api/wms/comm";

Vue.use(DataDict, {
    request(list) {
        const params = {
            list,
        };
        return getDicts(params).then(({ data: res } ) => res.status === "200" ? (res.data ?? {}) : {});
    },
});
