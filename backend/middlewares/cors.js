export default {
    handleCors(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Origin,Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    }
}