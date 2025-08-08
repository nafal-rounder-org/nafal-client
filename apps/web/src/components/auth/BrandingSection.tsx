'use client';

interface BrandingSectionProps {
  logo?: string;
  slogan?: string;
}

export default function BrandingSection({
  logo = "/assets/lg-nafal-black.svg",
  slogan = "이 땅의 모든 존재를 위한\n차세대 경매",
}: BrandingSectionProps) {
  return (
    <div className="flex flex-col items-start gap-6 px-4">
      <div className="w-[126px] h-[42px]">
        <img src={logo} alt="Nafal" className="w-full h-full object-contain" />
      </div>

      <div className="text-2xl font-normal leading-7 text-black whitespace-pre-line">
        {slogan}
      </div>
    </div>
  );
}
