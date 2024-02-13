import * as dotenv from 'dotenv';

const fields = {
  BOT_TOKEN: { required: true },
  CHAT_ID: { required: true, type: 'number' }
};

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    dotenv.config();

    const missingFields = Object.keys(fields).filter(field => {
      return (
        fields[field].required && typeof process.env[field] === 'undefined'
      );
    });

    if (missingFields.length) {
      throw new Error(`ConfigService has missing fields: ${missingFields}`);
    }

    this.envConfig = process.env;
  }

  get(key: string): string {
    let value = this.getOrDefault(key);

    if (!fields[key]) {
      throw new Error(
        `Environment variable '${key}' is not described in fields`
      );
    }
    
    return value;
  }

  getOrDefault(key: string, defaultValue: string = null): string {
    return this.envConfig[key] || defaultValue;
  }
}
