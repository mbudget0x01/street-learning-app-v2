import redis from 'redis';
import { promisify } from 'util';
import { getRedisHostName, getRedisPort } from '../config';

export const redisClient = redis.createClient({
    host: getRedisHostName(),
    port: getRedisPort()
});

redisClient.on('error', err => {
    console.log('Error ' + err);
});

export const setAsync = promisify(redisClient.set).bind(redisClient);
export const getAsync = promisify(redisClient.get).bind(redisClient);
export const existsAsync = promisify(redisClient.exists).bind(redisClient);