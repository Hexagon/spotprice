let 
	test = require("uvu").test,
	assert = require("uvu/assert"),
	testData = require("../../../data/bogus.cjs");

// Actual tests
module.exports = function (spotprice) {

	// String spotprice
	test("Basic", async function () {
		let result = await spotprice("hourly", "SE2", "EUR", new Date(Date.parse("2020-01-17T00:00:00")), undefined, undefined, testData);

		assert.equal(result[0].startTime.toISOString(), "2020-01-16T23:00:00.000Z");
		assert.equal(result[0].endTime.toISOString(), "2020-01-17T00:00:00.000Z");
		assert.equal(result[0].areaCode, "SE2");
		assert.equal(result[0].spotPrice, 36.37);
		assert.equal(result[0].unit, "EUR/MWh");
	});

	test.run();

};