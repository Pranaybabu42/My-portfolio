import Badge from '../ui/Badge'
import Button from '../ui/Button'

function ProjectModalContent({ project }) {
  if (!project) return null

  return (
    <div className="projectModalContent space-y-6">
      <p>{project.details}</p>

      <div>
        <h4>Impact</h4>
        <ul>
          {project.impact.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="projectModalStack flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech} className="projectModalSkill">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="projectModalActions flex flex-wrap gap-3">
        <Button as="a" href={project.repo} target="_blank" rel="noreferrer noopener" variant="secondary" className="projectModalButton projectModalButtonSecondary">
          View Repo
        </Button>
        <Button as="a" href={project.demo} target="_blank" rel="noreferrer noopener" variant="primary" className="projectModalButton projectModalButtonPrimary">
          Live Demo
        </Button>
      </div>
    </div>
  )
}

export default ProjectModalContent
