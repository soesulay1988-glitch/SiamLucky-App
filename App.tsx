import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, ShieldCheck, Zap, Star, ArrowRight, CreditCard, 
  Copy, Check, QrCode, Upload, Headphones, Sparkles, 
  Shield, User, Calendar, RefreshCw
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const VIPUpgrade: React.FC = () => {
  const { t, language } = useLanguage();
  const [userName, setUserName] = useState('');
  const [isVip, setIsVip] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const status = localStorage.getItem('vip_status');
    const savedName = localStorage.getItem('vip_user_name');
    if (status === 'active') {
      setIsVip(true);
      if (savedName) setUserName(savedName);
    }
  }, []);

  const features = [
    { icon: <Zap size={18} />, text: 'Instant Lucky Number Feed' },
    { icon: <Star size={18} />, text: 'Exclusive 3D Calculation Charts' },
    { icon: <ShieldCheck size={18} />, text: 'Private Community Access' },
    { icon: <Crown size={18} />, text: 'No-Ad Premium Experience' },
  ];

  const paymentMethods = [
    { 
      id: 'kpay', 
      name: 'K Pay', 
      number: '09-770001688', 
      qr: 'https://placehold.co/400x400/white/black?text=Kpay+QR' 
    },
    { 
      id: 'wave', 
      name: 'Wave Money', 
      number: '09-770001688', 
      qr: 'https://placehold.co/400x400/white/black?text=Wave+QR' 
    },
    { 
      id: 'thai', 
      name: 'Thai Bank (PromptPay)', 
      number: '0xx-xxx-xxxx', 
      qr: 'https://placehold.co/400x400/white/black?text=Thai+Bank+QR' 
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVerifyPayment = () => {
    if (!userName.trim()) {
      alert(language === 'mm' ? 'ကျေးဇူးပြု၍ နာမည်ရိုက်ထည့်ပါ' : 'Please enter your name first');
      return;
    }
    setIsVerifying(true);
    
    // Log transaction for Admin Dashboard
    const newTx = {
      id: `TX-${Math.floor(Math.random() * 9000 + 1000)}`,
      user: userName,
      amount: '฿ 1,200',
      method: 'ThaiBank',
      status: 'Completed',
      timestamp: Date.now()
    };
    const existingTxs = JSON.parse(localStorage.getItem('pending_transactions') || '[]');
    localStorage.setItem('pending_transactions', JSON.stringify([newTx, ...existingTxs]));

    // Simulate AI verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsVip(true);
      localStorage.setItem('vip_status', 'active');
      localStorage.setItem('vip_user_name', userName);
    }, 3500);
  };

  if (isVip) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8 pb-20"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-black text-shimmer-gold uppercase italic tracking-tighter">Active VIP Status</h2>
          <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Official Royal Member</p>
        </div>

        {/* Digital VIP Card */}
        <div className="relative group perspective-1000">
           <div className="relative w-full aspect-[1.586/1] bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 rounded-[2.5rem] p-0.5 shadow-[0_0_50px_rgba(212,175,55,0.6)] overflow-hidden">
              <div className="w-full h-full bg-navy-900 rounded-[2.4rem] p-8 relative overflow-hidden backdrop-blur-3xl shadow-inner">
                 {/* Card Accents */}
                 <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl animate-pulse"></div>
                 <div className="absolute top-0 right-0 p-8">
                    <Shield size={40} className="text-gold-500/20 rotate-12" />
                 </div>
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gold-500/5 to-transparent"></div>

                 {/* Card Content */}
                 <div className="h-full flex flex-col justify-between relative z-10">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center p-0.5 shadow-lg shadow-gold-500/20">
                             <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center text-gold-500">
                                <Crown size={28} />
                             </div>
                          </div>
                          <div>
                             <h4 className="text-lg font-display font-black text-shimmer-gold uppercase tracking-tighter">Royal Elite</h4>
                             <p className="text-[8px] font-black text-gold-500/60 uppercase tracking-[0.3em]">SiamLuck Premium</p>
                          </div>
                       </div>
                       <Sparkles className="text-gold-500/40" />
                    </div>

                    <div className="space-y-4">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Card Holder</span>
                          <span className="text-xl font-display font-black text-white tracking-widest uppercase">{userName || (language === 'mm' ? 'တော်ဝင်အဖွဲ့ဝင် #၄၅၂' : 'Royal Member #452')}</span>
                       </div>
                       
                       <div className="flex items-center gap-12">
                          <div className="flex flex-col">
                             <span className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-1">Status</span>
                             <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,1)]"></div>
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Global Verified</span>
                             </div>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-1">Exps. Date</span>
                             <span className="text-[9px] font-black text-white uppercase tracking-widest">31 DEC 2026</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Card Shadow/Glow Background */}
           <div className="absolute -inset-10 bg-gold-500/10 blur-[100px] -z-10 rounded-full opacity-50"></div>
        </div>

        <div className="glass-card p-8 border-white/5 space-y-6 text-center">
           <p className="text-sm text-white/60 font-mm leading-relaxed">
              Congratulations! You are now a verified VIP member. All premium prediction feeds and charts are now unlocked for your account.
           </p>
           <button 
             onClick={() => {
                localStorage.removeItem('vip_status');
                localStorage.removeItem('vip_user_name');
                setIsVip(false);
                setUserName('');
             }}
             className="text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-red-500 transition-colors"
           >
              (Dev Only: Reset Status)
           </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 pb-20"
    >
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-600/20 to-navy-900 border border-gold-500/30 p-8 text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            className="w-16 h-16 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <Crown size={32} className="text-navy-900" />
          </motion.div>
          
          <h2 className="text-3xl font-display font-black text-gold-400 tracking-tight mb-2 uppercase">VIP UPGRADE</h2>
          <p className="text-white/60 font-mm text-sm max-w-[240px] mx-auto leading-relaxed">
            Unlock Premium Features & Elite Predictions
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="glass-card p-8 border-white/5 space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-black text-white tracking-tight uppercase italic">{language === 'mm' ? 'VIP အဆင့်မြှင့်တင်ရန်' : 'Upgrade to Royal VIP'}</h3>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
            Choose your preferred payment method below
          </p>
        </div>

        {/* User Info Section */}
        <div className="space-y-4">
           <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2 block">
             1. Enter Your Full Name
           </label>
           <div className="relative group">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold-500 transition-colors" />
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={language === 'mm' ? 'သင်၏နာမည်ကို ရိုက်ထည့်ပါ...' : 'Enter your name for card...'}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white font-bold focus:border-gold-500/50 outline-none transition-all placeholder:text-white/10"
              />
           </div>
        </div>

        {/* Payment Cards */}
        <div className="grid grid-cols-1 gap-6">
          <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2 block -mb-2">
             2. Transfer & Save Receipt
          </label>
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex items-center gap-6 group hover:bg-white/[0.05] transition-all">
               <div className="w-24 h-24 bg-white p-2 rounded-2xl flex-shrink-0">
                  <img src={method.qr} alt="QR Code" className="w-full h-full object-contain" />
               </div>
               <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                     <h4 className="text-sm font-black text-gold-500 uppercase tracking-widest">{method.name}</h4>
                     <QrCode size={14} className="text-white/20" />
                  </div>
                  <div className="bg-black/40 px-4 py-2 rounded-xl flex items-center justify-between group/copy">
                     <span className="text-xs font-display font-black text-white/80">{method.number}</span>
                     <button 
                       onClick={() => copyToClipboard(method.number, method.id)}
                       className="text-white/20 hover:text-gold-500 transition-colors"
                     >
                        {copiedId === method.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                     </button>
                  </div>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-tighter">Available 24/7</p>
               </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2 block">
             3. Submit Slip for AI Verification
          </label>
          <div className="relative group">
             <input 
               type="file" 
               id="receipt-upload" 
               className="hidden" 
               onChange={handleVerifyPayment}
               disabled={isVerifying}
               accept="image/*"
             />
             <label 
               htmlFor="receipt-upload"
               className={`w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 cursor-pointer hover:bg-white/10 transition-all ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
                {isVerifying ? (
                  <RefreshCw size={18} className="animate-spin text-gold-500" />
                ) : (
                  <Upload size={18} className="text-gold-500" />
                )}
                {isVerifying ? 'AI is verifying your transaction...' : 'Upload Thai/Local Bank Slip'}
             </label>
          </div>
          
          <button 
            onClick={() => window.open('https://t.me/Aung007t', '_blank')}
            className="w-full bg-gradient-to-r from-gold-600 to-gold-400 p-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95 transition-all group"
          >
            <Headphones size={20} className="text-navy-900 group-hover:rotate-12 transition-transform" />
            <span className="font-mm font-black text-navy-900 uppercase tracking-widest text-xs">Contact Admin Support</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 opacity-40">
          <p className="text-center text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Secure Verification System</p>
          <div className="flex justify-center gap-6">
             {features.map((f, i) => (
                <div key={i} className="text-gold-500">{f.icon}</div>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
