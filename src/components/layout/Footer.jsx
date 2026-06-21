import Container from '../ui/Container'

function Footer({ name }) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <Container className="site-container--plain site-footer__inner">
        <div>
          <p className="site-footer__copy">
            &copy; {year} <strong>{name}</strong>. Crafted with care, clarity, and
            production-minded detail.
          </p>
        </div>

        <div className="site-footer__signature" aria-label={`${name} signature`}>
          <span className="site-footer__signature-name">{name}</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
