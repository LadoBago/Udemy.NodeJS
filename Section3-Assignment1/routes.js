const http = require('http');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    console.log(url, method);

    if (url === '/')
    {

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');

        res.write('<head>');
        res.write('</head>');
        res.write('<body>');

        res.write('<h2>Hello World!</h2>')

        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username" />');
        res.write('<button type="submit">submit</button>');
        res.write('</form>');

        res.write('</body>');

        res.write('</html>');
        res.end();
    }
    else if (url === '/users')
    {

        res.write('<html>');

        res.write('<head>');
        res.write('</head>');
        res.write('<body>');
        res.write('<ul>');

        res.write('<li>User 1</li>');
        res.write('<li>User 2</li>');
        res.write('<li>User 3</li>');

    
        res.write('</ul>');
        res.write('</body>');

        res.write('</html>');
        res.end();

    }
    else if (url === '/create-user')
    {
        const bodyData = [];

        req.on('data', (chunk) => {
            console.log(chunk);
            console.log(typeof(chunk));
            bodyData.push(chunk);
        });
        req.on('end', () => {
            console.log(bodyData);
            console.log(bodyData.length);
            const body = Buffer.concat(bodyData).toString();
            console.log(body);
            const username = body.split('=')[1];
            console.log(username);

         });
         res.statusCode = 302;
         res.setHeader('Location', '/');
         res.end();
    }


};

module.exports = { handler: requestHandler };