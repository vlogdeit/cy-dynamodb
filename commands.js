import AWS from 'aws-sdk';

AWS.config.update({
  region: 'YOUR_REGION',
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_KEY',
  dynamoDbCrc32: false
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

Cypress.Commands.add('getDynamoDBResults', (tableName, cnpValue) => {
    const params = {
      TableName: tableName, // Our table
      ExpressionAttributeNames: {
        '#cnp': 'cnp',   // Mapping
      },
      ExpressionAttributeValues: {
        ':cnpValue': cnpValue, // Mapping
      },
      KeyConditionExpression: '#cnp = :cnpValue',  // Search condition
    };
  
    return cy.wrap(
      new Promise((resolve, reject) => { 
        dynamoDB.query(params, (err, data) => { // Query DynamoDB https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/command/QueryCommand/
          if (err) {
            return reject(err);
          }
          resolve(data.Items);
        });
      })
    );
  });

