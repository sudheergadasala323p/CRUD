const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    try {
        const { table, ...recordData } = req.body;

        if (!table || !/^[a-zA-Z0-9_]+$/.test(table)) {
            return res.json({
                status: 0,
                error: 'Invalid table'
            });
        }

        const columnNames = Object.keys(recordData);
        const columnValues = Object.values(recordData);

        const placeholders = columnNames.map(() => '?').join(',');

        const updateClause = columnNames
            .map(column => `${column}=VALUES(${column})`)
            .join(',');

        const query = `
            INSERT INTO ${table}
            (${columnNames.join(',')})
            VALUES (${placeholders})
            ON DUPLICATE KEY UPDATE ${updateClause}
        `;

        const [queryResult] = await db.query(query, columnValues);

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
