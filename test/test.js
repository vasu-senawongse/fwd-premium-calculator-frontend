var assert = require('assert').strict;
var webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
require('geckodriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
// Application Server
const serverUri = 'http://localhost:3000/';

/**
 * Config for Chrome browser
 * @type {webdriver}
 */
var browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: 'chrome' })
  .build();

/**
 * Config for Firefox browser (Comment Chrome config when you intent to test in Firefox)
 * @type {webdriver}
 */
/*
var browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "firefox" })
 .build();
 */

/**
 * Function to get the title and resolve it it promise.
 * @return {[type]} [description]
 */
function logTitle() {
  return new Promise((resolve, reject) => {
    browser.getTitle().then(function (title) {
      resolve(title);
    });
  });
}

describe('Home Page', function () {
  /**
   * Test case to load our application and check the title.
   */
  it('Should load the home page and get title', function () {
    return new Promise((resolve, reject) => {
      browser
        .get(serverUri)
        .then(logTitle)
        .then((title) => {
          assert.strictEqual(title, 'Fwd Calculator');
          resolve();
        })
        .catch((err) => reject(err));
    });
  });
  after(function () {
    // End of test use this.
    browser.quit();
  });
});
