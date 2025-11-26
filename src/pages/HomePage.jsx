import { useState, useEffect } from 'react';
import TenantRegistration from '../pages/TenantRegistration';
import LandlordRegistration from '../pages/LandlordRegistration';
import LoginForm from './LoginForm';
import vbg from '../Bg/vbg.mov';


function HomePage() {
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showTHistory, setShowTHistory] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navButtonStyle = {
    background: '#fff',
    color: '#1976d2',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 18px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '110px',
    boxShadow: '0 6px 20px rgba(25,118,210,0.12)',
    transition: 'transform 200ms, box-shadow 200ms',
    whiteSpace: 'nowrap',
  };

  const features = [
    "One-Time Tenant Registration",
    "100% Online Document Verification",
    "Secure Identity & Background Checks",
    "Instant Verification Report",
    "Dashboard for Property Management"
  ];

  return (
    <div className="qv-root">
      <style>{`
        .qv-root { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #213547; }
        .qv-nav {
          display:flex;
          flex-wrap:wrap;
          justify-content:space-between;
          align-items:center;
          padding: 14px 5vw;
          background: linear-gradient(90deg, rgba(25,118,210,0.95) 60%, rgba(100,181,246,0.95) 100%);
          color: #fff;
          box-shadow: ${scrolled ? '0 10px 40px rgba(25,118,210,0.18)' : '0 6px 24px rgba(25,118,210,0.13)'};
          border-radius: 0 0 18px 18px;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: box-shadow 300ms;
        }
        .qv-nav .links a { color: #fff; text-decoration:none; padding:8px 16px; border-radius:8px; background: rgba(255,255,255,0.06); font-weight:500; }
        .qv-nav .brand { font-weight:800; font-size:1.45rem; letter-spacing:0.2px; }
        .qv-hero {
          position: relative;
          overflow: hidden;
          padding: 8vw 0 6vw 0;
          text-align: center;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .qv-hero .bg-gradient { position:absolute; inset:0; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); z-index:0; }
        .qv-hero video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity: 0.08; z-index:0; }
        .qv-hero .content { position:relative; z-index:1; max-width:980px; padding: 0 20px; }
        .qv-hero h1 { font-size: clamp(2rem, 3.5vw, 3rem); color: #0d47a1; margin-bottom: 12px; font-weight:800; letter-spacing:0.4px; animation: slideInUp 700ms ease both; }
        .qv-hero p { color: #1565c0; font-size: clamp(1rem, 1.2vw, 1.25rem); margin: 0 auto 20px auto; max-width: 720px; line-height:1.6; animation: slideInUp 900ms ease both; }
        .qv-cta { display:inline-flex; gap:12px; justify-content:center; align-items:center; animation: fadeIn 1000ms ease both; }
        .qv-button { background:#1976d2; color:#fff; padding:12px 28px; border-radius:10px; border:none; cursor:pointer; font-weight:700; box-shadow: 0 8px 30px rgba(25,118,210,0.18); transition: transform 220ms, box-shadow 220ms; }
        .qv-button:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 18px 40px rgba(25,118,210,0.22); }
        .qv-about { padding: 6vw 0; background: linear-gradient(135deg, #e8f5e9, #f1f8e9); text-align:center; }
        .qv-about h2 { color:#2e7d32; font-size:2.2rem; margin-bottom:12px; font-weight:800; animation: fadeIn 700ms both; }
        .qv-about p { max-width:760px; margin:0 auto; color:#3d525e; font-size:1.05rem; line-height:1.7; padding:0 20px; margin-bottom:20px; }
        .qv-features { padding: 4vw 0; background: #e0f7fa; text-align:center; }
        .qv-features h2 { color:#1976d2; margin-bottom:28px; font-weight:800; }
        .qv-cards { display:flex; flex-wrap:wrap; gap:22px; justify-content:center; align-items:stretch; }
        .qv-card { background:#fff; border-radius:14px; box-shadow:0 8px 36px rgba(25,118,210,0.08); padding:26px 22px; min-width:220px; max-width:300px; flex:1 1 240px; color:#1976d2; font-weight:600; display:flex; gap:12px; align-items:center; border:1.5px solid rgba(144,202,249,0.6); transform: translateY(10px); opacity:0; animation: cardUp 600ms cubic-bezier(.2,.9,.3,1) forwards; }
        .qv-card .tick { font-size:1.4rem; }
        .qv-card:hover { transform: translateY(-8px) scale(1.02); box-shadow:0 18px 48px rgba(25,118,210,0.12); }
        .qv-contact { padding: 4vw 0; background: #fffde4; text-align:center; }
        .qv-contact h2 { color:#388e3c; margin-bottom:12px; }
        .qv-contact a { color: #1976d2; text-decoration:none; font-weight:600; }
        .qv-footer { background:#1976d2; color:#fff; padding:24px 0; text-align:center; margin-top:40px; }
        .qv-modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.35); z-index:1200; display:flex; align-items:center; justify-content:center; animation: fadeIn 240ms both; }
        .qv-modal { background:#fff; border-radius:12px; padding:5vw 3.2vw; width:100%; max-width:760px; box-shadow:0 20px 60px rgba(21,101,192,0.12); transform: translateY(18px) scale(.98); animation: popIn 320ms cubic-bezier(.2,.9,.3,1) both; max-height: 92vh; overflow:auto; }
        @media (max-width:720px) { .qv-nav { padding: 12px 4vw; } .qv-nav .links { gap:10px; font-size:0.98rem; } }
        @keyframes slideInUp { from { transform: translateY(18px); opacity:0; } to { transform: translateY(0); opacity:1; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes popIn { from { transform: translateY(22px) scale(.98); opacity:0; } to { transform: translateY(0) scale(1); opacity:1; } }
        @keyframes cardUp { to { transform: translateY(0); opacity:1; } }
      `}</style>

      {/* Navbar */}
      <nav className="qv-nav" role="navigation" aria-label="Main navigation">
        <div className="brand">QuickVerify</div>
        <div className="links" style={{display:'flex', gap:18, alignItems:'center', flexWrap:'wrap'}}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <button style={{...navButtonStyle}} onClick={() => { setShowSignup(true); setShowLogin(false); setUserType(''); }} aria-label="Sign up">Signup</button>
          <button style={{...navButtonStyle, background:'#1976d2', color:'#fff'}} onClick={() => { setShowLogin(true); setShowSignup(false); setUserType(''); }} aria-label="Login">Login</button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="qv-hero" aria-labelledby="home-heading">
        <div className="bg-gradient" />
        <video autoPlay muted loop playsInline src={vbg} aria-hidden="true" />
        <div className="content">
          <h1 id="home-heading">Welcome to QuickVerify</h1>
          <p>Fast, reliable, and secure tenant verification platform to help landlords and tenants make safe and trusted rental decisions.</p>
          <div className="qv-cta">
            <button className="qv-button" onClick={() => { setShowSignup(true); setUserType('tenant'); }}>Get Started</button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="qv-about" aria-labelledby="about-heading">
        <h2 id="about-heading">About Us</h2>
        <p>Quick Verify makes tenant verification fast, secure, and hassle-free. Before handing over your property, it’s important to know who you are renting to. With Quick Verify, you can instantly check a tenant’s identity, background, employment details, and address proof—all in one place. Our process ensures transparency and reduces the risk of fraud, unpaid rent, or property misuse.</p>
        <div style={{ marginTop: 22, display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          {[
            "✔ One-Time Tenant Registration",
            "✔ 100% Online Document Verification",
            "✔ Safe, Trusted & Smooth Workflow"
          ].map((p, i) => (
            <div key={i} style={{ background:'#fff', borderRadius:12, padding:'12px 18px', fontSize:'0.98rem', color:'#2e7d32', border:'1px solid rgba(165,214,167,0.9)', boxShadow:'0 8px 30px rgba(76,175,80,0.08)' }}>{p}</div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="qv-features" aria-labelledby="features-heading">
        <h2 id="features-heading">How It Works</h2>
        <div className="qv-cards">
          {features.map((f, idx) => (
            <div key={idx} className="qv-card" style={{ animationDelay: `${idx * 120}ms` }} aria-hidden={false}>
              <div className="tick">✔</div>
              <div style={{textAlign:'left'}}>{f}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="qv-contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact Us</h2>
        <p>Email: <a href="mailto:nimishagoyal0326@gmail.com">nimishagoyal0326@gmail.com</a> | Phone: <a href="tel:+918357946628">+91-8357946628</a></p>
        <p>Email: <a href="mailto:shristi.shrivastava703@gmail.com">shristi.shrivastava703@gmail.com</a> | Phone: <a href="tel:+918370083860">+91-8370083860</a></p>
      </section>

      {/* Footer */}
      <footer className="qv-footer">
        <div style={{marginBottom:12}}>
          <a href="#" target="_blank" rel="noopener noreferrer" style={{color:'#fff', marginRight:18, textDecoration:'underline'}}>Rent Agreement</a>
          <a href="#" target="_blank" rel="noopener noreferrer" style={{color:'#fff', marginRight:18, textDecoration:'underline'}}>MagicBricks</a>
          <a href="#" target="_blank" rel="noopener noreferrer" style={{color:'#fff', textDecoration:'underline'}}>NoBroker</a>
        </div>
        <div>© 2025 QuickVerify. All rights reserved.</div>
      </footer>

      {/* Modals */}
      {showTHistory && (
        <div className="qv-modal-backdrop" role="dialog" aria-modal="true" aria-label="Tenant history">
          <div className="qv-modal">
            <div style={{textAlign:'right'}}><button onClick={() => setShowTHistory(false)} style={{border:'none', background:'transparent', cursor:'pointer', fontSize:18}}>✕</button></div>
            <THistory onClose={() => setShowTHistory(false)} />
          </div>
        </div>
      )}

      {showSignup && (
        <div className="qv-modal-backdrop" role="dialog" aria-modal="true" aria-label="Signup form">
          <div className="qv-modal">
            {!userType && (
              <>
                <h2 style={{textAlign:'center', marginBottom:18, color:'#1976d2'}}>Sign Up</h2>
                <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:18}}>
                  <button style={{padding:'10px 22px', borderRadius:8, background:'#1976d2', color:'#fff', border:'none', cursor:'pointer'}} onClick={() => setUserType('tenant')}>Tenant</button>
                  <button style={{padding:'10px 22px', borderRadius:8, background:'#388e3c', color:'#fff', border:'none', cursor:'pointer'}} onClick={() => setUserType('landlord')}>Landlord</button>
                </div>
              </>
            )}
            {userType === 'tenant' && <TenantRegistration />}
            {userType === 'landlord' && <LandlordRegistration />}
            <div style={{textAlign:'center', marginTop:18}}>
              <button onClick={() => setUserType('')} style={{marginRight:10, padding:'8px 16px', borderRadius:6, border:'none', background:'#e0e0e0', cursor:'pointer'}}>Back</button>
              <button onClick={() => { setShowSignup(false); setUserType(''); }} style={{padding:'8px 16px', borderRadius:6, border:'none', background:'#bdbdbd', cursor:'pointer'}}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="qv-modal-backdrop" role="dialog" aria-modal="true" aria-label="Login form">
          <div className="qv-modal">
            <div style={{textAlign:'right'}}><button onClick={() => setShowLogin(false)} style={{border:'none', background:'transparent', cursor:'pointer', fontSize:18}}>✕</button></div>
            <LoginForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
