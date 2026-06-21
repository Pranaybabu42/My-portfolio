import portfolioContent from './portfolio.json'

const img = (fileName) => new URL(`../../assets/my-images/${fileName}`, import.meta.url).href
const certImg = (fileName) => new URL(`../../assets/certifications/${fileName}`, import.meta.url).href

const profile = {
  name: 'Pranay Babu Thalluri',
  monogram: 'PBT',
  role: 'AI/ML (GenAI) Engineer',
  heroQuote: '"If you can’t trace it, you don’t control it.',
  professionalSummary:
    'Results-driven Full Stack AI Engineer with 2 years of experience delivering enterprise-grade web applications and AI-powered solutions across healthcare and insurance domains. Strong expertise in Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) pipelines, and agentic workflows using LangChain, LangGraph, OpenAI APIs, and AWS SageMaker. Skilled in building scalable end-to-end platforms with Python (FastAPI), Java Spring Boot/WebFlux, and React.js and deploying production-ready AI systems using MLOps practices including CI/CD, containerization, monitoring, and model lifecycle management. Proven contributor to high-impact enterprise AI solutions, including an award-winning evaluation platform that secured 2nd place in a regional AI innovation competition, with a strong focus on measurable business value.',
  summary:
    "I build reliable machine learning products from research to production — blending LLM systems, vision pipelines, and MLOps practices that create measurable business impact.With a background in computer science and hands-on experience across industries, I thrive on turning complex AI concepts into robust solutions that drive real-world results.",
  location: 'Bengaluru, India',
  resumeUrl: '/assets/resume.pdf',
  email: 'pranaybabu.thalluri2001@gmail.com',
  heroImage: img('Dramatic portrait of a young man (1).png'),
  aboutImages: [
    img('Contemplative portrait in shadows.png'),
    img('Dramatic portrait in black and white.png'),
  ],
  links: {
    github: 'https://github.com/Pranaybabu42',
    linkedin: 'https://www.linkedin.com/in/pranay-babu-thalluri-348b5422b/',
    email: 'mailto:pranaybabu.thalluri2001@gmail.com',

  },
  focusAreas: ['LLMs', 'Computer Vision', 'NLP', 'MLOps', 'Data Pipelines'],
  skills: {
    Languages: [
      {
        name: 'Java',
        logo: 'https://cdn.simpleicons.org/openjdk/FFFFFF',
        experience: '2+ years',
        summary: 'Used for backend service development and enterprise-grade APIs in production environments.',
      },
      {
        name: 'Python',
        logo: 'https://cdn.simpleicons.org/python/FFFFFF',
        experience: '2+ years',
        summary: 'Primary language for AI systems, automation, backend services, and model experimentation.',
      },
      {
        name: 'JavaScript',
        logo: 'https://cdn.simpleicons.org/javascript/FFFFFF',
        experience: '2 years',
        summary: 'Used to build interactive UI flows, frontend integrations, and web application features.',
      },
      {
        name: 'HTML5',
        logo: 'https://cdn.simpleicons.org/html5/FFFFFF',
        experience: '2 years',
        summary: 'Built semantic and accessible page structures for responsive web applications.',
      },
      {
        name: 'CSS3',
        logo: 'https://cdn.simpleicons.org/css3/FFFFFF',
        experience: '2 years',
        summary: 'Created responsive layouts, custom animations, and polished UI systems for frontend work.',
      },
    ],
    Frameworks: [
      {
        name: 'React.js',
        logo: 'https://cdn.simpleicons.org/react/FFFFFF',
        experience: '2 years',
        summary: 'Built reusable component-driven interfaces for dashboards, portals, and AI-enabled products.',
      },
      {
        name: 'Spring Boot',
        logo: 'https://cdn.simpleicons.org/springboot/FFFFFF',
        experience: '2+ years',
        summary: 'Developed secure Java APIs, service integrations, and enterprise backend workflows.',
      },
      {
        name: 'FastAPI',
        logo: 'https://cdn.simpleicons.org/fastapi/FFFFFF',
        experience: '2 years',
        summary: 'Shipped Python APIs for AI services, retrieval systems, and low-latency backend features.',
      },
    ],
    'LLM Stack': [
      {
        name: 'LangChain',
        logo: 'https://cdn.simpleicons.org/langchain/FFFFFF',
        experience: '1.5+ years',
        summary: 'Used for chaining tools, retrieval workflows, prompts, and production LLM orchestration.',
      },
      {
        name: 'LangGraph',
        logo: 'https://cdn.simpleicons.org/langgraph/FFFFFF',
        experience: '1+ year',
        summary: 'Designed stateful agent workflows with branching, retries, memory, and tool execution logic.',
      },
      {
        name: 'Agentic AI',
        logo: 'https://cdn.simpleicons.org/openai/FFFFFF',
        experience: '1+ year',
        summary: 'Built multi-step reasoning systems that combine tools, memory, and decision orchestration.',
      },
      {
        name: 'AI Agents',
        logo: 'https://cdn.simpleicons.org/claude/FFFFFF',
        experience: '1+ year',
        summary: 'Implemented task-driven agents for retrieval, analysis, automation, and workflow assistance.',
      },
      {
        name: 'MCPs',
        logo: 'https://cdn.simpleicons.org/json/FFFFFF',
        experience: 'Recent hands-on',
        summary: 'Worked with model context protocol style integrations to connect models with external tools and data.',
      },
    ],
    'ML & AI': [
      {
        name: 'Machine Learning',
        logo: 'https://cdn.simpleicons.org/scikitlearn/FFFFFF',
        experience: '2+ years',
        summary: 'Applied supervised learning, evaluation, feature engineering, and model optimization in projects.',
      },
      {
        name: 'Deep Learning',
        logo: 'https://cdn.simpleicons.org/pytorch/FFFFFF',
        experience: '1.5+ years',
        summary: 'Used deep neural network approaches for real-world AI use cases and experimentation.',
      },
    ],
    MLOps: [
      {
        name: 'MLOps',
        logo: 'https://cdn.simpleicons.org/mlflow/FFFFFF',
        experience: '1+ year',
        summary: 'Handled deployment workflows, model lifecycle practices, monitoring, and delivery pipelines.',
      },
    ],
    Cloud: [
      {
        name: 'AWS Cloud',
        logo: 'https://cdn.simpleicons.org/amazonwebservices/FFFFFF',
        experience: '1+ year',
        summary: 'Used AWS services for hosting, model deployment, storage, and scalable AI infrastructure.',
      },
    ],
  },
  projects: [
    {
      id: 'ai-code-evaluator',
      title: 'AI Evaluator: Code Evaluator',
      tags: ['LLM', 'AI', 'Full Stack'],
      image: img('Modern vision in grayscale elegance.png'),
      description:
        'AI-powered evaluation system for code and documents using rubric-based LLM scoring and structured feedback.',
      impact: [
        'Reduced manual review effort by 70% with automated rubric-based LLM scoring',
        'Processed 300-400 submissions through ranking and shortlisting pipelines',
        'Improved turnaround by 60% with validation layers and structured feedback generation',
      ],
      stack: ['OpenAI', 'Spring AI', 'React.js', 'PostgreSQL'],
      repo: 'https://github.com/',
      demo: 'https://example.com',
      details:
        'Built an AI-powered evaluation system to automatically assess code and documents using rubric-based LLM scoring. Developed systematized ranking and shortlisting pipelines for high-volume submissions, and improved evaluation consistency with validation layers and structured feedback generation.',
    },
    {
      id: 'text-eval-engine',
      title: 'Text Eval Engine',
      tags: ['NLP', 'ML', 'DL'],
      image: img('Contemplative portrait in shadows.png'),
      description:
        'Unified NLP evaluation system for benchmarking machine learning and deep learning models.',
      impact: [
        'Benchmarked Logistic Regression, SVM, Random Forest, CNN, and LSTM models',
        'Built end-to-end preprocessing, feature engineering, and hyperparameter tuning workflows',
        'Enabled consistent model comparison using accuracy, precision, recall, F1-score, and ROC-AUC',
      ],
      stack: ['NLP', 'Machine Learning', 'Deep Learning', 'CNN', 'LSTM'],
      repo: 'https://github.com/',
      demo: 'https://example.com',
      details:
        'Constructed a unified NLP evaluation system to benchmark ML and DL models with end-to-end preprocessing, feature engineering, and hyperparameter tuning. Designed a performance evaluation pipeline using accuracy, precision, recall, F1-score, and ROC-AUC to improve model selection efficiency.',
    },
    {
      id: 'pharma-connect',
      title: 'Pharma Connect',
      tags: ['Frontend', 'Full Stack', 'Inventory', 'Orders'],
      image: img('ChatGPT Image Feb 19, 2026, 08_25_28 PM.png'),
      description:
        'Orders and inventory management system for workflow automation, stock control, and delivery operations.',
      impact: [
        'Built a scalable order and inventory management system for pharmacy operations',
        'Enabled workflow automation, stock control, and streamlined order processing',
        'Supported order, inventory, and delivery management across frontend, backend, and database layers',
      ],
      stack: ['React', 'Spring Boot', 'PostgreSQL'],
      repo: 'https://github.com/',
      demo: 'https://example.com',
      details:
        'Built a scalable orders and inventory management system using React for the frontend, Spring Boot for the backend, and PostgreSQL for persistence. The system supports efficient order handling, inventory tracking, delivery management, and streamlined operational workflows.',
    },
    {
      id: 'my-portfolio',
      title: 'My Portfolio',
      tags: ['Frontend', 'Portfolio', 'UI'],
      image: img('Dramatic portrait in black and white.png'),
      description:
        'Personal portfolio website built to showcase experience, skills, projects, certifications, and professional profile.',
      impact: [
        'Built a responsive portfolio interface with reusable React components',
        'Created interactive sections for skills, experience, projects, highlights, and contact workflows',
        'Used structured data patterns so portfolio content can be updated from centralized data files',
      ],
      stack: ['React.js', 'Bootstrap', 'CSS', 'HTML', 'Context API'],
      repo: 'https://github.com/Pranaybabu42',
      demo: 'https://example.com',
      details:
        'Developed a personal portfolio using React.js, Bootstrap, CSS, HTML, and Context API. The project focuses on responsive layout, reusable component structure, animated sections, centralized content management, and a polished presentation of professional work.',
    },
    {
      id: 'rag-ops-assistant',
      title: 'Enterprise RAG Ops Assistant',
      tags: ['LLM', 'MLOps', 'Data'],
      image: img('Modern vision in grayscale elegance.png'),
      description:
        'Production-grade assistant for internal knowledge with retrieval guards, eval loops, and latency-aware routing.',
      impact: [
        'Reduced time-to-answer by 53% for operations teams',
        'Improved retrieval precision from 0.62 to 0.84 using hybrid search',
        'Shipped observability dashboard with prompt/version tracking',
      ],
      stack: ['Python', 'FastAPI', 'LangChain', 'Qdrant', 'Redis', 'Docker'],
      repo: 'https://github.com/',
      demo: 'https://example.com',
      details:
        'Designed a modular retrieval architecture with chunking strategies, metadata filtering, and reranking. Added policy checks and offline evaluation harness to de-risk prompt updates.',
    },
    {
      id: 'vision-quality-engine',
      title: 'Visual Defect Detection Pipeline',
      tags: ['CV', 'MLOps'],
      image: img('ChatGPT Image Feb 19, 2026, 08_25_28 PM.png'),
      description:
        'Computer vision service for defect detection with automated retraining and human-in-the-loop review.',
      impact: [
        'Increased detection recall by 27% on edge cases',
        'Lowered false positives by 19% via active learning loop',
        'Cut model deployment lead time from 3 days to 4 hours',
      ],
      stack: ['PyTorch', 'OpenCV', 'MLflow', 'Airflow', 'AWS'],
      repo: 'https://github.com/',
      demo: 'https://example.com',
      details:
        'Built model registry workflows and drift monitoring. Enabled data annotation prioritization based on uncertainty and production failures.',
    },
    {
      id: 'nlp-insight-stream',
      title: 'Real-Time NLP Insight Stream',
      tags: ['NLP', 'Data'],
      image: img('Contemplative portrait in shadows.png'),
      description:
        'Streaming NLP platform for intent detection and sentiment on customer conversations at scale.',
      impact: [
        'Processed 2M+ messages/day with p95 under 420ms',
        'Enabled proactive escalation for high-risk interactions',
        'Delivered weekly model quality reports with auto-alerts',
      ],
      stack: ['Transformers', 'Kafka', 'Spark', 'PostgreSQL', 'Grafana'],
      repo: 'https://github.com/',
      demo: 'https://example.com',
      details:
        'Implemented event-driven architecture with stream processors and batch enrichment jobs. Introduced robust fallback strategy for low-confidence model outputs.',
    },
  ],
  experience: portfolioContent.experience,
  education: [
    {
      institution: 'NRI Institute of Technology,',
      degree: 'B.Tech in Electronics and Communication',
      period: '2021 - 2024',
    },
  ],
  publications: [
    {
      title: 'Efficient Retrieval Strategies for Domain-Specific RAG Systems',
      venue: 'AI Systems Conference',
      year: '2025',
      link: 'https://example.com',
    },
  ],
  certifications: [
    {
      title: 'AWS Certified Machine Learning – Specialty',
      issuer: 'Databricks',
      displayTitle: 'Databricks Certified Generative AI Engineer Associate',
      year: '2026',
      image: certImg('databricks_gen_ai.png'),
    },
    {
      title: 'Complete Agentic AI Bootcamp With LangGraph and LangChain',
      issuer: 'Udemy',
      year: '2025',
      image: certImg('Agentic_AI_langchain and langraph.jpg'),
    },
    {
      title: 'AI Agents: Basics to Advanced',
      issuer: "O'Reilly",
      year: '2025',
      image: certImg('AI_Agents.jpg'),
    },
    {
      title: 'RxJava 3.x: ReactiveX',
      issuer: "O'Reilly",
      year: '2025',
      image: certImg('rX jAVA.jpg'),
    },
  ],
  awards: [
    {
      title: '2nd Place - Regional AI Innovation Competition',
      issuer: 'Enterprise AI Challenge',
      year: '2025',
      summary:
        'Recognized for an evaluation platform that improved AI solution assessment and delivery confidence.',
      link: 'https://example.com',
    },
    {
      title: 'High Impact AI Delivery Recognition',
      issuer: 'Endava',
      year: '2024',
      summary:
        'Awarded for building practical GenAI workflows with measurable engineering and product value.',
      link: 'https://example.com',
    },
  ],
  testimonials: [
    {
      name: 'Priya N',
      role: 'Product Manager',
      quote:
        'Arun consistently turns ambiguous AI ideas into robust, measurable products. His execution speed and quality are exceptional.',
    },
  ],
}

export default profile
