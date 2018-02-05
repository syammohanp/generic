
//Second part
//https://weblogs.asp.net/shijuvarghese/pub-sub-in-node-js-apps-using-azure-service-bus-topics
var azure = require('azure');
//var config=require('./config');
var serviceBusClient = azure.createServiceBusService(
    'Endpoint=sb://syamtest.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=0WC6atQr21Z4mPkbDpO33SLu9HNUvUMD4oZivRWN8lY=');

    var topic = 'orders';
    //function createTopic() {
        //Create topic
    serviceBusClient.createTopicIfNotExists(topic, 
    function (error) {
            if(!error){
                console.log('Topic created or exists.');
            }
            else {
                console.log(error);
            }
        });
   // }
   


    function createSubscription(subscriber) {
        // Create subscription
        serviceBusClient.createSubscription(topic, subscriber,
         function (error) {
                if (error) {
                    console.log(error);
                }
                else
                {
                    console.log('Subscriber '+ subscriber+ ' registered for '+ topic+ ' messages');
                }
            });
        }

        var subscription1 = 'supplier1';
        var subscription2 = 'supplier2';
         
        createSubscription(subscription1);
        createSubscription(subscription2);

        function sendMessage(message) {
            // Send messages for subscribers
            serviceBusClient.sendTopicMessage(topic, message, 
           function(error) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Message sent');
                }
            });
        }

        var orderMessage1={"OrderId":101,
        "OrderDate": new Date().toDateString()};
        sendMessage(JSON.stringify(orderMessage1));
        var orderMessage2={"OrderId":102,
        "OrderDate": new Date().toDateString()};
        sendMessage(JSON.stringify(orderMessage2));

        serviceBusClient.receiveSubscriptionMessage('orders', 'supplier2', function (error1, message1) {
            if (error1) {
              console.log(error1);
            } else {
              console.log(message1.body);
            }
        });


        // function receiveMessages(subscriber) {
        //     // Receive the messages for subscription.
        //     serviceBusClient.receiveSubscriptionMessage(topic, subscriber,
        //  function (error1, message1) {
        //         if (error1) {
        //             console.log(error1);
        //         } else {
        //             var topicMessage1 = JSON.parse(message1.body);
        //             console.log('Processing Order# ' + topicMessage1.OrderId
        //                 + ' placed on ' + topicMessage1.OrderDate+ ' from ' + subscriber);
        //             //call for receive next message
        //             serviceBusClient.receiveSubscriptionMessage(topic, subscriber,
        //       function (error2, message2) {
        //                 if (error2) {
        //                     console.log(error2);
        //                 } else {
        //                     var topicMessage2 = JSON.parse(message2.body);
        //                     console.log('Processing Order# ' + topicMessage2.OrderId
        //                         + ' placed on ' + topicMessage1.OrderDate+ ' from ' + subscriber);
        //                 }
        //             });
        //         }
        //     });
        // }

        // receiveMessages(subscription1);
        // receiveMessages(subscription2);
        
    