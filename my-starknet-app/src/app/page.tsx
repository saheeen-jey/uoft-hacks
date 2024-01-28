"use client";
import WalletBar from "@/components/WalletBar";
import Hero from "../components/ui/Hero";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from "next/dynamic";
import { useAccount } from "@starknet-react/core";
import { useNetwork } from "@starknet-react/core";
import { useContract } from "@starknet-react/core";
import erc20 from "../assets/forty_two.json";

export default function Home() {
    const numberofImages = 100;
    const [randomNum, setRandomNum] = useState(0);
    const [usedIndices, setUsedIndices] = useState([]);
    const [file, setFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | ArrayBuffer | undefined>();
    const { address } = useAccount();
    const { chain } = useNetwork();
    const [photoURL, setPhotoURL] = useState<string | undefined>();
    const { contract } = useContract({
      abi: erc20.abi,
      address: chain.nativeCurrency.address,
    });

    const viewPhotos = async () => {
        if(contract?.address === undefined) return;

        const response = await fetch('localhost:3000/download/1', {
          method: 'POST',
          body: address,
        });
        if (response.ok) {
            setPhotoURL(response.url);
        } else {
            console.error('Failed to upload file');
        }
    }

    const handleOnChange = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as HTMLInputElement & { files: FileList };

        setFile(target.files[0]);
        const file = new FileReader;

        console.log(target.files[0]);

        try {
            const response = await fetch('localhost:3000/send', {
                method: 'POST',
                body: target.files[0],
            });
            if (response.ok) {
                console.log('File uploaded successfully!');
            } else {
                console.error('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }


    }

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomNum(Math.floor(Math.random() * numberofImages));
        }, 2000);

        return () => clearInterval(interval);
    }, []);


    const generateImageSrc = (index : number) => `https://picsum.photos/200?random=${Math.floor(Math.random() * numberofImages)}`;

    return (
        <div className="app w-full h-full flex flex-col scroll-smooth">
        <div className="hero h-[100vh] scroll-smooth ">
          <header className="bg-slate-900 border-[#141B41] border-[1px] justify-center items-center flex flex-col  h-[150px] text-white text-center sticky">
            <h1 className='text-4xl font-bold'>Timecapsule.tech</h1>
            <nav className="flex justify-center mt-4">
                        <a href="/" className=" scroll-smooth text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Home</a>
                        <a href="#upload" className=" scroll-smooth text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Upload</a>
                        <a href="#view" className="text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">View</a>
                        <a href="#contact" className="text-white no-underline hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Contact</a>
                    </nav>
                </header>

                <div className=" bg-slate-950 h-full bg-cover bg-center text-white text-center py-10">
                    <h1 className="text-3xl m-1 text-white pb-3">Your Memorable Moments Captured</h1>
                    <p className="text-lg m-8 text-white">Organize, share, and cherish your photos with the power of <a className="underline hover:bg-gray-50 hover:text-black transition duration-300" href="https://book.starknet.io/">Starknet</a> blockchain.</p>

                    <div className=''>
                        <div className="w-full h-[600px] flex flex-wrap justify-center overflow-hidden">
                            {[...Array(50)].map((_, i) => (
                                <img
                                    key={i}
                                    src={generateImageSrc(i === randomNum ? randomNum + 1 : i)}
                                    className='inline m-3'
                                    alt={`Random Image ${i}`}
                                />
                            ))}

                        </div>
                        <p className="py-6 border-[2px] border-white-100 top-[calc(60%-2.5rem)] left-[calc(50%-9.75rem)]  absolute    border-1 cta-button px-10 my-4 text-lg text-white no-underline bg-slate-950 rounded transition duration-300"><a href="#upload"><WalletBar></WalletBar></a></p>
                    </div>
                </div>
            </div>
            <div id="upload" className="w-full h-[100vh] flex items-center justify-center bg-slate-950 relative border-[#2d2d2d] border-[1px]">
                <div className="flex justify-center items-start flex-col border-[#2d2d2d] border-[1px] rounded-sm p-12">
                    <h2 className="text-3xl flex justify-center text-white pb-5">Upload</h2>
                    <p className="text-lg my-8 text-white">Upload your photos to the <i>goerli</i> blockchain.</p>
                    <form action="/send" method="post" encType="multipart/form-data">
                        <input type="file" name="image" required/>
                        <button className="p-5 bg-color">Confirm</button>
                    </form>
                </div>
            </div>
            <div id="view" className="bg-slate-900 w-full h-[100vh]">
                <div className="flex justify-center items-center flex-col border-[#2d2d2d] border-[1px] rounded-sm p-12">
                    <h2 className="text-3xl flex justify-center items-center text-white pb-5">View</h2>
                    <button onClick={viewPhotos} className="text-lg p-8 bg-[#141B41] my-8 text-white">View your photos from your address.</button>
                    {photoURL ? <img src={photoURL} className="w-100px" /> : null}
                    <p className="text-lg my-8 text-white">Address: {contract?.address}</p>
                    <p className="text-lg my-8 text-white"></p>
                </div>
                
            </div>
        </div>
    );
}
