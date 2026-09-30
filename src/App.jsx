import React, { useEffect, useRef, useState } from 'react'
/* ---------- Editable business details & products ---------- */
const CONFIG = {
  email: '[Support email]',
  // Add your own POST endpoints; a successful HTTP response confirms delivery.
  newsletterEndpoint: '',
  contactEndpoint: '',
  phone: '[Business number]',
  hours: '[Days, times and timezone]',
  address: '[Actual business address]',
  instagram: '#',
  facebook: '#',
  serviceAreas: '[confirmed service areas]',
  deliveryCheck: '[confirmed delivery-check method]',
  timeframe: '[confirmed timeframe]',
  shippingNote: '[confirmed location]',
  cod: '[Insert the confirmed COD policy, including eligible locations or order limits.]',
}
const PRODUCTS = [
  { id: 'jeans', cat: 'Jeans', name: 'Everyday Denim Jeans', img: '1542272604-787c3835535d', desc: 'Make denim the starting point of your look. Pair these jeans with a tee for casual plans or a shirt when you want a more polished combination.', colours: ['#1e3a8a', '#0a0a0a', '#93c5fd'], sizes: ['28', '30', '32', '34', '36'], price: 1999 },
  { id: 'tee', cat: 'T-Shirts', name: 'Classic Crew-Neck T-Shirt', img: '1521572163474-6864f9cf17ab', desc: 'Keep the outfit simple or make room for layers. This crew-neck tee pairs with denim, trousers and an open shirt.', colours: ['#ffffff', '#93c5fd', '#2563eb'], sizes: ['S', 'M', 'L', 'XL'], price: 799 },
  { id: 'shirt', cat: 'Shirts', name: 'Casual Button-Down Shirt', img: '1596755094514-f87e34085b2c', desc: 'Wear it buttoned for a neat finish or open over a tee for a relaxed combination. Add your favourite jeans or trousers to complete the look.', colours: ['#bfdbfe', '#ffffff', '#cbd5e1'], sizes: ['S', 'M', 'L', 'XL'], price: 1499 },
  { id: 'pants', cat: 'Pants', name: 'Everyday Trousers', img: '1624378439575-d8705ad7ae80', desc: 'Build an outfit around a pair of trousers. Keep it casual with a tee or pair them with a shirt for a smarter look.', colours: ['#94a3b8', '#0a0a0a', '#1e40af'], sizes: ['28', '30', '32', '34', '36'], price: 1799 },
]
const CATS = [
  { id: 'jeans', k: 'Jeans', title: 'Your Day Starts With Denim.', text: 'A favourite pair of jeans can be the beginning of countless outfits. Pair denim with a simple tee for an easy daytime look, add a shirt for an evening out, or experiment with layers to change the mood.', extra: 'Explore the available washes and fits, then choose the pair that works for your wardrobe.', btn: 'Explore Jeans', line: 'Your next go-to pair starts here.', img: '1542272604-787c3835535d' },
  { id: 'tee', k: 'T-Shirts', title: 'Simple Pieces. Personal Style.', text: 'A T-shirt can set the tone for your whole outfit. Wear it with jeans, pair it with trousers or layer it beneath an open shirt.', extra: 'Explore the available colours and designs to find a tee you can style around your own routine.', btn: 'Explore T-Shirts', line: 'A fresh starting point for everyday outfits.', img: '1521572163474-6864f9cf17ab' },
  { id: 'shirt', k: 'Shirts', title: 'Set the Tone for Your Day.', text: 'Buttoned up, worn open or paired with your favourite denim—a shirt gives you room to change your look without rebuilding your wardrobe.', extra: 'Discover shirts for relaxed plans and smarter combinations, and find a style you can wear in more than one way.', btn: 'Explore Shirts', line: 'From casual plans to a sharper finish.', img: '1596755094514-f87e34085b2c' },
  { id: 'pants', k: 'Pants & Trousers', title: 'Complete the Look.', text: 'The right pair of pants brings an outfit together. Keep things relaxed with a T-shirt, add a button-down for a polished combination, or use a different colour to give familiar pieces a fresh direction.', extra: 'Browse the available styles and check the measurements to find your fit.', btn: 'Explore Pants', line: 'The foundation for your next outfit.', img: '1624378439575-d8705ad7ae80' },
]
const WHY = [
  ['Style Around Your Life', 'Find inspiration for everyday errands, coffee plans, weekends away and occasions that call for a little extra attention.'],
  ['Put Familiar Pieces Together Differently', 'A shirt over a tee. Denim with a tucked-in top. Trousers with a casual layer. Small changes can give your wardrobe a fresh perspective.'],
  ['Choose Your Own Direction', 'Keep your look understated, try a different colour or change the silhouette. Personal style leaves room for all of it.'],
  ['Start With One Piece', 'You do not have to replace your wardrobe to refresh it. Find a piece that works with what you already own and build from there.'],
]
const LOOKS = [
  ['The Everyday Favourite', 'A T-shirt, your favourite denim and sneakers. Keep the colours simple and let the fit shape the outfit.', 'Explore Everyday Looks', '1503342217505-b0a15ec3261c'],
  ['The Smart-Casual Edit', 'A button-down shirt with trousers creates a considered combination for a catch-up, dinner or a day that calls for a sharper finish.', 'Discover Shirts & Trousers', '1489987707025-afc232f7ea0f'],
  ['The Weekend Layer', 'Wear a shirt open over a tee and add jeans. Choose similar tones for a quiet look or bring in contrast with a different colour.', 'Explore Layering Pieces', '1523381210434-271e8be1f52b'],
  ['The Evening Refresh', 'Start with denim or trousers, add a shirt and finish with footwear you already love. A simple change can take a familiar outfit in a new direction.', 'Find Your Evening Look', '1515886657613-9f3515b0c78f'],
]
const NOTES = [
  ['Begin With Fit', 'Use the measurements and fit description to choose a shape you enjoy wearing. Compare them with a similar garment you own.'],
  ['Let Colour Connect the Look', 'Build around one main colour, use neutral tones as a base or add contrast with a shirt or tee.'],
  ['Try a Different Layer', 'An open shirt can change the feel of a simple T-shirt-and-jeans combination. Experiment with proportions and colours.'],
  ['Make the Finish Yours', 'A tuck, a sleeve roll or your choice of footwear can change an outfit. Keep the details that feel natural to you.'],
]
const FAQS = [
  ['What clothing can I shop at Nickse?', 'Explore jeans, T-shirts, shirts, pants and trousers. Available sizes, colours and styles are listed on individual product pages.'],
  ['How do I find the right size?', 'Check the size guide for your chosen product and compare its measurements with a similar garment you own. Review the fit description before ordering.'],
  ['Are the products suitable for casual and smart-casual outfits?', 'Explore styling ideas using tees and denim for casual looks, or shirts and trousers for smarter combinations. Choose according to the occasion and the actual product style.'],
  ['How can I check the fabric?', 'Each product page should list its verified fabric composition and relevant garment details. Contact us if you need further information.'],
  ['How should I wash my clothing?', 'Follow the garment care label and any product-specific care instructions. Washing and drying requirements depend on the fabric and construction.'],
  ['Where do you deliver?', `We deliver to ${CONFIG.serviceAreas}. Check availability through ${CONFIG.deliveryCheck}.`],
  ['How long does shipping take?', `Estimated delivery takes ${CONFIG.timeframe}. Shipping charges and any relevant conditions are shown ${CONFIG.shippingNote}.`],
  ['Can I return or exchange my order?', 'Refer to our Returns & Exchanges policy for eligible items, the request window, item condition requirements and the steps to follow.'],
  ['Is cash on delivery available?', CONFIG.cod],
  ['How can I get help with an order?', `Contact ${CONFIG.email} or ${CONFIG.phone}, quoting your order number where available.`],
]
const INFO = {
  'Shipping Information': `We deliver to ${CONFIG.serviceAreas}. Estimated delivery takes ${CONFIG.timeframe}. Shipping charges and any relevant conditions are shown ${CONFIG.shippingNote}.`,
  'Returns & Exchanges': 'Refer to our Returns & Exchanges policy for eligible items, the request window, item condition requirements and the steps to follow.',
  'Privacy Policy': 'We use your email only to send Nickse collection updates, outfit ideas and brand news when you have agreed to receive them. You can unsubscribe at any time.',
  'Terms & Conditions': 'By using this site you agree to Nickse’s terms of sale and use. Product details, sizes and availability are shown on each product page.',
}
const NAV = [['Home', '#home'], ['Shop All', '#featured'], ['Jeans', '#jeans'], ['T-Shirts', '#tee'], ['Shirts', '#shirt'], ['Pants', '#pants'], ['Our Story', '#story'], ['Contact', '#contact']]
/* ---------- Helpers ---------- */
const src = (id, w = 2400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`
const inr = (n) => '₹' + n.toLocaleString('en-IN')
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
const P = {
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  heart: 'M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z',
  bag: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0',
  x: 'M18 6 6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M20 6 9 17l-5-5',
  spark: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z',
  layers: 'm12 3 10 6-10 6L2 9Zm-10 12 10 6 10-6M2 15l10 6 10-6',
  compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm4-16-3 7-7 3 3-7Z',
  shirt: 'm8 3-6 4 3 5 3-2v11h8V10l3 2 3-5-6-4c0 4-8 4-8 0Z',
  up: 'm6 14 6-6 6 6',
  eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
}
const Icon = ({ n, className = 'h-5 w-5', fill }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[n]} /></svg>
)
// Responsive photography with a graceful fallback and a soft loading reveal.
function Img({ id, alt, className = '', w = 1800, pos = 'center', eager, sizes = '(max-width: 639px) 95vw, (max-width: 1023px) 48vw, 640px' }) {
  const [bad, setBad] = useState(false)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setBad(false); setLoaded(false) }, [id])
  if (bad) return <div role="img" aria-label={alt} className={`${className} image-fallback`}><Icon n="shirt" className="h-12 w-12" /><span>{alt}</span></div>
  return <img src={src(id, w)} srcSet={[480, 768, 1200, 1800, 2400].filter(n => n <= w).map(n => `${src(id, n)} ${n}w`).join(', ')} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onLoad={() => setLoaded(true)} onError={() => setBad(true)} className={`photo ${loaded ? 'photo-loaded' : ''} ${className}`} style={{ objectPosition: pos }} />
}
// Focus containment works for both the product dialogs and the shopping drawer.
function useFocusScope(ref, onClose, enabled = true) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    if (!enabled) return
    const previous = document.activeElement
    const root = ref.current
    if (!root) return
    const controls = () => [...root.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex="0"]')].filter(el => el.getClientRects().length)
    const initial = root.querySelector('[autofocus]') || (root.contains(previous) ? previous : controls()[0]) || root
    initial.focus()
    const key = e => {
      if (e.key === 'Escape') { e.preventDefault(); closeRef.current() }
      if (e.key !== 'Tab') return
      const list = controls(); const first = list[0]; const last = list[list.length - 1]
      if (!first) { e.preventDefault(); root.focus(); return }
      if (e.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && (document.activeElement === last || !root.contains(document.activeElement))) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('keydown', key); if (previous?.isConnected) previous.focus() }
  }, [ref, enabled])
}
function BagPanel({ onClose, children }) {
  const ref = useRef(null)
  useFocusScope(ref, onClose)
  return <aside ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Shopping bag" className="glass-strong absolute inset-y-0 right-0 flex w-full max-w-md animate-slide flex-col rounded-l-[2rem] p-5 sm:p-6">{children}</aside>
}
function readSaved(key, validate) {
  try { const data = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(data) ? data.filter(validate) : [] } catch { return [] }
}
function Eyebrow({ children }) { return <p className="eyebrow"><span />{children}</p> }
function CollectionTabs({ selected, onChange }) {
  return <div className="collection-tabs" role="group" aria-label="Filter collection">{['All', ...PRODUCTS.map(p => p.cat)].map(label => <button type="button" key={label} aria-pressed={selected === label} onClick={() => onChange(label)} className={selected === label ? 'is-selected' : ''}>{label}{label === 'All' && <span>04</span>}</button>)}</div>
}
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}
function Modal({ title, onClose, children, wide }) {
  const ref = useRef(null)
  useFocusScope(ref, onClose)
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-blue-950/20 backdrop-blur-sm" />
      <div ref={ref} tabIndex={-1} className={`glass-strong relative max-h-[88vh] w-full ${wide ? 'max-w-2xl' : 'max-w-md'} animate-pop overflow-y-auto rounded-[2rem] p-6 sm:p-8`}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-extrabold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="btn-glass !p-2"><Icon n="x" /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* Mobile arrangement lives here so only App.jsx needs replacing. */
const MOBILE_LAYOUT = `
.nickse, .nickse *, .nickse *::before, .nickse *::after { box-sizing: border-box; }
.nickse svg { flex-shrink: 0; }
.nickse .field { min-width: 0; max-width: 100%; }
.nickse .menu-backdrop { position: fixed; inset: 0; z-index: 40; border: 0; background: rgb(15 23 42 / .2); backdrop-filter: blur(8px); }
@media (max-width: 1279px) {
  .nickse .site-header { isolation: isolate; }
  .nickse .site-header.menu-is-open .nav-shell { border-radius: 24px 24px 0 0 !important; }
  .nickse #mobile-navigation { position: absolute; top: 100%; left: 12px; right: 12px; z-index: 1; }
  .nickse .mobile-menu-panel { margin-top: 0 !important; max-height: calc(100dvh - 110px) !important; border-radius: 0 0 24px 24px !important; overscroll-behavior: contain; padding: 16px !important; }
  .nickse .mobile-menu-links { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; list-style: none; padding: 0; margin: 0; }
  .nickse .mobile-menu-links a { height: 100%; min-height: 52px; justify-content: center !important; text-align: center; gap: 8px; padding: 12px 8px !important; font-size: 15px !important; background: rgb(255 255 255 / .65); border: 1px solid rgb(255 255 255 / .9); }
  .nickse .mobile-menu-links a[aria-current="location"] { background: linear-gradient(110deg, #1d4ed8, #60a5fa); color: #fff; }
  .nickse .mobile-menu-links a svg { display: none; }
  .nickse .mobile-menu-tools { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0 !important; margin-bottom: 12px; padding-top: 0 !important; border-top: 0 !important; }
  .nickse .mobile-menu-tools button { width: 100%; min-width: 0; min-height: 48px; padding: 12px 8px !important; justify-content: center; font-size: 14px; }
}
@media (max-width: 1023px) {
  .nickse .hero-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 36px !important; padding-top: 42px !important; padding-bottom: 44px !important; }
  .nickse .hero-copy { width: 100%; min-width: 0; max-width: 700px; margin-inline: auto; text-align: center !important; }
  .nickse .hero-pill { max-width: 100%; justify-content: center; letter-spacing: .02em; }
  .nickse .hero-title { max-width: 680px; margin-inline: auto !important; font-size: clamp(34px, 5.6vw, 58px) !important; line-height: 1.12 !important; letter-spacing: -.045em !important; overflow-wrap: normal; word-break: normal; text-wrap: balance; }
  .nickse .hero-title-start, .nickse .hero-title-middle { display: inline !important; }
  .nickse .hero-title-accent { display: block !important; margin-top: 6px; }
  .nickse .hero-copy .lead { width: 100%; max-width: 620px; margin-inline: auto !important; font-size: clamp(15px, 2.1vw, 18px) !important; line-height: 1.75 !important; }
  .nickse .hero-actions { width: 100%; max-width: 580px; margin-inline: auto; justify-content: center; }
  .nickse .hero-actions button { min-width: 0; justify-content: center; white-space: normal !important; }
  .nickse .hero-caption { max-width: 560px; margin-inline: auto; line-height: 1.6; }
  .nickse .hero-shortcuts { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; width: 100%; max-width: 580px; margin: 22px auto 0 !important; }
  .nickse .hero-shortcuts button { display: flex; align-items: center; justify-content: center; gap: 8px; min-width: 0; padding: 12px 8px; }
  .nickse .hero-visual { max-width: 580px !important; padding: 0 0 26px !important; }
  .nickse .hero-photo { aspect-ratio: 5 / 4 !important; border-radius: 26px !important; }
  .nickse .hero-denim { left: 12px !important; bottom: 8px !important; max-width: calc(100% - 24px); animation: none !important; }
  .nickse .hero-category-label { right: 12px !important; top: 16px !important; }
}
@media (max-width: 639px) {
  .nickse .site-header { padding: 10px 10px 0 !important; }
  .nickse .nav-shell { padding: 10px 12px !important; gap: 8px; }
  .nickse .brand { flex-shrink: 0; gap: 4px !important; font-size: 17px !important; letter-spacing: .07em !important; }
  .nickse .brand-mark { width: 32px !important; height: 32px !important; flex-shrink: 0; display: inline-grid; place-items: center; }
  .nickse .menu-toggle { flex-shrink: 0; margin-left: 0 !important; }
  .nickse .section { width: 100%; min-width: 0; padding-left: 18px !important; padding-right: 18px !important; }
  .nickse .section > *, .nickse .rv, .nickse article { min-width: 0; max-width: 100%; }
  .nickse .hero-grid { padding-top: 38px !important; gap: 28px !important; }
  .nickse .hero-pill { font-size: 11px !important; padding: 8px 12px !important; }
  .nickse .hero-title { margin-top: 20px !important; font-size: clamp(32px, 8.8vw, 48px) !important; }
  .nickse .hero-copy .lead { margin-top: 18px !important; }
  .nickse .hero-copy .lead + .lead { margin-top: 12px !important; }
  .nickse .hero-actions { flex-direction: column !important; gap: 12px !important; margin-top: 24px !important; }
  .nickse .hero-actions button { width: 100% !important; min-height: 52px; padding: 14px 16px !important; font-size: 14px; }
  .nickse .hero-caption { font-size: 12px !important; margin-top: 20px !important; }
  .nickse .hero-shortcuts button { font-size: 12px; }
  .nickse .hero-shortcuts button span { font-size: 10px; }
  .nickse .hero-photo { aspect-ratio: 4 / 5 !important; }
  .nickse .h2 { font-size: clamp(26px, 7.2vw, 34px) !important; line-height: 1.2 !important; letter-spacing: -.03em; text-wrap: balance; }
  .nickse .lead { font-size: 15px !important; line-height: 1.7 !important; }
  .nickse .category-grid, .nickse .product-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 20px !important; }
  .nickse .category-card h3 { font-size: 22px; line-height: 1.3; }
  .nickse .category-card .absolute { max-width: calc(100% - 32px); white-space: normal; }
  .nickse .collection-toolbar { display: flex; flex-direction: column; align-items: stretch; gap: 16px; }
  .nickse .collection-tabs { display: flex; flex-wrap: wrap; gap: 8px; max-width: 100%; }
  .nickse .collection-tabs button { min-height: 42px; padding: 10px 13px; font-size: 12px; }
  .nickse .sort-control { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
  .nickse .sort-control select { min-width: 0; max-width: 100%; flex: 1; }
  .nickse .look-caption { position: relative !important; inset: auto !important; width: calc(100% - 20px); margin: -24px 10px 10px; padding: 18px !important; }
  .nickse .look-caption button { width: 100%; justify-content: center; white-space: normal; }
  .nickse .quick-product { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .nickse .quick-product > div:first-child { max-height: 200px; }
  .nickse .wish-row { gap: 10px; }
  .nickse .wish-row > p { white-space: normal; overflow: visible; }
  .nickse .wish-row > .btn-primary { width: 100%; order: 4; }
  .nickse .field { font-size: 16px !important; width: 100%; }
  .nickse .back-top { right: 14px; bottom: max(18px, env(safe-area-inset-bottom)); }
}
@media (prefers-reduced-motion: reduce) {
  .nickse #mobile-navigation, .nickse .mobile-menu-links li, .nickse .menu-toggle span { transition: none !important; }
}
`

/* ---------- App ---------- */
export default function App() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [modal, setModal] = useState(null)
  const [bagOpen, setBagOpen] = useState(false)
  const [bag, setBag] = useState(() => readSaved('nickse-bag', i => PRODUCTS.some(p => p.id === i?.p?.id) && PRODUCTS.find(p => p.id === i.p.id).sizes.includes(i.size) && Number.isInteger(i.q) && i.q > 0).map(i => ({ ...i, p: PRODUCTS.find(p => p.id === i.p.id) })))
  const [wish, setWish] = useState(() => readSaved('nickse-wishlist', id => PRODUCTS.some(p => p.id === id)))
  const [filter, setFilter] = useState('All')
  const [activeSection, setActiveSection] = useState('home')
  const [sort, setSort] = useState('featured')
  const [toast, setToast] = useState('')
  const [hl, setHl] = useState('')
  const [faq, setFaq] = useState(0)
  const [size, setSize] = useState('')
  const [query, setQuery] = useState('')
  const [news, setNews] = useState({ v: '', s: '' })
  const [contact, setContact] = useState({ name: '', email: '', order: '', msg: '', s: '' })
  const navScope = useRef(null)
  useFocusScope(navScope, () => setMenu(false), menu)
  const tRef = useRef()
  const say = (m) => { setToast(m); clearTimeout(tRef.current); tRef.current = setTimeout(() => setToast(''), 2600) }
  const go = (id) => { setMenu(false); setBagOpen(false); setModal(null); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }), 60) }
  const focusProduct = (id) => { setFilter('All'); go('featured'); setHl(id); setTimeout(() => setHl(''), 2200) }
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = menu || bagOpen || modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menu, bagOpen, modal])
  useEffect(() => {
    const h = () => window.innerWidth >= 1280 && setMenu(false)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  useEffect(() => {
    try { localStorage.setItem('nickse-bag', JSON.stringify(bag)); localStorage.setItem('nickse-wishlist', JSON.stringify(wish)) } catch { /* Private browsers may disable storage. */ }
  }, [bag, wish])
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id) }) }, { rootMargin: '-15% 0px -65% 0px' })
    NAV.forEach(([, href]) => { const el = document.querySelector(href); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  useEffect(() => () => clearTimeout(tRef.current), [])
  useEffect(() => {
    const close = e => { if (e.key === 'Escape') setMenu(false) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  const visibleProducts = PRODUCTS.filter(p => filter === 'All' || p.cat === filter).sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0)
  const chat = () => {
    const number = CONFIG.phone.replace(/[^0-9]/g, '')
    if (number.length < 10) return say('WhatsApp chat will open once a business number is added.')
    window.open(`https://wa.me/${number}`, '_blank', 'noopener,noreferrer')
  }
  const openSize = (p) => { setSize(''); setModal({ t: 'size', p }) }
  const addToBag = () => {
    if (!size) return say('Please choose a size first.')
    const p = modal.p
    setBag((b) => { const k = `${p.id}-${size}`; const f = b.find((i) => i.k === k); return f ? b.map((i) => (i.k === k ? { ...i, q: i.q + 1 } : i)) : [...b, { k, p, size, q: 1 }] })
    setModal(null); setBagOpen(true); say(`${p.name} added to your bag.`)
  }
  const bagCount = bag.reduce((a, i) => a + i.q, 0)
  const total = bag.reduce((a, i) => a + i.q * i.p.price, 0)
  const toggleWish = (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))
  const sendRequest = async (endpoint, data) => {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: AbortSignal.timeout(15000) })
    if (!response.ok) throw new Error('Request failed')
  }
  const submitNews = async (e) => {
    e.preventDefault()
    if (!emailOk(news.v)) return setNews(n => ({ ...n, s: 'error' }))
    if (!CONFIG.newsletterEndpoint) return setNews(n => ({ ...n, s: 'unconnected' }))
    setNews(n => ({ ...n, s: 'sending' }))
    try { await sendRequest(CONFIG.newsletterEndpoint, { email: news.v, consent: true }); setNews({ v: '', s: 'ok' }) }
    catch { setNews(n => ({ ...n, s: 'failed' })) }
  }
  const submitContact = async (e) => {
    e.preventDefault()
    if (!contact.name.trim() || !emailOk(contact.email) || !contact.msg.trim()) return setContact(c => ({ ...c, s: 'error' }))
    if (!CONFIG.contactEndpoint) return setContact(c => ({ ...c, s: 'unconnected' }))
    setContact(c => ({ ...c, s: 'sending' }))
    try { await sendRequest(CONFIG.contactEndpoint, { name: contact.name, email: contact.email, order: contact.order, message: contact.msg }); setContact({ name: '', email: '', order: '', msg: '', s: 'ok' }) }
    catch { setContact(c => ({ ...c, s: 'failed' })) }
  }
  const results = PRODUCTS.filter((p) => `${p.name} ${p.cat}`.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="nickse relative overflow-x-clip bg-gradient-to-b from-white via-blue-50/60 to-white">
      <style>{MOBILE_LAYOUT}</style>
      {menu && <button type="button" tabIndex={-1} aria-label="Close navigation" className="menu-backdrop xl:hidden" onClick={() => setMenu(false)} />}
      <a className="skip-link" href="#main-content">Skip to content</a>
      {/* Header */}
      <header ref={navScope} className={`site-header sticky top-0 z-50 px-3 pt-3 sm:px-6 ${menu ? "menu-is-open" : ""}`}>
        <nav className={`nav-shell glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${scrolled ? 'bg-white/75 shadow-xl' : ''}`} aria-label="Main">
          <a href="#home" onClick={(e) => { e.preventDefault(); go('home') }} className="brand flex items-center gap-1.5 font-display text-xl font-extrabold tracking-[0.12em] sm:text-2xl">
            <span className="brand-mark" aria-hidden="true">N</span>NICKSE<span className="text-blue-600">.</span>
          </a>
          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV.map(([l, h]) => (
              <li key={l}><a href={h} onClick={(e) => { e.preventDefault(); go(h.slice(1)) }} aria-current={activeSection === h.slice(1) ? "location" : undefined} className={`nav-link rounded-full px-2.5 py-2 text-[13px] font-bold transition ${activeSection === h.slice(1) ? "is-active" : "text-black/65"}`}>{l}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-1 sm:gap-2">
            <button aria-label="Search" onClick={() => { setMenu(false); setQuery(''); setModal({ t: 'search' }) }} className="rounded-full p-2 transition hover:bg-white/80"><Icon n="search" /></button>
            <button aria-label="Account" onClick={() => { setMenu(false); setModal({ t: 'account' }) }} className="hidden rounded-full p-2 transition hover:bg-white/80 sm:block"><Icon n="user" /></button>
            <button aria-label={`Wishlist, ${wish.length} items`} onClick={() => { setMenu(false); setModal({ t: 'wish' }) }} className="relative hidden rounded-full p-2 transition hover:bg-white/80 sm:block">
              <Icon n="heart" fill={wish.length > 0} className={`h-5 w-5 ${wish.length ? 'text-blue-700' : ''}`} />
              {wish.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-blue-300 text-[10px] font-bold">{wish.length}</span>}
            </button>
            <button aria-label={`Shopping bag, ${bagCount} items`} onClick={() => { setMenu(false); setBagOpen(true) }} className="relative rounded-full p-2 transition hover:bg-white/80">
              <Icon n="bag" />
              {bagCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-blue-700 text-[10px] font-bold text-white">{bagCount}</span>}
            </button>
            <button aria-label={menu ? "Close navigation menu" : "Open navigation menu"} aria-controls="mobile-navigation" aria-expanded={menu} onClick={() => setMenu(!menu)} className="menu-toggle relative ml-1 h-10 w-10 rounded-full xl:hidden">
              <span className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded bg-black transition duration-300 ${menu ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded bg-black transition duration-300 ${menu ? 'opacity-0' : ''}`} />
              <span className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded bg-black transition duration-300 ${menu ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </nav>
        {/* Mobile menu */}
        <div id="mobile-navigation" inert={menu ? undefined : ""} className={`mx-auto grid max-w-7xl transition-all duration-500 xl:hidden ${menu ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="mobile-menu-panel glass-strong mt-2 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-[2rem] p-4">
              <div className="mobile-menu-tools mt-2 flex gap-2 border-t border-black/5 pt-3">
                <button onClick={() => { setMenu(false); setModal({ t: 'account' }) }} className="btn-glass flex-1">Account</button>
                <button onClick={() => { setMenu(false); setModal({ t: 'wish' }) }} className="btn-glass flex-1">Wishlist ({wish.length})</button>
              </div>
              <ul className="mobile-menu-links">
                {NAV.map(([l, h], i) => (
                  <li key={l} className={`transition-all duration-500 ${menu ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`} style={{ transitionDelay: menu ? `${80 + i * 45}ms` : '0ms' }}>
                    <a href={h} onClick={(e) => { e.preventDefault(); go(h.slice(1)) }} aria-current={activeSection === h.slice(1) ? "location" : undefined} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-bold transition hover:bg-blue-50">{l}<Icon n="arrow" className="h-4 w-4 text-blue-700" /></a>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </header>
      <main id="main-content">
        {/* Hero */}
        <section id="home" className="hero-section relative">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-drift rounded-full bg-blue-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 animate-drift rounded-full bg-blue-300/40 blur-3xl [animation-delay:-6s]" />
          <div className="section hero-grid grid items-center gap-12 !pt-10 lg:grid-cols-2 lg:!pt-16">
            <div className="hero-copy relative z-10">
              <span className="hero-pill glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide text-blue-700"><span className="status-dot" />The Everyday Style Edit<Icon n="spark" className="h-3.5 w-3.5" /></span>
              <h1 className="mt-5 hero-title text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="hero-title-start">Good Style</span>{' '}<span className="hero-title-middle">Starts With</span>{' '}<span className="hero-title-accent bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">What Feels Like You.</span>
              </h1>
              <p className="lead mt-6">Discover jeans, T-shirts, shirts and pants that open up new possibilities for your wardrobe. Keep it simple, dress it up or try a fresh combination—Nickse is your starting point for a look you can call your own.</p>
              <p className="lead mt-3">From morning plans to evenings out, find pieces to wear your way and return to with fresh ideas.</p>
              <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => go('featured')} className="btn-primary">Explore the Collection<Icon n="arrow" className="h-4 w-4" /></button>
                <button onClick={() => go('looks')} className="btn-glass">Find Your Next Look</button>
              </div>
              <p className="hero-caption mt-6 text-sm font-bold text-black/60">Jeans. Tees. Shirts. Pants. Your style, brought together.</p>
              <div className="hero-shortcuts">{CATS.map((c, i) => <button key={c.id} onClick={() => go(c.id)}><span>{String(i + 1).padStart(2, '0')}</span>{c.k}<Icon n="arrow" className="h-3 w-3" /></button>)}</div>
            </div>
            <div className="hero-visual relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="hero-photo relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl shadow-blue-300/50 sm:aspect-[5/6]">
                <Img id="1516257984-b1b4d707412e" alt="Casual fashion styled with a denim jacket" pos="center 30%" className="h-full w-full object-cover" eager />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/25 via-transparent to-transparent" />
              </div>
              <div className="hero-denim glass absolute -bottom-5 left-3 flex animate-float items-center gap-3 rounded-3xl p-3 pr-5 sm:-left-6">
                <div className="h-14 w-14 overflow-hidden rounded-2xl"><Img id="1542272604-787c3835535d" w={400} alt="Folded denim jeans" className="h-full w-full object-cover" eager /></div>
                <div><p className="text-sm font-extrabold">Everyday Denim</p><p className="text-xs text-black/60">Your next go-to pair</p></div>
              </div>
              <div className="hero-category-label glass absolute -right-1 top-6 hidden animate-float rounded-3xl px-4 py-3 [animation-delay:-3s] sm:block sm:-right-5">
                <p className="text-sm font-extrabold">Jeans · Tees</p><p className="text-xs text-black/60">Shirts · Pants</p>
              </div>
            </div>
          </div>
        </section>
        {/* Brand intro */}
        <section className="section !py-10 md:!py-16">
          <Reveal>
            <div className="glass-strong grid items-center gap-8 rounded-[2.5rem] p-6 sm:p-10 md:grid-cols-[1.1fr_1fr] md:p-14">
              <div>
                <h2 className="h2">A Wardrobe With Your Name on It.</h2>
                <p className="lead mt-5">The best outfits feel personal. They reflect your mood, suit your plans and make getting dressed feel natural.</p>
                <p className="lead mt-3">At Nickse, we bring everyday clothing together so you can spend less time wondering what to wear and more time making the day your own. Start with a piece you love. Build a combination around it. Add your own finishing touch.</p>
                <button onClick={() => go('story')} className="btn-soft mt-7">Discover Nickse</button>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"><Img id="1490481651871-ab68de25d43d" alt="Clothes on a rack" className="h-full w-full object-cover" /></div>
            </div>
          </Reveal>
        </section>
        {/* Categories */}
        <section id="categories" className="section">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="h2">Four Essentials. Endless Ways to Wear Them.</h2>
            <p className="lead mx-auto mt-4">Explore the foundations of your wardrobe, from denim days to occasions that call for a sharper look.</p>
          </Reveal>
          <div className="category-grid mt-12 grid gap-6 md:grid-cols-2">
            {CATS.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 120}>
                <article id={c.id} className="category-card glass group flex h-full flex-col overflow-hidden rounded-[2rem]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Img id={c.img} alt={c.k} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold">{c.k}</span>
                    <span className="glass absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-bold text-blue-700">{c.line}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold">{c.k} — {c.title}</h3>
                    <p className="mt-3 text-black/70">{c.text}</p>
                    <p className="mt-3 text-black/70">{c.extra}</p>
                    <button onClick={() => focusProduct(c.id)} className="btn-primary mt-6 self-start">{c.btn}</button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        {/* Featured */}
        <section id="featured" className="section featured-section">
          <Reveal className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Eyebrow>The collection</Eyebrow><h2 className="h2">Meet Your Next Favourites.</h2>
              <p className="lead mt-4">Sometimes one new piece is all it takes to refresh the way you get dressed. Explore our featured collection and discover what belongs in your next outfit.</p>
            </div>
            <button onClick={() => { setMenu(false); setQuery(''); setModal({ t: 'search' }) }} className="btn-glass shrink-0">Shop the Full Collection</button>
          </Reveal>
          <div className="collection-toolbar"><CollectionTabs selected={filter} onChange={setFilter} /><label className="sort-control">Sort by<select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
          <div className="product-grid mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {visibleProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <article id={`product-${p.id}`} className={`product-card glass flex h-full flex-col overflow-hidden rounded-[2rem] transition duration-500 hover:-translate-y-1 ${hl === p.id ? 'ring-4 ring-blue-300' : ''}`}>
                  <div className="product-photo relative aspect-[4/5] overflow-hidden">
                    <Img id={p.img} w={1400} sizes="(max-width: 639px) 95vw, (max-width: 1279px) 45vw, 280px" alt={p.name} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                    <button onClick={() => toggleWish(p.id)} aria-pressed={wish.includes(p.id)} aria-label={`Wishlist ${p.name}`} className="glass absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full transition hover:scale-110">
                      <Icon n="heart" fill={wish.includes(p.id)} className={`h-5 w-5 ${wish.includes(p.id) ? 'text-blue-700' : ''}`} />
                    </button>
                  </div>
                    <button className="quick-view" onClick={() => openSize(p)}><Icon n="eye" className="h-4 w-4" />Quick view</button>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-bold text-blue-700">{p.cat}</p>
                    <h3 className="mt-1 text-lg font-extrabold">{p.name}</h3>
                    <p className="mt-2 text-sm text-black/65">{p.desc}</p>
                    <div className="mt-4 flex items-center gap-2">
                      {p.colours.map((c) => <span key={c} className="h-5 w-5 rounded-full border border-black/15" style={{ background: c }} />)}
                      <span className="ml-1 text-xs text-black/55">{p.sizes.join(' · ')}</span>
                    </div>
                    <p className="mt-4 text-xl font-extrabold">{inr(p.price)}</p>
                    <button onClick={() => openSize(p)} className="btn-primary mt-4 w-full">Choose Your Size</button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        {/* Why */}
        <section className="section">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="h2">Make Everyday Style Feel Personal.</h2>
            <p className="lead mx-auto mt-4">Your wardrobe does not need to be complicated to feel considered. Discover outfit possibilities that begin with the pieces you enjoy wearing.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(([t, d], i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="feature-card glass-strong h-full rounded-[2rem] p-6 transition duration-500 hover:-translate-y-1">
                  <div className="feature-icon"><Icon n={['spark', 'layers', 'compass', 'shirt'][i]} className="h-6 w-6" /></div>
                  <h3 className="text-xl font-extrabold">{t}</h3>
                  <p className="mt-3 text-sm text-black/70">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        {/* Shop the look */}
        <section id="looks" className="section">
          <Reveal className="max-w-3xl">
            <h2 className="h2">From First Plans to Last-Minute Plans.</h2>
            <p className="lead mt-4">Explore combinations that make getting dressed feel easier.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {LOOKS.map(([t, d, b, img], i) => (
              <Reveal key={t} delay={(i % 2) * 120}>
                <article className="look-card group relative overflow-hidden rounded-[2rem] border-4 border-white shadow-xl shadow-blue-200/60">
                  <div className="aspect-[4/5] sm:aspect-[5/4]"><Img id={img} w={1800} alt={t} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                  <div className="look-caption glass-strong absolute inset-x-3 bottom-3 rounded-[1.5rem] p-5 sm:inset-x-4 sm:bottom-4">
                    <h3 className="text-xl font-extrabold">{t}</h3>
                    <p className="mt-1.5 text-sm text-black/70">{d}</p>
                    <button onClick={() => go('featured')} className="btn-soft mt-4 !py-2.5">{b}</button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        {/* Editorial banner */}
        <section className="section !py-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl shadow-blue-300/40">
              <div className="absolute inset-0"><Img id="1441984904996-e0b6ba687e04" alt="Clothing store interior" className="h-full w-full object-cover" /></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/55 to-blue-200/20" />
              <div className="relative px-6 py-16 sm:px-12 md:py-28">
                <div className="glass-strong max-w-xl rounded-[2rem] p-7 sm:p-10">
                  <h2 className="h2">Less Time Choosing. More Time Being You.</h2>
                  <p className="lead mt-4">A wardrobe comes into its own when the pieces work together. Explore Nickse and find your next combination.</p>
                  <button onClick={() => go('featured')} className="btn-primary mt-6">Build Your Wardrobe</button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
        {/* Style notes */}
        <section className="section">
          <Reveal className="max-w-3xl">
            <h2 className="h2">Small Details. A Fresh Perspective.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {NOTES.map(([t, d], i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="note-card glass h-full rounded-[2rem] p-6">
                  <span className="note-number">0{i + 1}</span><h3 className="text-lg font-extrabold">{t}</h3>
                  <p className="mt-3 text-sm text-black/70">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><button onClick={() => go('looks')} className="btn-glass mt-8">Explore Outfit Essentials</button></Reveal>
        </section>
        {/* Story */}
        <section id="story" className="section">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl shadow-blue-300/40 sm:aspect-[5/4] lg:aspect-[4/5]"><Img id="1552374196-1ab2a1c593e8" alt="Everyday outfit styled with denim" className="h-full w-full object-cover" /></div>
                <div className="glass absolute -bottom-4 right-4 rounded-3xl px-5 py-3 text-sm font-extrabold sm:-right-4">Find Your Fit. Own Your Style.</div>
              </div>
              <div>
                <Eyebrow>Our story</Eyebrow><h2 className="h2">Nickse. Your Style, Your Signature.</h2>
                <p className="lead mt-5">Clothing becomes personal through the way you wear it—the combinations you return to, the colours you choose and the pieces that become part of your routine.</p>
                <p className="lead mt-3">Nickse brings jeans, T-shirts, shirts and pants into one collection, giving you a starting point for everyday outfits and new ideas.</p>
                <p className="lead mt-3">We believe style should leave room for individuality. Some days call for your familiar favourites. Others invite a new combination. Both belong in your wardrobe.</p>
                <p className="lead mt-3">Our vision is to make Nickse a place you turn to when you want to explore, refresh and express your own style.</p>
                <button onClick={() => go('featured')} className="btn-primary mt-7">Explore Our Collection</button>
              </div>
            </div>
          </Reveal>
        </section>
        {/* Size & Fit + Care */}
        <section className="section grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="glass-strong h-full rounded-[2.5rem] p-7 sm:p-10">
              <h2 className="h2">Find Your Fit Before You Find Your Look.</h2>
              <p className="lead mt-4">A little attention to measurements can help you choose with confidence.</p>
              <ol className="mt-6 space-y-3">
                {['Choose the item you want to explore.', 'Open its size guide and review the fit description.', 'Compare the listed measurements with a similar garment you already own.', 'Contact us if you need help understanding the details.'].map((s, i) => (
                  <li key={s} className="flex items-start gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-sm font-extrabold text-white">{i + 1}</span><span className="pt-1 text-black/75">{s}</span></li>
                ))}
              </ol>
              <p className="mt-5 text-sm font-bold text-black/60">Sizes can vary between styles, so check the guide for each product.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => setModal({ t: 'guide' })} className="btn-primary">View Size Guide</button>
                <button onClick={() => go('contact')} className="btn-glass">Get Sizing Help</button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass h-full rounded-[2.5rem] bg-gradient-to-br from-blue-100/70 to-white/50 p-7 sm:p-10">
              <h2 className="text-3xl font-extrabold">Keep Your Favourites in Your Rotation.</h2>
              <p className="mt-4 text-black/70">Give each garment the care its fabric and construction need. Before washing, check the care label for instructions on temperature, drying and ironing.</p>
              <p className="mt-3 text-black/70">Follow the product-specific guidance rather than assuming every item needs the same treatment.</p>
              <button onClick={() => setModal({ t: 'care' })} className="btn-soft mt-6">View Product Care Details</button>
            </div>
          </Reveal>
        </section>
        {/* FAQ */}
        <section id="faq" className="section">
          <Reveal className="mx-auto max-w-3xl text-center"><h2 className="h2">A Few Things You Might Want to Know.</h2></Reveal>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {FAQS.map(([q, a], i) => (
              <Reveal key={q}>
                <div className="glass overflow-hidden rounded-3xl">
                  <button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold sm:px-6">
                    {q}
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-700 text-white transition duration-300 ${faq === i ? 'rotate-45' : ''}`}><Icon n="plus" className="h-4 w-4" /></span>
                  </button>
                  <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} aria-hidden={faq !== i} className={`grid transition-all duration-500 ${faq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden"><p className="px-5 pb-5 text-black/70 sm:px-6">{a}</p></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        {/* Newsletter */}
        <section className="section !py-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 p-6 sm:p-12">
              <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-blue-300/50 blur-3xl" />
              <div className="glass-strong relative mx-auto max-w-2xl rounded-[2rem] p-6 text-center sm:p-10">
                <h2 className="h2">Keep Your Wardrobe Inspired.</h2>
                <p className="lead mx-auto mt-3">Get Nickse collection updates, outfit ideas and brand news in your inbox.</p>
                <form onSubmit={submitNews} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <input type="email" aria-label="Email address" value={news.v} onChange={(e) => setNews({ v: e.target.value, s: '' })} placeholder="Your email address" className="field flex-1" />
                  <button disabled={news.s === "sending"} className="btn-primary">{news.s === "sending" ? "Sending…" : "Keep Me Updated"}</button>
                </form>
                <p className="mt-3 text-xs text-black/60">I agree to receive marketing emails from Nickse. I can unsubscribe at any time. <button onClick={() => setModal({ t: 'info', k: 'Privacy Policy' })} className="font-bold text-blue-700 underline">Privacy Policy</button></p>
                {news.s === 'ok' && <p role="status" className="mt-3 font-bold text-green-700">You're on the list. Welcome to Nickse.</p>}
                {news.s === 'unconnected' && <p role="status" className="mt-3 text-sm text-blue-800">Newsletter sign-up will be available soon. Your email has not been submitted.</p>}
                {news.s === 'failed' && <p role="alert" className="mt-3 text-sm text-red-600">We could not submit your email. Please try again.</p>}
                {news.s === 'error' && <p role="alert" className="mt-3 font-bold text-red-600">Please enter a valid email address.</p>}
              </div>
            </div>
          </Reveal>
        </section>
        {/* Contact */}
        <section id="contact" className="section grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="h2">We're Here to Help You Choose.</h2>
            <p className="lead mt-4">Questions about sizing, a product or an order? Get in touch with Nickse.</p>
            <dl className="glass mt-8 space-y-4 rounded-[2rem] p-6 text-sm">
              {[['Email', CONFIG.email], ['Phone / WhatsApp', CONFIG.phone], ['Support hours', CONFIG.hours], ['Address', CONFIG.address]].map(([k, v]) => (
                <div key={k}><dt className="font-bold text-blue-700">{k}</dt><dd className="mt-0.5 break-words text-black/75">{v}</dd></div>
              ))}
            </dl>
            <button onClick={chat} className="btn-soft mt-5">Chat With Nickse</button>
          </Reveal>
          <Reveal delay={120}>
            <form onSubmit={submitContact} noValidate className="glass-strong space-y-4 rounded-[2.5rem] p-6 sm:p-8">
              <label className="block text-sm font-bold">Full Name<input className="field mt-1.5 font-normal" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value, s: '' })} /></label>
              <label className="block text-sm font-bold">Email Address<input type="email" className="field mt-1.5 font-normal" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value, s: '' })} /></label>
              <label className="block text-sm font-bold">Order Number (Optional)<input className="field mt-1.5 font-normal" value={contact.order} onChange={(e) => setContact({ ...contact, order: e.target.value })} /></label>
              <label className="block text-sm font-bold">How Can We Help?<textarea rows="4" className="field mt-1.5 resize-none font-normal" value={contact.msg} onChange={(e) => setContact({ ...contact, msg: e.target.value, s: '' })} /></label>
              <button disabled={contact.s === "sending"} className="btn-primary w-full sm:w-auto">{contact.s === "sending" ? "Sending…" : "Send Your Message"}<Icon n="arrow" className="h-4 w-4" /></button>
              {contact.s === 'ok' && <p role="status" className="font-bold text-green-700">Thanks for contacting Nickse. Your message has been received.</p>}
              {contact.s === 'unconnected' && <p role="status" className="text-sm text-blue-800">Online messages will be available soon. Your message has not been sent.</p>}
              {contact.s === 'failed' && <p role="alert" className="text-sm text-red-600">We could not send your message. Please try again.</p>}
              {contact.s === 'error' && <p role="alert" className="font-bold text-red-600">Please enter your name, a valid email address and your message.</p>}
            </form>
          </Reveal>
        </section>
        {/* Final CTA */}
        <section className="section !pt-6">
          <Reveal>
            <div className="glass-strong relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-100/80 via-white/70 to-blue-100/80 px-6 py-14 text-center sm:px-12 md:py-20">
              <h2 className="h2 mx-auto max-w-3xl">Find the Pieces. Make the Look Yours.</h2>
              <p className="lead mx-auto mt-4">Your next outfit can begin with denim, a favourite tee, a fresh shirt or a pair of trousers. Explore Nickse and discover where your style takes you.</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button onClick={() => go('featured')} className="btn-primary">Shop Nickse</button>
                <button onClick={() => go('categories')} className="btn-glass">Explore Categories</button>
              </div>
              <p className="mt-6 font-display text-lg font-extrabold text-blue-700">Find Your Fit. Own Your Style.</p>
            </div>
          </Reveal>
        </section>
      </main>
      {/* Footer */}
      <footer className="border-t border-white bg-gradient-to-b from-blue-50/70 to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-[0.18em]">NICKSE<span className="text-blue-400">.</span></p>
            <p className="mt-3 font-bold">Everyday clothing. Personal style.</p>
            <p className="mt-2 max-w-xs text-sm text-black/65">Explore jeans, T-shirts, shirts and pants, and build a wardrobe that feels like you.</p>
          </div>
          {[
            ['Shop', [['Shop All', () => go('featured')], ['Jeans', () => go('jeans')], ['T-Shirts', () => go('tee')], ['Shirts', () => go('shirt')], ['Pants & Trousers', () => go('pants')]]],
            ['Discover', [['Our Story', () => go('story')], ['Outfit Inspiration', () => go('looks')], ['Contact Us', () => go('contact')]]],
            ['Customer Help', [['Size Guide', () => setModal({ t: 'guide' })], ['Shipping Information', () => setModal({ t: 'info', k: 'Shipping Information' })], ['Returns & Exchanges', () => setModal({ t: 'info', k: 'Returns & Exchanges' })], ['FAQs', () => go('faq')]]],
            ['Legal', [['Privacy Policy', () => setModal({ t: 'info', k: 'Privacy Policy' })], ['Terms & Conditions', () => setModal({ t: 'info', k: 'Terms & Conditions' })]]],
          ].map(([h, ls]) => (
            <div key={h}>
              <h4 className="font-extrabold">{h}</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {ls.map(([l, fn]) => <li key={l}><button onClick={fn} className="text-black/65 transition hover:text-blue-700">{l}</button></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-black/5 px-5 py-6 text-sm text-black/60 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Nickse. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1"><a href={CONFIG.instagram} className="font-bold hover:text-blue-700">Instagram</a><a href={CONFIG.facebook} className="font-bold hover:text-blue-700">Facebook</a><span className="break-all">{CONFIG.email}</span><span>{CONFIG.phone}</span></p>
        </div>
      </footer>
      {/* Bag drawer */}
      {bagOpen && (
        <div className="fixed inset-0 z-[90]">
          <button aria-label="Close bag" onClick={() => setBagOpen(false)} className="absolute inset-0 bg-blue-950/20 backdrop-blur-sm" />
          <BagPanel onClose={() => setBagOpen(false)}>
            <div className="flex items-center justify-between"><h3 className="text-2xl font-extrabold">Shopping Bag ({bagCount})</h3><button onClick={() => setBagOpen(false)} aria-label="Close" className="btn-glass !p-2"><Icon n="x" /></button></div>
            <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
              {bag.length === 0 && <div className="py-12 text-center"><p className="font-bold">Your bag is empty.</p><button onClick={() => focusProduct('jeans')} className="btn-primary mt-4">Shop Nickse</button></div>}
              {bag.map((i) => (
                <div key={i.k} className="glass flex gap-4 rounded-3xl p-3">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl"><Img id={i.p.img} w={400} alt={i.p.name} className="h-full w-full object-cover" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-extrabold">{i.p.name}</p><p className="text-xs text-black/60">Size {i.size}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="glass flex items-center rounded-full">
                        <button aria-label="Decrease" onClick={() => setBag((b) => b.map((x) => (x.k === i.k ? { ...x, q: x.q - 1 } : x)).filter((x) => x.q > 0))} className="p-2"><Icon n="minus" className="h-3.5 w-3.5" /></button>
                        <span className="w-6 text-center text-sm font-bold">{i.q}</span>
                        <button aria-label="Increase" onClick={() => setBag((b) => b.map((x) => (x.k === i.k ? { ...x, q: x.q + 1 } : x)))} className="p-2"><Icon n="plus" className="h-3.5 w-3.5" /></button>
                      </div>
                      <span className="font-extrabold">{inr(i.p.price * i.q)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {bag.length > 0 && (
              <div className="border-t border-black/5 pt-4">
                <div className="flex justify-between text-lg font-extrabold"><span>Subtotal</span><span>{inr(total)}</span></div>
                <button onClick={() => say('Checkout will be available once your store is connected.')} className="btn-soft mt-4 w-full">Checkout</button>
              </div>
            )}
          </BagPanel>
        </div>
      )}
      {/* Modals */}
      {modal?.t === 'search' && (
        <Modal title="Search Nickse" onClose={() => setModal(null)} wide>
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jeans, tees, shirts, pants" aria-label="Search" className="field" />
          <div className="mt-4 space-y-3">
            {results.length === 0 && <p className="py-6 text-center text-black/60">No matches. Try jeans, T-shirts, shirts or pants.</p>}
            {results.map((p) => (
              <button key={p.id} onClick={() => { setModal(null); focusProduct(p.id) }} className="glass flex w-full items-center gap-4 rounded-3xl p-3 text-left transition hover:bg-white/80">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl"><Img id={p.img} w={300} alt={p.name} className="h-full w-full object-cover" /></div>
                <div className="min-w-0 flex-1"><p className="truncate font-extrabold">{p.name}</p><p className="text-xs text-black/60">{p.cat}</p></div>
                <span className="font-extrabold">{inr(p.price)}</span>
              </button>
            ))}
          </div>
        </Modal>
      )}
      {modal?.t === 'size' && (
        <Modal title={modal.p.name} onClose={() => setModal(null)}>
          <div className="quick-product mb-5"><div className="overflow-hidden rounded-2xl"><Img id={modal.p.img} w={768} alt={modal.p.name} className="h-full w-full object-cover" /></div><div><Eyebrow>{modal.p.cat}</Eyebrow><p className="text-sm leading-relaxed text-black/65">{modal.p.desc}</p></div></div>
          <p className="text-sm text-black/70">Choose your size. Check the size guide and compare with a similar garment you own.</p>
          <div className="mt-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
            {modal.p.sizes.map((s) => (
              <button key={s} role="radio" aria-checked={size === s} onClick={() => setSize(s)} className={`h-12 min-w-[3rem] rounded-2xl border px-4 font-bold transition ${size === s ? 'border-blue-700 bg-blue-700 text-white' : 'glass hover:bg-white/90'}`}>{s}</button>
            ))}
          </div>
          <button onClick={() => setModal({ t: 'guide', returnProduct: modal.p })} className="mt-4 text-sm font-bold text-blue-700 underline">View Size Guide</button>
          <div className="mt-6 flex items-center justify-between"><span className="text-xl font-extrabold">{inr(modal.p.price)}</span><button onClick={addToBag} className="btn-primary">Add to Bag</button></div>
        </Modal>
      )}
      {modal?.t === 'guide' && (
        <Modal title="Size Guide" onClose={() => setModal(null)}>
          <ol className="space-y-3">
            {['Choose the item you want to explore.', 'Open its size guide and review the fit description.', 'Compare the listed measurements with a similar garment you already own.', 'Contact us if you need help understanding the details.'].map((s, i) => <li key={s} className="flex gap-3"><b className="text-blue-700">{i + 1}.</b>{s}</li>)}
          </ol>
          <p className="mt-4 text-sm text-black/60">Sizes can vary between styles, so check the guide for each product.</p>
          {modal.returnProduct && <button className="btn-primary mt-5 mr-2" onClick={() => setModal({ t: 'size', p: modal.returnProduct })}>Back to Product</button>}
          <button onClick={() => go('contact')} className="btn-soft mt-5">Get Sizing Help</button>
        </Modal>
      )}
      {modal?.t === 'care' && (
        <Modal title="Product Care Details" onClose={() => setModal(null)}>
          <p className="text-black/75">Before washing, check the care label for instructions on temperature, drying and ironing. Follow the product-specific guidance rather than assuming every item needs the same treatment.</p>
        </Modal>
      )}
      {modal?.t === 'info' && <Modal title={modal.k} onClose={() => setModal(null)}><p className="text-black/75">{INFO[modal.k]}</p></Modal>}
      {modal?.t === 'wish' && (
        <Modal title={`Wishlist (${wish.length})`} onClose={() => setModal(null)}>
          {wish.length === 0 ? <p className="py-4 text-black/60">Tap the heart on any product to save it here.</p> : (
            <div className="space-y-3">
              {PRODUCTS.filter((p) => wish.includes(p.id)).map((p) => (
                <div key={p.id} className="wish-row glass flex flex-wrap items-center gap-3 rounded-3xl p-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl"><Img id={p.img} w={300} alt={p.name} className="h-full w-full object-cover" /></div>
                  <p className="min-w-0 flex-1 truncate font-extrabold">{p.name}</p>
                  <button onClick={() => openSize(p)} className="btn-primary !px-4 !py-2">Choose Size</button>
                  <button aria-label="Remove" onClick={() => toggleWish(p.id)} className="p-2"><Icon n="x" className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
      {modal?.t === 'account' && (
        <Modal title="Your Account" onClose={() => setModal(null)}>
          <form onSubmit={(e) => { e.preventDefault(); setModal(null); say('Sign-in will be available once your store is connected.') }} className="space-y-3">
            <input type="email" required aria-label="Email address" placeholder="Your email address" className="field" />
            <input type="password" required aria-label="Password" placeholder="Password" className="field" />
            <button className="btn-primary w-full">Sign In</button>
          </form>
        </Modal>
      )}
      {scrolled && !menu && !bagOpen && !modal && <button onClick={() => go('home')} aria-label="Back to top" className="back-top"><Icon n="up" /></button>}
      {/* Toast */}
      <div aria-live="polite" className={`pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex justify-center px-4 transition duration-500 ${toast ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        <div className="glass-strong flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold"><Icon n="check" className="h-4 w-4 text-blue-700" />{toast}</div>
      </div>
    </div>
  )
}
