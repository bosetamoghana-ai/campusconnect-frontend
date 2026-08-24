import React, { useEffect, useState } from 'react';

import {
  Menu,
  X,
  Home,
  Users,
  ShoppingBag,
  BookOpen,
  Calendar,
  MessageSquare,
  Bell,
  Search,
  LogOut,
  CheckCircle,
  Clock,
  ChevronRight,
  Plus,
  MapPin,
  Briefcase,
  GraduationCap,
  Image as ImageIcon,
  FileText,
  Sun,
  Moon,
  Shield,
  Eye,
  EyeOff,
  Send,
  Check,
  UserPlus,
  UserX,
  UserCheck,
} from 'lucide-react';

// ============================================================
// CONFIGURATION
// ============================================================

const API_BASE_URL = 'http://localhost:5000/api';

// ============================================================
// REUSABLE UI COMPONENTS
// ============================================================

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary: 'campus-button-primary',

    secondary: 'campus-button-secondary',

    ghost: 'campus-button-ghost',

    danger: 'campus-button-danger',

    glass: 'campus-button-glass',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-8 text-base',
    icon: 'h-10 w-10 p-2',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ============================================================
// CARD
// ============================================================

const Card = ({ children, className = '', hover = false }) => (
  <div
    className={`campus-card ${
      hover ? 'campus-card-hover' : ''
    } ${className}`}
  >
    {children}
  </div>
);

// ============================================================
// INPUT
// ============================================================

const Input = ({ label, error, ...props }) => (
  <div className="campus-input-wrapper">
    {label && (
      <label className="campus-input-label">
        {label}
      </label>
    )}

    <input
      className={`campus-input ${
        error ? 'campus-input-error' : ''
      }`}
      {...props}
    />

    {error && (
      <p className="campus-input-error-text">
        {error}
      </p>
    )}
  </div>
);

// ============================================================
// GLOBAL ANIMATIONS (self-contained, no external CSS needed)
// ============================================================

const GlobalAnimationStyles = () => (
  <style>{`
    @keyframes ccFadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes ccBounceIn {
      0%   { opacity: 0; transform: scale(0.55) rotate(-3deg); }
      55%  { opacity: 1; transform: scale(1.05) rotate(1deg); }
      75%  { transform: scale(0.97) rotate(-0.5deg); }
      100% { transform: scale(1) rotate(0deg); }
    }

    @keyframes ccShake {
      10%, 90% { transform: translateX(-2px); }
      20%, 80% { transform: translateX(4px); }
      30%, 50%, 70% { transform: translateX(-8px); }
      40%, 60% { transform: translateX(8px); }
    }

    @keyframes ccFloatBlob {
      0%   { transform: translate(0, 0) scale(1); }
      33%  { transform: translate(24px, -30px) scale(1.08); }
      66%  { transform: translate(-18px, 20px) scale(0.94); }
      100% { transform: translate(0, 0) scale(1); }
    }

    @keyframes ccGradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes ccDropFall {
      0%   { transform: translateY(-40px) scale(0.6); opacity: 0; }
      15%  { opacity: 1; }
      75%  { transform: translateY(60px) scale(1); opacity: 1; }
      100% { transform: translateY(66px) scale(0.3); opacity: 0; }
    }

    @keyframes ccSplashRing {
      0%   { transform: scale(0.2); opacity: 0.9; }
      100% { transform: scale(2.2); opacity: 0; }
    }

    @keyframes ccWiggle {
      0%, 100% { transform: rotate(0deg); }
      25%      { transform: rotate(-4deg); }
      75%      { transform: rotate(4deg); }
    }

    @keyframes ccPopIn {
      0%   { opacity: 0; transform: scale(0.6); }
      70%  { opacity: 1; transform: scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }

    .cc-pop-in {
      animation: ccPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    .cc-stagger-grid > * {
      opacity: 0;
      animation: ccFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    .cc-stagger-grid > *:nth-child(1) { animation-delay: 0.04s; }
    .cc-stagger-grid > *:nth-child(2) { animation-delay: 0.1s; }
    .cc-stagger-grid > *:nth-child(3) { animation-delay: 0.16s; }
    .cc-stagger-grid > *:nth-child(4) { animation-delay: 0.22s; }
    .cc-stagger-grid > *:nth-child(5) { animation-delay: 0.28s; }
    .cc-stagger-grid > *:nth-child(6) { animation-delay: 0.34s; }
    .cc-stagger-grid > *:nth-child(7) { animation-delay: 0.4s; }
    .cc-stagger-grid > *:nth-child(8) { animation-delay: 0.46s; }
    .cc-stagger-grid > *:nth-child(n+9) { animation-delay: 0.5s; }

    .cc-hover-lift {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .cc-hover-lift:hover {
      transform: translateY(-6px);
      box-shadow: 0 14px 28px rgba(0,0,0,0.14);
    }

    .cc-fade-up {
      animation: ccFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    .cc-bounce-in {
      animation: ccBounceIn 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    .cc-shake {
      animation: ccShake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }

    .cc-glow-btn:hover {
      animation: ccGlowPulse 1.4s ease-out infinite;
    }

    @keyframes ccGlowPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(22,131,111,0.45); }
      50%      { box-shadow: 0 0 0 10px rgba(22,131,111,0); }
    }

    .dark .cc-glow-btn:hover {
      animation-name: ccGlowPulseDark;
    }

    @keyframes ccGlowPulseDark {
      0%, 100% { box-shadow: 0 0 0 0 rgba(85,184,159,0.5); }
      50%      { box-shadow: 0 0 0 10px rgba(85,184,159,0); }
    }

    .cc-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(50px);
      opacity: 0.5;
      pointer-events: none;
      animation: ccFloatBlob 9s ease-in-out infinite;
      z-index: 0;
    }

    .cc-gradient-text-animated {
      background: linear-gradient(
        90deg,
        var(--accent, #16836f),
        var(--brand-coral, #ef756c),
        var(--warning, #c78a3b),
        var(--accent, #16836f)
      );
      background-size: 300% 300%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: ccGradientShift 6s ease infinite;
    }

    .cc-water-scene {
      position: relative;
      width: 100%;
      height: 90px;
      overflow: hidden;
      pointer-events: none;
    }

    .cc-drop {
      position: absolute;
      top: 0;
      width: 10px;
      height: 10px;
      border-radius: 50% 50% 50% 0;
      background: linear-gradient(
        135deg,
        var(--accent, #16836f),
        var(--accent-hover, #0f6d5c)
      );
      animation: ccDropFall 1.8s ease-in infinite;
    }

    .cc-splash-ring {
      position: absolute;
      bottom: 6px;
      width: 26px;
      height: 26px;
      margin-left: -13px;
      border: 2px solid var(--accent, #16836f);
      border-radius: 50%;
      animation: ccSplashRing 1.8s ease-out infinite;
    }

    .cc-wiggle {
      animation: ccWiggle 2.4s ease-in-out infinite;
      transform-origin: bottom center;
    }

    @media (prefers-reduced-motion: reduce) {
      .cc-fade-up, .cc-bounce-in, .cc-shake, .cc-blob,
      .cc-gradient-text-animated, .cc-drop, .cc-splash-ring,
      .cc-wiggle, .cc-glow-btn:hover, .cc-pop-in,
      .cc-stagger-grid > * {
        animation: none !important;
        opacity: 1 !important;
      }
    }
  `}</style>
);

