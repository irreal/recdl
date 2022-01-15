import { Client } from "redis-om";

export const getClient = async function (): Promise<Client> {
  let client = new Client();
  await client.open(process.env.REDIS_CONNECTION_STRING);
  return client;
};
// export const testRedis = async function () {
//   let client = new Client();
//   await client.open(process.env.REDIS_CONNECTION_STRING);

//   let aString = await client.execute<string>(["PING"]);
//   console.log("got back", aString);
//   // 'PONG'

//   let aNumber = await client.execute<number>([
//     "HSET",
//     "foo",
//     "bar",
//     "baz",
//     "qux",
//     42,
//   ]);
//   console.log("got back", aNumber);
//   // 2

//   let anArray = await client.execute<string[]>(["HGETALL", "foo"]);
//   console.log("got back ", anArray);

//   // [ 'bar', 'baz', 'qux', '42' ]

//   await client.close();
// };
