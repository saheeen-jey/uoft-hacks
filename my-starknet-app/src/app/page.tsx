"use client";
import WalletBar from "@/components/WalletBar";
import Hero from "../components/ui/Hero";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from "next/dynamic";
import { useAccount } from "@starknet-react/core";

export default function Home() {
    const numberofImages = 100;
    const [randomNum, setRandomNum] = useState(0);
    const [usedIndices, setUsedIndices] = useState([]);
    const [file, setFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | ArrayBuffer | undefined>();
    const account = useAccount();


        const handleOnChange = (e : React.SyntheticEvent) => {
            e.preventDefault(); 

            const target = e.target as HTMLInputElement & { files: FileList };
            
            setFile(target.files[0]);
            const file = new FileReader;
      
            console.log(target.files[0]);        
        }
    
    useEffect(() => {
        const interval = setInterval(() => {
            setRandomNum(Math.floor(Math.random() * numberofImages));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const generateImageSrc = (index) => `https://picsum.photos/200?random=${Math.floor(Math.random() * numberofImages)}`;

    return (
        <div className="app w-full h-full flex flex-col scroll-smooth">
        <div className="hero h-[100vh] scroll-smooth ">
            <header className="bg-[#1B1B1B] border-[#2d2d2d] border-[1px]  text-white p-4 text-center sticky ">
                <h1 className='text-3xl'>Timecapsule.tech</h1>
                <nav className="flex justify-center mt-4">
                    <a href="/" className=" scroll-smooth text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Home</a>
                    <a href="#upload" className=" scroll-smooth text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Upload</a>
                    <a href="#view" className="text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">View</a>
                    <a href="#contact" className="text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Contact</a>
                </nav>
            </header>

            <div className=" bg-cover bg-center text-white text-center py-10">
                <h1 className="text-3xl m-1 text-white pb-3">Your Memorable Moments Captured</h1>
                <p className="text-lg m-8 text-white">Organize, share, and cherish your photos with the power of <a className="underline hover:bg-gray-50 hover:text-black transition duration-300" href="https://book.starknet.io/">Starknet</a> blockchain.</p>

                <div className=''>
                <div className="h-[600px] flex flex-wrap justify-center overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                        <img
                            key={i}
                            src={generateImageSrc(i === randomNum ? randomNum + 1 : i)}
                            className='inline'
                            alt={`Random Image ${i}`}
                        />
                    ))}
                    
                </div>
                <a href="#upload" className="py-3 top-[calc(66%-2.5rem)] left-[calc(50%-8.25rem)]  absolute    border-2 cta-button px-6 my-4 text-lg text-white no-underline bg-green-500 rounded transition duration-300 hover:bg-green-600"><WalletBar></WalletBar></a>
                </div>
            </div>
        </div>
        <div id="upload" className="w-full h-[100vh] flex items-center justify-center relative border-[#2d2d2d] border-[1px]">
            <div className="flex justify-center items-start flex-col border-[#2d2d2d] border-[1px] rounded-sm p-12">
                <h2 className="text-3xl flex justify-center text-white pb-5">Upload</h2>
                <p className="text-lg my-8 text-white">Upload your photos to the <i>goerli</i> blockchain.</p>
                <input type="file" name="image" onChange={handleOnChange} />
            </div>
        </div>
        <div id="view" className="w-full h-[100vh]">
            <div className="flex justify-center items-start flex-col border-[#2d2d2d] border-[1px] rounded-sm p-12">
                <h2 className="text-3xl flex justify-center text-white pb-5">View</h2>
                <p className="text-lg my-8 text-white">View your photos from the blockchain.</p>
            </div>
        </div>
    </div>
    );
}
