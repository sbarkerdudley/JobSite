/* eslint-disable prefer-const */
require('dotenv').config();
const fsPromises = require('fs/promises');
const axios = require('axios');
const cheerio = require('cheerio');
const CareerJet = require('../models/API/careerJet');

const careerjetAPI = new CareerJet({
  locale: 'en_US',
  affid: process.env.AFFID,
  user_ip: '192.0.0.1',
  user_agent: 'JobSite',
});

exports.scrapeDescription = (req, res) => {
  const { url } = req.query;
  axios
    .get(url)
    .then((response) => {
      const html = response.data;

      const $ = cheerio.load(html);
      const description = $('.content');
      res.status(200).send(description.html());
    })
    .catch((err) => res.status(404).send(err));
};

exports.forward = (req, res) => {
  const { id } = req.params;
  const url = new URL(id, 'https://careerjet.com/job/');
  res.redirect(url.href);
};

exports.jobSearch = (req, res) => {
  let {
    location = 'us',
    keywords = '',
    sort = 'date',
    pagesize = 40, // Integer
    radius = 100, // Integer (5, 10, 50, 100)
    page = 1, // Integer
    employmentType = '', // String ('Full Time', 'Part Time', 'Temporary', 'Internship')
    // experienceLevel = '', // String ('Entry', 'Mid', 'Senior', 'Executive')
    // worksite, // String ('remote', 'onsite', 'mixed')
  } = req.query;

  // if (keywords && experienceLevel) {
  //   keywords = `${keywords}%20${experienceLevel}`;
  // }

  // if (location.match(/remote/i) || location.match(/anywhere/i)) {
  //   location = '';
  //   worksite = 'remote';
  // }
  // if (worksite === 'remote') {
  //   keywords = `Remote%20${keywords}`;
  // }

  pagesize = parseInt(pagesize, 10);
  radius = parseInt(radius, 10);
  page = parseInt(page, 10);

  careerjetAPI
    .location(location)
    .keywords(keywords)
    .sortBy(sort)
    .pagesize(pagesize)
    .radius(radius)
    .page(page)
    .employmentType(employmentType)
    .query()
    .then((data) => data.data)
    .then((results) => {
      res.send(results);

      let { jobs } = results;

      if (Array.isArray(jobs)) {
        let jobsList = jobs.filter((job) => (!job.title.includes('Senior')
          && !job.title.includes('Sr')
          && !job.title.includes('Principal')
          && !job.title.includes('Lead')
          && !job.title.includes('III')
          && !job.title.includes('II')
        ))
          .map((job) => {
            console.log(job, '\n');
            return Object.entries(job).join(': ')
          })
          .join('\n\n')

        fsPromises
          .appendFile('./SearchResults.txt', jobsList)
          .catch(console.error);
      }
    })
    .catch(console.log);
};
