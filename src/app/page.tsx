import Contact from '@/components/Contact';

export default function About() {
  return (
    <section className="flex flex-col justify-center px-8 pb-32 pt-20 md:pt-32 md:pb-36 lg:px-10 lg:py-36">
      <h1 className="text-xl font-medium md:text-[22px]">Kelvin Ampofo</h1>
      <h2 className="mb-6 dark:text-[#A0A0A0]">Software engineer</h2>
      <article>
        <p>
          <em>Crafting interfaces</em> with a focus on design, human-computer
          interaction and architecture. Currently working in Fintech.
        </p>
      </article>
      <hr className="my-12 h-px border-0 bg-black dark:bg-[#292C2D]" />
      <Contact />
    </section>
  );
}
