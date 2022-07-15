# SimpleNetworkDetection
Subject you can subscribe to and get notify if your network is online or offline. 

## How it works
It is an Subject you can subscribe to. If there are any subscribers, a simple request to jsonplaceholder.typicode.com will be fired and observers notified about success or failure every few seconds (depending on a config).


## Config

Once library is imported, you can call NetworkDetection.seconds.set(number), and then subscribe anywhere you want to be notified.

