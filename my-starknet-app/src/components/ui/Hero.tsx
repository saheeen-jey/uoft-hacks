    import React, { useEffect, useState } from 'react';
    import "./Hero.css";
    import Image from 'next/image';
    import Link from 'next/link';

    const Hero = () => {
        const numberofImages = 100;
        const [randomNum, setRandomNum] = useState(0);
        const [usedIndices, setUsedIndices] = useState([]);
        useEffect(() => {
            const interval = setInterval(() => {
                setRandomNum(Math.floor(Math.random() * numberofImages));
            }, 2000);

            return () => clearInterval(interval);
        }, []);

        const generateImageSrc = (index) => `https://picsum.photos/200?random=${Math.floor(Math.random() * numberofImages)}`;

        return (
            <>
                <header className="bg-[#1B1B1B] border-[#2d2d2d] border-[1px]  text-white p-4 text-center">
                    <h1 className='text-3xl'>Timecapsule.tech</h1>
                    <nav className="flex justify-center mt-4">
                        <Link href="/" className="text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Home</Link>
                        <Link href="/upload" className="text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Upload</Link>
                        <Link href="/view" className="text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">View</Link>
                        <Link href="/contact" className="text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Contact</Link>
                    </nav>
                </header>

                <div className="hero bg-cover bg-center text-white text-center py-10">
                    <h1 className="text-3xl m-2 text-white pb-5">Your Memorable Moments Captured</h1>
                    <p className="text-lg m-4 text-white">Organize, share, and cherish your photos with the power of <a className="underline hover:bg-gray-50 hover:text-black transition duration-300" href="https://book.starknet.io/">Starknet</a> blockchain.</p>

                    <div className='absolute'>
                    <div className="h-[400px] flex flex-wrap justify-center overflow-hidden">
                        {[...Array(50)].map((_, i) => (
                            <img
                                key={i}
                                src={generateImageSrc(i === randomNum ? randomNum + 1 : i)}
                                className='inline'
                                alt={`Random Image ${i}`}
                            />
                        ))}
                        
                    </div>
                    <a href="#" className="py-3 top-[calc(50%-2.5rem)] left-[calc(50%-4.75rem)]  absolute    border-2 cta-button px-6 my-4 text-lg text-white no-underline bg-green-500 rounded transition duration-300 hover:bg-green-600">Get Started</a>
                    </div>
                    </div>
            </>
        );
    }

    export default Hero;
