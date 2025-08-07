'use client';

import React from 'react';

interface RankBadgeProps {
  rank: number;
}

export default function RankBadge({ rank }: RankBadgeProps) {
  return (
    <div className="w-4 h-4 flex items-center justify-center">
      <span className="text-sm font-bold text-black">{rank}</span>
    </div>
  );
}
