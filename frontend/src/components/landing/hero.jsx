import hero from "../../assets/hero2.jpg";
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden w-full">
    <div class="absolute inset-0">
      <img src={hero} alt="Background Image" class="object-cover object-center w-full h-full" />
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>
    
    <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
      <h1 class=" text-3xl md:text-5xl font-bold leading-tight mb-4">Welcome to Plogging Ethiopia</h1>
      <p class="text-lg font-sans font-black text-gray-300 mb-8">Stride with purpose, and cleanse with passion!</p>
      <Link href="#" class="bg-green-600 text-gray-900 hover:bg-green-500 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Read More </Link>
    </div>
  </div>
  
  )
}


export default Hero;
