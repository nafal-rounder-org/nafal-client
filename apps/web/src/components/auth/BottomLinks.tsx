'use client';

interface BottomLinksProps {
  links?: Array<{
    text: string;
    onClick: () => void;
  }>;
}

export default function BottomLinks({
  links = [
    { text: "계정 찾기", onClick: () => console.log("계정 찾기") },
    { text: "비밀번호 변경", onClick: () => console.log("비밀번호 변경") },
    { text: "문의하기", onClick: () => console.log("문의하기") },
  ],
}: BottomLinksProps) {
  return (
    <div className="flex items-center justify-center px-4">
      {links.map((link, index) => (
        <div key={index} className="flex items-center">
          <button
            onClick={link.onClick}
            className="text-sm text-[#9E9E9E] hover:text-gray-700 transition-colors"
          >
            {link.text}
          </button>
          {index < links.length - 1 && (
            <div className="w-1 h-1 bg-[#9E9E9E] rounded-full mx-4 flex-shrink-0 self-center"></div>
          )}
        </div>
      ))}
    </div>
  );
}
