
import React, { useState, useMemo } from 'react';
import { useSite } from '../store/SiteContext';
import { Mail, Phone, MapPin, Layout, CheckCircle, AlertCircle, Loader2, ArrowUpRight, Calendar, ShieldCheck, Ruler, Settings2 } from 'lucide-react';

const HomePage: React.FC = () => {
  const { state } = useSite();
  const { config, posts } = state;
  const [formStatus, setFormStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  const categories = ['전체', '계단', '난간', '대문', '복층공사', '철구조물'];
  const BLOG_URL = "https://blog.naver.com/PostList.naver?blogId=sungboo1211&parentCategoryNo=67";

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (!post.isPublished) return false;
      if (activeCategory === '전체') return true;
      return post.category === activeCategory;
    });
  }, [posts, activeCategory]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
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
  };

  const handleFooterCategoryClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    setActiveCategory(category);
    scrollToSection(e, 'portfolio');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('SUBMITTING');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/mbdarvap', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('SUCCESS');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus('IDLE'), 5000);
      } else {
        setFormStatus('ERROR');
      }
    } catch (error) {
      setFormStatus('ERROR');
    }
  };

  return (
    <div className="pt-20 overflow-x-hidden bg-white" style={{ '--primary-color': config.primaryColor } as React.CSSProperties}>
      <style>{`
        .group:hover .group-hover-primary-text { color: var(--primary-color) !important; }
        .group:hover .group-hover-primary-bg { background-color: var(--primary-color) !important; }
        .group:hover .group-hover-primary-border { border-color: var(--primary-color) !important; }
      `}</style>
      
      {/* Hero Section - Left aligned as requested */}
      <section className="relative h-[80vh] flex items-center bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://postfiles.pstatic.net/MjAyNjAyMDZfMTk0/MDAxNzcwMzg0MDU0NjE3.reBp_CKRG385duC8B0RfNkRwwDhcCf-W1pSczIf-RN0g.JRVT3iwshi9x6qwPDxrFIZydshy7V8JOjCTZqpPDqjgg.JPEG/dylan-leagh-gxAijkXrvBQ-unsplash.jpg?type=w966" 
            className="w-full h-full object-cover" 
            alt="Sungboo Metal Visual Background"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-[1]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight mb-8 text-gray-900">
              공간을 잇는 <br />
              <span className="font-medium" style={{ color: config.primaryColor }}>SUNGBOO METAL</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 font-medium leading-relaxed">
              {config.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-black text-white font-bold rounded-full transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 group/btn"
              >
                시공 사례 보기 <ArrowUpRight size={20} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </a>
              <button 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="px-10 py-4 bg-white border-2 font-bold rounded-full transition-all hover:bg-gray-50 cursor-pointer"
                style={{ borderColor: config.primaryColor, color: config.primaryColor }}
              >
                견적 문의
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Centered on mobile */}
      <section id="services" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 md:mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tighter uppercase">OUR SERVICES</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {[
              { 
                title: '공간 맞춤 설계', 
                desc: '현장 실측 데이터를 기반으로 CAD 도면 설계를 진행하여 미학적 가치와 시공 정밀도를 극대화합니다.',
                image: 'https://postfiles.pstatic.net/MjAyNjAyMDZfNTYg/MDAxNzcwMzgzMjkxMzAx.qk54eupmw5w0N7fwTTlov86Or6CjG5xW4vcvTTVxhE4g.ccu0Tbj72VR9oxsWsbWy-jw25W2c2qRH9N9dpwrTAMkg.JPEG/pexels-lexovertoom-1109541.jpg?type=w966',
                icon: <Ruler size={24} className="md:w-8 md:h-8" />
              },
              { 
                title: '안전한 구조', 
                desc: '철제 계단 제작 노하우를 바탕으로 하중 설계와 견고한 정밀 용접을 약속합니다.',
                image: 'https://postfiles.pstatic.net/MjAyNjAyMDZfMjU5/MDAxNzcwMzgzMzQ0Njky.ImkmJL1JpJDl2Ucgh_PpOMQkQLh-zpVQBeICHc-_W2og.OSrV7fY3A66ewEomh5NNmfutfxXo2Z7qZYAKZU_4ieMg.JPEG/pexels-kyle-miller-169884138-15419118.jpg?type=w966',
                icon: <ShieldCheck size={24} className="md:w-8 md:h-8" />
              },
              { 
                title: '사후 관리 지원', 
                desc: '시공 완료 후에도 안심하고 사용하실 수 있도록 신속하고 책임감 있는 점검 및 유지보수 서비스를 제공합니다.',
                image: 'https://postfiles.pstatic.net/MjAyNjAyMDZfMjc0/MDAxNzcwMzgzMjkxMjkz.EGAtcsQy6Y-kJZhrgeLxr8ffB0UW93y_tvnWJ4m4hc4g.A2SzUnIhOoV3-cLVC0zBJV9FlT8KunHDnRbMlzLPB7wg.JPEG/pexels-pavel-danilyuk-7937659.jpg?type=w966',
                icon: <Settings2 size={24} className="md:w-8 md:h-8" />
              }
            ].map((s, idx) => (
              <div key={idx} className="group relative h-[380px] md:h-[560px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gray-900 shadow-xl">
                <img 
                  src={s.image} 
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[5]"></div>
                
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10 items-center md:items-start">
                  <div className="mb-4 md:mb-6 transition-transform duration-500 group-hover:-translate-y-2" style={{ color: config.primaryColor }}>
                    {s.icon}
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4 tracking-tight">{s.title}</h3>
                  <p className="text-gray-300 md:text-gray-200 leading-relaxed text-sm md:text-lg font-light line-clamp-3 md:line-clamp-4 text-center md:text-left">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Centered on mobile */}
      <section id="portfolio" className="py-24 md:py-32 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-20 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 md:mb-6 text-gray-900 tracking-tighter uppercase">PROJECTS</h2>
              <p className="text-gray-500 text-base md:text-lg">성부금속의 시공 현장을 확인해보세요.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const buttonClasses = `px-5 py-2 md:px-7 md:py-2.5 rounded-full border text-xs md:text-sm font-bold transition-all duration-300 flex items-center justify-center ${
                  isActive ? 'text-white border-transparent shadow-lg' : 'text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-700'
                }`;
                const activeStyle = isActive ? { backgroundColor: config.primaryColor } : {};
                return (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={buttonClasses}
                    style={activeStyle}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-16 gap-x-10">
            {filteredPosts.length > 0 ? filteredPosts.map((post) => (
              <a 
                key={post.id} 
                href={post.externalUrl || '#portfolio'}
                target={post.externalUrl ? "_blank" : "_self"}
                rel={post.externalUrl ? "noopener noreferrer" : ""}
                onClick={(e) => !post.externalUrl && e.preventDefault()}
                className={`group block animate-in fade-in slide-in-from-bottom-6 duration-700 ${!post.externalUrl ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="relative aspect-[4/3] mb-6 md:mb-8 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gray-100">
                  <img 
                    src={post.imageUrl} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={post.title} 
                  />
                  <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <span className="px-3 py-1 md:px-4 md:py-1.5 bg-white/90 backdrop-blur text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  {post.externalUrl && (
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-3 md:p-4 bg-white rounded-full text-black shadow-xl transform scale-50 group-hover:scale-100 transition-transform">
                        <ArrowUpRight size={20} className="md:w-6 md:h-6" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-2">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-[10px] md:text-xs font-medium mb-2 md:mb-3">
                    <Calendar size={12} className="md:w-[14px] md:h-[14px]" style={{ color: config.primaryColor }} />
                    {post.date}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-gray-900 group-hover-primary-text transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3 font-light mb-4 md:mb-6">
                    {post.content}
                  </p>
                  {post.externalUrl && (
                    <span className="inline-flex items-center gap-1 text-xs md:text-sm font-bold border-b-2 border-black/5 pb-1 group-hover-primary-border transition-colors">
                      자세히 보기 <ArrowUpRight size={12} className="md:w-[14px] md:h-[14px]" />
                    </span>
                  )}
                </div>
              </a>
            )) : (
              <div className="col-span-full py-40 text-center">
                <p className="text-gray-400 text-lg">해당 카테고리의 게시물이 아직 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section - Centered on mobile & Group centered on tablet */}
      <section id="contact" className="py-24 md:py-32 text-gray-900 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-gray-100/50">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px] z-0 opacity-60"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gray-200/20 rounded-full blur-[140px] z-0 opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="flex flex-col items-center lg:items-start">
              <span className="font-bold tracking-widest uppercase mb-3 md:mb-4 block text-xs md:text-sm" style={{ color: config.primaryColor }}>Get in Touch</span>
              <h2 className="text-4xl md:text-6xl font-black mb-10 md:mb-12 leading-tight uppercase">CONTACT US</h2>
              
              {/* Container for contact items: Group-centered on md, left-aligned on lg */}
              <div className="space-y-6 md:space-y-8 w-full max-w-md md:mx-auto lg:mx-0 lg:max-w-none">
                <a href={`tel:${config.contactPhone}`} className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white flex items-center justify-center border border-gray-100 group-hover-primary-bg group-hover:text-white transition-all shadow-sm flex-shrink-0">
                    <Phone size={24} className="md:w-7 md:h-7" />
                  </div>
                  <div className="md:text-left">
                    <p className="text-gray-500 text-[10px] md:text-xs mb-0.5 md:mb-1 uppercase tracking-widest font-bold">Quick Call</p>
                    <p className="text-lg md:text-2xl font-bold group-hover-primary-text transition-colors">{config.contactPhone}</p>
                  </div>
                </a>

                <a href={`mailto:${config.contactEmail}`} className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white flex items-center justify-center border border-gray-100 group-hover-primary-bg group-hover:text-white transition-all shadow-sm flex-shrink-0">
                    <Mail size={24} className="md:w-7 md:h-7" />
                  </div>
                  <div className="md:text-left">
                    <p className="text-gray-500 text-[10px] md:text-xs mb-0.5 md:mb-1 uppercase tracking-widest font-bold">Send Email</p>
                    <p className="text-lg md:text-2xl font-bold group-hover-primary-text transition-colors break-all">{config.contactEmail}</p>
                  </div>
                </a>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white flex items-center justify-center border border-gray-100 shadow-sm flex-shrink-0">
                    <MapPin size={24} className="md:w-7 md:h-7" />
                  </div>
                  <div className="md:text-left">
                    <p className="text-gray-500 text-[10px] md:text-xs mb-0.5 md:mb-1 uppercase tracking-widest font-bold">Office Address</p>
                    <p className="text-lg md:text-2xl font-bold">{config.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-gray-100 shadow-2xl relative w-full">
              {formStatus === 'SUCCESS' ? (
                <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center animate-in zoom-in duration-500">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="md:w-10 md:h-10" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 md:mb-3">전송이 완료되었습니다!</h4>
                  <p className="text-gray-500 text-base md:text-lg">성부금속에서 최대한 빠르게 검토 후 연락드리겠습니다.</p>
                </div>
              ) : (
                <>
                  <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 md:mb-8">상담 및 견적 요청하기</h4>
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                        <input required name="name" placeholder="성함" className="w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl text-gray-900 text-sm md:text-base outline-none border border-gray-200 focus:border-gold transition-colors shadow-sm" />
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                        <input required name="phone" placeholder="010-0000-0000" className="w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl text-gray-900 text-sm md:text-base outline-none border border-gray-200 focus:border-gold transition-colors shadow-sm" />
                      </div>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                      <select required name="subject" className="w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl text-gray-900 text-sm md:text-base outline-none border border-gray-200 focus:border-gold transition-colors appearance-none shadow-sm">
                        <option value="">문의 유형을 선택하세요</option>
                        <option value="계단">철제 계단 제작</option>
                        <option value="난간">안전 난간 시공</option>
                        <option value="대문">대문 및 펜스</option>
                        <option value="복층">복층 공사</option>
                        <option value="기타">기타 금속 공사</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                      <textarea required name="message" placeholder="공사 희망 위치, 규모 등을 알려주시면 더 정확한 상담이 가능합니다." rows={4} className="w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl text-gray-900 text-sm md:text-base outline-none border border-gray-200 focus:border-gold transition-colors shadow-sm" />
                    </div>
                    
                    {formStatus === 'ERROR' && (
                      <div className="flex items-center gap-2 text-red-500 text-xs md:text-sm p-3 md:p-4 bg-red-50 rounded-xl">
                        <AlertCircle size={16} />
                        오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={formStatus === 'SUBMITTING'}
                      className="w-full py-4 md:py-6 text-white font-black text-base md:text-lg rounded-xl md:rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 mt-2 md:mt-4"
                      style={{ backgroundColor: config.primaryColor, boxShadow: `0 15px 30px -10px ${config.primaryColor}66` }}
                    >
                      {formStatus === 'SUBMITTING' ? (
                        <><Loader2 size={20} className="animate-spin md:w-6 md:h-6" /> 신청 중...</>
                      ) : (
                        <>신청하기 <ArrowUpRight size={18} className="md:w-5 md:h-5" /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Map Section */}
      <section className="w-full h-[350px] md:h-[500px] relative">
        <iframe 
          title="Sungboo Metal Office Location"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(config.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
          className="w-full h-full border-none"
          frameBorder="0" 
          allowFullScreen={true} 
          aria-hidden="false" 
          tabIndex={0}
        ></iframe>
      </section>

      {/* Footer - Centered on mobile */}
      <footer className="py-16 md:py-20 bg-white text-gray-400 text-xs md:text-sm border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-12 md:mb-16">
            <div className="max-w-sm flex flex-col items-center md:items-start">
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 md:mb-6 uppercase tracking-tighter">SUNGBOO <span style={{ color: config.primaryColor }}>METAL</span></h3>
              <p className="leading-relaxed mb-6 md:mb-8 text-gray-500">
                철제 구조물 제작 전문 기업으로<br />
                완벽한 시공과 책임 있는 사후 관리를 실천합니다.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:text-white transition-all group-hover-primary-bg group">
                  <Layout size={18} className="text-gray-400 group-hover:text-white md:w-5 md:h-5" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full md:w-auto">
              <div>
                <h4 className="font-bold text-gray-900 mb-4 md:mb-6 uppercase">SERVICES</h4>
                <ul className="space-y-2 md:space-y-3">
                  <li><a href="#portfolio" onClick={(e) => handleFooterCategoryClick(e, '계단')} className="hover:text-gray-900 transition-colors">계단 공사</a></li>
                  <li><a href="#portfolio" onClick={(e) => handleFooterCategoryClick(e, '난간')} className="hover:text-gray-900 transition-colors">난간 공사</a></li>
                  <li><a href="#portfolio" onClick={(e) => handleFooterCategoryClick(e, '대문')} className="hover:text-gray-900 transition-colors">대문/펜스</a></li>
                  <li><a href="#portfolio" onClick={(e) => handleFooterCategoryClick(e, '복층공사')} className="hover:text-gray-900 transition-colors">복층 구조물</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4 md:mb-6 uppercase">QUICK LINKS</h4>
                <ul className="space-y-2 md:space-y-3">
                  <li><a href="#portfolio" onClick={(e) => { setActiveCategory('전체'); scrollToSection(e, 'portfolio'); }} className="hover:text-gray-900 transition-colors">시공사례</a></li>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-gray-900 transition-colors">서비스</a></li>
                  <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-gray-900 transition-colors">문의하기</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-bold text-gray-900 mb-4 md:mb-6 uppercase">OFFICE</h4>
                <p className="leading-relaxed text-gray-500">
                  {config.address}<br/>
                  Tel: {config.contactPhone}<br/>
                  Email: {config.contactEmail}
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 md:pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-center items-center gap-6 text-[10px] md:text-xs font-medium uppercase tracking-widest">
            <p>© 2015 {config.siteName}. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
