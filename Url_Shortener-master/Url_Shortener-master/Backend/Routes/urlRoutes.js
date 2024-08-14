const express = require('express')
const urlController = require('../Controllers/urlController')
const { addUrl, getLatest, getUrlFromAlias, getMostViewed } = urlController
const urlCheck = require('../Middleware/url')

const router = express.Router()

let initialVars = {
    // true if new url was saved
    success: false,
    // url if new url is saved
    urlSaved: '',
    // alias if new url is saved
    aliasSaved: '',
    // errors
    // general error
    error: false,
    errorMessage: '',
    // error for url
    errorUrl: false,
    // error for alias
    errorAlias: false,
    // form url
    url: '',
    // form alias
    alias: ''
  };


router.post('/addUrl', urlCheck.saveUrl, addUrl);
router.get('/getLatest', getLatest);
router.get('/getMostViewed', getMostViewed);
router.get('/short', getUrlFromAlias);

module.exports = router