/* eslint-disable no-throw-literal */
/* eslint-disable default-case */
const request = require('request');
const axios = require('axios');

const missingLocale = 'locale is mandatory';
const missingAffid = 'Affiliate ID (affid) is mandatory';
const missingUserID = 'User IP and User Agent are mandatory';

const careerjetUrl = 'http://public.api.careerjet.net/search?locale_code=';

module.exports = function () {
  let params = {};

  if (arguments.length === 2) {
    params = { locale: arguments[0], affid: arguments[1] };
  } else if (arguments.length == 1 && typeof arguments[0] === 'object') {
    params = arguments[0];
  }
  const {
    locale, affid, user_ip, user_agent,
  } = params;

  if (typeof locale !== 'string') throw missingLocale;
  if (typeof affid !== 'string') throw missingAffid;
  if (typeof user_ip !== 'string' || typeof user_agent !== 'string') { throw missingUserID; }

  const url = careerjetUrl + locale;

  const query = {
    // The following parameter is mandatory:
    affid, //  Affiliate ID provided by Careerjet. Requires to open a Careerjet partner account. http://www.careerjet.com/partners/
    user_ip,
    user_agent,
    // keywords : '', //  Keywords to search in job offers. Example: 'java manager'. Default: none (Returns all offers from default country)
    // location : '', //  Location to search job offers in. Examples: 'London', 'Paris'. Default: none (Returns all offers from default country)
    sort: 'date', // Type of sort. Available values are 'relevance' (default), 'date', and 'salary'.
    // start_num : 1, //  Num of first offer returned in entire result space should be >= 1 and <= Number of hits. Default: 1
    pagesize: 40, // Number of offers returned in one call. Default: 10. Max: 99.
    page: 1, // Current page number (should be >=1). If set, will override start_num. The maxumum number of page is given by $result->pages
    contracttype: 'Default', // Character code for contract types:<br>
    // *    'p'    - permanent job<br>
    // *    'c'    - contract<br>
    // *    't'    - temporary<br>
    // *    'i'    - training<br>
    // *    'v'    - voluntary<br>
    // *    Default: none (all contract types)
    contractperiod: 'Default', // Character code for contract contract periods:
    // *    'f'     - Full time<br>
    // *    'p'     - Part time<br>
    // *    Default: none (all contract periods)
  };

  this.employmentType = function (type) {
    console.log('type', type);
    switch (type) {
      case 'f':
        query.contractperiod = 'Full Time';
        break;
      case 'p':
        query.contractperiod = 'Part Time';
        break;
      case 't':
        query.contracttype = 'Temporary';
        break;
      case 'i':
        query.contracttype = 'Internship';
    }
    return this;
  };

  this.keywords = function (keywords) {
    if (typeof keywords === 'string' && keywords.length) {
      query.keywords = keywords;
    } else {
      // throw 'keywords must be a string!';
    }

    return this;
  };

  this.location = function (location = '94111') {
    if (typeof location === 'string' && location.length) {
      query.location = location;
    } else {
      // throw 'location must be a string!';
    }
    return this;
  };

  this.sortBy = function (value = 'date') {
    const allowedValues = {
      date: true,
      relevance: true,
      salary: true,
    };

    if (allowedValues[value]) {
      query.sort = value;
    }

    return this;
  };

  this.pagesize = function (pagesize = 40) {
    if (isNumeric(pagesize)) query.pagesize = pagesize;
    // else throw 'Pagesize must be a numeric value!';
    return this;
  };

  this.radius = function (radius = 100) {
    if (isNumeric(radius)) query.radius = radius;
    // else throw 'Radius must be a numeric value!';
    return this;
  };

  this.start = function (index) {
    if (isNumeric(index)) query.start_num = index;
    // else throw 'start index must be a numeric value!';

    return this;
  };

  this.page = function (index) {
    if (isNumeric(index)) query.page = index;
    // else throw 'page index must be a numeric value!';
    return this;
  };

  const validateRequiredFields = function () {
    // if (!query.affid) throw 'affid is mandatory.';
    return true;
  };

  this.query = function (resolved, rejected) {
    if (validateRequiredFields()) {
      return axios.get(url, { params: query });
    }
  };

  const isNumeric = function (value) {
    return !Number.isNaN(parseFloat(value)) && Number.isFinite(value);
  };
};
