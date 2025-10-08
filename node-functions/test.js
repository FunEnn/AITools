// 测试文件 - 验证 Node Functions 迁移
export default function onRequest(context) {
  return new Response(
    JSON.stringify({
      message: "Node Functions 迁移成功！",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    },
  );
}
