var assert = require('assert').strict;
var webdriver = require('selenium-webdriver');
By = webdriver.By;
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
    browser
      .getTitle()
      .then(function (title) {
        resolve(title);
      })
      .catch((err) => reject(err));
  });
}

function click() {
  return new Promise((resolve, reject) => {
    browser
      .findElement(By.xpath("//*[@id='tab2']"))
      .click()
      .then(function (c) {
        resolve(c);
      })
      .catch((err) => reject(err));
  });
}

function checkInActive() {
  return new Promise((resolve, reject) => {
    browser
      .findElement(By.xpath("//*[@id='tab2']"))
      .getAttribute('class')
      .then(function (c) {
        resolve(c);
      })
      .catch((err) => reject(err));
  });
}

function checkClickActive() {
  return new Promise((resolve, reject) => {
    click();
    browser
      .findElement(By.xpath("//*[@id='tab2']"))
      .getAttribute('class')
      .then(function (c) {
        resolve(c);
      })
      .catch((err) => reject(err));
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

  it('Should check if Tab1 is existed and named correctly', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'tab1' })
        .then((elem) => {
          elem
            .getText()
            .then((text) => {
              assert.strictEqual(text, 'Calc SA');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Tab2 is existed and named correctly', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'tab2' })
        .then((elem) => {
          elem
            .getText()
            .then((text) => {
              assert.strictEqual(text, 'Calc Premium');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Tab2 is not clicked and inactive', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'tab2' })
        .then((elem) => {
          elem
            .getAttribute('class')
            .then((text) => {
              assert.strictEqual(text, 'nav-link');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Tab2 is clicked and active correctly', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'tab2' })
        .then((elem) => {
          elem.click();
          elem
            .getAttribute('class')
            .then((text) => {
              assert.strictEqual(text, 'active nav-link');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  after(function () {
    // End of test use this.
    browser.quit();
  });
});
