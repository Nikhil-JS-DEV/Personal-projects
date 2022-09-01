import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createBudget(event, context) {

  const body = event.body;
  const {budgetValue} = JSON.parse(body);
  const {month} = JSON.parse(body);

  const budget = {
    "id": uuid(),
    budgetValue,
    month
  };

  await dynamodb.put({
    TableName: 'MonthlyBudget',
    Item: budget,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(budget)
  };
}

export const handler = createBudget;


