const db = require('../Models/db');
const crypto = require('crypto');
const Url = db.urls;

const addUrl = async (req, res) => {
    try {
        const url = req.body.url;

        let aliasExists;
        do {
            alias = crypto
                .createHash('md5')
                .update(url)
                .digest('hex');
            alias = alias.substring(0, 6);
            aliasExists = await Url.count({
                where: { alias: alias }
            });
        } while (aliasExists > 0);
        
        const short_url = await Url.create({ url: url, alias: alias });
        return res.status(201).send(short_url);

    } catch (error) {
        console.log(error);
    }
}

const getUrlFromAlias = async (req, res) => {
    try {
        console.log(req.query.alias)
        const url = await Url.findOne({
            where: { alias: req.query.alias }
        });

        if (url) {
            await url.update({ visits: url.visits + 1 });
            res.redirect(url.url);
        } else {
            return res.status(409).send('Invalid alias specified, cannot redirect to URL');
        }
    } catch (error) {
        console.log(error);
    }
}

const getLatest = async (req, res) => {
    try {
        const latest = await Url.findAll({
            order: [['createdAt', 'DESC']],
            limit: 100
        });

        if (latest) return res.status(200).send(latest);
    } catch (error) {
        console.log(error);
    }
    return res.status(200).send([]);
}

const getMostViewed = async (req, res) => {
    try {
        const mostViewed = await Url.findAll({
            order: [['visits', 'DESC']],
            limit: 100
        });
        if (mostViewed) return res.status(200).send(mostViewed);
    } catch (error) {
        console.log(error);
    }

    return res.status(200).send([]);
}

module.exports = {
    addUrl,
    getUrlFromAlias,
    getLatest,
    getMostViewed
}
