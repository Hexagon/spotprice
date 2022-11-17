export default spotprice;
export type SpotPricePeriod = "hourly" | "daily" | "weekly" | "monthly" | "yearly";
export type SpotPriceEntry = any;
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
export function spotprice(period: SpotPricePeriod, requestedArea: string, currency: string, endDate: string, urlOverride: any, resultOverride?: any): SpotPriceEntry[];
export namespace spotprice {
    export { spotprice };
}
