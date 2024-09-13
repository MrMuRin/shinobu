import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/healthcheck', (req, res) => {
    if (req) {
        res.json({
            status: 'UP',
            buildState: process.env.BUILD_STATE || 'development',
            version: process.env.VERSION,
        })
    }
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});