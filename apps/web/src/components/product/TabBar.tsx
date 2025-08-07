'use client';

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="bg-white border-b border-[#E0E0E0]">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'text-black border-b-2 border-black' : 'text-[#9E9E9E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
