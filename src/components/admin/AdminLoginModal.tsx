import React, { useState } from 'react';
import { X, Lock, ShieldCheck, User, ArrowRight, KeyRound, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (adminName: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  // Pre-filled credentials as requested for trial
  const [name, setName] = useState('Jane Doe');
  const [username, setUsername] = useState('janedoe@mail.com');
  const [password, setPassword] = useState('bloom-master-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!username.trim()) {
      setError('Please enter username.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(name);
    }, 350);
  };

  const handleQuickLogin = () => {
    setName('Jane Doe');
    setUsername('janedoe@mail.com');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Jane Doe');
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f6] rounded-none shadow-2xl max-w-lg w-full overflow-hidden border border-[#c9acac]/60 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pink Header matching navbar & shop header */}
        <div className="bg-[#c9acac] p-6 text-[#231f1d] flex items-center justify-between border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-none bg-white/70 flex items-center justify-center text-[#231f1d] border border-black/10 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#8a5d5d]" />
            </div>
            <h3 className="font-serif font-bold text-xl md:text-2xl text-[#231f1d] tracking-tight">
              Admin Sign In
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-none bg-white/80 hover:bg-white text-[#231f1d] border border-black/10 shadow-2xs transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body with Ethereal Floral Background */}
        <div className="relative p-6 md:p-8 overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/assets/aistudio/image_7ea3853a.png"
              alt=""
              className="w-full h-full object-cover object-center"
            />
            {/* Soft translucent veil overlay for crisp readability */}
            <div className="absolute inset-0 bg-[#faf8f6]/85" />
          </div>

          {/* Form Content on top of background */}
          <div className="relative z-10 space-y-6">
            {/* Trial Notice Callout with KeyRound Icon */}
            <div className="p-4 bg-white/90 backdrop-blur-xs rounded-none border border-[#c9acac]/50 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#8a5d5d]">
                <KeyRound className="w-4 h-4 text-[#8a5d5d]" />
                <span>Trial Mode · Credentials Pre-Filled</span>
              </div>
              <p className="font-serif text-xs text-[#5c4b46] leading-relaxed">
                Your trial name, username, and password have been placed below for instant access to the Order Tracking & Management Dashboard.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-serif">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#544541] mb-1 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#8a5d5d]" />
                  <span>Admin Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 text-xs font-serif bg-white/95 border border-black/15 rounded-none focus:outline-none focus:border-[#231f1d] focus:ring-1 focus:ring-[#231f1d] shadow-2xs"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#544541] mb-1 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8a5d5d]" />
                  <span>Username / Email</span>
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="janedoe@mail.com"
                  className="w-full px-3.5 py-2.5 text-xs font-serif bg-white/95 border border-black/15 rounded-none focus:outline-none focus:border-[#231f1d] focus:ring-1 focus:ring-[#231f1d] shadow-2xs"
                />
              </div>

              {/* Password (with view eye icon, readOnly in trial mode, without 'Fixed for Trial Mode' text) */}
              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#544541] mb-1 font-semibold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#8a5d5d]" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    readOnly
                    value={password}
                    title="Password cannot be edited in trial mode"
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs font-serif bg-[#f3efec]/95 border border-black/15 rounded-none cursor-not-allowed select-none text-[#544541] focus:outline-none shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#786460] hover:text-[#231f1d] p-1 cursor-pointer transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'View password'}
                    title={showPassword ? 'Hide password' : 'View password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 text-xs md:text-sm font-serif font-bold text-[#231f1d] bg-[#c9acac] hover:bg-[#bda0a0] rounded-none border border-black/10 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs disabled:opacity-60"
                >
                  <span>{isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="px-4 py-3 text-xs font-serif text-[#544541] bg-white/95 hover:bg-white border border-black/15 rounded-none transition-colors cursor-pointer shadow-2xs font-semibold"
                >
                  Instant Enter
                </button>
              </div>
            </form>

            <div className="pt-2 border-t border-black/10 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-serif text-[#786460] hover:text-[#231f1d] underline cursor-pointer"
              >
                ← Cancel & Return to Flowerbed Co. Storefront
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
