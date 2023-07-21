import logger from "../logger";

const MongoClient = require("mongodb").MongoClient;

require('dotenv').config();

export default class MongoAction {
  private mongoClient = new MongoClient(process.env.MONGO_STRING);
  private db;

  constructor() {
    this.mongoClient.connect();
    this.db = this.mongoClient.db('njs-test');
    if (!this.check()) {
      logger.log('error', 'Трабл с монгой!', "mongo");
    }
  }

  async check() {
    const result = await this.db.command({ ping: 1 });
    logger.log('message', "Подключение с сервером Mongo успешно установлено", "mongo");
    return result.ok == 1;
  }

  async breaker() {
    await this.mongoClient.close();
  }

  public async insertOne(collection: string, data: {}) {
    const c = this.db.collection(collection);
    await c.insertOne(data);
    await this.breaker();
  }

  public async findOne(by: string, collection: string, value: string) {
    const c = this.db.collection(collection);
    const result = await c.findOne(JSON.parse(`{"${by}":"${value}"}`));
    await this.breaker();
    return result;
  }

  public async deleteOne(by: string, collection: string, value: string) {
    const c = this.db.collection(collection);
    const result = await c.deleteOne(JSON.parse(`{"${by}":"${value}"}`));
    await this.breaker();
    return result;
  }

  public async findOneAndUpdate(by: string, key: string, collection: string, field: string, value: string) {
    const c = this.db.collection(collection);
    const result = await c.findOneAndUpdate(
      JSON.parse(`{"${by}":"${key}"}`),
      { $set: JSON.parse(`{"${field}":"${value}"}`) },
      { upsert: true, returnDocument: "after" }
    );
    await this.breaker();
    return result.value;
  }

}