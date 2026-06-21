import { Suspense, lazy, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Bot, BrainCircuit, ChartSpline, Eye, Radio } from 'lucide-react'
import Section from '../ui/Section'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import TouchCue from '../ui/TouchCue'
import './Projects.css'

const ProjectModalContent = lazy(() => import('./ProjectModalContent'))
const projectTreeImage = new URL('../../../assets/Example_Protfolio/project_tree_image.png', import.meta.url).href

const leafPositions = [
  { top: '20%', left: '53%', card: 'left' },
  { top: '37%', left: '30%', card: 'right' },
  { top: '45%', left: '72%', card: 'left' },
  { top: '57%', left: '82%', card: 'left' },
  { top: '60%', left: '18%', card: 'right' },
  { top: '73%', left: '35%', card: 'right' },
]

const projectColors = ['#ff5a2c', '#2dd4bf', '#a855f7', '#8eea6a', '#22d3ee', '#ffb84d']

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767.98px)').matches
}

function getProjectIcon(project) {
  if (project.tags?.includes('CV')) return Eye
  if (project.tags?.includes('NLP')) return Radio
  if (project.tags?.includes('Data')) return ChartSpline
  if (project.tags?.includes('LLM')) return Bot
  return BrainCircuit
}

function Projects({ projects, reducedMotion }) {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(projects[0] ?? null)
  const [modalProject, setModalProject] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 35%'],
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0.3, 0.9, 1])
  const treeScale = useTransform(scrollYProgress, [0, 0.4, 1], reducedMotion ? [1, 1, 1] : [0.94, 1, 1.02])
  const treeY = useTransform(scrollYProgress, [0, 0.35, 1], reducedMotion ? [0, 0, 0] : [50, 0, -18])
  const haloOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.55, 0.75])

  const leaves = useMemo(
    () =>
      projects.map((project, index) => {
        const color = projectColors[index % projectColors.length]
        const Icon = getProjectIcon(project)

        return {
          project: {
            ...project,
            color,
            Icon,
            subtitle: project.tags?.join(' + ') ?? 'Project',
          },
          position: leafPositions[index] ?? {
            top: `${18 + (index % 4) * 14}%`,
            left: `${32 + (index % 3) * 18}%`,
            card: index % 2 === 0 ? 'right' : 'left',
          },
        }
      }),
    [projects],
  )

  return (
    <Section
      id="projects"
      className="projectsSection projectsSectionDark"
      contained={false}
    >
      <Motion.div ref={sectionRef} className="projectTreeScene" style={{ opacity: sectionOpacity }}>
        <Motion.div className="projectSceneHalo" style={{ opacity: haloOpacity }} />
        <header className="projectsSectionHeader">
          <h2>PROJECTS</h2>
        </header>

        <div className="projectExplorerGrid">
          <article className="projectOverviewPanel">
            <header className="projectOverviewHeader">
              <span>Project overview</span>
              <p>Click a glowing leaf on the tree to switch between selected AI, data, and product systems.</p>
            </header>

            <AnimatePresence mode="wait">
              {selectedProject && (
                <Motion.div
                  key={selectedProject.id}
                  className="projectOverviewContent"
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: reducedMotion ? 0 : 0.26, ease: 'easeOut' }}
                >
                  <div className="projectOverviewMeta">
                    {selectedProject.tags?.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h3>{selectedProject.title}</h3>
                  <p>{selectedProject.description}</p>

                  <ul className="projectOverviewImpact">
                    {selectedProject.impact?.slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="projectOverviewStack">
                    {selectedProject.stack?.slice(0, 6).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="projectOverviewActions">
                    <Button type="button" variant="primary" onClick={() => setModalProject(selectedProject)}>
                      View details
                    </Button>
                    <Button as="a" href={selectedProject.demo} target="_blank" rel="noreferrer noopener" variant="secondary">
                      Live demo
                    </Button>
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>
          </article>

          <Motion.div
            className="projectTreeWrap"
            style={{
              scale: treeScale,
              y: treeY,
            }}
          >
            <div className="projectTreeGlow projectTreeGlowOne" />
            <div className="projectTreeGlow projectTreeGlowTwo" />
            <div className="projectTreeNoise" />
            <img className="projectTreeImage" src={projectTreeImage} alt="" />
            <TouchCue label="Tap a power leaf" className="projectTreeTouchCue" />

            <div className="projectLeavesLayer">
              {leaves.map(({ project, position }, index) => {
                const isActive = selectedProject?.id === project.id
                const Icon = project.Icon

                return (
                  <Motion.button
                    key={project.id}
                    type="button"
                    className={`projectLeaf projectLeafCard-${position.card} ${isActive ? 'is-active' : ''}`}
                    style={{
                      ...position,
                      '--leaf-color': project.color,
                    }}
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
                    animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.45,
                      delay: reducedMotion ? 0 : 0.25 + index * 0.08,
                      ease: 'easeOut',
                    }}
                    onClick={() => {
                      if (isMobileViewport()) {
                        setModalProject(project)
                        return
                      }

                      setSelectedProject(project)
                    }}
                    onDoubleClick={() => setModalProject(project)}
                    aria-label={`Show ${project.title}`}
                  >
                    <span className="projectLeafOrbit" />
                    <span className="projectLeafPulse" />
                    <span className="projectLeafIcon">
                      <Icon size={18} />
                    </span>
                    <span className="projectLeafLabel">
                      <strong>{project.title}</strong>
                      <span>{project.subtitle}</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </Motion.button>
                )
              })}
            </div>

          </Motion.div>
        </div>
      </Motion.div>

      <Modal
        isOpen={Boolean(modalProject)}
        onClose={() => setModalProject(null)}
        title={modalProject?.title}
        reducedMotion={reducedMotion}
      >
        <Suspense fallback={<p className="text-sm text-muted">Loading project details...</p>}>
          <ProjectModalContent project={modalProject} />
        </Suspense>
      </Modal>
    </Section>
  )
}

export default Projects
