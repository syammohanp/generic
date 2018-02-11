var azure = require('azure');
//var config=require('./config');
var serviceBusClient = azure.createServiceBusService(
    'Endpoint=sb://syamtest.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=0WC6atQr21Z4mPkbDpO33SLu9HNUvUMD4oZivRWN8lY=');

    var topic = 'notifications';
	receiveMessages('amyca');
function receiveMessages(subscriber) {
            // Receive the messages for subscription.
            serviceBusClient.receiveSubscriptionMessage(topic, subscriber,
         function (error1, message1) {
                if (error1) {
                    console.log(error1);
                } else {
                    var topicMessage1 = JSON.parse(message1.body);
                    console.log('Message Id# ' + topicMessage1.MessageId + ' placed on ' + topicMessage1.MeesaageDate+ ' from ' + subscriber);
					console.log('Message : ' + topicMessage1.message);
                    //call for receive next message
                    serviceBusClient.receiveSubscriptionMessage(topic, subscriber,
              function (error2, message2) {
                        if (error2) {
                            console.log(error2);
                        } else {
                            var topicMessage2 = JSON.parse(message2.body);
							console.log('Message Id# ' + topicMessage2.MessageId + ' placed on ' + topicMessage2.MeesaageDate+ ' from ' + subscriber);
							console.log('Message : ' + topicMessage2.message);
                            
                        }
                    });
                }
            });
        }

        // receiveMessages(subscription1);
        