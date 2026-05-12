const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const { table, idCol, idVal } = req.query;

        const isValidName = value => /^[a-zA-Z0-9_]+$/.test(value);

        if (!isValidName(table) || !isValidName(idCol) || !idVal) {
            return res.json({
                status: 0,
                error: 'Invalid parameters'
            });
        }

        const query = `DELETE FROM ${table} WHERE ${idCol} = ?`;

        const [queryResult] = await db.query(query, [idVal]);

        res.json({
            status: queryResult.affectedRows > 0 ? 1 : 0
        });

    } catch (error) {

        res.json({
            status: 0,
            error: error.message
        });

    }
});

module.exports = router;
