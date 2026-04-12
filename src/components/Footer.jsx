export default function Footer({ copyText = '2026 Ki-Ra Studios' }) {
  return (
    <footer className="site-footer">
      <p className="footer-copy">
        {copyText}
      </p>
    </footer>
  )
}
