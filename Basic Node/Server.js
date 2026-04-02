// if you want to create a node server, you need to import the http module
// http and https modules
// 1.protocols ==> rules ==> how to send data,how to receive data, how to handle errors, how to manage connections etc.
// 2.http ==> hypertext transfer protocol
// 3.https ==> hypertext transfer protocol secure

// http and https modules are used to create a web server ,make  HTTP requests and handle HTTP responses in node.js  they provide a set of methods and properties that allow you to create a server, listen for incoming requests, and send responses back to the client.the http modules is used for non-secure communication, while the https module is used for secure communication using SSL/TLS encryption.

const http = require("http");

// create a route for home page only
// requst ==> send by users
// response ==> send by server
const server = http.createServer((req, res) => {
    console.log(req)
    res.end("Hello World");
    // res.end() method is used to end the response and send the data back to the client. It can take a string or a buffer as an argument, which will be sent as the response body. In this case, we are sending "Hello World" as the response body.
});

// listen for incoming requests on port 3000
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});