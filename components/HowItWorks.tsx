export default function HowItWorks() {
  return (
    <section className="bg-[#f5f5f7] py-16 px-4">
      {/* Badge */}
      {/* <div className="justify-center max-w-7xl"> */}

      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <img src="/check1.png" className="w-5 lg:w-10" alt="" />
          
          <span className="text-gray-600 text-sm font-medium">Turn conversations into resolutions.</span>
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] text-center mb-4">
        How our AI customer support works
      </h2>
      <p className="text-gray-500 text-center max-w-2xl lg:max-w-5xl mx-auto mb-12 text-sm md:text-lg mt-10">
        From the moment a customer sends a message to when it&apos;s resolved, our AI understands the request, finds the
        right information from your knowledge base, responds instantly and follow up, so you don&apos;t have to.
      </p>

      {/* Three cards - desktop horizontal, mobile vertical */}

      <div className="xl:flex w-[95%] h-[60%] ml-3 justify-center xl:ml-16">

      <img src="/oneofthree.png" className="lg:w-[32%] xl:h-[40%]" alt="" />
      <img src="/twoofthree.png" className="lg:w-[32%] xl:h-[40%]" alt="" />
      <img src="/threeofthree.png" className="lg:w-[32%] " alt="" />
      </div>
      
      {/* </div> */}
    </section>
  );
}
