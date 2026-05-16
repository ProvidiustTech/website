"use client";

function Step({
  number,
  title,
  description,
  accent = false,
}: {
  number: string;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${accent ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-500"
          }`}
      >
        {number}
      </div>
      <div className="pt-1">
        <h4 className="font-semibold text-gray-900 text-base mb-1">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-8xl mx-auto w-[92%] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            How it Works
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We use AI to respond instantly, escalate when necessary, and give your
            team full visibility into every interaction.
          </p>
        </div>

        <div className=" lg:grid-cols-2 gap-12 xl:gap-20 w-[100%] justify-center flex items-center">

          {/* ── Left: numbered steps ── */}


          {/* ── Right: floating cards over office photo ── */}
          <div className="relative w-[50%] min-h-[520px] sm:min-h-[600px]">

            {/* Office photo — full-bleed background of this column */}
            {/* <div className="absolute inset-0 w-56 rounded-3xl overflow-hidden"> */}
            <img
              src="/providius-office.png"
              alt="ProvidiusTech office"
              className="xl:w-[47%] ml-[27%] h- object-contain object-center justify-center"
            />
            {/* subtle dark overlay so cards pop */}
            <div className="absolute inset-0 bg-none rounded-3xl" />
            {/* </div> */}

            {/* ── Card 1: Your Customers Send ── top-left */}
            <div className="absolute top-[-50px] left-4 sm:left-[-80px] w-[calc(60%-10px)] sm:w-80 rounded-2xl z-10">
              {/* header row */}
              <img src="/provifirst.png" alt="" />
            </div>

            {/* ── Card 2: AI understands + responds ── top-right */}
            <div className="absolute top-6 left-[65%] sm:right-6  sm:w-96  rounded-2xl z-10">
              <img src="/provithird.png" alt="" />
              {/* row 1 */}
            </div>

            {/* ── Card 3: Escalates to Agent ── bottom-left */}
            <div className="absolute bottom-6 left-4 sm:left-[-80px] w-[calc(40%-20px)] sm:w-80 bg-none rounded-2xl  overflow-hidden z-10 flex">
              {/* agent photo */}
              <img src="/provisecond.png" alt="" />
              
            </div>

            {/* ── Card 4: Business Monitors Dashboard ── bottom-right */}
            <div className="absolute top-[510px] left-[60%] sm:right-6 w-[calc(70%-20px)]">
              {/* header */}
              <img src="/provifourth.png" alt="" />
            </div>

          </div>
          {/* end right column */}
        </div>
      </div>
    </section>
  );
}