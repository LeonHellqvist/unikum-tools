import fs from 'node:fs';
const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'sv',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: '__MSG_extensionName__',
  version: packageJson.version,
  description: '__MSG_extensionDescription__',
  permissions: ['storage', 'tabs'],
  host_permissions: ['https://tools-proxy.leonhellqvist.workers.dev/*'],
  options_page: 'options/index.html',
  action: {
    default_popup: 'popup/index.html',
    default_icon: 'icons/tools32.png',
  },
  icons: {
    16: 'icons/tools16.png',
    32: 'icons/tools32.png',
    48: 'icons/tools48.png',
    64: 'icons/tools64.png',
    128: 'icons/tools128.png',
    256: 'icons/tools256.png',
    512: 'icons/tools512.png',
  },
  content_scripts: [
    {
      matches: ['https://start.unikum.net/*'],
      js: ['content/index.iife.js'],
    },
    {
      matches: ['https://start.unikum.net/*'],
      js: ['content-ui/index.iife.js'],
    },
    {
      matches: ['https://start.unikum.net/*'],
      css: ['buttons.css'], // public folder
    },
  ],
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css'],
      matches: ['https://start.unikum.net/*'],
    },
  ],
};

export default manifest;
