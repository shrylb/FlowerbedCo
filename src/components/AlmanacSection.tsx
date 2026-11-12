import React, { useState } from 'react';
import { SEASONAL_BLOOMS } from '../data/florals';
import { SeasonalBloom } from '../types';
import { BookOpen, Clock, Compass, Info, Sun, CloudSnow, Wind, Flower2 } from 'lucide-react';

type SeasonType = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

interface SeasonTheme {
  sectionBg: string;
  pillBarBg: string;
  pillActiveBg: string;
  pillActiveText: string;
  pillInactiveText: string;
  accentText: string;
  accentRing: string;
  tagBg: string;
  tagText: string;
  cardHighlightBg: string;
  borderTone: string;
  seasonIcon: React.ReactNode;
  subtitle: string;
  badgeLabel: string;
}

const SEASON_THEMES: Record<SeasonType, SeasonTheme> = {
  Spring: {
    sectionBg: '#faf3f3', // Default pastel pink
    pillBarBg: '#ebdcdb',
    pillActiveBg: '#231f1d',
    pillActiveText: '#ffffff',
    pillInactiveText: '#594444',
    accentText: '#945858',
    accentRing: '#d6b8b8',
    tagBg: '#f5e4e4',
    tagText: '#693e3e',
    cardHighlightBg: '#fcf6f6',
    borderTone: 'rgba(148, 88, 88, 0.15)',
    seasonIcon: <Flower2 className="w-3.5 h-3.5 text-[#945858]" />,
    subtitle: 'Awakening with soft pastel pinks, delicate peonies, and Icelandic poppies',
    badgeLabel: 'Spring Harvest',
  },
  Summer: {
    sectionBg: '#faf7e8', // Yellow pastel
    pillBarBg: '#ede6ca',
    pillActiveBg: '#36311b',
    pillActiveText: '#ffffff',
    pillInactiveText: '#5c522e',
    accentText: '#876e18',
    accentRing: '#dfcf8b',
    tagBg: '#f7f1cd',
    tagText: '#635114',
    cardHighlightBg: '#fefdf4',
    borderTone: 'rgba(135, 110, 24, 0.18)',
    seasonIcon: <Sun className="w-3.5 h-3.5 text-[#876e18]" />,
    subtitle: 'Sunlit warmth with yellow pastels, golden chamomile, and tall delphiniums',
    badgeLabel: 'Summer Harvest',
  },
  Autumn: {
    sectionBg: '#faf1ea', // Orange-ish pastel
    pillBarBg: '#edd9cc',
    pillActiveBg: '#38251c',
    pillActiveText: '#ffffff',
    pillInactiveText: '#634435',
    accentText: '#9e5229',
    accentRing: '#e3b89f',
    tagBg: '#f6e2d4',
    tagText: '#783c1b',
    cardHighlightBg: '#fdf7f2',
    borderTone: 'rgba(158, 82, 41, 0.18)',
    seasonIcon: <Wind className="w-3.5 h-3.5 text-[#9e5229]" />,
    subtitle: 'Earth-born richness with orange-ish pastels, terracotta dahlias, and saffron roses',
    badgeLabel: 'Autumn Harvest',
  },
  Winter: {
    sectionBg: '#eff4f8', // Blue pastel
    pillBarBg: '#d9e6ee',
    pillActiveBg: '#1f2d38',
    pillActiveText: '#ffffff',
    pillInactiveText: '#3d5261',
    accentText: '#3a6a8c',
    accentRing: '#afcee0',
    tagBg: '#dbe9f2',
    tagText: '#264e6b',
    cardHighlightBg: '#f5f9fc',
    borderTone: 'rgba(58, 106, 140, 0.18)',
    seasonIcon: <CloudSnow className="w-3.5 h-3.5 text-[#3a6a8c]" />,
    subtitle: 'Frosted tranquility with powder blue pastels, sweet peas, and winter greens',
    badgeLabel: 'Winter Harvest',
  },
};

