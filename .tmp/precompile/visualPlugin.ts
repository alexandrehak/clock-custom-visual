import { Visual } from "../../src/visual";
var powerbiKey = "powerbi";
var powerbi = window[powerbiKey];

var testE4B8174EFC844BBBADC0DEBD2BBDE4F2 = {
    name: 'testE4B8174EFC844BBBADC0DEBD2BBDE4F2',
    displayName: 'test',
    class: 'Visual',
    version: '1.0.0',
    apiVersion: '2.6.0',
    create: (options) => {
        if (Visual) {
            return new Visual(options);
        }

        console.error('Visual instance not found');
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["testE4B8174EFC844BBBADC0DEBD2BBDE4F2"] = testE4B8174EFC844BBBADC0DEBD2BBDE4F2;
}

export default testE4B8174EFC844BBBADC0DEBD2BBDE4F2;