import { dbHelper } from "../../lib/DbHelper";

export function createStateStore() {
    return {
        user: null,
        setUser(user) {
            this.user = user;
        },
        datapoints: [],
        loadDatapoints(datapoints) {
            this.datapoints = [...datapoints];
        },
        addDatapoint(dp) {
            this.datapoints.unshift(dp);
        },
        removeDatapoint(id) {
            this.datapoints = this.datapoints.filter(dp => dp._id !== id);
        },
        get datapointCount() {
            return this.datapoints.length;
        },
        async refreshDatapoints(dataType) {
            const result = await dbHelper.getDatapoints(dataType);
            this.loadDatapoints(result);
        }
    };
};
