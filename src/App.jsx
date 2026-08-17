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
} from 'lucide-react';

// ============================================================
// CONFIGURATION
// ============================================================

const API_BASE_URL = 'http://campusconnect-backend-mr1u.onrender.com/api';

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

 // Change these from dummy data to empty arrays
  const [usersList, setUsersList] = useState([]);
  const [marketItems, setMarketItems] = useState([]);
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

 const handleLogin = async (userData) => {
    if (userData === 'admin') {
      setProfile({ id: 'admin1', name: 'Admin Portal', role: 'admin', status: 'verified', branch: 'Admin', year: 'Staff', rollNo: 'ADMIN001' });
    } else {
      setProfile(userData); 
    }
    
    // --- NEW: FETCH ALL REAL DATA FROM MONGODB ---
    try {
      // Fetch Real Users
      const usersRes = await fetch('http://campusconnect-backend-mr1u.onrender.com/api/users');
      const realUsers = await usersRes.json();
      setUsersList(realUsers);

      // Fetch Real Marketplace Items
      const marketRes = await fetch('http://campusconnect-backend-mr1u.onrender.com/api/marketplace');
      const realMarketItems = await marketRes.json();
      setMarketItems(realMarketItems);
    } catch (error) {
      console.error("Failed to fetch database data:", error);
    }

    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setProfile(null);
    setCurrentView('landing');
  };

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
        />
      );
    }

    if (!profile) {
      return (
        <AuthView
          onComplete={handleLogin}
          onBack={() => setCurrentView('landing')}
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
      >

        {currentView === 'dashboard' && (
          <DashboardView
            profile={profile}
            marketItems={marketItems}
            usersList={usersList}
          />
        )}

        {currentView === 'directory' && (
          <DirectoryView usersList={usersList} />
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

        {['notes', 'events', 'chat'].includes(
          currentView
        ) && (
          <ComingSoonView currentView={currentView} />
        )}
      </AppLayout>
    );
  };

  return (
    <div className="campus-root">
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

      <div className="campus-container campus-hero">
        <div className="campus-hero-content">
          <div className="campus-exclusive-badge">
            <span className="campus-status-dot" />
            Exclusive to Your University
          </div>

          <h1 className="campus-hero-title">
            The Ultimate
            <br />
            <span className="campus-gradient-text">
              Student Network
            </span>
          </h1>

          <p className="campus-hero-description">
            Connect with peers, buy & sell on the
            marketplace, access study notes, and discover
            campus events all in one beautifully designed
            platform.
          </p>

          <div className="campus-hero-buttons">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2"
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

        <div className="campus-hero-preview">
          <div className="campus-preview-glow" />

          <Card className="campus-preview-card">
            <div className="campus-preview-user">
              <Avatar
                alt="Tamoghana"
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

const AuthView = ({ onComplete, onBack }) => {
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
    <div className="campus-auth-page">
      <button
        onClick={onBack}
        className="campus-back-button"
      >
        ← Back
      </button>

      <Card className="campus-auth-card">
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

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={otpSent}
          />

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

        <div className="mt-4">
          <Button
            variant="ghost"
            className="w-full text-xs campus-muted-button"
            onClick={() => onComplete('admin')}
            type="button"
          >
            [Developer Fast-Track: Login as Admin]
          </Button>
        </div>

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
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

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
          >
            <Icon className="w-5 h-5" />
            {item.label}
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

            <button className="campus-icon-button campus-notification-button">
              <Bell className="w-5 h-5" />

              <span className="campus-notification-dot" />
            </button>

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

const DirectoryView = ({ usersList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] =
    useState('All');

  const filteredUsers = usersList.filter((user) => {
    const name =
      user.name?.toLowerCase() || '';

    const rollNo =
      user.rollNo?.toLowerCase() || '';

    const search =
      searchTerm.toLowerCase();

    const matchSearch =
      name.includes(search) ||
      rollNo.includes(search);

    const matchBranch =
      filterBranch === 'All' ||
      user.branch === filterBranch;

    return (
      matchSearch &&
      matchBranch &&
      user.status === 'verified'
    );
  });

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
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <select
            className="campus-select"
            value={filterBranch}
            onChange={(e) =>
              setFilterBranch(e.target.value)
            }
          >
            <option>All</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>MECH</option>
            <option>CIVIL</option>
          </select>
        </div>
      </div>

      <div className="campus-grid">
        {filteredUsers.map((user) => (
          <Card
            key={user.id}
            className="campus-student-card"
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
              <Badge variant="primary">
                {user.branch}
              </Badge>

              <Badge>{user.year}</Badge>
            </div>

            <div className="mt-6 w-full flex gap-2">
              <Button
                variant="secondary"
                className="flex-1"
              >
                View
              </Button>

              <Button className="flex-1">
                Connect
              </Button>
            </div>
          </Card>
        ))}

        {filteredUsers.length === 0 && (
          <div className="col-span-full text-center py-12 campus-secondary-text">
            No verified students found.
          </div>
        )}
      </div>
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

  const handleAdd = async (e) => {
    e.preventDefault();
    
    // 1. Send the new item to the Node.js Backend
    try {
      const res = await fetch('http://campusconnect-backend-mr1u.onrender.com/api/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newItem,
          price: Number(newItem.price),
          sellerName: profile.name // Attaches the real logged-in user's name
        })
      });

      if (!res.ok) throw new Error('Failed to post item');
      
      const savedItem = await res.json(); // The item returned from MongoDB with its official ID
      
      // 2. Update the screen with the new MongoDB item
      setMarketItems([savedItem, ...items]);
      setShowAdd(false);
      setNewItem({ title: '', price: '', condition: 'Like New', description: '', category: 'Books' });
      
    } catch (error) {
      alert("Error posting item: " + error.message);
    }
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