import './SiteLoader.css'

function SiteLoader({ failedCount = 0, loadedCount = 0, progress = 0, totalCount = 0 }) {
  return (
    <div className="site-loader" role="status" aria-live="polite" aria-label="Loading portfolio images">
      <div className="site-loader__panel">
        <span className="site-loader__mark" aria-hidden="true">
          PBT
        </span>
        <div className="site-loader__copy">
          <p>Loading portfolio</p>
          <strong>{progress}%</strong>
        </div>
        <div className="site-loader__track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <small>
          {loadedCount}/{totalCount} images ready
          {failedCount > 0 ? `, ${failedCount} skipped` : ''}
        </small>
      </div>
    </div>
  )
}

export default SiteLoader
