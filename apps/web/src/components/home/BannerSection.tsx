'use client';

import React from 'react';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    title: '덕질은\n삶의 에너지니까',
    subtitle: '오직 나팔에서만',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=310&h=456&fit=crop&crop=center',
  },
  {
    id: 2,
    title: '덕질은\n삶의 에너지니까',
    subtitle: '오직 나팔에서만',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=310&h=456&fit=crop&crop=center',
  },
  {
    id: 3,
    title: '덕질은\n삶의 에너지니까',
    subtitle: '오직 나팔에서만',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=310&h=456&fit=crop&crop=center',
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
          <Image
            src={banner.imageUrl}
            alt={`${banner.title} - ${banner.subtitle}`}
            fill
            className="object-cover"
            sizes="310px"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onError={() => {
              console.error('배너 이미지 로드 실패:', banner.imageUrl);
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
