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

## Planned Tasks
* POST/GET Lambda Functions to perform CRUD operations on DynamoDB
* Request to Stock Market APIs after reading from DynamoDB
* Refactor/Create custom hook to work with both API Gateway and Stock Market API
* Trading functionality after completion of Watchlist
* Add additional API Gateway routes for stock ticker verification

