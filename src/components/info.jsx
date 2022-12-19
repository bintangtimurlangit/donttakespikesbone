import React, { useState } from 'react';
import Button from './button';

export default function Info() {
  const [isAcive, setIsActive] = useState(false);

  return (
    <>
      <Button onClick={() => setIsActive(true)} className="flex h-12 w-12 items-center sm:h-20 sm:w-20">
        <img src="./info.png" alt="info button" className="h-12 w-12 sm:h-20 sm:w-20" />
      </Button>
      {isAcive && (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-4">
        <div className="pointer-events-none flex cursor-default flex-col gap-4 border-8 border-slate-900 bg-brown-300 p-8 font-pixel text-slate-900 dark:bg-brown dark:text-white">
          <div className="flex w-full flex-col gap-1">
            <h2 className="text-center text-3xl sm:text-4xl">ANGGOTA KELOMPOK</h2>
            <ul className="flex flex-col gap-2 px-3 text-left sm:text-lg">
              <li>Mahdi Husein Punca - 00000061531</li>
              <li>Bintang Timurlangit - 00000053806</li>
              <li>Raqqat Amarasangga Iswahyudi - 00000057063</li>
              <li>Sinung Agung Cahyono - 00000056197</li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-2xl sm:text-3xl">Peraturan Permainan</p>
            <ol className="flex list-decimal flex-col gap-2 px-8 text-left sm:text-lg">
              <li>Pemain melakukan add player sebelum memulai permainan</li>
              <li>Minimal pemain sebanyak 2 orang dan maksimal 4 orang</li>
              <li>Pemain memiliki waktu 10 detik untuk memilih tulang</li>
              <li>Apabila timer habis , maka player pada giliran itu kalah</li>
              <li>
                Apabila setelah mengambil tulang spike terbangun,
                maka player pada giliran tersebut kalah
              </li>
            </ol>
          </div>
        </div>
        <Button onClick={() => setIsActive(false)} className="absolute left-0 top-0 z-[-1] m-0 flex h-full w-full items-center justify-center bg-black/50 p-8" />
      </div>
      )}
    </>
  );
}
