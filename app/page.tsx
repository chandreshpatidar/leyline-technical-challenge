import Link from 'next/link';

export default function Home() {
  return (
    <section className='flex flex-col items-center gap-10 pt-16'>
      <h1 className='text-4xl font-semibold'>Select Party</h1>
      <div className='flex gap-5'>
        <Link
          href='/party-a'
          className='py-2.5 px-8 rounded-md border bg-slate-800 text-white font-bold hover:text-slate-800 hover:bg-white hover:border-slate-800'
        >
          Party A
        </Link>

        <Link
          href='/party-b'
          className='py-2.5 px-8 rounded-md border bg-slate-800 text-white font-bold hover:text-slate-800 hover:bg-white hover:border-slate-800'
        >
          Party B
        </Link>
      </div>
    </section>
  );
}
