exports.config = {
	//specs: ['./specs/signUpValidation.js'],
    
	suites: {
		siteaccess: ['./specs/basicValidation.js'],
		signup: ['./specs/signUp.js'],
		validations: [
			'./specs/signUpValidation.js',
			'./specs/loginValidation.js',
			'./specs/forgotPassword',
		],
		login: ['./specs/login.js', './specs/editDevice.js'],
	},

	framework: 'jasmine',
	allScriptsTimeout: 110000,

	// Options to be passed to Jasmine
	jasmineNodeOpts: {
		showTiming: true,
		showColors: true,
		isVerbose: true,
		includeStackTrace: false,
		defaultTimeoutInterval: 400000,
	},

	// To directly connect to Chrome/Firefox Drivers
	directConnect: true,

	
	onPrepare: function() {

        // For non-angularjs application set this as True
		browser.ignoreSynchronization = false;

        // Settings for XML file generated for HTML report
        var jasmineReporters = require('C:/Users/Dotnet/AppData/Roaming/npm/node_modules/jasmine-reporters');
        
		jasmine.getEnv().addReporter(
			new jasmineReporters.JUnitXmlReporter({
				consolidateAll: true,
				savePath: './reports/',
				filePrefix: 'connexa_xmlresults',
			})
		);
        
        // To obtain screenshots on failure for HTML reports
		var fs = require('fs-extra');

		fs.emptyDir('reports/screenshots/', function(err) {
			console.log(err);
		});

		jasmine.getEnv().addReporter({
			specDone: function(result) {
				if (result.status == 'failed') {
					browser.getCapabilities().then(function(caps) {
						var browserName = caps.get('browserName');

						browser.takeScreenshot().then(function(png) {
							var stream = fs.createWriteStream(
								'reports/screenshots/' + browserName + '-' + result.fullName + '.png'
							);
							stream.write(new Buffer(png, 'base64'));
							stream.end();
						});
					});
				}
			},
        });
        
/*
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: 'testresults',
            filePrefix: 'reportXMLoutput'
        }));
*/

		//Setting for Jasmine Allure Reports
		var AllureReporter = require('jasmine-allure-reporter');
		jasmine.getEnv().addReporter(
			new AllureReporter({
				resultsDir: 'allure-results',
			})
		);

		//Creates screenshots for Jasmine Allure Reports
		jasmine.getEnv().afterEach(function(done) {
			browser.takeScreenshot().then(function(png) {
				allure.createAttachment(
					'Screenshot',
					function() {
						return new Buffer(png, 'base64');
					},
					'image/png'
				)();
				done();
			});
		});
	},

	// Waits for any angular2 apps on the page
	useAllAngular2AppRoots: false,

	//HTMLReport called once tests are finished
	onComplete: function() {
		var browserName, browserVersion;
		var capsPromise = browser.getCapabilities();

		capsPromise.then(function(caps) {
			browserName = caps.get('browserName');
			browserVersion = caps.get('version');
			platform = caps.get('platform');

			var HTMLReport = require('protractor-html-reporter-2');

			testConfig = {
				reportTitle: 'Connexa Test Execution Report',
				outputPath: './reports/',
				outputFilename: 'ConnexaReport',
				screenshotPath: 'screenshots',
				testBrowser: browserName,
				browserVersion: browserVersion,
				modifiedSuiteName: false,
				creenshotsOnlyOnFailure: true,
				testPlatform: platform,
			};
			new HTMLReport().from('reports/connexa_xmlresults.xml', testConfig);
		});
	},
};
