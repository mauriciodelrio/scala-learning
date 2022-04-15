
export default function search(req, res) {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&sort=${req.query.sort}&limit=30&offset=${req.query.offset}&condition=${req.query.condition}`).then
    (response => response.json())
    .then(response => {
        res.statusCode = 200;
        res.json(response);
    })
    .catch(error => {
        res.statusCode = 500;
        res.json(error);
    });
};