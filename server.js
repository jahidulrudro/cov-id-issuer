const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = process.env.PORT || 5000;
const HOST_URL = process.env.REACT_APP_ISSUER_HOST_URL || 'http://issueragent.trustnetpk.com:2052';

app.use(express.static(path.join(__dirname, 'build')));

app.use(
    '/connections',
    createProxyMiddleware({
        target: HOST_URL,
        changeOrigin: true,
    })
);

app.use(
    '/issue-credential',
    createProxyMiddleware({
        target: HOST_URL,
        changeOrigin: true,
    })
);

app.use(
    '/credential-definitions',
    createProxyMiddleware({
        target: HOST_URL,
        changeOrigin: true,
    })
);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);