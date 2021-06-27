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

function getSaResult() {
  return new Promise((resolve, reject) => {
    browser.wait(function () {
      return browser
        .findElement(By.id('SA-baseSumAssured'))
        .getAttribute('value')
        .then(function (text) {
          if (text != 0) resolve(text);
        })
        .catch((err) => reject(err));
    }, 10000);
  });
}

function getPmResult() {
  return new Promise((resolve, reject) => {
    browser.wait(function () {
      return browser
        .findElement(By.id('PM-baseAnnualPremium'))
        .getAttribute('value')
        .then(function (text) {
          if (text != 0) resolve(text);
        })
        .catch((err) => reject(err));
    }, 10000);
  });
}

//#region Home Page
describe('Home Page', function () {
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

  it('Should check if Calc SA Tab is existed and named correctly', function () {
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

  it('Should check if Calc Premium Tab is existed and named correctly', function () {
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
});
//#endregion
//#region Calc SA Page
describe('Calc SA Page', function () {
  it('Should check if Calc SA Tab is clicked and active correctly', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'tab1' })
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

  it('Should check if Calc Premium Tab Tab is not clicked and inactive', function () {
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

  it('Should unable to click the submit button by default', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Name field is able to input and has correct value', function () {
    browser.findElement({ id: 'SA-name' }).sendKeys('Vasu Senawongse');
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-name' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, 'Vasu Senawongse');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after enter name', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Gender selection field is clickable and can be selected', function () {
    browser.findElement({ id: 'SA-genderCd-Male' }).click();
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-genderCd' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, 'MALE');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after select gender', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Date of Birth field can be cleared and input new date', function () {
    browser.findElement({ id: 'rdp-form-control-SA-dob' }).click();
    browser.findElement({ id: 'rdp-form-control-SA-dob' }).clear();
    browser
      .findElement({ id: 'rdp-form-control-SA-dob' })
      .sendKeys('02/10/1997');
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'rdp-form-control-SA-dob' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, '02/10/1997');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after select date', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Plan selection field is clickable and can be selected', function () {
    browser.findElement({ id: 'SA-T11A20' }).click();
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-planCode' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, 'T11A20');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after select plan', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Sa Per Year field is able to input and has correct value', function () {
    browser.findElement({ id: 'SA-premiumPerYear' }).clear();
    browser.findElement({ id: 'SA-premiumPerYear' }).sendKeys('30000');
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-premiumPerYear' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, '30000');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after input SA', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Payment Frequency selection field is clickable and can be selected', function () {
    browser.findElement({ id: 'SA-paymentFrequency-YEARLY' }).click();
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-paymentFrequency' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, 'YEARLY');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should be able to click the submit button after input paymentFrequency and all fields ', function () {
    browser.findElement({ id: 'SA-submit' }).click();
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-submit' })
        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, true);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if SA Result field is disabled', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-baseSumAssured' })
        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if SA Result field got a result and value is correct', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'SA-baseSumAssured' })
        .then(getSaResult)
        .then((value) => {
          assert.strictEqual(value, '2351466');
          resolve();
        })
        .catch((err) => reject(err));
    });
  });
});
//#endregion
//#region Calc PM Page
describe('Calc Premium Page', function () {
  it('Should check if Calc Premium Tab is clicked and active correctly', function () {
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

  it('Should check if Calc SA Tab is not clicked and inactive', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'tab1' })
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

  it('Should unable to click the submit button by default', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Name field is able to input and has correct value', function () {
    browser.findElement({ id: 'PM-name' }).sendKeys('Vasu Senawongse');
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-name' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, 'Vasu Senawongse');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after enter name', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Gender selection field is clickable and can be selected', function () {
    browser.findElement({ id: 'PM-genderCd-Male' }).click();
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-genderCd' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, 'MALE');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after select gender', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Date of Birth field can be cleared and input new date', function () {
    browser.findElement({ id: 'rdp-form-control-PM-dob' }).click();
    browser.findElement({ id: 'rdp-form-control-PM-dob' }).clear();
    browser
      .findElement({ id: 'rdp-form-control-PM-dob' })
      .sendKeys('02/10/1997');
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'rdp-form-control-PM-dob' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, '02/10/1997');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after select date', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Plan selection field is clickable and can be selected', function () {
    browser.findElement({ id: 'PM-T11A20' }).click();
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-planCode' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, 'T11A20');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after select plan', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Sa Per Year field is able to input and has correct value', function () {
    browser.findElement({ id: 'PM-saPerYear' }).clear();
    browser.findElement({ id: 'PM-saPerYear' }).sendKeys('500000');
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-saPerYear' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, '500000');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should unable to click the submit button after input SA', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-submit' })

        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Payment Frequency selection field is clickable and can be selected', function () {
    browser.findElement({ id: 'PM-paymentFrequency-YEARLY' }).click();
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-paymentFrequency' })
        .then((elem) => {
          elem
            .getAttribute('value')
            .then((value) => {
              assert.strictEqual(value, 'YEARLY');
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should be able to click the submit button after input paymentFrequency and all fields ', function () {
    browser.findElement({ id: 'PM-submit' }).click();
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-submit' })
        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, true);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Premium Result field is disabled', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-baseAnnualPremium' })
        .then((elem) => {
          elem
            .isEnabled()
            .then((value) => {
              assert.strictEqual(value, false);
              resolve();
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });

  it('Should check if Premium Result field got a result and value is correct', function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: 'PM-baseAnnualPremium' })
        .then(getPmResult)
        .then((value) => {
          assert.strictEqual(value, '6379');
          resolve();
        })
        .catch((err) => reject(err));
    });
  });
});
//#endregion
after(function () {
  // End of test use this.
  // browser.quit();
});
