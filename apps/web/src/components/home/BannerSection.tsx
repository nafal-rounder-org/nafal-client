'use client';

import React from 'react';

const banners = [
  {
    id: 1,
    title: '덕질은\n삶의 에너지니까',
    subtitle: '오직 나팔에서만',
    imageUrl: 'https://via.placeholder.com/310x456/4A90E2/FFFFFF?text=Banner+1',
  },
  {
    id: 2,
    title: '덕질은\n삶의 에너지니까',
    subtitle: '오직 나팔에서만',
    imageUrl: 'https://via.placeholder.com/310x456/50C878/FFFFFF?text=Banner+2',
  },
  {
    id: 3,
    title: '덕질은\n삶의 에너지니까',
    subtitle: '오직 나팔에서만',
    imageUrl: 'https://via.placeholder.com/310x456/F39C12/FFFFFF?text=Banner+3',
  },
];

export default function BannerSection() {
  return (
    <div className="flex gap-2 px-4 py-4 overflow-x-auto scrollbar-hide">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="flex-shrink-0 w-[310px] h-[456px] rounded-lg flex flex-col justify-end items-center p-6 relative overflow-hidden"
        >
          {/* 배경 이미지 */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${banner.imageUrl})`,
            }}
          />

          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80" />

          {/* 텍스트 콘텐츠 */}
          <div className="relative z-10 text-center">
            <h2
              className="text-white font-bold mb-2.5 text-center"
              style={{
                fontFamily: 'Pretendard Variable',
                fontSize: '28px',
                lineHeight: '140%',
                letterSpacing: '-0.3px',
              }}
            >
              {banner.title}
            </h2>
            <p
              className="text-white font-normal text-center"
              style={{
                fontFamily: 'Pretendard Variable',
                fontSize: '18px',
                lineHeight: '140%',
                letterSpacing: '-1.3636364178224043%',
              }}
            >
              {banner.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
