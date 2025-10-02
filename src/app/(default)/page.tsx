
export default function Home() {
  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">欢迎使用 AI Tools</h1>
        <p className="text-blue-100">探索强大的 AI 工具，提升您的工作效率</p>
      </div>

      {/* 工具卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: '文本生成',
            description: '使用 AI 生成高质量的文章、摘要和内容',
            icon: '📝',
            color: 'bg-blue-50 border-blue-200'
          },
          {
            title: '图像生成',
            description: '通过文字描述创建独特的图像和艺术作品',
            icon: '🎨',
            color: 'bg-purple-50 border-purple-200'
          },
          {
            title: '代码生成',
            description: '自动生成代码片段，提高开发效率',
            icon: '💻',
            color: 'bg-green-50 border-green-200'
          },
          {
            title: '音频处理',
            description: 'AI 驱动的音频生成和编辑工具',
            icon: '🎵',
            color: 'bg-yellow-50 border-yellow-200'
          },
          {
            title: '视频制作',
            description: '创建和编辑视频内容，添加特效',
            icon: '🎬',
            color: 'bg-red-50 border-red-200'
          },
          {
            title: '设计工具',
            description: 'AI 辅助的图形设计和 UI 工具',
            icon: '🎯',
            color: 'bg-indigo-50 border-indigo-200'
          }
        ].map((tool) => (
          <div key={tool.title} className={`${tool.color} border rounded-lg p-6 hover:shadow-lg transition-shadow`}>
            <div className="text-3xl mb-3">{tool.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
            <p className="text-gray-600 text-sm">{tool.description}</p>
          </div>
        ))}
      </div>

      {/* 快速开始 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">快速开始</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <span>选择您需要的 AI 工具</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <span>输入您的需求或描述</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <span>获得 AI 生成的结果</span>
          </div>
        </div>
      </div>
    </div>
  );
}