export const AlmanacSection: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>('Spring');
  const [activeBloom, setActiveBloom] = useState<SeasonalBloom>(SEASONAL_BLOOMS[0]);

  const currentTheme = SEASON_THEMES[selectedSeason];
  const seasonalList = SEASONAL_BLOOMS.filter((b) => b.season === selectedSeason);

  const handleSelectSeason = (season: SeasonType) => {
    setSelectedSeason(season);
    const first = SEASONAL_BLOOMS.find((b) => b.season === season);
    if (first) {
      setActiveBloom(first);
    }
  };

  return (
    <section
      id="almanac"
      style={{ backgroundColor: currentTheme.sectionBg }}
      className="w-full py-20 md:py-28 relative border-t border-black/5 transition-colors duration-700 ease-in-out"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                style={{ color: currentTheme.accentText }}
                className="font-serif italic text-xs md:text-sm tracking-widest uppercase font-semibold transition-colors duration-500 flex items-center gap-1.5"
              >
                {currentTheme.seasonIcon}
                <span>Studio Floriography & Botanical Almanac</span>
              </span>
            </div>

            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[42px] text-[#231f1d] tracking-tight">
              Seasonal Harvest Almanac
            </h2>

            <p className="font-serif text-[#4a3e3b] text-sm md:text-base max-w-xl mt-3 transition-opacity duration-500">
              {currentTheme.subtitle}. Explore what blooms in our regional partner greenhouses each
              quarter and the symbolic messages they whisper.
            </p>
          </div>

          {/* Season Filter Tabs (Customized per user reference screenshot) */}
          <div
            style={{ backgroundColor: currentTheme.pillBarBg }}
            className="flex items-center gap-1.5 p-1.5 rounded-full border border-black/5 shadow-xs transition-colors duration-700 self-start md:self-auto"
          >
            {(['Spring', 'Summer', 'Autumn', 'Winter'] as const).map((season) => {
              const isSelected = selectedSeason === season;
              return (
                <button
                  key={season}
                  onClick={() => handleSelectSeason(season)}
                  style={
                    isSelected
                      ? {
                          backgroundColor: currentTheme.pillActiveBg,
                          color: currentTheme.pillActiveText,
                        }
                      : {
                          color: currentTheme.pillInactiveText,
                        }
                  }
                  className={`px-4 md:px-5 py-2 text-xs md:text-sm font-serif rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected ? 'font-semibold shadow-sm' : 'hover:opacity-80'
                  }`}
                >
                  {season}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Content: Left List of Blooms, Right Focal Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Seasonal Stems List */}
          <div className="lg:col-span-5 space-y-3.5">
            {seasonalList.map((bloom) => {
              const isSelected = activeBloom.name === bloom.name;
              return (
                <div
                  key={bloom.name}
                  onClick={() => setActiveBloom(bloom)}
                  style={
                    isSelected
                      ? {
                          borderColor: currentTheme.accentText,
                          boxShadow: `0 4px 16px ${currentTheme.borderTone}`,
                        }
                      : {
                          borderColor: currentTheme.borderTone,
                        }
                  }
                  className={`relative overflow-hidden p-4 md:p-5 rounded-none border transition-all duration-300 cursor-pointer group ${
                    isSelected ? 'ring-2' : 'hover:border-black/20'
                  }`}
                >
                  {/* Background Image with Seasonal Shade Overlay */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                      src="/assets/aistudio/image_ee46261a.png"
                      alt=""
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Low opacity shade overlay changing per season color */}
                    <div
                      style={{ backgroundColor: currentTheme.sectionBg }}
                      className={`absolute inset-0 transition-colors duration-700 ease-in-out ${
                        isSelected ? 'opacity-80' : 'opacity-88 group-hover:opacity-80'
                      }`}
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-base md:text-lg text-[#231f1d]">
                          {bloom.name}
                        </h3>
                        <p className="font-serif italic text-xs text-[#705e5a]">
                          {bloom.scientificName}
                        </p>
                      </div>

                      <span
                        style={{
                          backgroundColor: currentTheme.tagBg,
                          color: currentTheme.tagText,
                        }}
                        className="text-[11px] font-serif px-2.5 py-0.5 rounded-none transition-colors duration-500 font-medium"
                      >
                        ~{bloom.vaseLifeDays} days life
                      </span>
                    </div>

                    <p className="font-serif text-xs md:text-[13px] text-[#4d3e3a] mt-2.5 line-clamp-1">
                      <strong className="font-semibold text-[#231f1d]">Meaning:</strong>{' '}
                      {bloom.floriography}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Botanical Spotlight Card */}
          <div
            style={{
              borderColor: currentTheme.borderTone,
              boxShadow: `0 10px 30px ${currentTheme.borderTone}`,
            }}
            className="lg:col-span-7 bg-white rounded-none p-6 md:p-9 border shadow-sm space-y-6 transition-all duration-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-black/5 gap-3">
              <div>
                <span
                  style={{ color: currentTheme.accentText }}
                  className="text-[11px] font-serif uppercase tracking-widest font-semibold block transition-colors duration-500"
                >
                  {activeBloom.season} Botanical Spotlight
                </span>
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#231f1d] mt-0.5">
                  {activeBloom.name}
                </h3>
                <p className="font-serif italic text-xs text-[#6e5d59]">
                  {activeBloom.scientificName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-serif text-[#665450]">Typical Colors:</span>
                <div className="flex flex-wrap gap-1">
                  {activeBloom.colorRange.map((c: string, i: number) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: currentTheme.tagBg,
                        color: currentTheme.tagText,
                      }}
                      className="text-[10px] font-serif px-2.5 py-0.5 rounded-full transition-colors duration-500 border border-black/5"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floriography & Story */}
            <div
              style={{
                backgroundColor: currentTheme.cardHighlightBg,
                borderColor: currentTheme.borderTone,
              }}
              className="p-5 rounded-none border space-y-2 transition-colors duration-700"
            >
              <div className="flex items-center gap-2">
                <BookOpen style={{ color: currentTheme.accentText }} className="w-4 h-4 transition-colors duration-500" />
                <h4 className="font-serif font-bold text-sm text-[#231f1d]">
                  The Language of Flowers (Floriography)
                </h4>
              </div>
              <p className="font-serif text-sm text-[#473935] leading-relaxed">
                "{activeBloom.floriography}." In classical botanical tradition, including this
                stem in a bespoke bouquet communicates an intentional, heartfelt sentiment
                directly to the recipient without speaking a single word.
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif text-[#544541]">
              <div
                style={{
                  backgroundColor: currentTheme.cardHighlightBg,
                  borderColor: currentTheme.borderTone,
                }}
                className="p-4 rounded-none border space-y-1.5 transition-colors duration-700"
              >
                <div className="flex items-center gap-1.5 font-semibold text-[#231f1d]">
                  <Compass style={{ color: currentTheme.accentText }} className="w-3.5 h-3.5 transition-colors duration-500" />
                  <span>Fragrance Profile</span>
                </div>
                <p className="leading-relaxed">{activeBloom.fragranceProfile}</p>
              </div>

              <div
                style={{
                  backgroundColor: currentTheme.cardHighlightBg,
                  borderColor: currentTheme.borderTone,
                }}
                className="p-4 rounded-none border space-y-1.5 transition-colors duration-700"
              >
                <div className="flex items-center gap-1.5 font-semibold text-[#231f1d]">
                  <Clock style={{ color: currentTheme.accentText }} className="w-3.5 h-3.5 transition-colors duration-500" />
                  <span>Average Vase Longevity</span>
                </div>
                <p className="leading-relaxed">
                  {activeBloom.vaseLifeDays} to {activeBloom.vaseLifeDays + 3} days with fresh water replenishment
                </p>
              </div>
            </div>

            {/* Visual Description */}
            <div className="pt-3 flex items-start gap-2.5 text-xs font-serif text-[#665450] border-t border-black/5">
              <Info style={{ color: currentTheme.accentText }} className="w-4 h-4 shrink-0 mt-0.5 transition-colors duration-500" />
              <span>
                <strong>Studio Botanical Note:</strong> {activeBloom.imageDesc}. Freshly picked stems are
                conditioned in our studio cold cellar before being hand-arranged into bouquets and baskets.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
