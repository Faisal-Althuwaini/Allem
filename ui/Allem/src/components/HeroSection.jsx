import { RotateWords } from './rotate-words'

const HeroSection = () => {
  return (
    <div className="flex container justify-start h-[87vh]">
      <div className="absolute inset-0 "></div>
      <div className="flex  justify-start px-15 pt-70 relative z-10 w-full">
        <div className="">
          <h1 className="text-7xl font-semibold text-white">لغة عربية</h1>
          <h1 className="text-4xl font-regular pt-6 text-white">تحليل متطور, <RotateWords text="" words={["معنى", "بيانات", "نتائج"]} /> أوضح.</h1>
          <p className="text-xl font-light pt-6 text-white leading-[1.75] text-right">
            علِّم ، هي منصة تستخدم الذكاء الاصطناعي لتسهيل عمليات التصنيف وتحليل البيانات بدقة وكفاءة.
            <br />
            سواء كنت باحثًا، محلل بيانات، أو مؤسسة تسعى لفهم تفاعل جمهورها.
          </p>
        </div>
        <div className="">
        </div>
      </div>
    </div>
  )
}

export default HeroSection