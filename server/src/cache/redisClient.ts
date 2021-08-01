import redis from 'redis';
import { promisify } from 'util';

export const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379
});

redisClient.on('error', err => {
    console.log('Error ' + err);
});

export const setAsync = promisify(redisClient.set).bind(redisClient);
export const getAsync = promisify(redisClient.get).bind(redisClient);
export const existsAsync = promisify(redisClient.exists).bind(redisClient);