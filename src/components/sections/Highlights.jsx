import { useState } from 'react'
import { BadgeCheck, ExternalLink, Trophy } from 'lucide-react'
import Modal from '../ui/Modal'
import './Highlights.css'

const getCredentialTitle = (item) => item.displayTitle ?? item.title

function CredentialLink({ href, label }) {
  if (!href) {
    return null
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="certAwardLink"
      aria-label={label}
    >
      <ExternalLink size={15} />
    </a>
  )
}

function CertificateCard({ item, index, onOpen }) {
  const title = getCredentialTitle(item)
  const status = item.status ?? 'Completed'
  const statusClass = status.toLowerCase().includes('progress') ? 'is-progress' : 'is-completed'

  return (
    <button
      type="button"
      className="certAwardCard certificateCard"
      style={{ '--cert-index': index }}
      onClick={() => onOpen(item)}
    >
      <span className="certAwardIcon" aria-hidden="true">
        {item.image ? <img src={item.image} alt="" /> : <BadgeCheck size={20} />}
      </span>
      <div className="certAwardContent">
        <h3>{item.issuer}</h3>
      </div>
      <span className={`certStatus ${statusClass}`} aria-label={status}>
        <span className="certStatusDot" aria-hidden="true" />
      </span>
    </button>
  )
}

function AwardCard({ item, index, onOpen }) {
  const title = getCredentialTitle(item)

  return (
    <button
      type="button"
      className="certAwardCard awardCard"
      style={{ '--cert-index': index }}
      onClick={() => onOpen(item)}
    >
      <span className="certAwardIcon" aria-hidden="true">
        <Trophy size={20} />
      </span>
      <div className="certAwardContent">
        <p>{item.issuer}</p>
        <h3>{title}</h3>
        <span>{item.year}</span>
        {item.summary ? <small>{item.summary}</small> : null}
      </div>
      <span className="certAwardLink" aria-hidden="true">
        <ExternalLink size={15} />
      </span>
    </button>
  )
}

function UpcomingCertification({ item }) {
  return (
    <div className="upcomingCertification">
      <span className="upcomingCertificationStatus" aria-hidden="true" />
      <div>
        <strong>{item.title}</strong>
        <span>{item.issuer}</span>
      </div>
      <small>In Progress</small>
    </div>
  )
}

function Highlights({ certifications = [], awards = [] }) {
  const [selectedCredential, setSelectedCredential] = useState(null)
  const selectedTitle = selectedCredential ? getCredentialTitle(selectedCredential) : undefined
  const completedCertifications = certifications.filter((item) => !item.status?.toLowerCase().includes('progress'))
  const upcomingCertifications = certifications.filter((item) => item.status?.toLowerCase().includes('progress'))

  return (
    <section id="certificates-awards" className="certAwardsSection">
      <div className="certAwardsInner">
        <header className="certAwardsHeader">
          <h2>Certificates &amp; Awards</h2>
        </header>

        <div className="certAwardsLayout">
          <div className="certAwardsColumns">
            <section className="certAwardsGroup" aria-label="Certifications">
              <div className="certAwardsGroupHeader">
                <BadgeCheck size={16} />
                <h3>Certifications</h3>
              </div>
              <div className="certAwardList certificationBadgeList">
                {completedCertifications.map((item, index) => (
                  <CertificateCard key={getCredentialTitle(item)} item={item} index={index} onOpen={setSelectedCredential} />
                ))}
              </div>
              {upcomingCertifications.length > 0 ? (
                <div className="upcomingCertifications" aria-label="Certifications in progress">
                  <h4>In Progress</h4>
                  {upcomingCertifications.map((item) => <UpcomingCertification key={getCredentialTitle(item)} item={item} />)}
                </div>
              ) : null}
            </section>

            <section className="certAwardsGroup" aria-label="Awards">
              <div className="certAwardsGroupHeader">
                <Trophy size={16} />
                <h3>Awards</h3>
              </div>
              <div className="certAwardList">
                {awards.map((item, index) => (
                  <AwardCard key={getCredentialTitle(item)} item={item} index={index} onOpen={setSelectedCredential} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal
        isOpen={Boolean(selectedCredential)}
        onClose={() => setSelectedCredential(null)}
        title={selectedTitle}
      >
        {selectedCredential ? (
          <div className="credentialModalContent">
            <div className="credentialModalPreview">
              {selectedCredential.image ? (
                <img src={selectedCredential.image} alt={`${selectedTitle} certificate`} />
              ) : (
                <>
                  <BadgeCheck size={42} />
                  <span>{selectedCredential.issuer}</span>
                  <strong>{selectedTitle}</strong>
                  <small>{selectedCredential.year}</small>
                </>
              )}
            </div>
            {selectedCredential.summary ? <p>{selectedCredential.summary}</p> : null}
            <CredentialLink href={selectedCredential.link} label={`Open ${selectedTitle}`} />
          </div>
        ) : null}
      </Modal>
    </section>
  )
}

export default Highlights
