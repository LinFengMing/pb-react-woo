class PBModel {
    constructor(rawData) {
        const [getValue, setValue] = (() => {
            let cache = rawData;

            const getValue = (key) => {
                return cache[key];
            }

            const setValue = (key, value) => {
                cache[key] = value;

                return this;
            }

            return [getValue, setValue];
        })();

        this.getValue = getValue;
        this.setValue = setValue;
    }

    get id() {
        return this.getValue('id');
    }

    // setId(value) {
    //     return this.setValue('id', value);
    // }
}

export default PBModel;
