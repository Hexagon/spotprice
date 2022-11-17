/* ------------------------------------------------------------------------------------

  spotprice - MIT License - Hexagon <hexagon@GitHub>

  ------------------------------------------------------------------------------------

  License:

	Copyright (c) 2022 Hexagon <hexagon@GitHub>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

  ------------------------------------------------------------------------------------  */

/**
 * @typedef {"hourly" | "daily" | "weekly" | "monthly" | "yearly"} SpotPricePeriod
 */

/**
 * @typedef {Object} SpotPriceEntry
 * @param {Date} startTime
 * @param {string} areaCode - SE1, SE2 ...
 * @param {Number} spotPrice
 * @param {string} unit - EUR/MWh, SEK/MWh ...
 */ 

const 

	/**
	 * Base URL to Service spot price json without period
	 * @readonly
	 * @private
	 */
	npBaseApiUrl = "https://www.nordpoolgroup.com/api/marketdata/page",

	/**
	 * Enum for valid period values
	 * @readonly
	 * @private
	 * @enum {number}
	 */
	periods = {
		hourly: 10,
		daily: 11,
		weekly: 12,
		monthly: 13,
		yearly: 14
	};

/**
 * Get spot prices using supplied parameters, throws on error
 * @public
 * 
 * @param {SpotPricePeriod} period - Requested period
 * @param {string} requestedArea - SE1, SE2, ...
 * @param {string} currency - SEK, EUR, ... Throws if not supplied by service
 * @param {string} currency - SEK, EUR, ... Throws if not supplied by service
 * @param {string} endDate - String representing date in format YYYY-MM-DD, expected timezone is Europe/Oslo
 * @param {string} [urlOvverride] - Override default service URL, this URL is expected to contain all parameters, and will ignore previus passed parameters
 * @param {Object} [resultOverride] - Override fetch result with plain object
 * 
 * @returns {SpotPriceEntry[]} - Result set
 */
async function spotprice(period, requestedArea, currency, endDate, urlOverride, resultOverride) {

	// Construct url
	let url;
	if (urlOverride) {
		url = urlOverride;
	
	} else {
		// Construct URL with parameters for currency and endDate
		const params = new URLSearchParams();
		if (currency) params.append("currency",currency.trim().toUpperCase());
		if (endDate) params.append("endDate",endDate);

		// Find periodId from period
		const periodId = periods[period];
		if (!periodId) {
			throw new Error("Invalid period, please use hourly, daily etc...");
		}

		url = `${npBaseApiUrl}/${periodId}?${params.toString()}`;
	}

	// Get data (allow to override fetch)
	let result = resultOverride;
	if(!resultOverride) {
		const 
			fetcher = await fetch(url);
		result = await fetcher.json();
	}

	// Find requested area
	const
		requestedEntity = result.conf.Entities.find(e => { return e.Name == requestedArea; });
	if (!requestedEntity) {
		throw new Error("Requested area code not found");
	}

	// Construct a nice array of nice object
	const 
		/** 
		 * @type {SpotPriceEntry[]}
		 */
		spotPrices = [],
		unit = result.data.Units[0];
	for(const row of result.data.Rows) {
		const 
			startTime = row.StartTime,
			column = row.Columns[requestedEntity.Index-1],
			generatedRow = {
				startTime: startTime,
				areaCode: column.Name,
				spotPrice: column.Value,
				unit: unit
			};
		spotPrices.push(generatedRow);
	}

	// Yay!
	return spotPrices;
}

spotprice.spotprice = spotprice;

export default spotprice;
export { spotprice };