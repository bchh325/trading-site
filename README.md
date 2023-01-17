# Stock Watchlist

Currently in the works is my first full-stack 
application, a stock market watchlist using several
services offered by AWS.

Below I try to detail all of my tasks as much as possible to show how
both the back-end and front-end interacts, as well as what optimizations
I try to implement to make things easier for me as a developer and to improve
the experience of the user (such as dealing with load times from subsequent
API calls).

Optionally, a goal would be to have mimic trading functionality
if the time permits.

https://bchh325.github.io/trading-site/#/

**The website does not currently display correctly for mobile. I will work on proper CSS styling for mobile devices later**

**If you wish to view a sample user, you can use the following credentials to Sign In:**

**Username: testuser**

**Password: admin123.**

## Technologies Used
* Node.js
* React
* AWS: Lambda/API Gateway/DynamoDB/Cognito/Secrets Manager/IAM
* Axios 
* [Finnhub's Stock Market API](https://finnhub.io/docs/api)

## Completed Tasks
* Using IAM to manage authorization across several AWS services
* User Registration
* User Authentication
* Created HTTP API and its routes using API Gateway
* User Authorized API Calls to HTTP API using JWT Token
* AWS Lambda Functions trigger given HTTP request type
* Custom hook in React using Axios to make HTTP requests
* Stored API Key in AWS Secrets Manager to use within Lambda function
* Requests/Responses to/from Finnhub API through Lambda after getting unique data from Dynamo[^1]
* Create Lambda Layer to use Axios
* GET Request: Displayed a user's tickers and the ticker's respective data from Finnhub API on React client[^2]
* Refactored the GET Lambda function, also uploaded repo of it[^3]
* POST Request: Update/Put user's stock tickers in DynamoDB from React client[^5]
* Deployed entire prototype so far to GitHub Pages
* Created a way for unauthenticated identites to make API Gateway calls without logging in (essentially Guest users)[^8]

## Planned Tasks (I always find something to add to this list)
* Fix styling for Stock Content
* Update/Create permissions or Lambda function to handle guest user access to external API calls (Finnhub)
* Add ability to delete any given ticker
* Update GET Lambda function to use DynamoDB Document Client
* Change DynamoDB's ticker attribute to a set instead of list to help deal with redundant data
* Refactor React calls to API Gateway (for increased speed and readability)[^4]
* Cache responses to improve load times on subsequent API calls (such as on page change or reload)
* Trading functionality after completion of Watchlist (big IF)
* Verify valid stock tickers to prevent API calls with an invalid ticker

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
  
[^3]: One entire ES module was used initially to get the technologies working.<br>
  It was then refactored by creating two additional ES modules to handle async<br>
  tasks. Another additional ES module could be added for Axios.<br>
  https://github.com/bchh325/get-lambda-function
  
[^4]: The plan is to request from API Gateway as soon as the user logs in, then cache the response. This way,<br>
  When the user get's redirected to the watchlist page (which is where I am currently making the request), <br>
  the data is loaded in much faster. 
  
[^5]: https://github.com/bchh325/post-lambda-function
  
[^7]: Updated User Pool to have an Identity Pool to allow unauthenticated identities and grabbed unauthenticated credentials <br>
  on React client
  
[^8]: A completely separate API Gateway endpoint and Lambda function was used. This is the only endpoint that does not have <br>
  an Authorizer attached and the separate Lambda function limits the AWS services that can be accessed.
