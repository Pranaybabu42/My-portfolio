import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Layers3,
  LockKeyhole,
  Network,
  ServerCog,
} from 'lucide-react'
import portfolioContent from '../../data/portfolio.json'
import { useInViewAnimation } from '../../hooks/useInViewAnimation'
import TouchCue from '../ui/TouchCue'
import './Skills.css'

const iconMap = {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Layers3,
  LockKeyhole,
  Network,
  ServerCog,
}

const localLogos = {
  Authentication: new URL('../../../assets/languages_images/Authentication.jpg', import.meta.url).href,
  AWS: new URL('../../../assets/languages_images/aws.webp', import.meta.url).href,
  AZURE: new URL('../../../assets/languages_images/Azure.webp', import.meta.url).href,
  Bootstrap: new URL('../../../assets/languages_images/Bootstrap.webp', import.meta.url).href,
  BootStrap: new URL('../../../assets/languages_images/Bootstrap.webp', import.meta.url).href,
  CSS3: new URL('../../../assets/languages_images/CSS logo.webp', import.meta.url).href,
  'DEEP LEARNING': new URL('../../../assets/languages_images/Deep Learning.webp', import.meta.url).href,
  FastAPI: new URL('../../../assets/languages_images/Fastapi-Logo.png', import.meta.url).href,
  GCP: new URL('../../../assets/languages_images/Gcp.jpg', import.meta.url).href,
  'GENERATIVE AI': new URL('../../../assets/languages_images/GenAI.webp', import.meta.url).href,
  HTML5: new URL('../../../assets/languages_images/html.jpg', import.meta.url).href,
  Java: new URL('../../../assets/languages_images/Java-Logo.png', import.meta.url).href,
  JavaScript: new URL('../../../assets/languages_images/Javascript-Logo.jpg', import.meta.url).href,
  'MACHINE LEARNING': new URL('../../../assets/languages_images/Machine-Learninf.webp', import.meta.url).href,
  Microservices: new URL('../../../assets/languages_images/Micorservices.webp', import.meta.url).href,
  MLOps: new URL('../../../assets/languages_images/MLops.png', import.meta.url).href,
  MongoDB: new URL('../../../assets/languages_images/mongodb.webp', import.meta.url).href,
  MySQL: new URL('../../../assets/languages_images/Mysql.webp', import.meta.url).href,
  PostgreSQL: new URL('../../../assets/languages_images/postgresql.webp', import.meta.url).href,
  Python: new URL('../../../assets/languages_images/Python-logo.jpg', import.meta.url).href,
  'React.js': new URL('../../../assets/languages_images/ReactJs-Logo.webp', import.meta.url).href,
  Redis: new URL('../../../assets/languages_images/redis.webp', import.meta.url).href,
  'REST APIs': new URL('../../../assets/languages_images/RestApi.webp', import.meta.url).href,
  'Spring Boot': new URL('../../../assets/languages_images/SpringBoot- Logo.webp', import.meta.url).href,
  TypeScript: new URL('../../../assets/languages_images/typescript.jpg', import.meta.url).href,
}

const simpleIcons = (name) => `https://cdn.simpleicons.org/${name}/FFFFFF`

const libraryLogos = {
  pandas: simpleIcons('pandas'),
  numpy: simpleIcons('numpy'),
  'scikit-learn': simpleIcons('scikitlearn'),
  matplotlib: simpleIcons('matplotlib'),
  'spring-ai': simpleIcons('spring'),
  'spring-security': simpleIcons('springsecurity'),
  hibernate: simpleIcons('hibernate'),
  'spring-boot': simpleIcons('springboot'),
  'react-router': simpleIcons('reactrouter'),
  'framer-motion': simpleIcons('framer'),
  axios: simpleIcons('axios'),
  zustand: simpleIcons('zustand'),
  'jwt.io': simpleIcons('jsonwebtokens'),
  oauth2: simpleIcons('auth0'),
  postgres: simpleIcons('postgresql'),
  mysql: simpleIcons('mysql'),
  redis: simpleIcons('redis'),
  docker: simpleIcons('docker'),
  kafka: simpleIcons('apachekafka'),
  aws: simpleIcons('amazonaws'),
  githubactions: simpleIcons('githubactions'),
}

function resolveLogoReference(item) {
  if (!item) return null
  if (item.logo) return item.logo
  if (item.localLogo) return localLogos[item.localLogo] ?? null
  if (item.logoSlug) return simpleIcons(item.logoSlug)
  return null
}

