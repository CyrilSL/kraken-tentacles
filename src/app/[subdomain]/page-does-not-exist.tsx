import Link from 'next/link';

export default function PageDoesNotExist() {
 return (
   <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
     <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12">
       <h2 className="text-xl font-bold">Page does not exist!</h2>
       <p className="my-2">
         I think you are lost.. the page you entered does not exist.. check the address or go back to homepage..
       </p>
       <Link href={process.env.NEXT_PUBLIC_BASE_URL || '/'} className="mx-auto mt-4 w-full">
         <button
           className="w-full flex items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
         >
           Homepage
         </button>
       </Link>
     </div>
   </div>
 );
}