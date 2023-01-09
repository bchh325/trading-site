# Stock Watchlist

Currently in the works is simple stock ticker price tracking,
and eventually the goal would be to have mimic trading functionality.

## Technologies Used
* React
* AWS: Lambda/API Gateway/DynamoDB/Cognito/Secrets Manager
* Axios 

## Completed Tasks
* User Registration
* User Authentication
* HTTP API using API Gateway
* User Authorized API Calls to HTTP API using JWT Token
* AWS Lambda Functions trigger given HTTP request type
* Custom hook using Axios to make HTTP requests
* Stored API Key in AWS Secrets Manager to use within Lambda function
* Refactor/Create custom hook to work with both API Gateway and Stock Market API[^1]
* Create Lambda Layer to use Axios
* Request to Stock Market API in Lambda after reading from DynamoDB
* GET Request: Displayed different tickers based on users on React client[^2]

## Planned Tasks
* Refactor Lambda Functions
* Complete POST/GET Lambda Functions to perform CRUD operations on DynamoDB
* ~~Request to Stock Market API in Lambda after reading from DynamoDB~~
* ~~Refactor/Create custom hook to work with both API Gateway and Stock Market API~~
* Trading functionality after completion of Watchlist
* Add additional API Gateway routes for stock ticker verification

[^1]: Original approach was to make Finnhub API calls from the client,<br>
  but given that an API key is required, a new approach<br>
  was made for the Finnhub Stock Market API requests.<br> 
  API Key was gathered from Secrets Manager and requests/responses were handled from<br> 
  Lambda function instead using, Axios as its Lambda layer.
  
[^2]: In order to retrieve data, the following must happen:<br> 
  1\. User Login<br>
  2\. User's JWT Token sent in Axios request header to API Gateway along with user details<br>
  3\. API Gateway invokes corresponding Lambda function based request route<br>
  4\. Lambda function retreives user's data (in this case, stock tickers) from DynamoDB<br>
  5\. Lambda function retreives Finnhub API Key from Secrets Manager<br>
  6\. Lambda function makes Axios API request to Finnhub API using previous API Key and ticker data.<br>
  7\. Stock market data for the given tickers are sent back in the body of the Lambda response<br>
