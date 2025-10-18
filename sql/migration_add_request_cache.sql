-- 数据库迁移脚本：添加请求缓存表
-- 执行此脚本前请备份数据库

-- 检查表是否已存在
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'request_cache') THEN
        -- 创建请求缓存表
        CREATE TABLE request_cache (
            id SERIAL PRIMARY KEY,
            request_id VARCHAR(255) UNIQUE NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '24 hours')
        );

        -- 创建索引
        CREATE INDEX idx_request_cache_user_id ON request_cache(user_id);
        CREATE INDEX idx_request_cache_request_id ON request_cache(request_id);
        CREATE INDEX idx_request_cache_expires_at ON request_cache(expires_at);

        -- 添加表注释
        COMMENT ON TABLE request_cache IS '请求缓存表，用于实现API幂等性，防止重复数据上传';
        COMMENT ON COLUMN request_cache.request_id IS '唯一请求标识符，由前端生成';
        COMMENT ON COLUMN request_cache.user_id IS '用户ID，用于隔离不同用户的缓存';
        COMMENT ON COLUMN request_cache.content IS '缓存的AI生成内容';
        COMMENT ON COLUMN request_cache.created_at IS '缓存创建时间';
        COMMENT ON COLUMN request_cache.expires_at IS '缓存过期时间，默认24小时';

        RAISE NOTICE '请求缓存表创建成功';
    ELSE
        RAISE NOTICE '请求缓存表已存在，跳过创建';
    END IF;
END $$;

-- 创建清理过期缓存的函数
CREATE OR REPLACE FUNCTION cleanup_expired_cache()
RETURNS void AS $$
BEGIN
    DELETE FROM request_cache WHERE expires_at < NOW();
    RAISE NOTICE '已清理过期缓存记录';
END;
$$ LANGUAGE plpgsql;