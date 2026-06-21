import { useState } from 'react'
import { Award, BadgeCheck, ExternalLink, Trophy } from 'lucide-react'
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
        <p>{item.issuer}</p>
        <h3>{title}</h3>
        <span>{item.year}</span>
      </div>
      <span className="certAwardLink" aria-hidden="true">
        <ExternalLink size={15} />
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

function Highlights({ certifications = [], awards = [] }) {
  const featuredAward = awards[0]
  const [selectedCredential, setSelectedCredential] = useState(null)
  const selectedTitle = selectedCredential ? getCredentialTitle(selectedCredential) : undefined

  return (
    <section id="certificates-awards" className="certAwardsSection">
      <div className="certAwardsInner">
        <header className="certAwardsHeader">
          <span>Certificates & Awards</span>
          <h2>Proof of practice, progress, and recognized impact.</h2>
        </header>

        <div className="certAwardsLayout">
          <aside className="certAwardsFeature">
            <span className="certAwardsFeatureIcon" aria-hidden="true">
              <Award size={28} />
            </span>
            <p>Recognition</p>
            <h3>{featuredAward?.title ?? 'Award-winning AI delivery'}</h3>
            <span className="certAwardsFeatureHighlight">By Endava the organizer in the company</span>
          </aside>

          <div className="certAwardsColumns">
            <section className="certAwardsGroup" aria-label="Certifications">
              <div className="certAwardsGroupHeader">
                <BadgeCheck size={16} />
                <h3>Certificates</h3>
              </div>
              <div className="certAwardList">
                {certifications.map((item, index) => (
                  <CertificateCard key={getCredentialTitle(item)} item={item} index={index} onOpen={setSelectedCredential} />
                ))}
              </div>
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
