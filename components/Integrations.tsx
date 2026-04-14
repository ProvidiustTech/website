export default function Integrations() {
  return (
    <section className="bg-[#f5f5f7] py-16 px-4 md:px-8 w-full overflow-hidden">
      <p className="text-center text-gray-400 text-sm font-medium mb-8">Seamlessly Integrates Across Stack</p>
      <div className="max-w-4xl grid lg:flex mx-auto gap-5 grid-cols-2 lg:grid-cols-3 lg:gap-14 items-center justify-items-center">
        {/* Shopify */}
        <div className="flex items-center justify-center">
          <img src="./shopify.png" className="w-20 lg:w-28 lg:block none" alt="" />
          {/* <img src="./shopifyicon.png" className="w-40 lg:none block lg:w-28" alt="" /> */}

        </div>

        {/* Slack */}
        <div className="flex items-center justify-center">
          <img src="./hubspot.png" className="w-20 lg:w-36" alt="" />
        </div>

        {/* WhatsApp */}
        <div className="flex items-center justify-center">
          <img src="./whatsapp.png" className="w-20 lg:w-32" alt="" />
          {/* <img src="./whatsappicon.png" className="w-32" alt="" /> */}
        </div>

        {/* PayPal */}
        <div className="flex items-center justify-center">
          <img src="./paypal.png" className="w-4 lg:w-6" alt="" />
          <h1 className="w-20 lg:text-2xl font-bold lg:block none ml-1 lg:ml-3 text-[#003087]">PayPal</h1>
        </div>

        {/* Stripe */}
        <div className="flex items-center justify-center">
          <img src="./check.png" className="w-20 lg:w-28" alt="" />

        </div>
      </div>
    </section>
  );
}
