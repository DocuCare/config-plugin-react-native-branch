import { ExpoConfig } from "expo/config";
import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
} from "expo/config-plugins";

const {
  addMetaDataItemToMainApplication,
  getMainApplicationOrThrow,
  removeMetaDataItemFromMainApplication,
} = AndroidConfig.Manifest;

const META_BRANCH_KEY = "io.branch.sdk.BranchKey";

export function getBranchApiKey(config: ExpoConfig) {
  return config.android?.config?.branch?.apiKey ?? null;
}

export function setBranchApiKey(
  apiKey: string,
  androidManifest: AndroidConfig.Manifest.AndroidManifest,
) {
  const mainApplication = getMainApplicationOrThrow(androidManifest);

  if (apiKey) {
    // If the item exists, add it back
    addMetaDataItemToMainApplication(mainApplication, META_BRANCH_KEY, apiKey);
  } else {
    // Remove any existing item
    removeMetaDataItemFromMainApplication(mainApplication, META_BRANCH_KEY);
  }

  return androidManifest;
}

export const withBranchAndroid: ConfigPlugin<{ apiKey?: string }> = (
  config,
  data,
) => {
  const apiKey = data.apiKey ?? getBranchApiKey(config);
  if (!apiKey || (typeof apiKey === 'string' && apiKey.trim() === '')) {
    throw new Error(
      "Branch API key is required. Set it via:\n" +
      "- expo.android.config.branch.apiKey in app.json/app.config.js\n" +
      "- BRANCH_API_KEY in your environment variables\n" +
      "- passing it directly to the plugin configuration"
    );
  }

  config = withAndroidManifest(config, (config) => {
    config.modResults = setBranchApiKey(apiKey, config.modResults);
    return config;
  });

  return config;
};
