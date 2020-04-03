import AWS from 'aws-sdk';

class DynamoHelper {
  constructor() {
    this.params = {};
    this.db = new AWS.DynamoDB.DocumentClient();
  }

  init() {
    let config = {};
    this.params.TableName = process.env.DYNAMODB_TABLE_NAME;
    this.db = new AWS.DynamoDB.DocumentClient(config);
  }

  getTableName() {
    return this.params.TableName;
  }

  promiseCall(action, params) {
    return this.db[action](params).promise();
  }

  async call(action, params) {
    const result = await this.promiseCall(action, { ...this.params, ...params });
    return result;
  }
}

export default new DynamoHelper();
