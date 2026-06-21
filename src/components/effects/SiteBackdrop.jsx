import SafeImage from '../ui/SafeImage'

function SiteBackdrop({ imageSrc, name, fixed = false }) {
  const wrapperClassName = fixed
    ? 'pointer-events-none fixed inset-0 z-[1] overflow-hidden'
    : 'pointer-events-none absolute inset-0 z-0 overflow-hidden'

  return (
    <div className={wrapperClassName} aria-hidden="true">
      <SafeImage
        src={imageSrc}
        alt={`${name} background portrait`}
        fallbackType="profile"
        className={`${fixed ? 'h-screen w-screen' : 'h-full w-full'} rounded-none border-0 bg-black`}
        imageClassName="w-full h-full object-contain object-right opacity-[0.49] grayscale brightness-[1.8] contrast-420"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(189, 179, 179, 0.2),transparent_40%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090b]/62 via-[#0b0c0f]/72 to-[#08090b]/88" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090b]/10 via-transparent to-[#08090b]/78" />
    </div>
  )
}

export default SiteBackdrop