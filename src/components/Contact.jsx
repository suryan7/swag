import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Magnetic from './Magnetic';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('https://formsubmit.co/ajax/swagatadolui.art09@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `New Portfolio Message from ${formData.name}`,
                    _captcha: 'false'
                }),
            });

            const result = await res.json();

            if (res.ok || result.success === "true" || result.success === true) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (err) {
            console.warn('AJAX submit issue, submitting via native form post fallback:', err);
            // Fallback: Submit via HTML form to FormSubmit directly
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://formsubmit.co/swagatadolui.art09@gmail.com';
            
            const fields = [
                { name: 'name', value: formData.name },
                { name: 'email', value: formData.email },
                { name: 'message', value: formData.message },
                { name: '_captcha', value: 'false' },
                { name: '_subject', value: `New Portfolio Message from ${formData.name}` }
            ];

            fields.forEach(f => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = f.name;
                input.value = f.value;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        }
    };

    return (
        <section id="contact" className="py-32 bg-pop-purple relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 bg-white border-[4px] border-pop-black rounded-[3rem] p-8 md:p-16 shadow-pop-lg">

                    <div className="space-y-8">
                        <span className="bg-pop-yellow text-pop-black border-2 border-pop-black px-4 py-1 rounded-full font-bold text-sm shadow-[2px_2px_0px_0px_#18181B] inline-block">
                            OPEN FOR WORK
                        </span>
                        <h2 className="text-5xl md:text-7xl font-display text-pop-black leading-none">
                            LET'S MAKE <br /> MAGIC
                        </h2>
                        <p className="text-xl font-medium text-pop-black/70">
                            Got a project? A secret mission? Or just want to say hi? I'm all ears (and eyes).
                        </p>

                        <div className="space-y-4 pt-4">
                            <a href="mailto:swagatadolui.art09@gmail.com" className="flex items-center gap-4 text-xl font-bold hover:text-pop-purple transition-colors break-all">
                                <div className="w-12 h-12 bg-pop-gray rounded-full flex items-center justify-center border-2 border-pop-black flex-shrink-0">
                                    <Mail size={20} />
                                </div>
                                swagatadolui.art09@gmail.com
                            </a>
                            <div className="flex items-center gap-4 text-xl font-bold">
                                <div className="w-12 h-12 bg-pop-gray rounded-full flex items-center justify-center border-2 border-pop-black">
                                    <MapPin size={20} />
                                </div>
                                Remote / Worldwide
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-bold ml-2">NAME</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-pop-gray border-2 border-pop-black rounded-xl p-4 font-bold focus:outline-none focus:bg-white focus:shadow-pop transition-all"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold ml-2">EMAIL</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-pop-gray border-2 border-pop-black rounded-xl p-4 font-bold focus:outline-none focus:bg-white focus:shadow-pop transition-all"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold ml-2">MESSAGE</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full bg-pop-gray border-2 border-pop-black rounded-xl p-4 font-bold focus:outline-none focus:bg-white focus:shadow-pop transition-all resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-pop-lime border-2 border-pop-black rounded-xl font-bold flex items-center gap-3 text-pop-black shadow-pop"
                            >
                                <CheckCircle size={22} className="text-pop-black" />
                                Message sent successfully! I'll get back to you soon.
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-pop-pink text-white border-2 border-pop-black rounded-xl font-bold flex items-center gap-3 shadow-pop"
                            >
                                <AlertCircle size={22} className="text-white" />
                                {errorMessage}
                            </motion.div>
                        )}

                        <Magnetic>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-pop-black text-white border-2 border-pop-black py-4 rounded-xl font-display text-xl hover:bg-pop-lime hover:text-pop-black transition-colors shadow-pop active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        SENDING... <Loader2 size={20} className="animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        SEND IT <Send size={20} />
                                    </>
                                )}
                            </button>
                        </Magnetic>
                    </form>

                </div>
            </div>
        </section>
    );
}

