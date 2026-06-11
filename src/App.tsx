import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import WorkbooksPage from './pages/WorkbooksPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CareersPage from './pages/CareersPage';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminPage from './pages/AdminPage';
import WishlistPage from './pages/WishlistPage';
import { NotFoundPage } from './pages/NotFoundPage';
import ContactPage from './pages/ContactPage';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/CustomCursor';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);

    // Override pushState to listen to programmatically triggered route changes
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  const isCheckout = currentPath.toLowerCase().includes('checkout');
  const isWorkbooks = currentPath.toLowerCase().includes('workbooks') || currentPath.toLowerCase().includes('workhooks') || currentPath.toLowerCase().includes('collection');
  const isProduct = currentPath.toLowerCase().includes('product');
  const isPrivacy = currentPath.toLowerCase().includes('privacy');
  const isCareers = currentPath.toLowerCase().includes('careers') || currentPath.toLowerCase().includes('career');
  const isRegister = currentPath.toLowerCase().includes('register') || currentPath.toLowerCase().includes('signup') || currentPath.toLowerCase().includes('create-account');
  const isLogin = currentPath.toLowerCase().includes('login') || currentPath.toLowerCase().includes('signin');
  const isAbout = currentPath.toLowerCase().includes('about');
  const isContact = currentPath.toLowerCase().includes('contact');
  const isProfile = currentPath.toLowerCase().includes('profile') || currentPath.toLowerCase().includes('account') || currentPath.toLowerCase().includes('dashboard');
  const isCart = currentPath.toLowerCase().includes('cart');
  const isForgotPassword = currentPath.toLowerCase().includes('forgot-password');
  const isAdmin = currentPath.toLowerCase().includes('admin');
  const isWishlist = currentPath.toLowerCase().includes('wishlist');
  const isHome = currentPath === '/' || currentPath === '' || currentPath.toLowerCase() === '/home';

  return (
    <AuthProvider>
      <CartProvider>
        <CursorProvider>
        <CustomCursor />
        {isCheckout ? (
          <CheckoutPage />
        ) : isProduct ? (
          <ProductDetailPage />
        ) : isWorkbooks ? (
          <WorkbooksPage />
        ) : isPrivacy ? (
          <PrivacyPolicyPage />
        ) : isCareers ? (
          <CareersPage />
        ) : isRegister ? (
          <CreateAccountPage />
        ) : isLogin ? (
          <LoginPage />
        ) : isAbout ? (
          <AboutPage />
        ) : isContact ? (
          <ContactPage />
        ) : isProfile ? (
          <ProfilePage />
        ) : isCart ? (
          <CartPage />
        ) : isForgotPassword ? (
          <ForgotPasswordPage />
        ) : isAdmin ? (
          <AdminPage />
        ) : isWishlist ? (
          <WishlistPage />
        ) : isHome ? (
          <LandingPage />
        ) : (
          <NotFoundPage />
        )}
        </CursorProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
