import { observable } from "mobx";

class SystemStore {
    @observable local = "zh";
}

export default new SystemStore()