export default function Integrations() {
  return (
    <section className="bg-[#f5f5f7] py-16 px-4 md:px-8 w-full overflow-hidden">
      <p className="text-center text-gray-400 text-sm font-medium mb-8">Seamlessly Integrates Across Stack</p>
      <div className="max-w-4xl grid xl:space-x-36 lg:flex mx-auto gap-5 grid-cols-2 lg:grid-cols-3 lg:gap-14 items-center justify-items-center">
        {/* Shopify */}
        <div className="flex items-center gap-3 justify-center">
          <img src="/whatsappicon.png" className="w-12 lg:w-12" alt="" />
          <p className="font-medium text-xl xl:block hidden">Whatsapp</p>
          {/* <img src="./shopifyicon.png" className="w-40 lg:none block lg:w-28" alt="" /> */}

        </div>

        {/* Slack */}
        <div className="flex items-center gap-3 justify-center">
          <img src="/telegram.png" className="w-14 lg:mt-2 lg:ml-o lg:w-14" alt="" />
          <p className="font-medium text-xl xl:block hidden">Telegram</p>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center gap-3 justify-center">
          <img src="/email.png" className="w-14 lg:w-16 lg:block none" alt="" />
                    <p className="font-medium text-xl xl:block hidden">Gmail</p>
        </div>

        {/* PayPal */}
        <div className="flex items-center gap-3 justify-center">
          <img src="/instagram.png" className="w-14 lg:w-12" alt="" />
          <p className="font-medium text-xl xl:block hidden">Instagram</p>
        </div>

        {/* Stripe */}
        {/* <div className="flex items-center justify-center">
          <img src="/check.png" className="w-20 lg:w-28" alt="" />

        </div> */}
      </div>
    </section>
  );
}
