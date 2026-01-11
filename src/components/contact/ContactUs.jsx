import React, {useEffect} from 'react';

function ContactUs() {
    useEffect(()=>{
        window.scrollTo(0, 0);
      }, [])
    return (
        <div className='mx-[10%] my-10 bg-white rounded-2xl shadow-lg text-neutral-800 animate-fadeIn overflow-hidden border border-neutral-100'>

            <div className='bg-neutral-900 p-12 text-white text-center'>
                <h1 className='text-4xl md:text-5xl font-black tracking-tighter uppercase'>Contact Us</h1>
            </div>

            <div className='p-8 md:p-16'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16'>

                    <div className='space-y-8'>
                        <div className='group'>
                            <h4 className='text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold mb-3 transition-colors group-hover:text-neutral-900'>Call Center</h4>
                            <p className='text-2xl font-medium hover:underline cursor-pointer tracking-tight'>+7 (727) 344-00-00</p>
                            <p className='text-2xl font-medium hover:underline cursor-pointer tracking-tight'>+7 (707) 123-45-67</p>
                            <p className='text-neutral-400 text-xs mt-2 uppercase tracking-wider'>Каждый день: 09:00 — 21:00</p>
                        </div>

                        <div className='group'>
                            <h4 className='text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold mb-3 transition-colors group-hover:text-neutral-900'>Email</h4>
                            <p className='text-xl font-medium hover:underline cursor-pointer'>info@websec.kz</p>
                        </div>
                    </div>

                    <div className='space-y-10'>
                        <div className='group'>
                            <h4 className='text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold mb-3 transition-colors group-hover:text-neutral-900'>Main Office</h4>
                            <p className='text-lg font-medium leading-relaxed'>
                                пр. Аль-Фараби, 77/7<br/>
                                БЦ "Esentai Tower", 10 этаж<br/>
                                Алматы, Казахстан
                            </p>
                        </div>
                    </div>

                    <div className='space-y-8'>
                        <div>
                            <h4 className='text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold mb-4'>Social Media</h4>
                            <div className='flex flex-col gap-4'>
                                <a href="#" className='text-xs font-bold uppercase tracking-[0.2em] hover:translate-x-2 transition-transform inline-flex items-center gap-2'>
                                    <span className='w-2 h-2 bg-neutral-900 rounded-full'></span> Instagram
                                </a>
                                <a href="#" className='text-xs font-bold uppercase tracking-[0.2em] hover:translate-x-2 transition-transform inline-flex items-center gap-2'>
                                    <span className='w-2 h-2 bg-neutral-900 rounded-full'></span> Telegram
                                </a>
                                <a href="#" className='text-xs font-bold uppercase tracking-[0.2em] hover:translate-x-2 transition-transform inline-flex items-center gap-2'>
                                    <span className='w-2 h-2 bg-neutral-900 rounded-full'></span> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='rounded-2xl overflow-hidden border border-neutral-100 shadow-inner bg-neutral-50'>
                    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '450px' }}>
                        <a 
                            href="https://yandex.kz/maps/ru/org/esentai_tower_b_znes_ortaly_y/1199241011/?lang=ru&utm_medium=mapframe&utm_source=maps" 
                            style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
                        >
                            Бизнес-центр Esentai Tower
                        </a>
                        <a 
                            href="https://yandex.kz/maps/ru/162/almaty/category/business_center/184107509/?lang=ru&utm_medium=mapframe&utm_source=maps" 
                            style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}
                        >
                            Бизнес-центр в Алматы
                        </a>
                        <iframe 
                            src="https://yandex.kz/map-widget/v1/?indoorLevel=1&ll=76.932223%2C43.219106&mode=search&oid=1199241011&ol=biz&sctx=ZAAAAAgBEAAaKAoSCaBtNeuMOlNAEXWuKCUEo0VAEhIJDJQUWABT1j8RpRZKJqd2wj8iBgABAgMEBSgKOABAogFIAWoCa3qdAc3MTD2gAQCoAQC9AS5Ctb%2FCAQWz7uu7BIICDUVzZW50YWkgVG93ZXKKAgCSAgMxNjKaAgxkZXNrdG9wLW1hcHM%3D&sll=76.929389%2C43.219106&sspn=0.014994%2C0.006206&text=Esentai%20Tower&z=16.54" 
                            width="100%" 
                            height="450" 
                            frameBorder="0" 
                            allowFullScreen={true} 
                            style={{ position: 'relative' }}
                            title="Yandex Map"
                        ></iframe>
                    </div>
                </div>
            </div>
            
            <div className='bg-neutral-50 p-6 text-center border-t border-neutral-100'>
                <p className='text-[9px] uppercase tracking-[0.4em] text-neutral-400'>
                    Streetwear Store — Almaty, Esentai Tower Office
                </p>
            </div>
        </div>
    );
}

export default ContactUs;