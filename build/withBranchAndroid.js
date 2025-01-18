"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withBranchAndroid = void 0;
exports.getBranchApiKey = getBranchApiKey;
exports.setBranchApiKey = setBranchApiKey;
const config_plugins_1 = require("expo/config-plugins");
const { addMetaDataItemToMainApplication, getMainApplicationOrThrow, removeMetaDataItemFromMainApplication, } = config_plugins_1.AndroidConfig.Manifest;
const META_BRANCH_KEY = "io.branch.sdk.BranchKey";
function getBranchApiKey(config) {
    return config.android?.config?.branch?.apiKey ?? null;
}
function setBranchApiKey(apiKey, androidManifest) {
    const mainApplication = getMainApplicationOrThrow(androidManifest);
    if (apiKey) {
        // If the item exists, add it back
        addMetaDataItemToMainApplication(mainApplication, META_BRANCH_KEY, apiKey);
    }
    else {
        // Remove any existing item
        removeMetaDataItemFromMainApplication(mainApplication, META_BRANCH_KEY);
    }
    return androidManifest;
}
const withBranchAndroid = (config, data) => {
    const apiKey = data.apiKey ?? getBranchApiKey(config);
    if (!apiKey) {
        throw new Error("Branch API key is required: expo.android.config.branch.apiKey");
    }
    config = (0, config_plugins_1.withAndroidManifest)(config, (config) => {
        config.modResults = setBranchApiKey(apiKey, config.modResults);
        return config;
    });
    return config;
};
exports.withBranchAndroid = withBranchAndroid;
