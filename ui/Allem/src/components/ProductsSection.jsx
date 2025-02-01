import aboutImage from '../assets/bg-2.png'
import ProductBox from './ProductBox'

const ProductsSection = () => {
  const products = [
    {
      title: "تحليل المشاعر",
      description: "تحديد المشاعر في النصوص العربية سواء كانت إيجابية أو سلبية أو محايدة",
       isSoon: false,
       route: "/upload"
    },
    {
      title: "تصنيف النصوص",
      description: "تصنيف المحتوى العربي إلى فئات مختلفة",
      isSoon: true,
    }
  ]

  return (
    <div className="flex w-full h-lvh bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${aboutImage})`}}>
        <div className='container flex flex-col pt-24 pr-24 mx-auto'>
            <div className='flex items-center justify-start pr-14'>
                <h1 className='text-white text-6xl font-semibold'>المنتجات</h1>
            </div>

            <div className=' items-center justify-center pt-42 grid grid-cols-2 gap-8 mx-auto'>
                {products.map((product, index) => (
                    <ProductBox
                        key={index}
                        title={product.title}
                        description={product.description}
                        isSoon={product.isSoon}
                        route={product.route}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProductsSection