/**
 * @typedef {'currency' | 'commodity' | 'crypto' | 'stock' | 'other'} AssetType
 */

/**
 * @typedef {Object} Asset
 * @property {string} id
 * @property {string} name
 * @property {AssetType} type
 * @property {number} price
 * @property {number} change
 * @property {number[]} history
 */

/**
 * @typedef {Object} MarketItem
 * @property {string} name
 * @property {'up' | 'down'} trend
 * @property {number} value
 */

/**
 * @typedef {Object} KeyEvent
 * @property {string} title
 * @property {string} summary
 * @property {string[]} [affectedAssets]
 */

/**
 * @typedef {Object} BriefPoint
 * @property {string} text
 * @property {string[]} relatedAssets
 */

/**
 * @typedef {Object} Alert
 * @property {number|string} id
 * @property {'price' | 'percent'} type
 * @property {string} assetId
 * @property {string} condition
 * @property {number} value
 * @property {boolean} active
 * @property {string} message
 */

/**
 * @typedef {'important' | 'daily' | 'realtime'} NotificationLevel
 */

/**
 * @typedef {Object} UserPreferences
 * @property {string[]} interests
 * @property {NotificationLevel} notificationLevel
 */

/**
 * @typedef {Object} MarketData
 * @property {Asset[]} assets
 * @property {MarketItem[]} market
 * @property {KeyEvent} keyEvent
 * @property {BriefPoint[]} brief
 */

/**
 * @typedef {Object} MarketLocation
 * @property {string} id
 * @property {string} name
 * @property {string} shortName
 * @property {number} lat
 * @property {number} lng
 * @property {string} timezone
 * @property {number} openHourUTC
 * @property {number} openMinuteUTC
 * @property {number} closeHourUTC
 * @property {number} closeMinuteUTC
 * @property {string[]} indices
 */

/**
 * @template T
 * @typedef {Object} ServiceResponse
 * @property {T | null} data
 * @property {string | null} error
 */

export {};
