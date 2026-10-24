export default function FreeTrainingConsultation() {
return ( <section
   id="free-training-consultation"
   className="border-t border-white/10 bg-[#050816] px-6 py-16 sm:py-20"
 > <div className="mx-auto max-w-7xl"> <div className="rounded-3xl border border-blue-500/25 bg-gradient-to-br from-[#0B1220] to-blue-950/40 p-7 sm:p-10 lg:p-14"> <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16"> <div className="max-w-3xl"> <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
FREE 15-MINUTE CONSULTATION </span>


          <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
            Not sure which training path is right for you?
            <span className="mt-2 block text-blue-400">
              Let&apos;s figure it out together.
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-300">
            Discuss your experience, learning goals, and interests in
            Embedded C, microcontrollers, RTOS, AUTOSAR, and embedded
            engineering with Cortex Labs. Explore a learning path that
            fits your goals.
          </p>

          <ul className="mt-6 space-y-3 text-gray-300">
            <li>✓ Discuss your skills and learning objectives.</li>
            <li>✓ Explore suitable embedded systems courses.</li>
            <li>✓ Choose an available Google Meet appointment.</li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a
            href="https://calendar.app.google/JYKDJjpdVMpsHKTu5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Book a Free Consultation
            <span aria-hidden="true">→</span>
          </a>

          <p className="max-w-xs text-center text-xs leading-5 text-gray-400">
            Select an available time through our Google Calendar booking
            page.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


);
}
