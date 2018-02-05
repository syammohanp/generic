
var azure = require('azure');
var http = require('http');
var queue = 'samplequeue';
 
var error;
 
 
http.createServer(function (req, res) {
 
    var connString1 = 'Endpoint=sb://syamtest.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=0WC6atQr21Z4mPkbDpO33SLu9HNUvUMD4oZivRWN8lY=';
 
    console.log('createServiceBusService2()');
 
    // Crucial function call to get connected. Make sure  you have the proper
    // configuration with auzre to run
    serviceBusServiceClient = azure.createServiceBusService(connString1);
    console.log('create topic()');
    serviceBusServiceClient.createTopicIfNotExists('MyTopic3', function (error) {
        if (!error) {
            // Topic was created or exists
            console.log('topic created or exists.');
        }
        else {
            console.log(error);
        }
    });
 
    // Helps with error tracking
    console.log('call receiveMessage()');
 
    sendMessages();
 
    receiveMessages();
 
    // Get rid of output to browser for now
    //res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.end('Hello, world 6!');
 
}).listen(process.env.PORT || 8081);
 
 
// Here is the code that will receive the first 2 messages in the queue.
 
function receiveMessages() {
  // Step 2: Receive the messages.
  serviceBusServiceClient.receiveQueueMessage(queue, true, function (error1, message1) {
    if (error1) {
      console.log(error1);
    } else {
      console.log(message1.body);
      serviceBusServiceClient.receiveQueueMessage(queue, true, function (error2, message2) {
        if (error2) {
          console.log(error2);
        } else {
          console.log(message2.body);
        }
      });
    }
  });
}

var idx = 0;
function sendMessages() {
 var msg = 'Message # ' + (++idx);
 serviceBusServiceClient.sendQueueMessage(queue, msg, function (err) {
  if (err) {
    console.log('Failed Tx: ', err);
  } else {
    console.log('Sent ' + msg);
  }
 });
}
 
 
 
 
 
/*   OLD HELLO WORLD CODE*/ 
/*
var http = require('http');
 
http.createServer(function (req, res) {
   
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, world!');
   
}).listen(process.env.PORT || 8080);
*/
 
