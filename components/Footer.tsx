'use client';

import { useState } from 'react';
import FadeInOnScroll from './FadeInOnScroll';

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setName('');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-[#22242A] px-4 md:px-8 py-16  w-full overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className='block xl:flex'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Left Column - Feedback Form */}
            <FadeInOnScroll direction="left">
              <div className="border border-none border-opacity-40 xl:mx-0 mx-3 rounded-3xl p-8 backdrop-blur-sm bg-[#17181C] bg-opacity-60">
                <p className="text-[#0D9488] text-md font-medium uppercase tracking-wider mb-4">Feedback</p>
                <h3 className="text-2xl font-black text-white mb-6 leading-tight">
                  Seeking personalized support?{' '}
                  <span className="text-white">Request a message from our team</span>
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="YOUR NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border border-[#334155] rounded-2xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-[#0D9488] transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="MAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-[#334155] rounded-2xl px-4 py-3 text-sm text-[gray-300] placeholder-gray-600 outline-none focus:border-[#0D9488] transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-40 bg-[#14B8A6] hover:bg-[#0D9488] disabled:bg-gray-500 text-white py-3 rounded-full text-md font-medium transition-colors duration-300"
                  >
                    {isLoading ? 'Sending...' : 'Send a request'}
                  </button>
                </form>

                <p className="text-gray-500 text-xs mt-6 underline cursor-pointer hover:text-gray-400">
                  Privacy
                </p>
              </div>
            </FadeInOnScroll>

            {/* Middle Column - Info & Contact */}
            <FadeInOnScroll delay={100}>
              <div className="space-y-12 xl:mx-0 mx-3">
                {/* INFO Section */}
                <div>
                  <p className="text-[#0D9488] text-md font-medium uppercase tracking-wider mb-4">INFO</p>
                  <ul className="space-y-2">
                    {['Company', 'Products', 'Pricing', 'Services'].map((link) => (
                      <li key={link}>
                        <a
                          href={`/${link.toLowerCase()}`}
                          className="text-gray-300 text-sm hover:text-white transition-colors duration-300"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CONTACT US Section */}
                <div>
                  <p className="text-[#0D9488] text-md font-medium uppercase tracking-wider mb-4">CONTACT US</p>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm">+1 (999) 999-99-99</p>
                    <p className="text-gray-300 text-sm">support@providiustech.com</p>
                    <p className="text-gray-300 text-sm">Lagos</p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Right Column - About Us and Logo */}
            <FadeInOnScroll direction="right">
              <div className="flex xl:flex-col flex-row xl:mx-0 mx-3xl;mt-0   float-right mt-[-170px] justify-between h-full">
                {/* ABOUT US Section */}
                <div>
                  <p className="text-[#0D9488] text-md font-medium uppercase tracking-wider mb-4">ABOUT US</p>
                  <ul className="space-y-2">
                    {['Our Team', 'Contacts'].map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-300 text-sm hover:text-white transition-colors duration-300"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Glowing Logo Container */}



              </div>
            </FadeInOnScroll>
          </div>
          <img
            src="/Plogo.png"
            alt="ProvidiusTech Logo"
            className="w-14 h-14 xl:block hidden object-contain drop-shadow-lg"
          />
        </div>

        {/* Social Links */}
        <FadeInOnScroll>
          <div className="flex items-center justify-center mb-4 gap-6 xl:mb-12 mt-[-140px] pt-12 ">
            {[
              { icon: 'facebook', href: '#', label: 'Facebook' },
              { icon: 'instagram', href: '#', label: 'Instagram' },
              { icon: 'youtube', href: '#', label: 'YouTube' },
              { icon: 'twitter', href: '#', label: 'Twitter' },
            ].map((social) => (
              <a
                key={social.icon}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 rounded-full border border-[#334155] flex items-center justify-center text-gray-400 hover:text-[#0D9488] hover:border-[#0D9488] transition-all duration-300 hover:bg-[#0D9488] hover:bg-opacity-10"
              >
                {social.icon === 'facebook' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
                {social.icon === 'instagram' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                )}
                {social.icon === 'youtube' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.175h-15.23c-2.432 0-4.385 1.953-4.385 4.385v9.88c0 2.432 1.953 4.385 4.385 4.385h15.23c2.432 0 4.385-1.953 4.385-4.385v-9.88c0-2.432-1.953-4.385-4.385-4.385zm-8.307 11.613v-5.872l4.631 2.936-4.631 2.936z" />
                  </svg>
                )}
                {social.icon === 'twitter' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </FadeInOnScroll>

        {/* Copyright */}
      <FadeInOnScroll>
        <p className="text-center text-gray-500 mb-10 xl:mt-[10px] text-xs">© 2026 Copyright ProvidiusTech. All rights reserved.</p>
      </FadeInOnScroll>
      </div>
    </footer>
  );
}
