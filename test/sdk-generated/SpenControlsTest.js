// Imports for Test
var chai = require('chai');
chai.use(require('chai-string'));
var assert = chai.assert;

var testClass = require('./SpendControlsIndex');
var MasterCardAPI = testClass.MasterCardAPI;

describe('test SpendControls', function() {
	before(function() {
		global.testUtil.resetAuthentication();
	});
	
	it('181_example_filter_controls_alert_get_request', function(done) {
		// 
		
		//global.testUtil.setAuthentication("default2");
		var requestData = {
		  "uuid": "5tcTMLIqEg88gN6ClBGqH2TYDQuBDLT4ey5zjQQ7alg"
		};

		global.testUtil.setMapValue(requestData, "filters", "[{filterId=5tcTMLIqEg88gN6ClBGqH2TYDQuBDLT4ey5zjQQ7alg}]");

		testClass.Combinationctrlsalertresource.query(requestData
		, function (error, data) {
			global.testUtil.putResponse("example_filter_controls_alert_get_request", data);
			global.testUtil.resetAuthentication();

			if (error) {
				assert.equal(404, error.getHttpStatus());
				assert.equal("No cards provisioned for the UUID.", error.getMessage());
				assert.equal("card.invalid", error.getReasonCode());
				assert.equal("Validation", error.getSource());
			}

			done()
		});
	});

	

});
