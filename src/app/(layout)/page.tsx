import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className='h-[500vh]'>
      <div className="mt-100 text-right">
        <Link href="/about" className='bg-secondary-color py-3 px-6 rounded text-white cursor-pointer '>
          Click Me
        </Link>
      </div>
    </div>
  );
};

export default page;