function normalizeSkill(skill) {
  return {
    ...skill,
    logo: resolveLogoReference(skill),
    libraries: Array.isArray(skill.libraries)
      ? skill.libraries.map((library) => ({
          ...library,
          logo: resolveLogoReference(library),
        }))
      : [],
  }
}

function normalizeSkillGroups(groups) {
  return groups.map((group) => ({
    ...group,
    icon: iconMap[group.icon] ?? group.icon ?? Code2,
    skills: Array.isArray(group.skills) ? group.skills.map(normalizeSkill) : [],
  }))
}

function normalizeOverviewItems(items) {
  return items.map((item) => ({
    ...item,
    icon: iconMap[item.icon] ?? item.icon ?? Code2,
  }))
}

const fallbackSkillGroups = [
  {
    title: 'Languages',
    icon: Code2,
    summary: 'Core programming and query languages used across product, data, and API work.',
    tooltip: 'Click to show language skills.',
    skills: [
      {
        name: 'Python',
        detail: 'FastAPI, Flask',
        libraries: [
          { name: 'pandas', logo: libraryLogos.pandas },
          { name: 'NumPy', logo: libraryLogos.numpy },
          { name: 'scikit-learn', logo: libraryLogos['scikit-learn'] },
          { name: 'Matplotlib', logo: libraryLogos.matplotlib },
        ],
        tip: 'Primary language for AI services, APIs, automation, and model workflows.',
      },
      {
        name: 'Java',
        detail: 'Spring Boot, Micro-services',
        libraries: [
          { name: 'Spring AI', logo: libraryLogos['spring-ai'] },
          { name: 'Spring Security', logo: libraryLogos['spring-security'] },
          { name: 'Hibernate', logo: libraryLogos.hibernate },
          { name: 'Spring Boot', logo: libraryLogos['spring-boot'] },
        ],
        tip: 'Enterprise backend services, integrations, and resilient API layers.',
      },
      {
        name: 'TypeScript',
        libraries: [
          { name: 'React Router', logo: libraryLogos['react-router'] },
          { name: 'Framer Motion', logo: libraryLogos['framer-motion'] },
          { name: 'Axios', logo: libraryLogos.axios },
          { name: 'Zustand', logo: libraryLogos.zustand },
        ],
        tip: 'Typed frontend and service code for safer product iteration.',
      },
      {
        name: 'JavaScript',
        libraries: [
          { name: 'DOM APIs', logo: libraryLogos['react-router'] },
          { name: 'Fetch', logo: libraryLogos.axios },
          { name: 'Node.js', logo: simpleIcons('nodedotjs') },
          { name: 'Express', logo: simpleIcons('express') },
        ],
        tip: 'Interactive UI behavior, integrations, and web application features.',
      },
      {
        name: 'SQL',
        libraries: [
          { name: 'PostgreSQL', logo: libraryLogos.postgres },
          { name: 'MySQL', logo: libraryLogos.mysql },
          { name: 'Redis', logo: libraryLogos.redis },
          { name: 'Prisma', logo: simpleIcons('prisma') },
        ],
        tip: 'Data querying, reporting, schema design, and relational persistence.',
      },
    ],
  },
  {
    title: 'Frontend',
    icon: Layers3,
    summary: 'Interface technologies for responsive, component-driven user experiences.',
    tooltip: 'Click to show frontend skills.',
    skills: [
      {
        name: 'React.js',
        libraries: [
          { name: 'React Router', logo: libraryLogos['react-router'] },
          { name: 'Framer Motion', logo: libraryLogos['framer-motion'] },
          { name: 'Context API', logo: localLogos['React.js'] },
        ],
        tip: 'Reusable components, dashboards, portals, and AI-enabled UI flows.',
      },
      { name: 'HTML5', libraries: [{ name: 'Accessibility', logo: simpleIcons('w3c') }, { name: 'Forms', logo: simpleIcons('html5') }], tip: 'Semantic, accessible page structure for reliable interfaces.' },
      { name: 'CSS3', libraries: [{ name: 'Flexbox', logo: simpleIcons('css3') }, { name: 'Grid', logo: simpleIcons('csswizardry') }, { name: 'Sass', logo: simpleIcons('sass') }], tip: 'Responsive layouts, animation systems, and polished visual states.' },
      { name: 'BootStrap', libraries: [{ name: 'Grid', logo: simpleIcons('bootstrap') }, { name: 'Utilities', logo: simpleIcons('bootstrap') }, { name: 'Components', logo: simpleIcons('bootstrap') }], tip: 'Fast layout primitives and familiar responsive UI patterns.' },
    ],
  },
    {
    title: 'AI / ML ',
    icon: BrainCircuit,
    summary: 'Generative AI, model development, retrieval, fine-tuning, and MLOps.',
    tooltip: 'Click to show AI, ML, and LLM skills.',
    skills: [
      { name: 'GENERATIVE AI', libraries: [{ name: 'RAG', logo: simpleIcons('openai') }, { name: 'LangChain', logo: simpleIcons('langchain') }, { name: 'LlamaIndex', logo: simpleIcons('llamaindex') }, { name: 'OpenAI APIs', logo: simpleIcons('openai') }], tip: 'Systems that generate, reason, retrieve, and assist with business workflows.' },
      { name: 'MACHINE LEARNING', libraries: [{ name: 'pandas', logo: libraryLogos.pandas }, { name: 'NumPy', logo: libraryLogos.numpy }, { name: 'scikit-learn', logo: libraryLogos['scikit-learn'] }, { name: 'XGBoost', logo: simpleIcons('xgboost') }], tip: 'Classic machine learning, feature work, and evaluation.' },
      { name: 'DEEP LEARNING', libraries: [{ name: 'PyTorch', logo: simpleIcons('pytorch') }, { name: 'TensorFlow', logo: simpleIcons('tensorflow') }, { name: 'Keras', logo: simpleIcons('keras') }, { name: 'CUDA', logo: simpleIcons('nvidia') }], tip: 'Deep learning workflows for richer model capabilities.' },
      { name: 'MLOps', libraries: [{ name: 'MLflow', logo: simpleIcons('mlflow') }, { name: 'Docker', logo: libraryLogos.docker }, { name: 'Kubernetes', logo: simpleIcons('kubernetes') }, { name: 'Airflow', logo: simpleIcons('apacheairflow') }], tip: 'Model lifecycle, deployment, monitoring, and release practices.' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: ServerCog,
    summary: 'Service contracts, realtime channels, auth flows, and backend architecture.',
    tooltip: 'Click to show backend and API skills.',
    skills: [
      { name: 'REST APIs', libraries: [{ name: 'OpenAPI', logo: simpleIcons('openapiinitiative') }, { name: 'Swagger', logo: simpleIcons('swagger') }, { name: 'Postman', logo: simpleIcons('postman') }], tip: 'Clear contracts for product and integration workflows.' },
      { name: 'Microservices', libraries: [{ name: 'Spring Boot', logo: libraryLogos['spring-boot'] }, { name: 'Docker', logo: libraryLogos.docker }, { name: 'Kafka', logo: libraryLogos.kafka }], tip: 'Bounded services that keep deployment and ownership clean.' },
      { name: 'WebSockets', libraries: [{ name: 'Socket.IO', logo: simpleIcons('socketdotio') }, { name: 'STOMP', logo: simpleIcons('stomp') }, { name: 'SignalR', logo: simpleIcons('signalr') }], tip: 'Realtime communication for active application states.' },
      { name: 'JWT/OAuth2', libraries: [{ name: 'JWT', logo: libraryLogos['jwt.io'] }, { name: 'OAuth2', logo: libraryLogos.oauth2 }, { name: 'Spring Security', logo: libraryLogos['spring-security'] }], tip: 'Secure authentication and authorization for web platforms.' },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    summary: 'Relational, document, and cache stores for product and AI data paths.',
    tooltip: 'Click to show database skills.',
    skills: [
      { name: 'PostgreSQL', libraries: [{ name: 'pgAdmin', logo: libraryLogos.postgres }, { name: 'Prisma', logo: simpleIcons('prisma') }, { name: 'SQLAlchemy', logo: simpleIcons('sqlalchemy') }], tip: 'Reliable relational storage, indexing, and analytics-friendly schemas.' },
      { name: 'MySQL', libraries: [{ name: 'Workbench', logo: libraryLogos.mysql }, { name: 'Sequelize', logo: simpleIcons('sequelize') }, { name: 'Knex', logo: simpleIcons('knexjs') }], tip: 'Transactional application data and familiar relational workflows.' },
      { name: 'MongoDB', libraries: [{ name: 'Mongoose', logo: simpleIcons('mongoose') }, { name: 'Atlas', logo: simpleIcons('mongodb') }, { name: 'Compass', logo: simpleIcons('mongodb') }], tip: 'Flexible document storage for evolving product data.' },
      { name: 'Redis', libraries: [{ name: 'ioredis', logo: libraryLogos.redis }, { name: 'Redis Queue', logo: libraryLogos.redis }, { name: 'BullMQ', logo: simpleIcons('bullmq') }], tip: 'Caching, queues, and fast state for low-latency systems.' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    summary: 'Cloud services, release pipelines, containers, and operational delivery.',
    tooltip: 'Click to show cloud and DevOps skills.',
    skills: [
      { name: 'AWS', detail: 'EC2, S3, Lambda', libraries: [{ name: 'IAM', logo: libraryLogos.aws }, { name: 'CloudWatch', logo: libraryLogos.aws }, { name: 'ECS', logo: libraryLogos.aws }, { name: 'RDS', logo: libraryLogos.aws }], tip: 'Compute, storage, serverless, and AI infrastructure foundations.' },
      { name: 'AZURE', detail: 'Key Vault, Redis, Service Bus', libraries: [{ name: 'Functions', logo: simpleIcons('azurefunctions') }, { name: 'App Service', logo: simpleIcons('azuredevops') }, { name: 'Cosmos DB', logo: simpleIcons('microsoftazure') }], tip: 'Secrets, messaging, cache, and enterprise cloud integrations.' },
      { name: 'Docker', libraries: [{ name: 'Compose', logo: libraryLogos.docker }, { name: 'Hub', logo: libraryLogos.docker }, { name: 'BuildKit', logo: libraryLogos.docker }], tip: 'Portable service packaging and repeatable runtime environments.' },
      { name: 'CI/CD', libraries: [{ name: 'GitHub Actions', logo: libraryLogos.githubactions }, { name: 'GitLab CI', logo: simpleIcons('gitlab') }, { name: 'Jenkins', logo: simpleIcons('jenkins') }], tip: 'Automated checks, builds, releases, and safer delivery loops.' },
      { name: 'GitLab', libraries: [{ name: 'CI/CD', logo: simpleIcons('gitlab') }, { name: 'Merge Requests', logo: simpleIcons('gitlab') }, { name: 'Runners', logo: simpleIcons('gitlab') }], tip: 'Source control, pipelines, and collaboration workflows.' },
    ],
  },

]

const fallbackOverviewItems = [
  {
    title: 'Build',
    icon: Code2,
    text: 'Interfaces, APIs, and services composed around clear ownership.',
  },
  {
    title: 'Protect',
    icon: LockKeyhole,
    text: 'Auth, secrets, boundaries, and operational habits that reduce surprises.',
  },
  {
    title: 'Connect',
    icon: Network,
    text: 'RAG, realtime APIs, integrations, and cloud services wired with traceability.',
  },
]

const skillGroups = normalizeSkillGroups(portfolioContent.skills?.groups ?? fallbackSkillGroups)
const overviewItems = normalizeOverviewItems(portfolioContent.skills?.overviewItems ?? fallbackOverviewItems)

function getSkillLogo(skill) {
  if (skill.logo) return skill.logo
  if (localLogos[skill.name]) return localLogos[skill.name]
  if (/jwt|oauth|auth/i.test(skill.name)) return localLogos.Authentication
  if (skill.name === 'Python') return localLogos.Python
  if (skill.name === 'Java') return localLogos.Java
  if (skill.name === 'JavaScript') return localLogos.JavaScript
  if (skill.name === 'React.js') return localLogos['React.js']
  if (skill.detail?.includes('Spring Boot')) return localLogos['Spring Boot']
  if (skill.detail?.includes('FastAPI')) return localLogos.FastAPI
  return null
}

function CategoryCard({ group, index, activeGroup, onSelect, reducedMotion }) {
  const Icon = group.icon
  const isActive = activeGroup === group.title

  return (
    <Motion.button
      type="button"
      className={`skillCategoryCard ${isActive ? 'is-active' : ''}`}
      onClick={() => onSelect(group.title)}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, delay: index * 0.045, ease: 'easeOut' }}
      style={{ '--category-index': index }}
      aria-expanded={isActive}
      aria-controls="skills-active-panel"
    >
      <span className="skillTooltip" role="tooltip">
        {group.tooltip}
      </span>
      <span className="skillCategoryTabInner">
        <Icon size={15} />
        <span>{group.title}</span>
      </span>
    </Motion.button>
  )
}

function SkillFlipCard({ skill, index, reducedMotion, isFlipped, onToggle }) {
  const logo = getSkillLogo(skill)
  const libraries = Array.isArray(skill.libraries) ? skill.libraries : []
  const hasLibraries = libraries.length > 0

  return (
    <Motion.li
      className={`skillFlipCard${isFlipped ? ' is-flipped' : ''}`}
      initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, delay: index * 0.025, ease: 'easeOut' }}
      style={{ '--skill-index': index }}
      tabIndex={0}
      role="button"
      aria-expanded={isFlipped}
      onClick={onToggle}
    >
      <span className="skillTooltip" role="tooltip">
        {skill.tip}
      </span>
      <span className="skillFlipInner">
        <span className="skillFace skillFaceFront">
          {logo ? (
            <span className="skillLogo">
              <img src={logo} alt="" loading="lazy" />
            </span>
          ) : (
            <span className="skillMark">{skill.name.slice(0, 2)}</span>
          )}
          <span className="skillName">{skill.name}</span>
        </span>
        <span className="skillFace skillFaceBack">
          <div className="skillBackContent">
            <strong>{skill.name}</strong>
            {hasLibraries ? (
              <span className="skillLibraries skillLibrariesBack">
                {libraries.map((library) => (
                  <span key={library.name} className="skillLibraryBullet">
                    {library.name}
                  </span>
                ))}
              </span>
            ) : null}
          </div>
        </span>
      </span>
    </Motion.li>
  )
}

function ActiveSkillPanel({ group, groupIndex, reducedMotion }) {
  const Icon = group.icon
  const [flippedSkill, setFlippedSkill] = useState(null)

  return (
    <AnimatePresence mode="wait">
      <Motion.section
        id="skills-active-panel"
        key={group.title}
        className="skillsActivePanel"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
        transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
        aria-label={`${group.title} skills group ${groupIndex + 1}`}
      >
        <div className="skillsActiveIntro">
          <span className="skillsActiveIcon">
            <Icon size={20} />
          </span>
          <div>
            <h3>{group.title}</h3>
            <p>{group.summary}</p>
          </div>
        </div>

        <TouchCue label="Tap cards to flip" className="skillsTouchCue" />

        <ul className="skillFlipGrid">
          {group.skills.map((skill, index) => (
            <SkillFlipCard
              key={`${group.title}-${skill.name}`}
              skill={skill}
              index={index}
              reducedMotion={reducedMotion}
              isFlipped={flippedSkill === skill.name}
              onToggle={() => setFlippedSkill((current) => (current === skill.name ? null : skill.name))}
            />
          ))}
        </ul>
      </Motion.section>
    </AnimatePresence>
  )
}

function SkillsOverview() {
  return (
    <section className="skillsOverview" aria-label="Skills overview">
      <div className="skillsOverviewCopy">
        <span className="skillsEyebrow">Skills overview</span>
        <h3>Production minded across the stack.</h3>
      </div>

      <div className="skillsOverviewGrid">
        {overviewItems.map((item) => {
          const Icon = item.icon

          return (
            <article key={item.title} className="skillsOverviewCard">
              <Icon size={20} />
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Skills({ reducedMotion }) {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.12 })
  const [activeGroup, setActiveGroup] = useState(skillGroups[0].title)
  const selectedGroup = skillGroups.find((group) => group.title === activeGroup) ?? skillGroups[0]
  const selectedGroupIndex = skillGroups.findIndex((group) => group.title === selectedGroup.title)

  return (
    <section id="skills" className="skillsSection">
      <Motion.div
        ref={ref}
        className="skillsInner"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
      >
        <header className="skillsHeader">
          <h2>SKILL'S</h2>
        </header>

        <div className="skillCategoryGrid" aria-label="Skill categories">
          {skillGroups.map((group, index) => (
            <CategoryCard
              key={group.title}
              group={group}
              index={index}
              activeGroup={activeGroup}
              onSelect={setActiveGroup}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <ActiveSkillPanel group={selectedGroup} groupIndex={selectedGroupIndex} reducedMotion={reducedMotion} />
        <SkillsOverview />
      </Motion.div>
    </section>
  )
}

export default Skills
