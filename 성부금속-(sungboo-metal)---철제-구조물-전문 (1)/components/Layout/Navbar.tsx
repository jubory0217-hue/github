
import React, { useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { Menu, X, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { state } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '서비스', path: '#services' },
    { name: '시공사례', path: '#portfolio' },
    { name: '문의하기', path: '#contact' },
  ];

  const LOGO_IMAGE_URL = "https://postfiles.pstatic.net/MjAyNjAyMDZfMTEx/MDAxNzcwMzgzNzQwMjI5.lBmm_oaMCd4d_ldC9qq9hoSZynndE77znANCGStkVAog.FzUBR7kwf__k5T4F6G7v8r0mDVwBWO8QIadbialWANwg.PNG/KakaoTalk_20221022_202828221_03.png?type=w966";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('#') && location.pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        const offset = 80; // Navbar height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                src={LOGO_IMAGE_URL} 
                alt={state.config.siteName} 
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.path} 
                onClick={(e) => handleScroll(e, link.path)}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: location.hash === link.path ? state.config.primaryColor : 'inherit' }}
              >
                {link.name}
              </a>
            ))}
            <Link 
              to="/admin" 
              className="flex items-center gap-1 px-4 py-2 rounded-full text-white text-sm transition-transform hover:scale-105 shadow-md"
              style={{ backgroundColor: state.config.primaryColor }}
            >
              <Settings size={16} />
              관리자
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-slide-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleScroll(e, link.path)}
                className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-white rounded-lg"
              style={{ backgroundColor: state.config.primaryColor }}
            >
              관리자 설정
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
