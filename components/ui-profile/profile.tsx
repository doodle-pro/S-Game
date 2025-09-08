"use client";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="bg-black text-white flex flex-col font-poppins px-[5vw] gap-[50px]">

      <div>

        <h2 className="font-bold flex items-center gap-3 font-bmps text-[25px]">
          Profile <Image src={"/images/heart.svg"} alt="." width={28} height={28}/>
        </h2>
        <div className="border relative border-dotted p-4 w-fit mt-2 grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-10 border-white">
          
          <div className="absolute top-[50%] w-full border border-dotted  border-white"></div>
              <div className="flex flex-row flex-1 gap-4 items-center">
              <Image src={"/images/aviral.svg"} alt="." width={36} height={36} className="rounded-full"/>
              <div>
                <p className="text-[16px] font-bold">AVIRAL HATWAL</p>
                <p className="text-gray-400 text-[14px]">
                  Joined on <span className="text-white">11/02/2025</span>
                </p>
              </div>
              </div>
              <div className="flex gap-6">
                <button className="border px-3 text-[14px] hover:bg-gray-800 w-fit">
                  Change Username
                </button>
                <button className="border px-3 text-[14px] hover:bg-gray-800 w-fit">
                  Change Profile Picture
                </button>
              </div>

            <div className="">
              <p className="font-bold">User Id</p>
              <p className="text-gray-400 break-all">cm6zfcfeu01571lp599h41o6f</p>
            </div>
            <div className="">
              <p className="font-bold">Connected Wallet</p>
              <p className="text-gray-400 break-all">
                G4FHvz5DCwHzDViPxhUx97Yu6isKEZgSRociADyhZCVF
              </p>
            </div>
        </div>
      </div>


      <div className="">
  <h2 className="font-bold flex items-center gap-3 mt-6 font-bmps text-[25px]">
    Connected Profile <Image src={"/images/spade.svg"} alt="." width={28} height={28}/>
  </h2>

  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6 mt-2 border border-dotted p-6 w-fit">
    
    {/* Twitter */}
    <div className="flex items-center  gap-[150px] flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <Image src={"/images/x.svg"} alt="." width={36} height={36} />
        <div>
          <p className="font-bold">Twitter</p>
          <p className="text-gray-400 break-words">Not Connected</p>
        </div>
      </div>
      <button className="border text-[14px] px-3 py-1 hover:bg-gray-800">Connect</button>
    </div>

    {/* Google */}
    <div className="flex items-center gap-[150px] flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <Image src={"/images/google.svg"} alt="." width={36} height={36} />
        <div>
          <p className="font-bold">Google</p>
          <p className="text-gray-400  break-words">bikramnarayan96@gmail.com</p>
        </div>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-center gap-[150px] flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <Image src={"/images/email.svg"} alt="." width={36} height={36} />
        <div>
          <p className="font-bold">Email</p>
          <p className="text-gray-400 break-words">Not Connected</p>
        </div>
      </div>
      <button className="border px-3 text-[14px] py-1 hover:bg-gray-800">Connect</button>
    </div>

    {/* Phone */}
    <div className="flex items-center gap-[150px] flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <Image src={"/images/phone.svg"} alt="." width={36} height={36} />
        <div>
          <p className="font-bold">Phone</p>
          <p className="text-gray-400 break-words">Not Connected</p>
        </div>
      </div>
      <button className="border px-3 py-1 text-[14px] hover:bg-gray-800">Connect</button>
    </div>

  </div>
</div>


    </div>
  );
};

export default ProfilePage;