// ============================================================
// PASSWORD INPUT (with show/hide eye toggle)
// ============================================================

const PasswordInput = ({ label, error, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="campus-input-wrapper">
      {label && (
        <label className="campus-input-label">
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <input
          type={visible ? 'text' : 'password'}
          className={`campus-input ${
            error ? 'campus-input-error' : ''
          }`}
          style={{ paddingRight: '2.5rem', width: '100%' }}
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          style={{
            position: 'absolute',
            right: '0.6rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.6,
          }}
          aria-label={
            visible ? 'Hide password' : 'Show password'
          }
        >
          {visible ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {error && (
        <p className="campus-input-error-text">
          {error}
        </p>
      )}
    </div>
  );
};

// ============================================================
// BADGE
// ============================================================

const Badge = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variants = {
    default: 'campus-badge-default',
    success: 'campus-badge-success',
    warning: 'campus-badge-warning',
    primary: 'campus-badge-primary',
  };

  return (
    <span
      className={`campus-badge ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// ============================================================
// AVATAR
// ============================================================

const Avatar = ({
  src,
  alt = 'User',
  size = 'md',
  verified = false,
  className = '',
}) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-24 w-24',
  };

  const seed = encodeURIComponent(alt || 'User');

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={
          src ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`
        }
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover campus-avatar`}
      />

      {verified && (
        <div className="absolute bottom-0 right-0 campus-avatar-check">
          <CheckCircle className="w-4 h-4 campus-verified-icon" />
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN APPLICATION
// ============================================================

export default function CampusConnectApp() {
  const [profile, setProfile] = useState(null);
  const [currentView, setCurrentView] = useState('landing');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------------
  // Demo / local UI data
  // ----------------------------------------------------------

  const [usersList, setUsersList] = useState([
    {
      id: '1',
      name: 'Tamoghna',
      email: 'tamoghna@college.edu',
      branch: 'CSE',
      year: '2nd',
      rollNo: '24BCE102',
      status: 'verified',
      role: 'student',
      avatar: '',
    },
    {
      id: '2',
      name: 'Priya Saha',
      email: 'priya@college.edu',
      branch: 'ECE',
      year: '3rd',
      rollNo: '23BEC045',
      status: 'verified',
      role: 'student',
      avatar: '',
    },
    {
      id: '3',
      name: 'Amit Kumar',
      email: 'amit@college.edu',
      branch: 'MECH',
      year: '1st',
      rollNo: '25BME089',
      status: 'pending',
      role: 'student',
      avatar: '',
    },
  ]);

  const [marketItems, setMarketItems] = useState([
    {
      id: 'm1',
      title: 'Engineering Mathematics Vol 1',
      price: 350,
      condition: 'Good',
      category: 'Books',
      sellerName: 'Tamoghna',
      description:
        'Used for one semester. Good condition.',
      createdAt: Date.now(),
    },
    {
      id: 'm2',
      title: 'Scientific Calculator fx-991EX',
      price: 800,
      condition: 'Like New',
      category: 'Electronics',
      sellerName: 'Priya Saha',
      description: 'Perfect working condition.',
      createdAt: Date.now() - 10000,
    },
  ]);

  // ----------------------------------------------------------
  // Dark mode
  // ----------------------------------------------------------

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      darkMode
    );
  }, [darkMode]);

  // ----------------------------------------------------------
  // Initial loading
  // ----------------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ----------------------------------------------------------
  // Authentication
  // ----------------------------------------------------------

  const handleLogin = (userData) => {
    setProfile(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setProfile(null);
    setCurrentView('landing');
  };

  // ----------------------------------------------------------
  // Notifications: incoming friend requests + unread messages
  // (uses only existing backend routes — no backend changes)
  // ----------------------------------------------------------

  const [incomingRequests, setIncomingRequests] = useState(
    []
  );
  const [unreadByFriend, setUnreadByFriend] = useState({});

  const currentUserId = profile?._id || profile?.id;

  const getLastReadKey = (friendId) =>
    `cc_lastRead_${currentUserId}_${friendId}`;

  const markFriendRead = (friendId) => {
    if (!currentUserId || !friendId) return;

    localStorage.setItem(
      getLastReadKey(friendId),
      new Date().toISOString()
    );

    setUnreadByFriend((previous) => {
      if (!previous[friendId]) return previous;

      const next = { ...previous };
      next[friendId] = 0;
      return next;
    });
  };

  const pollNotifications = async () => {
    if (!currentUserId) return;

    try {
      const reqRes = await fetch(
        `${API_BASE_URL}/requests/incoming/${currentUserId}`
      );

      const reqData = await reqRes.json();

      setIncomingRequests(
        Array.isArray(reqData) ? reqData : []
      );
    } catch (err) {
      // silent fail on background poll
    }

    try {
      const friendRes = await fetch(
        `${API_BASE_URL}/friends/${currentUserId}`
      );

      const friends = await friendRes.json();

      if (!Array.isArray(friends)) return;

      const counts = await Promise.all(
        friends.map(async (friend) => {
          try {
            const msgRes = await fetch(
              `${API_BASE_URL}/messages/${currentUserId}/${friend._id}`
            );

            const msgs = await msgRes.json();

            if (!Array.isArray(msgs)) {
              return [friend._id, 0];
            }

            const lastReadRaw = localStorage.getItem(
              getLastReadKey(friend._id)
            );

            const lastRead = lastReadRaw
              ? new Date(lastReadRaw)
              : new Date(0);

            const unread = msgs.filter((m) => {
              const senderId =
                m.from?._id || m.from;

              return (
                senderId !== currentUserId &&
                new Date(m.createdAt) > lastRead
              );
            }).length;

            return [friend._id, unread];
          } catch (err) {
            return [friend._id, 0];
          }
        })
      );

      setUnreadByFriend(Object.fromEntries(counts));
    } catch (err) {
      // silent fail on background poll
    }
  };

  useEffect(() => {
    if (!currentUserId) return;

    pollNotifications();

    const interval = setInterval(pollNotifications, 8000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  const handleRespondToRequest = async (
    requestId,
    action
  ) => {
    try {
      await fetch(`${API_BASE_URL}/requests/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, action }),
      });

      pollNotifications();
    } catch (err) {
      // silent fail
    }
  };

  const totalUnreadMessages = Object.values(
    unreadByFriend
  ).reduce((sum, n) => sum + n, 0);

  // ----------------------------------------------------------
  // Router
  // ----------------------------------------------------------

  const renderView = () => {
    if (loading) {
      return (
        <div className="campus-loading">
          <div className="campus-spinner" />
        </div>
      );
    }

    if (currentView === 'landing') {
      return (
        <LandingView
          onNavigate={setCurrentView}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      );
    }

    if (currentView === 'auth') {
      return (
        <AuthView
          onComplete={handleLogin}
          onBack={() => setCurrentView('landing')}
          onAdminLogin={() => setCurrentView('admin-auth')}
        />
      );
    }

    if (currentView === 'admin-auth') {
      return (
        <AdminAuthView
          onComplete={handleLogin}
          onBack={() => setCurrentView('auth')}
        />
      );
    }

    if (!profile) {
      return (
        <AuthView
          onComplete={handleLogin}
          onBack={() => setCurrentView('landing')}
          onAdminLogin={() => setCurrentView('admin-auth')}
        />
      );
    }

    if (
      profile.status === 'pending' &&
      profile.role !== 'admin'
    ) {
      return (
        <PendingVerificationView
          onLogout={handleLogout}
        />
      );
    }

    return (
      <AppLayout
        profile={profile}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        incomingRequests={incomingRequests}
        onRespondToRequest={handleRespondToRequest}
        totalUnreadMessages={totalUnreadMessages}
      >

        {currentView === 'dashboard' && (
          <DashboardView
            profile={profile}
            marketItems={marketItems}
            usersList={usersList}
          />
        )}

        {currentView === 'directory' && (
          <DirectoryView profile={profile} />
        )}

        {currentView === 'marketplace' && (
          <MarketplaceView
            items={marketItems}
            profile={profile}
            setMarketItems={setMarketItems}
          />
        )}

        {currentView === 'admin' &&
          profile.role === 'admin' && (
            <AdminView
              usersList={usersList}
              setUsersList={setUsersList}
            />
          )}

        {currentView === 'profile' && (
          <ProfileView profile={profile} />
        )}

        {currentView === 'chat' && (
          <ChatView
            profile={profile}
            markFriendRead={markFriendRead}
          />
        )}

        {['notes', 'events'].includes(currentView) && (
          <ComingSoonView currentView={currentView} />
        )}
      </AppLayout>
    );
  };

  return (
    <div className="campus-root">
      <GlobalAnimationStyles />
      {renderView()}
    </div>
  );
}

