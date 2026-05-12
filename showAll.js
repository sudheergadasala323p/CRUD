const express = require('express');
const router = express.Router();
const db = require('../db');

const validTables = new Set([
    'Items',
    'Customers',
    'Cashiers',
    'Suppliers'
]);

router.get('/', async (req, res) => {
    try {
        const { table } = req.query;

        if (!validTables.has(table)) {
            return res.json({
                status: 0,
                error: 'Invalid table'
            });
        }

        const [records] = await db.query(`SELECT * FROM ${table}`);

        res.json({
            status: 1,
            columns: records[0] ? Object.keys(records[0]) : [],
            rows: records
        });

    } catch (error) {

        res.json({
            status: 0,
            error: error.message
        });

    }
});

module.exports = router;
