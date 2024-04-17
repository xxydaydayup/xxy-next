import Redis from "ioredis";

const redis = new Redis();

const initialData = {
  1702459181837:
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837:
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837:
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export async function getAllNotes() {
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length == 0) {
    await redis.hset("notes", initialData);
  }
  return await redis.hgetall("notes");
}

export async function addNote(data) {
  const uuid = Date.now().toString();
  await redis.hset("notes", [uuid], data);
  return uuid;
}

export async function updateNote(uuid, data) {
  await redis.hset("notes", [uuid], data);
}

export async function getNote(uuid) {
  return JSON.parse(await redis.hget("notes", uuid));
}

export async function delNote(uuid) {
  return redis.hdel("notes", uuid);
}

export async function addUser(username, password) {
  // 在 Redis 中存储用户数据
  await redis.hmset(`user:${username}`, {
    username,
    password,
    notes: JSON.stringify([]),
  });

  return {
    name: username,
    username,
    userId: username, // 这里使用用户名作为 userId
  };
}

export async function getUser(username, password) {
  // 从 Redis 中获取用户数据
  const userData = await redis.hgetall(`user:${username}`);
  if (!userData.username) return 0; // 用户不存在
  if (userData.password !== password) return 1; // 密码不匹配

  return {
    name: userData.username,
    username: userData.username,
    userId: userData.username, // 这里使用用户名作为 userId
  };
}

// export async function addUser(username, password) {
//   const user = await prisma.user.create({
//     data: {
//       username,
//       password,
//       notes: {
//         create: [],
//       },
//     },
//   });

//   return {
//     name: username,
//     username,
//     userId: user.id,
//   };
// }

// export async function getUser(username, password) {
//   const user = await prisma.user.findFirst({
//     where: {
//       username,
//     },
//     include: {
//       notes: true,
//     },
//   });
//   if (!user) return 0;
//   if (user.password !== password) return 1;
//   return {
//     name: username,
//     username,
//     userId: user.id,
//   };
// }

export default redis;