// ============================================================
// LANDING PAGE
// ============================================================

const LandingView = ({
  onNavigate,
  darkMode,
  setDarkMode,
}) => {
  return (
    <div className="campus-landing">
      <nav className="campus-landing-nav">
        <div className="campus-container campus-nav-inner">
          <div className="flex items-center gap-2">
            <div className="campus-logo">
                <img
                src="/campusconnect-logo.webp"
                alt="CampusConnect Logo"
                className="campus-logo-image"
                />
            </div>

            <span className="campus-brand-name">
              <span className="campus-word">Campus</span>
              <span className="connect-word">Connect</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="campus-icon-button"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Button
              variant="ghost"
              onClick={() => onNavigate('auth')}
            >
              Login
            </Button>

            <Button onClick={() => onNavigate('auth')}>
              Join Now
            </Button>
          </div>
        </div>
      </nav>

      <div
        className="campus-container campus-hero"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div
          className="cc-blob"
          style={{
            width: '340px',
            height: '340px',
            top: '-80px',
            left: '-60px',
            background:
              'radial-gradient(circle, var(--accent, #16836f), transparent 70%)',
          }}
        />

        <div
          className="cc-blob"
          style={{
            width: '260px',
            height: '260px',
            top: '40px',
            right: '-40px',
            background:
              'radial-gradient(circle, var(--brand-coral, #ef756c), transparent 70%)',
            animationDelay: '2s',
          }}
        />

        <div
          className="cc-blob"
          style={{
            width: '220px',
            height: '220px',
            bottom: '-60px',
            left: '30%',
            background:
              'radial-gradient(circle, var(--warning, #c78a3b), transparent 70%)',
            animationDelay: '4s',
          }}
        />

        <div
          className="campus-hero-content"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div
            className="campus-exclusive-badge cc-fade-up"
            style={{ animationDelay: '0.05s' }}
          >
            <span className="campus-status-dot" />
            Exclusive to Your University
          </div>

          <h1
            className="campus-hero-title cc-fade-up"
            style={{ animationDelay: '0.15s' }}
          >
            The Ultimate
            <br />
            <span className="campus-gradient-text cc-gradient-text-animated">
              Student Network
            </span>
          </h1>

          <p
            className="campus-hero-description cc-fade-up"
            style={{ animationDelay: '0.28s' }}
          >
            Connect with peers, buy & sell on the
            marketplace, access study notes, and discover
            campus events all in one beautifully designed
            platform.
          </p>

          <div
            className="campus-hero-buttons cc-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 cc-glow-btn"
              onClick={() => onNavigate('auth')}
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => onNavigate('auth')}
            >
              Explore Features
            </Button>
          </div>
        </div>

        <div
          className="campus-hero-preview cc-fade-up"
          style={{
            position: 'relative',
            zIndex: 1,
            animationDelay: '0.5s',
          }}
        >
          <div className="campus-preview-glow" />

          <Card className="campus-preview-card">
            <div className="campus-preview-user">
              <Avatar
                alt="Tamoghna"
                size="md"
                verified
              />

              <div>
                <h3 className="campus-heading-small">
                  Tamoghna
                </h3>

                <p className="campus-secondary-text">
                  Computer Science • 2nd Year
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="campus-skeleton w-3/4" />
              <div className="campus-skeleton w-1/2" />

              <div className="campus-image-placeholder">
                <ImageIcon className="w-8 h-8 opacity-50" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// AUTHENTICATION
// ============================================================

const AuthView = ({ onComplete, onBack, onAdminLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    branch: 'CSE',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const resetAuthState = (loginMode) => {
    setIsLogin(loginMode);
    setOtpSent(false);
    setError('');

    setFormData({
      name: '',
      email: '',
      rollNo: '',
      branch: 'CSE',
      password: '',
      confirmPassword: '',
      otp: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const res = await fetch(
          `${API_BASE_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || 'Login failed.'
          );
        }

        onComplete(data);
        return;
      }

      if (!otpSent) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error(
            'Password and Confirm Password do not match.'
          );
        }

        const res = await fetch(
          `${API_BASE_URL}/auth/send-otp`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              rollNo: formData.rollNo,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || 'Unable to send OTP.'
          );
        }

        setOtpSent(true);

        alert(
          'OTP Sent! Check your backend terminal for the code.'
        );

        return;
      }

      const res = await fetch(
        `${API_BASE_URL}/auth/register-verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Registration failed.'
        );
      }

      onComplete(data.user);
    } catch (err) {
      setError(
        err?.message || 'Something went wrong.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="campus-auth-page"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <button
        onClick={onBack}
        className="campus-back-button"
      >
        ← Back
      </button>

      <Card
        key={error || 'card-default'}
        className={`campus-auth-card cc-bounce-in ${
          error ? 'cc-shake' : ''
        }`}
      >
        <div className="text-center mb-8">
          <div className="campus-auth-logo">
            <img
              src="/campusconnect-logo.webp"
              alt="CampusConnect Logo"
              className="campus-auth-logo-image"
             />
           </div>

          <h2 className="campus-auth-title">
            {isLogin
              ? 'Welcome Back'
              : 'Join CampusConnect'}
          </h2>

          <p className="campus-secondary-text mt-2">
            {isLogin
              ? 'Enter your credentials to access your account.'
              : 'Create an account. Requires admin verification.'}
          </p>
        </div>

        {error && (
          <div className="campus-error-box">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {!isLogin && (
            <>
              <Input
                label="Full Name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={otpSent}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Roll Number"
                  name="rollNo"
                  placeholder="e.g. 21BCE001"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                  disabled={otpSent}
                />

                <div className="space-y-1">
                  <label className="campus-input-label">
                    Branch
                  </label>

                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    disabled={otpSent}
                    className="campus-select w-full h-10"
                  >
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>MECH</option>
                    <option>CIVIL</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <Input
            label={
              isLogin
                ? 'College Email'
                : 'College Email (@heritageit.edu.in)'
            }
            name="email"
            type="email"
            placeholder="john@heritageit.edu.in"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={otpSent}
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={otpSent}
          />

          {!isLogin && (
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={otpSent}
            />
          )}

          {otpSent && (
            <div className="campus-otp-box">
              <Input
                label="Enter 6-Digit OTP"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                value={formData.otp}
                onChange={handleChange}
                required
              />

              <p className="campus-otp-help">
                Check your backend terminal for the OTP
                code.
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={loading}
          >
            {loading
              ? 'Processing...'
              : isLogin
              ? 'Sign In'
              : otpSent
              ? 'Verify & Register'
              : 'Request OTP'}
          </Button>
        </form>

        {isLogin && (
          <div className="mt-4">
            <Button
              variant="ghost"
              className="w-full text-xs campus-muted-button gap-2"
              onClick={onAdminLogin}
              type="button"
            >
              <Shield className="w-3.5 h-3.5" />
              Login as Admin
            </Button>
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          <span className="campus-secondary-text">
            {isLogin
              ? "Don't have an account? "
              : 'Already registered? '}
          </span>

          <button
            type="button"
            onClick={() =>
              resetAuthState(!isLogin)
            }
            className="campus-link"
          >
            {isLogin ? 'Register now' : 'Sign in'}
          </button>
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// ADMIN LOGIN (whitelist + OTP + password)
// ============================================================

const AdminAuthView = ({ onComplete, onBack }) => {
  const [step, setStep] = useState('email'); // 'email' -> 'verify'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/send-otp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Unable to send OTP.');
      }

      setStep('verify');
    } catch (err) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Admin verification failed.'
        );
      }

      onComplete(data.user);
    } catch (err) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="campus-auth-page"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <button
        onClick={onBack}
        className="campus-back-button"
      >
        ← Back
      </button>

      <Card
        key={error || 'admin-card-default'}
        className={`campus-auth-card cc-bounce-in ${
          error ? 'cc-shake' : ''
        }`}
      >
        <div className="text-center mb-8">
          <div
            className="campus-auth-logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield className="w-10 h-10 campus-accent-icon" />
          </div>

          <h2 className="campus-auth-title">
            Admin Access
          </h2>

          <p className="campus-secondary-text mt-2">
            {step === 'email'
              ? 'Restricted to authorized administrators only.'
              : 'Enter the OTP sent to your email and your account password.'}
          </p>
        </div>

        {error && (
          <div className="campus-error-box">{error}</div>
        )}

        {step === 'email' && (
          <form
            onSubmit={handleSendOtp}
            className="space-y-4"
          >
            <Input
              label="Admin Email"
              type="email"
              placeholder="name.branch29@heritageit.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </form>
        )}

        {step === 'verify' && (
          <form
            onSubmit={handleVerify}
            className="space-y-4"
          >
            <Input
              label="6-Digit OTP"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <PasswordInput
              label="Account Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify & Enter'}
            </Button>

            <button
              type="button"
              onClick={() => {
                setStep('email');
                setOtp('');
                setPassword('');
                setError('');
              }}
              className="campus-link text-sm w-full text-center"
            >
              Use a different email
            </button>
          </form>
        )}
      </Card>
    </div>
  );
};

// ============================================================
// PENDING VERIFICATION
// ============================================================

const PendingVerificationView = ({ onLogout }) => (
  <div className="campus-pending-page">
    <div className="campus-pending-icon">
      <Clock className="w-10 h-10" />
    </div>

    <h1 className="campus-page-title">
      Account Pending Verification
    </h1>

    <p className="campus-secondary-text max-w-md mb-8 text-center">
      Your account is currently under review by the
      college administrators. We are verifying your ID
      card. You will be able to access the platform once
      approved.
    </p>

    <Button
      variant="secondary"
      onClick={onLogout}
    >
      Sign Out
    </Button>
  </div>
);

// ============================================================
// MAIN APPLICATION LAYOUT
// ============================================================

const AppLayout = ({
  children,
  profile,
  currentView,
  setCurrentView,
  onLogout,
  darkMode,
  setDarkMode,
  incomingRequests = [],
  onRespondToRequest,
  totalUnreadMessages = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      id: 'directory',
      label: 'Directory',
      icon: Users,
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: ShoppingBag,
    },
    {
      id: 'notes',
      label: 'Notes Hub',
      icon: BookOpen,
    },
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
    },
    {
      id: 'chat',
      label: 'Messages',
      icon: MessageSquare,
      badge: totalUnreadMessages,
    },
  ];

  if (profile?.role === 'admin') {
    navItems.push({
      id: 'admin',
      label: 'Admin Panel',
      icon: Shield,
    });
  }

  const NavLinks = () => (
    <div className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => {
              setCurrentView(item.id);
              setMobileMenuOpen(false);
            }}
            className={`campus-nav-link ${
              currentView === item.id
                ? 'campus-nav-link-active'
                : ''
            }`}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </span>

            {!!item.badge && (
              <span
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  borderRadius: '999px',
                  minWidth: '18px',
                  height: '18px',
                  padding: '0 5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="campus-app-layout">
      {/* Desktop Sidebar */}

      <aside className="campus-sidebar">
        <div className="campus-sidebar-header">
          <div className="campus-logo">
            <img
              src="/campusconnect-logo.webp"
              alt="CampusConnect Logo"
              className="campus-logo"
               />
          </div>

          <span className="campus-sidebar-brand">
            <span className="campus-word">Campus</span>
            <span className="connect-word">Connect</span>
          </span>
        </div>

        <div className="campus-sidebar-content">
          <NavLinks />
        </div>

        <div className="campus-sidebar-footer">
          <button
            onClick={() => setCurrentView('profile')}
            className="campus-profile-button"
          >
            <Avatar
              src={profile?.avatar}
              alt={profile?.name}
              size="sm"
              verified={
                profile?.status === 'verified'
              }
            />

            <div className="text-left flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {profile?.name}
              </p>

              <p className="text-xs campus-secondary-text truncate">
                {profile?.rollNo}
              </p>
            </div>
          </button>

          <button
            onClick={onLogout}
            className="campus-logout-button"
          >
            <LogOut className="w-5 h-5" />

            <span className="text-sm font-medium">
              Log out
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}

      <div className="campus-mobile-header">
        <span className="font-bold text-lg flex items-center gap-2">
          <img
             src="/campusconnect-logo.webp"
             alt="CampusConnect Logo"
             className="campus-logo"
             />
          CC
        </span>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="campus-icon-button"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="campus-icon-button"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {mobileMenuOpen && (
        <div className="campus-mobile-menu">
          <NavLinks />

          <div className="mt-6 pt-6 campus-mobile-menu-divider">
            <button
              onClick={() => {
                setCurrentView('profile');
                setMobileMenuOpen(false);
              }}
              className="campus-mobile-profile"
            >
              <Avatar
                src={profile?.avatar}
                alt={profile?.name}
                size="sm"
                verified={
                  profile?.status === 'verified'
                }
              />

              <div className="text-left">
                <p className="font-medium">
                  {profile?.name}
                </p>

                <p className="text-xs campus-secondary-text">
                  {profile?.rollNo}
                </p>
              </div>
            </button>

            <button
              onClick={onLogout}
              className="campus-logout-button"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}

      <main className="campus-main">
        <header className="campus-topbar">
          <h2 className="campus-topbar-title">
            {currentView.replace('-', ' ')}
          </h2>

          <div className="flex items-center gap-4">
            <div className="campus-global-search">
              <Search className="w-4 h-4" />

              <input
                type="text"
                placeholder="Global search..."
              />
            </div>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="campus-icon-button campus-notification-button"
              >
                <Bell className="w-5 h-5" />

                {incomingRequests.length > 0 && (
                  <span
                    className="cc-pop-in"
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: '#ef4444',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 700,
                      borderRadius: '999px',
                      minWidth: '16px',
                      height: '16px',
                      padding: '0 4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid var(--surface, #fff)',
                    }}
                  >
                    {incomingRequests.length > 9
                      ? '9+'
                      : incomingRequests.length}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div
                    onClick={() => setNotifOpen(false)}
                    style={{
                      position: 'fixed',
                      inset: 0,
                      zIndex: 40,
                    }}
                  />

                  <div
                    className="campus-card cc-pop-in"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      width: '320px',
                      maxHeight: '380px',
                      overflowY: 'auto',
                      zIndex: 41,
                      padding: '0.5rem 0',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.5rem 1rem 0.75rem',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        borderBottom:
                          '1px solid rgba(120,120,120,0.15)',
                      }}
                    >
                      Friend Requests
                    </div>

                    {incomingRequests.length === 0 ? (
                      <div className="p-6 text-center campus-secondary-text text-sm">
                        No new requests.
                      </div>
                    ) : (
                      incomingRequests.map((req) => (
                        <div
                          key={req._id}
                          style={{
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.5rem',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                              minWidth: 0,
                            }}
                          >
                            <Avatar
                              alt={req.from?.name}
                              size="sm"
                            />

                            <div style={{ minWidth: 0 }}>
                              <p className="text-sm font-medium truncate">
                                {req.from?.name}
                              </p>

                              <p className="text-xs campus-secondary-text truncate">
                                {req.from?.rollNo}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-1">
                            <button
                              onClick={() =>
                                onRespondToRequest?.(
                                  req._id,
                                  'accept'
                                )
                              }
                              className="campus-plus-button"
                              title="Accept"
                            >
                              <Check className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() =>
                                onRespondToRequest?.(
                                  req._id,
                                  'reject'
                                )
                              }
                              className="campus-plus-button"
                              title="Decline"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="campus-icon-button"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </header>

        <div className="campus-main-content">
          <div className="campus-content-container">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

// ============================================================
// DASHBOARD
// ============================================================

const DashboardView = ({
  profile,
  marketItems,
  usersList,
}) => {
  const firstName =
    profile?.name?.split(' ')[0] || 'Student';

  return (
    <div className="space-y-6">
      <Card className="campus-welcome-card">
        <div className="max-w-2xl">
          <h1 className="campus-welcome-title">
            Welcome back, {firstName}! 👋
          </h1>

          <p className="campus-welcome-description">
            Here's what's happening on campus today.
            Don't miss out on the upcoming tech symposium.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="glass">
              View Schedule
            </Button>

            <Button variant="glass">
              Find Mentors
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="campus-section-heading">
            <Bell className="w-5 h-5 campus-accent-icon" />
            Recent Announcements
          </h3>

          <Card className="p-5">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="warning">
                Important
              </Badge>

              <span className="text-xs campus-secondary-text">
                2 hours ago
              </span>
            </div>

            <h4 className="campus-card-heading">
              End Semester Examination Schedule Released
            </h4>

            <p className="campus-card-description">
              The timetable for the upcoming even
              semester examinations has been published.
              Please check the academic portal...
            </p>
          </Card>

          <h3 className="campus-section-heading mt-8">
            <ShoppingBag className="w-5 h-5 campus-accent-icon" />
            Latest in Marketplace
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {marketItems.slice(0, 4).map((item) => (
              <Card
                key={item.id}
                className="p-4 campus-clickable-card"
              >
                <div className="aspect-video campus-image-placeholder mb-3">
                  <ImageIcon className="w-8 h-8 opacity-50" />
                </div>

                <h4 className="font-medium truncate">
                  {item.title}
                </h4>

                <div className="flex justify-between items-center mt-2">
                  <span className="campus-price">
                    ₹{item.price}
                  </span>

                  <Badge>{item.condition}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="campus-card-heading mb-4">
              Upcoming Events
            </h3>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="campus-event-date">
                    <span className="text-xs font-bold uppercase">
                      Oct
                    </span>

                    <span className="text-lg font-bold leading-none">
                      {14 + i}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">
                      HackCampus 2026
                    </h4>

                    <p className="text-xs campus-secondary-text flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      Main Auditorium
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              className="w-full mt-4 text-sm"
            >
              View All Events
            </Button>
          </Card>

          <Card className="p-5">
            <h3 className="campus-card-heading mb-4">
              New Connections
            </h3>

            <div className="space-y-3">
              {usersList.slice(0, 3).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      size="sm"
                      verified={
                        user.status === 'verified'
                      }
                    />

                    <div>
                      <p className="text-sm font-medium">
                        {user.name}
                      </p>

                      <p className="text-xs campus-secondary-text">
                        {user.branch} • {user.year}
                      </p>
                    </div>
                  </div>

                  <button className="campus-plus-button">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// DIRECTORY
// ============================================================

const DirectoryView = ({ profile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('All');
  const [directoryUsers, setDirectoryUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [busyUserId, setBusyUserId] = useState(null);
  const [fetchError, setFetchError] = useState('');

  const currentUserId = profile?._id || profile?.id;

  const loadDirectory = async () => {
    if (!currentUserId) return;

    setLoadingUsers(true);
    setFetchError('');

    try {
      const res = await fetch(
        `${API_BASE_URL}/users/${currentUserId}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Failed to load directory.'
        );
      }

      setDirectoryUsers(data);
    } catch (err) {
      setFetchError(
        err?.message || 'Failed to load directory.'
      );
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadDirectory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  const handleSendRequest = async (toId) => {
    setBusyUserId(toId);

    try {
      const res = await fetch(
        `${API_BASE_URL}/requests/send`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromId: currentUserId,
            toId,
          }),
        }
      );

      if (res.ok) {
        setDirectoryUsers((previous) =>
          previous.map((u) =>
            u._id === toId
              ? { ...u, connectionStatus: 'pending_sent' }
              : u
          )
        );
      }
    } finally {
      setBusyUserId(null);
    }
  };

  const handleCancelRequest = async (toId) => {
    setBusyUserId(toId);

    try {
      const res = await fetch(
        `${API_BASE_URL}/requests/cancel`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromId: currentUserId,
            toId,
          }),
        }
      );

      if (res.ok) {
        setDirectoryUsers((previous) =>
          previous.map((u) =>
            u._id === toId
              ? { ...u, connectionStatus: 'none' }
              : u
          )
        );
      }
    } finally {
      setBusyUserId(null);
    }
  };

  const filteredUsers = directoryUsers.filter((user) => {
    const name = user.name?.toLowerCase() || '';
    const rollNo = user.rollNo?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    const matchSearch =
      name.includes(search) || rollNo.includes(search);

    const matchBranch =
      filterBranch === 'All' || user.branch === filterBranch;

    return matchSearch && matchBranch;
  });

  const renderActionButton = (user) => {
    const isBusy = busyUserId === user._id;

    if (user.connectionStatus === 'friends') {
      return (
        <Button
          variant="secondary"
          className="flex-1 gap-1"
          disabled
        >
          <UserCheck className="w-4 h-4" />
          Friends
        </Button>
      );
    }

    if (user.connectionStatus === 'pending_sent') {
      return (
        <Button
          variant="danger"
          className="flex-1 gap-1"
          disabled={isBusy}
          onClick={() => handleCancelRequest(user._id)}
        >
          <UserX className="w-4 h-4" />
          {isBusy ? 'Cancelling...' : 'Cancel Request'}
        </Button>
      );
    }

    if (user.connectionStatus === 'pending_received') {
      return (
        <Button
          variant="secondary"
          className="flex-1 gap-1"
          disabled
        >
          <Clock className="w-4 h-4" />
          Check Notifications
        </Button>
      );
    }

    return (
      <Button
        className="flex-1 gap-1"
        disabled={isBusy}
        onClick={() => handleSendRequest(user._id)}
      >
        <UserPlus className="w-4 h-4" />
        {isBusy ? 'Sending...' : 'Send Request'}
      </Button>
    );
  };

  return (
    <div className="campus-section">
      <div className="campus-page-header">
        <div>
          <h1 className="campus-page-title">
            Student Directory
          </h1>

          <p className="campus-secondary-text">
            Find and connect with peers across the campus.
          </p>
        </div>

        <div className="campus-controls">
          <div className="relative flex-1 md:w-64">
            <Search className="campus-search-icon" />

            <input
              type="text"
              placeholder="Search by name or roll no..."
              className="campus-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="campus-select"
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
          >
            <option>All</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>MECH</option>
            <option>CIVIL</option>
          </select>
        </div>
      </div>

      {fetchError && (
        <div className="campus-error-box">{fetchError}</div>
      )}

      {loadingUsers ? (
        <div className="text-center py-12 campus-secondary-text">
          Loading directory...
        </div>
      ) : (
        <div className="campus-grid cc-stagger-grid">
          {filteredUsers.map((user) => (
            <Card
              key={user._id}
              className="campus-student-card cc-hover-lift"
            >
              <Avatar
                src={user.avatar}
                alt={user.name}
                size="lg"
                verified
              />

              <h3 className="font-semibold text-lg mt-3">
                {user.name}
              </h3>

              <p className="text-sm campus-secondary-text font-mono mt-1">
                {user.rollNo}
              </p>

              <div className="flex gap-2 mt-3">
                <Badge variant="primary">{user.branch}</Badge>
              </div>

              <div className="mt-6 w-full flex gap-2">
                {renderActionButton(user)}
              </div>
            </Card>
          ))}

          {filteredUsers.length === 0 && (
            <div className="col-span-full text-center py-12 campus-secondary-text">
              No verified students found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================
// MARKETPLACE
// ============================================================

const MarketplaceView = ({
  items,
  profile,
  setMarketItems,
}) => {
  const [showAdd, setShowAdd] =
    useState(false);

  const [newItem, setNewItem] = useState({
    title: '',
    price: '',
    condition: 'Like New',
    description: '',
    category: 'Books',
  });

  const handleAdd = (e) => {
    e.preventDefault();

    const newDoc = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(),

      ...newItem,

      price: Number(newItem.price),

      sellerName: profile.name,

      createdAt: Date.now(),
    };

    setMarketItems((previous) => [
      newDoc,
      ...previous,
    ]);

    setShowAdd(false);

    setNewItem({
      title: '',
      price: '',
      condition: 'Like New',
      description: '',
      category: 'Books',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="campus-page-title">
            Campus Marketplace
          </h1>

          <p className="campus-secondary-text">
            Buy and sell items within the college.
          </p>
        </div>

        <Button
          onClick={() => setShowAdd(!showAdd)}
          className="gap-2"
        >
          {showAdd ? (
            <X className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}

          {showAdd ? 'Cancel' : 'Sell Item'}
        </Button>
      </div>

      {showAdd && (
        <Card className="campus-market-form">
          <h2 className="campus-card-heading mb-4">
            List a New Item
          </h2>

          <form
            onSubmit={handleAdd}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Item Title"
                required
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    title: e.target.value,
                  })
                }
              />

              <Input
                label="Price (₹)"
                type="number"
                min="0"
                required
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    price: e.target.value,
                  })
                }
              />

              <div className="space-y-1">
                <label className="campus-input-label">
                  Category
                </label>

                <select
                  className="campus-select w-full h-10"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      category: e.target.value,
                    })
                  }
                >
                  <option>Books</option>
                  <option>Electronics</option>
                  <option>Stationery</option>
                  <option>Hostel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="campus-input-label">
                  Condition
                </label>

                <select
                  className="campus-select w-full h-10"
                  value={newItem.condition}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      condition: e.target.value,
                    })
                  }
                >
                  <option>Brand New</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="campus-input-label">
                Description
              </label>

              <textarea
                className="campus-textarea"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>

            <Button type="submit">
              Post Listing
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col overflow-hidden"
          >
            <div className="h-48 campus-image-placeholder relative">
              <ImageIcon className="w-12 h-12 opacity-30" />

              <Badge className="absolute top-2 right-2">
                {item.category}
              </Badge>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg leading-tight line-clamp-2">
                  {item.title}
                </h3>

                <span className="campus-price whitespace-nowrap ml-2">
                  ₹{item.price}
                </span>
              </div>

              <p className="text-sm campus-secondary-text mb-4 line-clamp-2 flex-1">
                {item.description}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <Avatar
                  alt={item.sellerName}
                  size="sm"
                />

                <span className="text-xs font-medium campus-secondary-text">
                  {item.sellerName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-auto">
                <Button
                  variant="secondary"
                  className="w-full text-xs"
                >
                  View Details
                </Button>

                <Button className="w-full text-xs gap-1">
                  <MessageSquare className="w-3 h-3" />
                  Contact
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// ADMIN PANEL
// ============================================================

const AdminView = ({
  usersList,
  setUsersList,
}) => {
  const pendingUsers = usersList.filter(
    (user) => user.status === 'pending'
  );

  const verifiedUsers = usersList.filter(
    (user) => user.status === 'verified'
  );

  const handleVerify = (userId) => {
    setUsersList((previous) =>
      previous.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: 'verified',
            }
          : user
      )
    );
  };

  const handleReject = (userId) => {
    setUsersList((previous) =>
      previous.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: 'rejected',
            }
          : user
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="campus-page-title flex items-center gap-2">
          <Shield className="campus-accent-icon" />
          Admin Dashboard
        </h1>

        <p className="campus-secondary-text">
          Manage user verifications and platform settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="campus-stat-card campus-stat-indigo">
          <h3 className="campus-secondary-text text-sm font-medium">
            Total Users
          </h3>

          <p className="text-3xl font-bold mt-2">
            {usersList.length}
          </p>
        </Card>

        <Card className="campus-stat-card campus-stat-amber">
          <h3 className="campus-secondary-text text-sm font-medium">
            Pending Verifications
          </h3>

          <p className="text-3xl font-bold mt-2">
            {pendingUsers.length}
          </p>
        </Card>

        <Card className="campus-stat-card campus-stat-green">
          <h3 className="campus-secondary-text text-sm font-medium">
            Verified Students
          </h3>

          <p className="text-3xl font-bold mt-2">
            {verifiedUsers.length}
          </p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="campus-admin-header">
          <h3 className="font-bold text-lg">
            Pending Approvals
          </h3>
        </div>

        <div className="divide-y campus-divider">
          {pendingUsers.length === 0 ? (
            <div className="p-8 text-center campus-secondary-text">
              No pending verifications.
            </div>
          ) : (
            pendingUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="md"
                  />

                  <div>
                    <h4 className="font-bold">
                      {user.name}
                    </h4>

                    <p className="text-sm campus-secondary-text">
                      {user.email} • {user.rollNo}
                    </p>

                    <div className="flex gap-2 mt-1">
                      <Badge>{user.branch}</Badge>
                      <Badge>
                        {user.year} Year
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    className="gap-1"
                  >
                    <FileText className="w-4 h-4" />
                    View ID Card
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      handleReject(user.id)
                    }
                  >
                    Reject
                  </Button>

                  <Button
                    className="campus-approve-button"
                    onClick={() =>
                      handleVerify(user.id)
                    }
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// PROFILE
// ============================================================

const ProfileView = ({ profile }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="overflow-hidden">
        <div className="campus-cover">
          <Button
            variant="glass"
            size="sm"
            className="absolute top-4 right-4 gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Edit Cover
          </Button>
        </div>

        <div className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end -mt-16 mb-4 gap-4">
            <Avatar
              src={profile?.avatar}
              alt={profile?.name}
              size="lg"
              verified={
                profile?.status === 'verified'
              }
              className="campus-profile-avatar"
            />

            <div className="flex gap-2">
              <Button variant="secondary">
                Share Profile
              </Button>

              <Button>
                Edit Profile
              </Button>
            </div>
          </div>

          <div>
            <h1 className="campus-profile-name">
              {profile?.name}
            </h1>

            <p className="campus-profile-subtitle">
              {profile?.branch} Engineering Student
            </p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm campus-secondary-text">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {profile?.rollNo}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {profile?.year || 'Student'} Year
              </span>

              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Main Campus
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="campus-card-heading mb-4">
              About
            </h3>

            <p className="campus-card-description">
              Passionate engineering student focused on
              full-stack development and system
              architecture. Always eager to learn new
              technologies and collaborate on exciting
              projects.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="campus-card-heading mb-4">
              Experience & Projects
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="campus-experience-icon">
                  <Briefcase className="w-6 h-6 campus-accent-icon" />
                </div>

                <div>
                  <h4 className="font-bold">
                    Frontend Developer Intern
                  </h4>

                  <p className="text-sm campus-secondary-text">
                    TechCorp Inc. • Summer 2026
                  </p>

                  <p className="text-sm mt-2 campus-card-description">
                    Developed responsive web applications
                    using React and Tailwind CSS. Improved
                    performance metrics by 20%.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="campus-card-heading mb-4">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {[
                'React',
                'JavaScript',
                'Node.js',
                'Python',
                'C++',
                'UI/UX Design',
                'MongoDB',
              ].map((skill) => (
                <Badge key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="campus-card-heading mb-4">
              Mutual Connections
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                <Avatar alt="A" size="sm" />
                <Avatar alt="B" size="sm" />
                <Avatar alt="C" size="sm" />
              </div>

              <span className="text-sm campus-secondary-text ml-2">
                12 mutual connections
              </span>
            </div>

            <Button
              variant="ghost"
              className="w-full text-sm"
            >
              View Connections
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// CHAT (friend requests + messaging with accepted connections)
// ============================================================

const ChatView = ({ profile, markFriendRead }) => {
  const currentUserId = profile?._id || profile?.id;

  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const loadFriends = async () => {
    if (!currentUserId) return;

    try {
      const friendRes = await fetch(
        `${API_BASE_URL}/friends/${currentUserId}`
      );

      const friendData = await friendRes.json();

      setFriends(
        Array.isArray(friendData) ? friendData : []
      );
    } catch (err) {
      // silent fail on background poll
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFriends();

    const interval = setInterval(loadFriends, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  const loadMessages = async (friendId) => {
    if (!currentUserId || !friendId) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/messages/${currentUserId}/${friendId}`
      );

      const data = await res.json();

      if (res.ok) setMessages(data);

      markFriendRead?.(friendId);
    } catch (err) {
      // silent fail on background poll
    }
  };

  useEffect(() => {
    if (!selectedFriend) return;

    loadMessages(selectedFriend._id);

    const interval = setInterval(
      () => loadMessages(selectedFriend._id),
      3000
    );

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFriend]);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    markFriendRead?.(friend._id);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!messageText.trim() || !selectedFriend) return;

    setSending(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/messages/send`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromId: currentUserId,
            toId: selectedFriend._id,
            text: messageText,
          }),
        }
      );

      if (res.ok) {
        setMessageText('');
        loadMessages(selectedFriend._id);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="campus-section">
      <div className="campus-page-header">
        <div>
          <h1 className="campus-page-title">Messages</h1>

          <p className="campus-secondary-text">
            Chat with connections who accepted your request.
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        style={{ minHeight: '520px' }}
      >
        <Card className="p-0 overflow-hidden md:col-span-1 flex flex-col">
          <div
            style={{
              padding: '0.85rem 1rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              borderBottom:
                '1px solid rgba(120,120,120,0.15)',
            }}
          >
            Friends
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading && (
              <div className="p-6 text-center campus-secondary-text text-sm">
                Loading...
              </div>
            )}

            {!loading &&
              (friends.length === 0 ? (
                <div className="p-6 text-center campus-secondary-text text-sm">
                  No connections yet. Send a request from
                  the Directory. Accepted requests show up
                  here automatically.
                </div>
              ) : (
                friends.map((friend) => (
                  <button
                    key={friend._id}
                    onClick={() =>
                      handleSelectFriend(friend)
                    }
                    className="w-full flex items-center gap-3 p-3 hover:opacity-80 text-left"
                    style={{
                      background:
                        selectedFriend?._id === friend._id
                          ? 'rgba(79,70,229,0.1)'
                          : 'transparent',
                    }}
                  >
                    <Avatar
                      alt={friend.name}
                      size="sm"
                      verified
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {friend.name}
                      </p>

                      <p className="text-xs campus-secondary-text truncate">
                        {friend.rollNo}
                      </p>
                    </div>
                  </button>
                ))
              ))}
          </div>
        </Card>

        <Card className="p-0 overflow-hidden md:col-span-2 flex flex-col">
          {!selectedFriend ? (
            <div className="flex-1 flex items-center justify-center campus-secondary-text text-sm p-6 text-center">
              Select a connection to start chatting.
            </div>
          ) : (
            <>
              <div
                className="flex items-center gap-3 p-4"
                style={{
                  borderBottom: '1px solid rgba(120,120,120,0.15)',
                }}
              >
                <Avatar
                  alt={selectedFriend.name}
                  size="sm"
                  verified
                />

                <div>
                  <p className="font-medium">
                    {selectedFriend.name}
                  </p>

                  <p className="text-xs campus-secondary-text">
                    {selectedFriend.rollNo}
                  </p>
                </div>
              </div>

              <div
                className="flex-1 overflow-y-auto p-4 space-y-3"
                style={{ minHeight: '360px' }}
              >
                {messages.length === 0 ? (
                  <p className="campus-secondary-text text-sm text-center mt-8">
                    No messages yet. Say hi!
                  </p>
                ) : (
                  messages.map((msg) => {
                    const isMine =
                      msg.from === currentUserId ||
                      msg.from?._id === currentUserId;

                    return (
                      <div
                        key={msg._id}
                        style={{
                          display: 'flex',
                          justifyContent: isMine
                            ? 'flex-end'
                            : 'flex-start',
                        }}
                      >
                        <div
                          className="cc-pop-in"
                          style={{
                            maxWidth: '70%',
                            padding: '0.5rem 0.85rem',
                            borderRadius: '1rem',
                            background: isMine
                              ? 'var(--accent, #16836f)'
                              : 'rgba(120,120,120,0.15)',
                            color: isMine ? '#fff' : 'inherit',
                          }}
                        >
                          <p className="text-sm">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form
                onSubmit={handleSend}
                className="flex gap-2 p-3"
                style={{
                  borderTop: '1px solid rgba(120,120,120,0.15)',
                }}
              >
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) =>
                    setMessageText(e.target.value)
                  }
                  placeholder="Type a message..."
                  className="campus-search-input flex-1"
                />

                <Button
                  type="submit"
                  disabled={sending}
                  className="gap-1"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

// ============================================================
// COMING SOON
// ============================================================

const ComingSoonView = ({ currentView }) => {
  const title =
    currentView.charAt(0).toUpperCase() +
    currentView.slice(1);

  return (
    <div className="campus-coming-soon">
      <div className="campus-coming-soon-icon">
        <Clock className="w-10 h-10 campus-accent-icon" />
      </div>

      <h2 className="campus-page-title">
        Coming Soon
      </h2>

      <p className="campus-secondary-text max-w-md">
        The {title} module is under active development
        and will be available in the next release.
      </p>
    </div>
  );
};