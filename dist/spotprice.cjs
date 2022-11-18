(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.spotprice = factory());
})(this, (function () { 'use strict';

	function minitz(y,m,d,h,i,s,tz,throwOnInvalid){return minitz.fromTZ(minitz.tp(y,m,d,h,i,s,tz),throwOnInvalid)}minitz.fromTZISO=(localTimeStr,tz,throwOnInvalid)=>{return minitz.fromTZ(parseISOLocal(localTimeStr,tz),throwOnInvalid)};minitz.fromTZ=function(tp,throwOnInvalid){const inDate=new Date(Date.UTC(tp.y,tp.m-1,tp.d,tp.h,tp.i,tp.s)),offset=getTimezoneOffset(tp.tz,inDate),dateGuess=new Date(inDate.getTime()-offset),dateOffsGuess=getTimezoneOffset(tp.tz,dateGuess);if(dateOffsGuess-offset===0){return dateGuess}else {const dateGuess2=new Date(inDate.getTime()-dateOffsGuess),dateOffsGuess2=getTimezoneOffset(tp.tz,dateGuess2);if(dateOffsGuess2-dateOffsGuess===0){return dateGuess2}else if(!throwOnInvalid&&dateOffsGuess2-dateOffsGuess>0){return dateGuess2}else if(!throwOnInvalid){return dateGuess}else {throw new Error("Invalid date passed to fromTZ()")}}};minitz.toTZ=function(d,tzStr){const td=new Date(d.toLocaleString("sv-SE",{timeZone:tzStr}));return {y:td.getFullYear(),m:td.getMonth()+1,d:td.getDate(),h:td.getHours(),i:td.getMinutes(),s:td.getSeconds(),tz:tzStr}};minitz.tp=(y,m,d,h,i,s,tz)=>{return {y:y,m:m,d:d,h:h,i:i,s:s,tz:tz}};function getTimezoneOffset(timeZone,date=new Date){const tz=date.toLocaleString("en",{timeZone:timeZone,timeStyle:"long"}).split(" ").slice(-1)[0];const dateString=date.toLocaleString();return Date.parse(`${dateString} UTC`)-Date.parse(`${dateString} ${tz}`)}function parseISOLocal(dtStr,tz){const pd=new Date(Date.parse(dtStr));if(isNaN(pd)){throw new Error("minitz: Invalid ISO8601 passed to parser.")}const stringEnd=dtStr.substring(9);if(dtStr.includes("Z")||stringEnd.includes("-")||stringEnd.includes("+")){return minitz.tp(pd.getUTCFullYear(),pd.getUTCMonth()+1,pd.getUTCDate(),pd.getUTCHours(),pd.getUTCMinutes(),pd.getUTCSeconds(),"Etc/UTC")}else {return minitz.tp(pd.getFullYear(),pd.getMonth()+1,pd.getDate(),pd.getHours(),pd.getMinutes(),pd.getSeconds(),tz)}}minitz.minitz=minitz;

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
	 * @param {Date} endTime
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
	 * @param {Date} endDate - Date object representing the date to fetch, normal date object in system local time
	 * @param {string} [urlOvverride] - Override default service URL, this URL is expected to contain all parameters, and will ignore previus passed parameters
	 * @param {Object} [resultOverride] - Override fetch result with plain object
	 * 
	 * @returns {SpotPriceEntry[]} - Result set
	 */
	async function spotprice(period, requestedArea, currency, endDate, urlOverride, resultOverride) {

		// Convert endDate to correct time zone, target service expects Europe/Olso time
		// Then format it as DD-MM-YYYY as expected by the service
		const 
			dOslo = minitz.toTZ(endDate,"Europe/Oslo"),
			formattedEndDateOslo = `${dOslo.d.toString().padStart(2,"0")}-${dOslo.m.toString().padStart(2,"0")}-${dOslo.y}`;

		// Construct url
		let url;
		if (urlOverride) {
			url = urlOverride;
		
		} else {
			// Construct URL with parameters for currency and endDate
			const params = new URLSearchParams();
			if (currency) params.append("currency",currency.trim().toUpperCase());
			if (endDate) params.append("endDate",formattedEndDateOslo);

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
			if (row.IsExtraRow) continue;
			const 
				startTime = row.StartTime,
				endTime = row.EndTime,
				column = row.Columns[requestedEntity.Index-1],
				generatedRow = {
					startTime: minitz.fromTZISO(startTime, "Europe/Oslo"),
					endTime: minitz.fromTZISO(endTime, "Europe/Oslo"),
					areaCode: column.Name,
					spotPrice: parseFloat(column.Value.replace(" ","").replace(",",".")),
					unit: unit
				};
			spotPrices.push(generatedRow);
		}

		// Yay!
		return spotPrices;
	}

	spotprice.spotprice = spotprice;

	return spotprice;

}));
