'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// 配图弹窗组件
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string | null;
  title: string;
}

const ImageModal = ({ isOpen, onClose, image, title }: ImageModalProps) => {
  if (!isOpen || !image) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          ✕
        </button>
        
        {/* 图片 */}
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-contain max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* 标题 */}
        {title && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            {title}
          </div>
        )}
      </div>
    </div>
  );
};
import Image from 'next/image';

// 高性能产品图片组件
function ProductImage() {
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // 图片URL
  const imageUrl = "https://oci-useast-backend-public.dupdub.com/subtitles/image/c8212e9d-6e00-49cb-b95c-eed04053a7d8.png";
  
  useEffect(() => {
    setIsClient(true);
    
    // 预加载图片
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
      img.src = imageUrl;
    }
  }, []);
  
  if (!isClient || (!imageLoaded && !imageError)) {
    // 显示加载动画占位符
    return (
      <div className="w-full max-w-md h-64 bg-white/10 rounded-2xl flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-3"></div>
        <div className="text-white/60 text-lg">TicNote Product</div>
        <div className="text-white/40 text-sm mt-1">Loading...</div>
      </div>
    );
  }
  
  if (imageError) {
    // 错误状态显示备用内容
    return (
      <div className="w-full max-w-md h-64 bg-white/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/20">
        <div className="text-center">
          <div className="text-white/60 text-lg mb-2">TicNote AI Device</div>
          <div className="text-white/40 text-sm">三种颜色版本展示</div>
        </div>
      </div>
    );
  }
  
  // 图片加载完成后显示
  return (
    <div className="relative">
      <Image 
        src={imageUrl}
        alt="TicNote AI录音卡片 - 三种颜色版本" 
        width={400}
        height={300}
        className={`w-full max-w-md h-auto object-contain drop-shadow-2xl transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={true}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        unoptimized={false}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function PresentationMode() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, image: '', title: '' });
  // Force rebuild to clear cache
  

  

const slides = [
  {
    id: 1,
    type: 'cover',
    title: 'TicNote',
    subtitle: '重新定义AI录音卡片',
    description: '新一代Agentic AI软硬件结合产品',
    bgGradient: 'from-blue-900 via-blue-700 to-purple-700'
  },
  {
    id: 2,
    type: 'stats',
    title: 'TicNote - 硬件技术指标',
    stats: [
      { number: '120+', label: '支持语种\n及方言', icon: '🌍' },
      { number: '60+', label: '专业模板\n与词库', icon: '📚' },
      { number: '20H', label: 'recording\n🔋\nstandby 30天', icon: '⚡' },
      { number: '3mm', label: '极致轻薄\n设计', icon: '📱' }
    ],
    bgGradient: 'from-slate-900 to-slate-700'
  },
  {
    id: 3,
    type: 'recording',
    title: 'TicNote - 录音体验',
    subtitle: 'AI驱动的专业录音体验',
    coreFeatures: [
      {
        id: 1,
        title: '超高转写准确率',
        subtitle: '行业领先的语音识别技术',
        description: '基于最新Whisper-V3模型，结合自研优化算法，在嘈杂环境下依然保持98%+的转写准确率。支持120+语言和方言，专业术语智能识别。',
        icon: 'accuracy',
        stats: {
          accuracy: '>98%准确率',
          languages: '120+语言',
          noise: '降噪技术'
        }
      },
      {
        id: 2,
        title: '边录边记笔记',
        subtitle: '录音与笔记完美结合',
        description: '录音过程中可随时添加文字或语音标注，自动关联时间戳。支持图片插入、手写识别，让每个关键时刻都不错过。',
        icon: 'notes',
        stats: {
          realtime: '实时标注',
          timestamp: '精确定位',
          multimodal: '多模态输入'
        }
      },
      {
        id: 3,
        title: '智能区分讲话人',
        subtitle: 'AI声纹识别技术',
        description: '自动识别并区分不同讲话人，为每个发言者分配颜色标识。支持自定义讲话人名称，会议记录更清晰有序。',
        icon: 'speakers',
        stats: {
          speakers: '多人识别',
          voiceprint: 'AI声纹',
          labeling: '智能标注'
        }
      }
    ],
    bgGradient: 'from-emerald-900 via-teal-800 to-green-800'
  },
  {
    id: 4,
    type: 'meeting_features',
    title: 'Shadow - 会议助手',
    subtitle: '一次录音，六种输出',
    description: 'AI自动分析会议内容，智能生成多种格式的会议纪要，满足不同场景需求',
    features: [
      {
        id: 1,
        name: '总结',
        title: 'AI智能总结',
        description: '自动提取核心内容，生成精准摘要，快速把握重点信息',
        icon: '📝',
        color: 'blue',
        image: '/summary-feature.png'
      },
      {
        id: 2,
        name: '转录',
        title: '精准语音转文字',
        description: '高精度语音识别，逐字逐句转录，支持多人对话和方言识别',
        icon: '🎙️',
        color: 'green',
        image: '/transcription-feature.png'
      },
      {
        id: 3,
        name: '思维导图',
        title: '结构化呈现',
        description: '将内容转换为思维导图格式，层次分明，便于理解和记忆',
        icon: '🗺️',
        color: 'orange',
        image: '/mindmap-feature.png'
      },
      {
        id: 4,
        name: '顿悟',
        title: '深度洞察',
        description: 'AI深度分析内容，发现隐藏的关联和洞察，提供独特视角',
        icon: '💡',
        color: 'purple',
        image: '/insight-feature.png'
      },
      {
        id: 5,
        name: '深度研究',
        title: '专业分析',
        description: '基于内容进行深入研究分析，生成专业报告和见解',
        icon: '🔬',
        color: 'red',
        image: '/research-feature.png'
      },
      {
        id: 6,
        name: '播客',
        title: '音频内容制作',
        description: '将文字内容转化为专业播客，支持多种语音风格和背景音乐',
        icon: '🎧',
        color: 'teal',
        image: '/podcast-feature.png'
      }
    ],
    gifUrl: '/shadow-meeting-demo.gif',
    stats: {
      features: '6大功能',
      processing: '一键处理',
      intelligence: 'AI驱动'
    },
    bgGradient: 'from-purple-900 via-indigo-800 to-blue-800'
  },
  {
    id: 5,
    type: 'knowledge_base',
    title: 'Shadow - 知识库 & 跨文件管理',
    subtitle: 'AI驱动的文件管理系统',
    description: '将所有录音和文档转化为可搜索的知识库，AI助手随时为您解答',
    features: [
      {
        id: 1,
        name: '文件导入',
        title: '多格式支持',
        description: '支持导入PDF、Word、Excel、PPT等多种格式文档，自动提取文本内容并建立索引',
        icon: '📁',
        color: 'blue',
        image: '/file-import.png'
      },
      {
        id: 2,
        name: 'AI问答',
        title: '智能对话',
        description: '基于知识库内容进行智能问答，快速找到所需信息，支持多轮对话和上下文理解',
        icon: '💬',
        color: 'green',
        image: '/ai-qa.png'
      },
      {
        id: 3,
        name: '跨文件搜索',
        title: '全局检索',
        description: '一次搜索，查遍所有文件。支持关键词、语义、时间等多维度检索',
        icon: '🔍',
        color: 'purple',
        image: '/cross-file-search-new.png'
      },
      {
        id: 3,
        name: '知识库管理',
        title: '关联分析',
        description: 'AI自动分析文件间的关联关系，构建知识图谱，发现潜在联系',
        icon: '🕸️',
        color: 'orange',
        image: '/knowledge-management.png'
      }
    ],
    stats: {
      formats: '10+种格式',
      capacity: '无限容量',
      speed: '毫秒级检索'
    },
    bgGradient: 'from-cyan-900 via-blue-800 to-indigo-800'
  },
  {
    id: 7,
    type: 'scenarios',
    title: '应用场景',
    scenarios: [
      {
        title: '医疗诊断',
        description: '病历记录自动化，症状分析，诊疗建议辅助生成',
        icon: '🏥',
        color: 'teal',
        category: '医疗',
        image: '/scene1.png'
      },
      {
        title: '新闻采访',
        description: '实时转录访谈内容，智能标记重点，快速生成稿件',
        icon: '🎤',
        color: 'red',
        category: '媒体',
        image: '/scene2.png'
      },
      {
        title: '商务会议',
        description: '自动记录会议要点，生成会议纪要，跟踪行动项执行',
        icon: '💼',
        color: 'blue',
        category: '办公',
        image: '/scene3.png'
      },
      {
        title: '教育培训',
        description: '课堂笔记自动整理，知识点提取，学习效果评估',
        icon: '📚',
        color: 'green',
        category: '教育',
        image: '/scene4.png'
      },
      {
        title: '金融分析',
        description: '财务数据录入，市场分析记录，投资决策辅助',
        icon: '📊',
        color: 'yellow',
        category: '金融',
        image: '/scene5.png'
      },
      {
        title: '创意写作',
        description: '灵感记录，情节整理，角色设定，创作辅助工具',
        icon: '✍️',
        color: 'pink',
        category: '创作',
        image: '/scene6.png'
      }
    ],
    bgGradient: 'from-emerald-900 via-teal-800 to-cyan-800'
  },
  {
    id: 6,
    type: 'product_comparison',
    title: '产品对比分析',
    subtitle: 'TicNote vs 传统录音设备',
    description: '全方位对比，看TicNote如何重新定义AI录音',
    comparison: {
      features: [
        { name: 'AI Agent', advantage: '智能助手', ticnote: '✅ 支持', competitor: '❌ 不支持' },
        { name: 'AI智能总结', advantage: '内容提炼', ticnote: '✅ 支持', competitor: '✅ 支持' },
        { name: 'AI智能转录', advantage: '语音识别', ticnote: '✅ 支持', competitor: '✅ 支持' },
        { name: '120+语言翻译', advantage: '多语言', ticnote: '✅ 支持', competitor: '❌ 不支持' },
        { name: 'AI思维引导', advantage: '思路整理', ticnote: '✅ 支持', competitor: '✅ 支持' },
        { name: 'AI洞察(Aha时刻)', advantage: '深度分析', ticnote: '✅ 支持', competitor: '❌ 不支持' },
        { name: 'AI深度研究', advantage: '资料整合', ticnote: '✅ 支持', competitor: '❌ 不支持' },
        { name: 'AI深度思考', advantage: '逻辑推理', ticnote: '✅ 支持', competitor: '❌ 不支持' },
        { name: '项目管理', advantage: '任务协作', ticnote: '✅ 支持', competitor: '❌ 不支持' }
      ],
      stats: {
        ticnote: { score: '9/9', rate: '100%' },
        competitor: { score: '3/9', rate: '33%' }
      }
    },
    bgGradient: 'from-emerald-900 via-teal-800 to-cyan-800'
  },
  {
    id: 8,
    type: 'product_evolution',
    title: '产品演进路线',
    subtitle: 'TicNote生态布局',
    description: '从个人到企业，从录音到全场景AI助手',
    evolution: {
      dimensions: [
        { icon: '🌐', name: '连接跃升', desc: '本地存储→4G实时→全域互联' },
        { icon: '🧠', name: 'AI能力', desc: '被动记录→主动分析→预测决策' },
        { icon: '🎯', name: '场景拓展', desc: '低频会议→高频办公→全天生活' },
        { icon: '👥', name: '用户拓展', desc: '专业工具→大众助手→生活伴侣' }
      ],
      products: [
        {
          name: 'TicNote',
          subtitle: '超薄AI录音卡片',
          image: '/TicNote.png',
          status: '已发布',
          year: '2025 Q2',
          position: '旗舰产品',
          target: '商务人士、专业记者、内容创作者',
          features: ['3mm超薄', '影子AI', '25小时录音', '听筒/扬声器双模'],
          specs: {
            材质: '铝合金',
            重量: '29g',
            厚度: '3mm',
            录音时长: '25小时单次录音',
            待机时长: '20天待机',
            工作模式: '听筒模式+扬声器模式'
          },
          colors: ['曜石黑', '暮光蓝', '香槟金', '经典灰']
        },
        {
          name: 'TicNote Lite',
          subtitle: '轻量级录音方案',
          image: '/TicNote Lite.png',
          status: '即将发布',
          year: '2025 Q4',
          position: '入门产品',
          target: '职场新人、学生群体、日常用户',
          features: ['自适应录音', '彩色外壳', '简化操作', '高性价比'],
          specs: {
            材质: '塑胶材质',
            重量: '42g',
            厚度: '5.8mm',
            录音模式: '自适应录音模式',
            外观设计: '多彩外观设计'
          },
          colors: ['经典黑', '纯净白', '薄荷绿', '天空蓝', '薰衣草紫']
        },
        {
          name: 'TicNote Pods',
          subtitle: 'AI智能录音耳机',
          image: '/TicNote Pods.png',
          status: '即将发布',
          year: '2025 Q4',
          position: '创新产品',
          target: '移动办公、商务人士、会议专家',
          features: ['4G联网', 'AI视图', 'AI速记', '50小时现场录音'],
          specs: {
            connectivity: '4G联网',
            本地录音: '50小时现场录音',
            在线录音: '3小时在线录音',
            standby: '45天待机时间',
            AI功能: 'AI视图+AI速记+查找设备+AI问答'
          },
          colors: ['海军蓝', '珍珠白']
        },
        {
          name: 'TicNote Watch',
          subtitle: 'AI健康智能手表',
          image: '/TicNote Watch.png',
          status: '研发中',
          year: '2026 Q1',
          position: '生态产品',
          target: '健康管理、运动监测、会议记录',
          features: ['心率血氧监测', '全球定位步数追踪', 'AI教练', '现场会议录音'],
          specs: {
            健康监测: '心率+血氧+全球定位+步数追踪',
            录音时长: '20小时录音(现场会议)',
            待机时长: '7天待机时间',
            AI功能: 'AI教练+AI问答+查找设备',
            附加功能: '睡眠分析+运动指导'
          },
          colors: ['午夜黑']
        }
      ]
    },
    bgGradient: 'from-blue-900 via-indigo-800 to-purple-800'
  },
  {
    id: 9,
    type: 'partnership',
    title: 'Lenovo × Mobvoi',
    subtitle: '无限合作可能，共创智能未来',
    description: '期待与联想集团深度合作，共同打造下一代智能办公解决方案',
    partnership: {
      image: '/final-page-image.jpeg',
      opportunities: [
        {
          icon: '💼',
          title: '企业级解决方案',
          desc: '为联想企业客户提供定制化AI录音转写服务'
        },
        {
          icon: '🔧',
          title: '硬件深度集成',
          desc: '与联想设备无缝集成，提供原生级用户体验'
        },
        {
          icon: '🌍',
          title: '全球市场拓展',
          desc: '借助联想全球渠道，共同开拓国际AI办公市场'
        }
      ],
      vision: {
        title: '携手联想，智领未来',
        subtitle: 'Together with Lenovo, Leading the Smart Future',
        highlights: [
          '技术创新 - AI赋能办公',
          '深度合作 - 优势互补',
          '全球布局 - 共拓市场',
          '用户至上 - 体验为王'
        ]
      }
    },
    bgGradient: 'from-blue-900 via-purple-800 to-pink-800'
  }
];
  
  // 打开配图弹窗
  const openImageModal = (image, title) => {
    if (image) {
      setModalState({ isOpen: true, image, title });
    }
  };
  
  // 关闭配图弹窗
  const closeImageModal = () => {
    setModalState({ isOpen: false, image: '', title: '' });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F11') {
        toggleFullscreen();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide];

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'cover':
        return (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 左侧文字内容 */}
            <div className="text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-8xl font-black text-white tracking-tight leading-none">{slide.title}</h1>
                <h2 className="text-4xl font-light text-blue-200 leading-tight">{slide.subtitle}</h2>
              </div>
              <div className="space-y-6">
                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">{slide.description}</p>
                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                  <span className="text-white font-medium">Take Note with TicNote</span>
                </div>
              </div>
              {/* 产品标语 */}
              <div className="pt-4">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://oci-useast-backend-public.dupdub.com/subtitles/image/4b18ee1a-2d4e-473b-9bd1-ca6e97597e3e.png" 
                    alt="Magic Hat Icon" 
                    className="w-8 h-8 object-contain"
                  />
                  <p className="text-2xl font-semibold text-blue-300 italic">
                    Shadow AI, the next level of you.
                  </p>
                </div>
              </div>
            </div>
            
            {/* 右侧产品图片 */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* 背景装饰 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl transform scale-110"></div>
                {/* 产品图片容器 */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <ProductImage />
                </div>
                {/* 右下角装饰元素 */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-16">
            <h1 className="text-6xl font-bold text-white text-center mb-20">{slide.title}</h1>
            
            {/* 硬件卖点网格布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* 轻薄设计 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-4xl font-black text-blue-300 mb-2">3mm</div>
                    <div className="text-2xl text-white font-semibold mb-3">轻薄设计</div>
                    <div className="text-lg text-blue-100">极致工艺，轻薄如卡片</div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <img 
                      src="https://oci-useast-backend-public.dupdub.com/subtitles/image/f0318f60-78c9-4c70-b953-90b3df1753ee.png" 
                      alt="轻薄设计展示" 
                      className="w-40 h-32 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
              
              {/* 双模式录音 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-4xl font-black text-purple-300 mb-2">双模式</div>
                    <div className="text-2xl text-white font-semibold mb-3">智能录音</div>
                    <div className="text-lg text-blue-100">会议 + 通话双场景</div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <img 
                      src="https://oci-useast-backend-public.dupdub.com/subtitles/image/5390a7dd-f4fc-4c60-8679-a3b7290c69ee.png" 
                      alt="双模式录音展示" 
                      className="w-56 h-40 object-contain rounded-2xl drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
              
              {/* 超长续航 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-4xl font-black text-green-300 mb-2">20H</div>
                    <div className="text-2xl text-white font-semibold mb-3">超长续航</div>
                    <div className="space-y-1">
                      <div className="text-lg text-blue-100">• 录音 20小时</div>
                      <div className="text-lg text-blue-100">• 待机 30天</div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    {/* 电池组合图标 */}
                    <div className="relative">
                      {/* 大电池 */}
                      <div className="w-20 h-12 border-3 border-green-300 rounded-lg relative bg-gradient-to-r from-green-400/20 to-green-300/20">
                        <div className="w-2 h-6 bg-green-300 rounded-r absolute -right-2 top-3"></div>
                        <div className="w-16 h-6 bg-gradient-to-r from-green-400 to-green-300 rounded-md m-2 animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-green-800">100%</span>
                        </div>
                      </div>
                      {/* 时间指示器 */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-300 text-green-900 text-xs font-bold px-2 py-1 rounded-full">
                        20H
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 超大存储 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-4xl font-black text-yellow-300 mb-2">1000H</div>
                    <div className="text-2xl text-white font-semibold mb-3">超大存储</div>
                    <div className="text-lg text-blue-100">本地存储1000小时录音</div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    {/* 存储卡片图标 */}
                    <div className="relative">
                      {/* 主存储卡 */}
                      <div className="w-16 h-24 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-lg relative shadow-lg">
                        {/* 卡片切角 */}
                        <div className="absolute top-0 right-0 w-3 h-3 bg-gray-600 transform rotate-45 translate-x-1 -translate-y-1"></div>
                        {/* 存储条纹 */}
                        <div className="absolute inset-2 space-y-1">
                          <div className="h-1 bg-yellow-600 rounded opacity-80"></div>
                          <div className="h-1 bg-yellow-600 rounded opacity-60"></div>
                          <div className="h-1 bg-yellow-600 rounded opacity-40"></div>
                        </div>
                        {/* 容量标识 */}
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                          <span className="text-xs font-bold text-yellow-900">64G</span>
                        </div>
                      </div>
                      {/* 存储进度指示器 */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                        1000H
                      </div>
                      {/* 数据传输动画点 */}
                      <div className="absolute top-1/2 -right-3 flex flex-col space-y-1">
                        {[0, 0.3, 0.6].map((delay, i) => (
                          <div 
                            key={i}
                            className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" 
                            style={{animationDelay: `${delay}s`}}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl font-bold text-white leading-tight">{slide.title}</h1>
              <div className="space-y-6">
                {slide.features?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{animationDelay: `${index * 0.2}s`}}>
                    <div className="w-3 h-3 bg-white rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-xl text-gray-100 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
              {slide.highlight && (
                <div className="inline-flex items-center px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <span className="text-2xl font-bold text-green-300">{slide.highlight}</span>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 flex items-center justify-center">
                <div className="text-8xl opacity-50">🎤</div>
              </div>
            </div>
          </div>
        );

      case 'recording':
        return (
          <div className="space-y-16">
            {/* 页面标题 */}
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-bold text-white leading-tight">{slide.title}</h1>
              <h2 className="text-2xl text-emerald-300 font-medium">{slide.subtitle}</h2>
            </div>

            {/* 三大核心功能展示 */}
            <div className="space-y-12">
              {slide.coreFeatures?.map((feature, index) => (
                <div 
                  key={feature.id} 
                  className={`group grid grid-cols-12 gap-8 items-center opacity-0 animate-[fadeInUp_1s_ease-out_forwards] ${
                    index % 2 === 0 ? '' : 'flex-row-reverse'
                  }`}
                  style={{animationDelay: `${index * 0.4}s`}}
                >
                  {/* 功能内容区域 */}
                  <div className={`col-span-7 space-y-6 ${
                    index % 2 === 0 ? 'order-1' : 'order-2'
                  }`}>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold text-white leading-tight">
                        {feature.title}
                      </h3>
                      <h4 className="text-xl text-emerald-300 font-medium">
                        {feature.subtitle}
                      </h4>
                    </div>
                    
                    <p className="text-lg text-gray-200 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* 功能标签 */}
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(feature.stats).map(([key, value]) => (
                        <span 
                          key={key}
                          className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 font-medium text-sm"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 功能配图区域 */}
                  <div className={`col-span-5 flex justify-center ${
                    index % 2 === 0 ? 'order-2' : 'order-1'
                  }`}>
                    {feature.icon === 'accuracy' && (
                      // 转写准确率配图 - 使用真实截图 (配图调换为原来的第三张)
                      <div className="relative">
                        <img 
                          src="https://oci-useast-backend-public.dupdub.com/subtitles/image/56586054-e5f6-4b03-8c44-1e4d3b975db5.png"
                          alt="转写准确率展示"
                          className="w-96 h-72 object-contain rounded-2xl drop-shadow-xl group-hover:scale-105 transition-transform duration-300 -mt-4"
                        />
                        {/* 准确率标识 */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          转写准确率 >98%
                        </div>
                      </div>
                    )}
                    
                    {feature.icon === 'notes' && (
                      // 添加笔记配图 - 使用真实截图 (保持不变)
                      <div className="relative">
                        <img 
                          src="https://oci-useast-backend-public.dupdub.com/subtitles/image/23f2763b-448e-4b49-a2a5-d6643acdf839.png"
                          alt="添加笔记功能展示"
                          className="w-96 h-72 object-contain rounded-2xl drop-shadow-xl group-hover:scale-105 transition-transform duration-300 -mb-4"
                        />
                        {/* 功能标识 */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          边录边记录
                        </div>
                      </div>
                    )}
                    
                    {feature.icon === 'speakers' && (
                      // 区分讲话人配图 - 使用真实截图 (配图调换为原来的第一张)
                      <div className="relative">
                        <img 
                          src="https://oci-useast-backend-public.dupdub.com/subtitles/image/c02ac44a-6d24-47ab-b8e6-a20b8d920f0c.png"
                          alt="区分讲话人功能展示"
                          className="w-96 h-72 object-contain rounded-2xl drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* 功能标识 */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          AI声纹识别
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'meeting_features':
        return (
          <div className="space-y-12">
            {/* 页面标题 */}
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-bold text-white leading-tight">{slide.title}</h1>
              <h2 className="text-2xl text-purple-300 font-medium">{slide.subtitle}</h2>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">{slide.description}</p>
            </div>

            {/* 主要内容区域 */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* 左侧：功能列表 */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-8">六大核心功能</h3>
                <div className="grid grid-cols-2 gap-4">
                  {slide.features?.map((feature, index) => (
                    <div 
                      key={`meeting-${feature.id}`}
                      className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-${feature.color}-500/50 transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] cursor-pointer hover:bg-white/10 hover:scale-105`}
                      style={{animationDelay: `${index * 0.1}s`}}
                      onClick={() => openImageModal(feature.image, feature.name)}
                    >
                      {/* 功能图标和名称 */}
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-2xl">{feature.icon}</div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{feature.name}</h4>
                        </div>
                      </div>
                      
                      {/* 功能标题 */}
                      <h5 className="text-sm font-semibold text-gray-200 mb-2">{feature.title}</h5>
                      
                      {/* 功能描述 */}
                      <p className="text-xs text-gray-400 leading-relaxed">{feature.description}</p>
                      
                      {/* 底部装饰条 */}
                      <div className={`w-full h-1 bg-${feature.color}-500/30 rounded-full mt-4 group-hover:bg-${feature.color}-500/60 transition-colors duration-300`}></div>
                    </div>
                  ))}
                </div>
                
                {/* 功能统计 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mt-8">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-black text-purple-400">6种</div>
                      <div className="text-sm text-gray-300">输出格式</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-blue-400">1次</div>
                      <div className="text-sm text-gray-300">录音生成</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-green-400">AI</div>
                      <div className="text-sm text-gray-300">智能分析</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：GIF演示 */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  {/* GIF容器 - 移动端比例 */}
                  <div className="w-[320px] h-[640px] bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
                    <img 
                      src={slide.gifUrl}
                      alt="会议纪要功能演示"
                      className="w-full h-full object-contain rounded-3xl"
                    />
                    {/* 播放指示器 */}
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    {/* 底部标识 */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      实时功能演示
                    </div>
                  </div>
                </div>
                
                {/* 功能描述 */}
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-bold text-white">智能会议分析</h4>
                  <p className="text-gray-300 text-sm max-w-sm">
                    一次录音，AI自动生成6种不同格式的会议纪要，
                    满足总结、分析、分享等多种场景需求
                  </p>
                </div>
                
                {/* 流程指示器 */}
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>录音</span>
                  </div>
                  <div className="w-6 h-0.5 bg-gray-600"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span>AI分析</span>
                  </div>
                  <div className="w-6 h-0.5 bg-gray-600"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span>多格式输出</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'knowledge_base':
        return (
          <div className="space-y-12">
            {/* 页面标题 */}
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-bold text-white leading-tight">{slide.title}</h1>
              <h2 className="text-2xl text-cyan-300 font-medium">{slide.subtitle}</h2>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">{slide.description}</p>
            </div>

            {/* 主要内容区域 */}
            <div className="space-y-16">
              {/* 功能展示网格 */}
              <div className="grid lg:grid-cols-2 gap-12">
                {slide.features?.map((feature, index) => (
                  <div 
                    key={`knowledge-${feature.id}`}
                    className={`group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-${feature.color}-500/50 transition-all duration-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] cursor-pointer hover:transform hover:scale-105`}
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    {/* 功能图片展示 */}
                    <div className="mb-6 relative overflow-hidden rounded-2xl">
                      <img 
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-64 object-contain rounded-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* 图片覆盖层 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                      {/* 功能图标浮层 */}
                      <div className="absolute top-4 left-4">
                        <div className={`w-12 h-12 bg-${feature.color}-500/90 rounded-full flex items-center justify-center text-white text-xl backdrop-blur-sm`}>
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* 功能信息 */}
                    <div className="space-y-3">
                      {/* 功能名称 */}
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {feature.name}
                      </h3>
                      
                      {/* 功能标题 */}
                      <h4 className="text-lg font-semibold text-gray-300">{feature.title}</h4>
                      
                      {/* 功能描述 */}
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      
                      {/* 底部装饰条 */}
                      <div className={`w-full h-1 bg-${feature.color}-500/30 rounded-full group-hover:bg-${feature.color}-500/60 transition-colors duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 统计数据展示 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white text-center mb-8">核心技术指标</h3>
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {slide.stats?.formats}
                    </div>
                    <div className="text-gray-300 font-medium">支持格式</div>
                    <div className="text-sm text-gray-400">PDF•Word•Excel•PPT等</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {slide.stats?.capacity}
                    </div>
                    <div className="text-gray-300 font-medium">存储容量</div>
                    <div className="text-sm text-gray-400">云端存储•自动扩展</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {slide.stats?.speed}
                    </div>
                    <div className="text-gray-300 font-medium">检索速度</div>
                    <div className="text-sm text-gray-400">AI智能•即时响应</div>
                  </div>
                </div>
              </div>
              
              {/* 工作流程展示 */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl p-8 border border-cyan-500/20">
                <h3 className="text-2xl font-bold text-white text-center mb-8">智能工作流程</h3>
                <div className="flex items-center justify-between">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto">
                      📁
                    </div>
                    <div className="text-white font-semibold">文件导入</div>
                    <div className="text-sm text-gray-300">多格式支持</div>
                  </div>
                  
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 mx-4 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto">
                      🔄
                    </div>
                    <div className="text-white font-semibold">AI分析</div>
                    <div className="text-sm text-gray-300">智能提取</div>
                  </div>
                  
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-purple-500 mx-4 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto">
                      🧠
                    </div>
                    <div className="text-white font-semibold">知识融合</div>
                    <div className="text-sm text-gray-300">跨文件关联</div>
                  </div>
                  
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-4 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto">
                      💬
                    </div>
                    <div className="text-white font-semibold">智能交互</div>
                    <div className="text-sm text-gray-300">问答对话</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="text-center space-y-12">
            <h1 className="text-6xl font-bold text-white mb-16">{slide.title}</h1>
            <div className="grid lg:grid-cols-2 gap-16">
              {slide.specs?.map((spec, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-black text-white">{spec.value}</div>
                    <div className="text-2xl font-semibold text-orange-200">{spec.label}</div>
                    <div className="text-lg text-gray-300">{spec.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'product_comparison':
        return (
          <div className="space-y-12">
            {/* 页面标题 */}
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-bold text-white leading-tight">{slide.title}</h1>
              <h2 className="text-2xl text-emerald-300 font-medium">{slide.subtitle}</h2>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">{slide.description}</p>
            </div>

            {/* 主要对比内容 */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* 左侧：TicNote产品展示 */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-emerald-500/30">
                  <h3 className="text-2xl font-bold text-emerald-300 text-center mb-4">TicNote AI录音卡片</h3>
                  <div className="aspect-square bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-4 flex items-center justify-center">
                    <img 
                      src="/TicNote.png"
                      alt="TicNote AI录音卡片"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">厚度</span>
                      <span className="text-emerald-300 font-semibold">3mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">重量</span>
                      <span className="text-emerald-300 font-semibold">29g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">续航</span>
                      <span className="text-emerald-300 font-semibold">20+小时</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">AI功能</span>
                      <span className="text-emerald-300 font-semibold">9项全能</span>
                    </div>
                  </div>
                </div>
                
                {/* TicNote总分 */}
                <div className="bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border border-emerald-500/50">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-black text-emerald-300">{slide.comparison?.stats?.ticnote?.score}</div>
                    <div className="text-emerald-200 font-medium">功能完整度</div>
                    <div className="w-full bg-emerald-900/50 rounded-full h-2">
                      <div className="bg-emerald-400 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 中间：详细功能对比表格 */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                  {/* 表格标题 */}
                  <div className="grid grid-cols-3 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 p-4">
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-white">功能特性</h4>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-emerald-300">TicNote</h4>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-red-300">传统竞品</h4>
                    </div>
                  </div>
                  
                  {/* 对比项目 */}
                  <div className="divide-y divide-white/10">
                    {slide.comparison?.features?.map((feature, index) => (
                      <div 
                        key={index}
                        className={`grid grid-cols-3 p-4 hover:bg-white/5 transition-colors duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]`}
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        {/* 功能名称 */}
                        <div className="pr-4">
                          <div className="text-white font-medium text-sm">{feature.name}</div>
                          <div className="text-gray-400 text-xs mt-1">{feature.advantage}</div>
                        </div>
                        
                        {/* TicNote支持情况 */}
                        <div className="text-center px-2">
                          <div className={`text-sm font-medium ${
                            feature.ticnote.includes('✅') ? 'text-emerald-300' : 'text-red-300'
                          }`}>
                            {feature.ticnote}
                          </div>
                        </div>
                        
                        {/* 竞品支持情况 */}
                        <div className="text-center px-2">
                          <div className={`text-sm font-medium ${
                            feature.competitor.includes('✅') ? 'text-emerald-300' : 'text-red-300'
                          }`}>
                            {feature.competitor}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧：竞品展示 */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-red-500/30">
                  <h3 className="text-2xl font-bold text-red-300 text-center mb-4">传统录音设备</h3>
                  <div className="aspect-square bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-2xl p-4 flex items-center justify-center">
                    <div className="text-6xl opacity-50">📻</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">厚度</span>
                      <span className="text-red-300 font-semibold">15mm+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">重量</span>
                      <span className="text-red-300 font-semibold">200g+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">续航</span>
                      <span className="text-red-300 font-semibold">8-12小时</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">AI功能</span>
                      <span className="text-red-300 font-semibold">基本或无</span>
                    </div>
                  </div>
                </div>
                
                {/* 竞品总分 */}
                <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-4 border border-red-500/50">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-black text-red-300">{slide.comparison?.stats?.competitor?.score}</div>
                    <div className="text-red-200 font-medium">功能完整度</div>
                    <div className="w-full bg-red-900/50 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full w-1/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部总结 */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl p-8 border border-emerald-500/20">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-white">TicNote 全面领先</h3>
                <p className="text-lg text-gray-200 max-w-4xl mx-auto">
                  在AI智能、功能完整性、产品设计等各个维度，TicNote都展现出压倒性优势。
                  不仅是录音设备的革新，更是智能办公的未来。
                </p>
                <div className="flex justify-center space-x-8 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-black text-emerald-300">9倍</div>
                    <div className="text-sm text-gray-300">功能优势</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-emerald-300">7倍</div>
                    <div className="text-sm text-gray-300">轻薄优势</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-emerald-300">2倍</div>
                    <div className="text-sm text-gray-300">续航优势</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-emerald-300">∞</div>
                    <div className="text-sm text-gray-300">AI智能</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'scenarios':
        return (
          <div className="space-y-16">
            {/* 标题区域 */}
            <div className="text-center space-y-6">
              <h1 className="text-6xl font-bold text-white">{slide.title}</h1>
              <h2 className="text-2xl text-blue-200">{slide.subtitle}</h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">{slide.description}</p>
            </div>
            
            {/* 应用场景网格 */}
            <div className="grid lg:grid-cols-3 gap-8">
              {slide.scenarios?.map((scenario, index) => (
                <div key={index} className={`bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105`}>
                  {/* 场景图片 */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={scenario.image} 
                      alt={scenario.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {/* 渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    {/* 分类标签 */}
                    <div className="absolute top-4 left-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${scenario.color}-500/80 text-white backdrop-blur-sm`}>
                        <span className="mr-1">{scenario.icon}</span>
                        {scenario.category}
                      </div>
                    </div>
                  </div>
                  
                  {/* 内容区域 */}
                  <div className="p-6 space-y-4">
                    {/* 标题和描述 */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-sm">{scenario.desc}</p>
                    </div>
                    
                    {/* 装饰性底部元素 */}
                    <div className="pt-2">
                      <div className={`w-12 h-0.5 bg-gradient-to-r from-${scenario.color}-400 to-${scenario.color}-600 rounded-full`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 底部统计 */}
            <div className="text-center pt-8">
              <div className="inline-flex items-center space-x-8 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">6+</div>
                  <div className="text-sm text-gray-400">应用领域</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">12+</div>
                  <div className="text-sm text-gray-400">专业角色</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">∞</div>
                  <div className="text-sm text-gray-400">应用可能</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="space-y-12">
            <h1 className="text-6xl font-bold text-white text-center mb-16">{slide.title}</h1>
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="bg-red-900/20 backdrop-blur-sm rounded-3xl p-8 border border-red-500/20">
                <h3 className="text-3xl font-bold text-red-300 mb-8 text-center">{slide.comparison?.traditional.title}</h3>
                <div className="space-y-4">
                  {slide.comparison?.traditional.items.map((item, index) => (
                    <div key={index} className="text-xl text-gray-300 leading-relaxed">{item}</div>
                  ))}
                </div>
              </div>
              <div className="bg-green-900/20 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20">
                <h3 className="text-3xl font-bold text-green-300 mb-8 text-center">{slide.comparison?.ticnote.title}</h3>
                <div className="space-y-4">
                  {slide.comparison?.ticnote.items.map((item, index) => (
                    <div key={index} className="text-xl text-gray-300 leading-relaxed">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'product_evolution':
        return (
          <div className="space-y-16">
            {/* 标题区域 */}
            <div className="text-center space-y-6">
              <h1 className="text-6xl font-bold text-white">{slide.title}</h1>
              <h2 className="text-2xl text-blue-200">{slide.subtitle}</h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">{slide.description}</p>
            </div>
            
            {/* 演进维度 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {slide.evolution?.dimensions.map((dimension, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl mb-2">{dimension.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{dimension.name}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed">{dimension.desc}</p>
                </div>
              ))}
            </div>
            
            {/* 技术演进时间线 */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-16">
              <h3 className="text-3xl font-bold text-white text-center mb-8">🚀 技术演进时间线</h3>
              <div className="relative">
                {/* 时间线连接线 */}
                <div className="absolute top-3 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 hidden lg:block"></div>
                
                <div className="grid lg:grid-cols-4 gap-8">
                  {/* TicNote */}
                  <div className="relative text-center">
                    <div className="bg-green-500 w-6 h-6 rounded-full mx-auto mb-4 border-4 border-white shadow-lg relative z-10"></div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-green-500/30">
                      <h4 className="text-lg font-bold text-green-300 mb-2">TicNote</h4>
                      <p className="text-xs text-gray-300 mb-2">2025 Q2 已发布</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>• 3mm超薄铝合金</div>
                        <div>• 影子AI技术</div>
                        <div>• 25小时本地录音</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* TicNote Lite */}
                  <div className="relative text-center">
                    <div className="bg-orange-500 w-6 h-6 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"></div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-orange-500/30">
                      <h4 className="text-lg font-bold text-orange-300 mb-2">TicNote Lite</h4>
                      <p className="text-xs text-gray-300 mb-2">2025 Q4 即将发布</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>• 5.8mm塑胶外壳</div>
                        <div>• 自适应录音</div>
                        <div>• 五色可选设计</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* TicNote Pods */}
                  <div className="relative text-center">
                    <div className="bg-orange-500 w-6 h-6 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"></div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-orange-500/30">
                      <h4 className="text-lg font-bold text-orange-300 mb-2">TicNote Pods</h4>
                      <p className="text-xs text-gray-300 mb-2">2025 Q4 即将发布</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>• 4G Cat.1连接</div>
                        <div>• AI视图+速记</div>
                        <div>• 50小时续航</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* TicNote Watch */}
                  <div className="relative text-center">
                    <div className="bg-blue-500 w-6 h-6 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"></div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/30">
                      <h4 className="text-lg font-bold text-blue-300 mb-2">TicNote Watch</h4>
                      <p className="text-xs text-gray-300 mb-2">2026 Q1 研发中</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>• 心率血氧监测</div>
                        <div>• AI健康建议</div>
                        <div>• 20小时录音</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 产品矩阵 */}
            <div className="grid lg:grid-cols-2 gap-8">
              {slide.evolution?.products.map((product, index) => {
                const statusColors = {
                  '已发布': 'bg-green-500/20 text-green-200 border-green-500/30',
                  '即将发布': 'bg-orange-500/20 text-orange-200 border-orange-500/30',
                  '研发中': 'bg-purple-500/20 text-purple-200 border-purple-500/30',
                  '规划中': 'bg-blue-500/20 text-blue-200 border-blue-500/30',
                  '开发中': 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30',
                  '概念阶段': 'bg-gray-500/20 text-gray-200 border-gray-500/30'
                };
                
                return (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    {/* 产品图片 */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain bg-gradient-to-br from-gray-900 to-black p-8"
                      />
                      {/* 状态标签 */}
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[product.status as keyof typeof statusColors]}`}>
                          {product.status}
                        </div>
                      </div>
                      {/* 年份标签 */}
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                          {product.year}
                        </div>
                      </div>
                    </div>
                    
                    {/* 产品信息 */}
                    <div className="p-6 space-y-4">
                      {/* 产品名称和定位 */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                          <div className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                            {product.position}
                          </div>
                        </div>
                        <p className="text-blue-200 font-medium">{product.subtitle}</p>
                        <p className="text-gray-400 text-sm">{product.target}</p>
                      </div>
                      
                      {/* 核心特性 */}
                      <div className="space-y-2">
                        <h4 className="text-white font-semibold text-sm">核心特性：</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.features.map((feature, fIndex) => (
                            <span key={fIndex} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* 技术规格 */}
                      {product.specs && (
                        <div className="space-y-2">
                          <h4 className="text-white font-semibold text-sm">技术规格：</h4>
                          <div className="grid grid-cols-1 gap-1 text-xs">
                            {Object.entries(product.specs).map(([key, value], sIndex) => {
                              const labels = {
                                material: '材质',
                                weight: '重量',
                                thickness: '厚度',
                                battery: '续航',
                                mode: '模式',
                                connectivity: '连接',
                                standby: '待机',
                                ai: 'AI功能',
                                scene: '场景',
                                health: '健康监测',
                                recording: '录音时长',
                                features: '其他功能'
                              };
                              return (
                                <div key={sIndex} className="flex justify-between text-gray-400">
                                  <span className="text-gray-500">{labels[key as keyof typeof labels] || key}:</span>
                                  <span className="text-gray-300">{value}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* 配色选择 */}
                      <div className="space-y-2">
                        <h4 className="text-white font-semibold text-sm">配色选择：</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.colors.map((color, cIndex) => (
                            <span key={cIndex} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* 底部统计 */}
            <div className="text-center pt-8">
              <div className="inline-flex items-center space-x-8 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4</div>
                  <div className="text-sm text-gray-400">产品形态</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="text-sm text-gray-400">应用场景</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">∞</div>
                  <div className="text-sm text-gray-400">创新可能</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div className="text-center space-y-12">
            <h1 className="text-6xl font-bold text-white mb-16">{slide.title}</h1>
            <div className="space-y-8">
              {slide.timeline?.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">{item.title}</div>
                    <div className="text-lg text-gray-300">{item.phase}</div>
                  </div>
                  <div className={`px-6 py-2 rounded-full text-sm font-medium ${
                    item.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    item.status === 'current' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                  }`}>
                    {item.status === 'completed' ? '已完成' : item.status === 'current' ? '进行中' : '计划中'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'partnership':
        return (
          <div className="space-y-16">
            {/* 标题区域 */}
            <div className="text-center space-y-6">
              <h1 className="text-7xl font-bold text-white mb-4">{slide.title}</h1>
              <h2 className="text-3xl text-blue-200 mb-6">{slide.subtitle}</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">{slide.description}</p>
            </div>
            
            {/* 产品全家福展示 */}
            <div className="flex justify-center mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <img 
                  src={slide.partnership?.image} 
                  alt="TicNote产品生态" 
                  className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
                />
                <p className="text-center text-gray-300 mt-4 text-lg">TicNote AI智能生态全产品线</p>
              </div>
            </div>
            
            {/* 跨设备协同能力展示 */}
            <div className="bg-gradient-to-r from-cyan-800/30 to-blue-800/30 backdrop-blur-sm rounded-3xl p-12 border border-white/10 mb-16">
              <div className="text-center space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-white mb-4">🔗 跨设备协同生态</h3>
                  <p className="text-xl text-cyan-200">无缝连接，智能协作，打造全场景AI办公体验</p>
                </div>
                
                <div className="flex justify-center mb-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                    <img 
                      src="/cross-device-collaboration.jpeg" 
                      alt="跨设备协同能力展示" 
                      className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <div className="flex flex-col items-center space-y-3 bg-white/10 rounded-xl p-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <span className="text-white font-semibold">手机端录音</span>
                    <span className="text-cyan-200 text-sm text-center">随时随地捕捉灵感</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-3 bg-white/10 rounded-xl p-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💻</span>
                    </div>
                    <span className="text-white font-semibold">电脑端处理</span>
                    <span className="text-blue-200 text-sm text-center">AI智能分析整理</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-3 bg-white/10 rounded-xl p-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">☁️</span>
                    </div>
                    <span className="text-white font-semibold">云端同步</span>
                    <span className="text-purple-200 text-sm text-center">多端实时共享</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-3 bg-white/10 rounded-xl p-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <span className="text-white font-semibold">协同办公</span>
                    <span className="text-green-200 text-sm text-center">团队高效协作</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 合作机会展示 */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {slide.partnership?.opportunities.map((opportunity, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-5xl mb-4 text-center">{opportunity.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{opportunity.title}</h3>
                  <p className="text-gray-300 text-center leading-relaxed">{opportunity.desc}</p>
                </div>
              ))}
            </div>
            
            {/* 愿景展示 */}
            <div className="bg-gradient-to-r from-blue-800/30 to-purple-800/30 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <div className="text-center space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-white mb-4">{slide.partnership?.vision.title}</h3>
                  <p className="text-xl text-blue-200">{slide.partnership?.vision.subtitle}</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {slide.partnership?.vision.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white/10 rounded-xl p-4">
                      <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                      <span className="text-white text-lg">{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-8">
                  <div className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl">
                    <span className="mr-3">🤝</span>
                    期待与您携手合作
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slide.bgGradient} flex flex-col transition-all duration-1000 ease-in-out`}>
      {/* Navigation Bar */}
      <div className="absolute top-8 left-8 right-8 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div className="text-white">
              <div className="font-bold text-lg">TicNote Presentation</div>
              <div className="text-sm opacity-75">{currentSlide + 1} / {slides.length}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">

            {/* 翻页按钮 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
            >
              {isFullscreen ? '退出全屏' : '全屏模式'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-16 py-24">
        <div key={`slide-${currentSlide}-${slide.type}`} className="w-full max-w-7xl">
          {renderSlideContent()}
        </div>
      </main>

      {/* 配图弹窗 */}
      <ImageModal 
        isOpen={modalState.isOpen}
        onClose={closeImageModal}
        image={modalState.image}
        title={modalState.title}
      />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}