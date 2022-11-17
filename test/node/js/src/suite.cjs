let 
	test = require("uvu").test,
	assert = require("uvu/assert"),
	testData = require("../../../data/bogus.cjs");

// Actual tests
module.exports = function (spotprice) {

	// String spotprice
	test("Basic", async function () {
		let result = await spotprice("hourly", "SE2", "EUR", "01-01-2020", undefined, testData);
		assert.equal(result[0].startTime, "2020-01-17T00:00:00");
		assert.equal(result[0].areaCode, "SE2");
		assert.equal(result[0].spotPrice, "36,37");
		assert.equal(result[0].unit, "EUR/MWh");
	});

	test.run();

};