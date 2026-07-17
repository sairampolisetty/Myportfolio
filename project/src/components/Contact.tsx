import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { TextReveal } from './TextReveal';

const Contact = () => {
  const [form, setForm]   = useState({ name:'', email:'', message:'' });
  const [errs, setErrs]   = useState<Record<string,string>>({});
  const [sent, setSent]   = useState(false);
  const [load, setLoad]   = useState(false);
  const [err,  setErr]    = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const set = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrs(p => { const n={...p}; delete n[e.target.name]; return n; });
  };

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())                e.name    = 'required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email   = 'invalid email';
    if (!form.message.trim())             e.message = 'required';
    setErrs(e); return !Object.keys(e).length;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoad(true); setErr('');
    try {
      await emailjs.send('service_n5roita','template_gwo7nhp',
        { from_name:form.name, from_email:form.email, message:form.message, to_name:'Sairam' },
        'y8I_lb-naX9B01-6N');
      setSent(true); setForm({ name:'', email:'', message:'' });
    } catch (error: any) { 
      console.error("EmailJS Error:", error);
      setErr(`Failed: ${error?.text || 'Could not send.'} Please email me directly.`); 
    }
    finally  { setLoad(false); }
  };

  const getInputClass = (fieldName: string) => {
    const base = "w-full bg-[#0a0a0a] text-gray-200 placeholder:text-gray-600 placeholder:font-light font-sans text-[0.9rem] px-4 py-[14px] rounded-lg outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] border";
    if (errs[fieldName]) return `${base} border-red-500`;
    return `${base} border-white/10 hover:border-white/20 hover:bg-[#111] focus:border-green-500 focus:bg-[#111] focus:ring-1 focus:ring-green-500/20`;
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="container max-w-[640px]">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:.5 }} viewport={{ once:true, amount:.1 }}>
          <span className="section-num">05. contact</span>
          <h2 className="section-title mb-4">
            <TextReveal text="💬 Let's Connect" delay={0.1} />
          </h2>
          <p className="body-text mb-10 max-w-[480px]">
            Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open. I'll get back to you as soon as I can.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity:0, y:20 }} 
          whileInView={{ opacity:1, y:0 }} 
          transition={{ duration: 0.6, delay: 0.2 }} 
          viewport={{ once:true, amount:.1 }}
          className="relative rounded-2xl p-[1px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        >
          {/* Animated Glowing Border Layer */}
          <div className="animate-[spin_4s_linear_infinite] absolute -top-full -left-full -right-full -bottom-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(34,197,94,0.8)_100%)] z-0" />
          
          {/* Inner Content Container */}
          <div className="bg-[rgba(15,15,15,0.95)] rounded-[15px] p-10 relative z-10 backdrop-blur-md h-full">
            {/* Subtle top edge highlight */}
            <div className="absolute top-0 left-[20%] w-[60%] h-[1px] bg-[linear-gradient(90deg,transparent,rgba(34,197,94,0.3),transparent)]" />

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-[60px]"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12, delay: 0.2 }}>
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-5 block" />
                  </motion.div>
                  <h3 className="text-[1.4rem] font-semibold text-gray-200 mb-3">Message sent!</h3>
                  <p className="text-gray-400 text-[0.95rem] mb-[30px]">Thanks for reaching out. I'll get back to you soon.</p>
                  <button onClick={() => setSent(false)} className="font-mono text-[0.8rem] text-green-500 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-green-500/20">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={submit} noValidate 
                  className="flex flex-col gap-6"
                >
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                    {(['name','email'] as const).map(f => (
                      <div key={f} className="relative">
                        <label htmlFor={f} className={`font-mono text-[0.65rem] block mb-2 tracking-[0.08em] transition-colors duration-300 ${focusedField === f ? 'text-green-500' : 'text-gray-400'}`}>
                          {f === 'name' ? 'your name' : 'your email'}
                          {errs[f] && <span className="text-red-500 ml-2">— {errs[f]}</span>}
                        </label>
                        <input 
                          id={f} name={f} type={f === 'email' ? 'email' : 'text'} value={form[f]} onChange={set}
                          placeholder={f === 'name' ? 'John Doe' : 'john@example.com'}
                          className={getInputClass(f)}
                          onFocus={() => setFocusedField(f)} 
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className={`font-mono text-[0.65rem] block mb-2 tracking-[0.08em] transition-colors duration-300 ${focusedField === 'message' ? 'text-green-500' : 'text-gray-400'}`}>
                      your message{errs.message && <span className="text-red-500 ml-2">— {errs.message}</span>}
                    </label>
                    <textarea 
                      id="message" name="message" rows={5} value={form.message} onChange={set}
                      placeholder="Hello Sairam, I'd like to talk about..."
                      className={`${getInputClass('message')} resize-none`}
                      onFocus={() => setFocusedField('message')} 
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {err && <p className="font-mono text-[0.75rem] text-red-500 text-center">{err}</p>}
                  
                  <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between items-center mt-4">
                    <a href="mailto:sairampolisetty0@gmail.com" className="flex items-center gap-2 text-gray-400 text-[0.85rem] no-underline transition-colors duration-200 hover:text-gray-200">
                      <Mail size={16} /> direct email
                    </a>
                    
                    <motion.button 
                      type="submit" 
                      disabled={load}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full sm:w-auto flex justify-center items-center gap-2 bg-green-500 text-black border-none px-7 py-3 rounded-lg font-sans font-semibold text-[0.9rem] shadow-[0_4px_14px_rgba(34,197,94,0.3)] transition-all ${load ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
                    >
                      {load ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
