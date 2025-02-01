import aboutImage from '../assets/bg.png'
const AboutSection = () => {
  return (
    <div className="flex w-full justify-center h-lvh bg-cover bg-center bg-no-repeat bg-black/90 bg-blend-overlay" style={{backgroundImage: `url(${aboutImage})`}}>
        <div className='container flex flex-col items-center justify-center'>
            <div>
            <h1 className='text-white text-7xl font-semibold leading-[1.4]'>ذكاء اصطناعي متطور يمنحك رؤية أوضح  <br/>لاتجاهات المستخدمين وانطباعاتهم</h1>
            </div>

            <div className='items-center justify-between pt-42 grid grid-cols-2 gap-90'>
                <div className=''>
                    <h1 className='text-white text-5xl font-regular'>٪٩٠</h1>
                    <p className='text-white text-lg font-light pt-4 text-right'>
                    من المؤسسات تستخدم تحليل <br/> النصوص لاستخلاص رؤى قابلة للتنفيذ         
                    </p>
                </div>

                <div className='flex flex-col'>
                    <h1 className='text-white text-5xl font-regular'>+٣٢ ساعة</h1>
                    <p className='text-white text-lg font-light pt-4 text-right'>
                    يوفر في المتوسط بين 85% إلى 98% من الوقت <br />الذي يُستغرق في الأنشطة اليدوية</p>
                </div>
            </div>
        
        </div>

    </div>
)
}

export default AboutSection