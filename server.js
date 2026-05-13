const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

const PORT = 4050;

const PUBLIC_FOLDER = path.join(__dirname, 'public');

const ROUTES_FOLDER = path.join(__dirname, 'routes');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded(
{
    extended: true
}
));

app.use(express.static(PUBLIC_FOLDER));

app.get('/', (req, res) => {

    res.sendFile(
        path.join(PUBLIC_FOLDER, 'CRUD1.html')
    );

});

fs.readdirSync(ROUTES_FOLDER)

    .filter(file => file.endsWith('.js'))

    .forEach(file => {

        const endpoint =
            file.replace('.js', '');

        app.use(`/${endpoint}`,require(path.join(ROUTES_FOLDER, file)));
        console.log(` /${endpoint}`);
    });

app.listen(PORT, () => {
    console.log(`Server Running on : ${PORT}`);
});
