import Contact from '@/components/Contact';

export default function About() {
  return (
    <main className="flex flex-col justify-center px-8 pt-44 md:px-8 lg:px-10">
      <h1 className="text-xl font-medium md:text-[22px]">Kelvin Ampofo</h1>
      <h2 className="mb-6 dark:text-[#A0A0A0]">Software engineer</h2>
      <section className="dark:text-[#E5E5E5]">
        <p>
          <em>Crafting interfaces</em> with a focus on design, human-computer
          interaction and architecture. Currently working in Fintech.
        </p>
      </section>
      <hr className="my-12 h-px border-0 bg-black dark:bg-[#292C2D]" />
      <Contact />
    </main>
  );
}
