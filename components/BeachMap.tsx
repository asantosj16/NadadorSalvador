import React, { useEffect, useRef, useState } from 'react';
import maplibregl, { StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { BeachPoint, FORECAST_POINTS, getAlertColor } from '../data/weatherData';

interface BeachMapProps {
  onSelectBeach?: (beach: BeachPoint) => void;
}

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    'arcgis-world-imagery': {
      type: 'raster',
      tiles: [
        'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      attribution: 'Tiles © Esri & contributors'
    }
  },
  layers: [
    {
      id: 'arcgis-world-imagery',
      type: 'raster',
      source: 'arcgis-world-imagery'
    }
  ]
};

const BeachMap: React.FC<BeachMapProps> = ({ onSelectBeach }) => {
  const [activePoint, setActivePoint] = useState<BeachPoint | null>(
    FORECAST_POINTS.find(p => p.id === 'nazare') || null
  );
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<
    Record<
      string,
      { marker: maplibregl.Marker; button: HTMLButtonElement; label: HTMLDivElement }
    >
  >({});

  const syncMarkerStyles = (selectedId?: string) => {
    Object.entries(markersRef.current).forEach(([id, { button, label }]) => {
      const baseButton = button.dataset.baseClass || '';
      const baseLabel = label.dataset.baseClass || '';
      const isActive = id === selectedId;

      button.className = `${baseButton} ${
        isActive ? 'ring-4 ring-blue-500/40 scale-125 z-30 shadow-xl' : 'hover:scale-110 hover:shadow-2xl'
      }`;
      button.style.boxShadow = isActive
        ? '0 10px 40px rgba(0,0,0,0.3), 0 0 0 4px rgba(59, 130, 246, 0.2)'
        : '0 4px 12px rgba(0,0,0,0.15)';

      label.className = `${baseLabel} ${
        isActive
          ? 'bg-blue-600 text-white scale-105 shadow-xl'
          : 'bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100'
      }`;
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: activePoint ? [activePoint.lng, activePoint.lat] : [-8.5, 39.6],
      zoom: 6,
      minZoom: 4,
      maxZoom: 13,
      attributionControl: false
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');

    map.on('load', () => {
      FORECAST_POINTS.forEach((point) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col items-center';

        const button = document.createElement('button');
        const baseButtonClass = `relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full shadow-2xl border-2 border-white dark:border-slate-900 transition-all duration-300 active:scale-90 touch-manipulation ${getAlertColor(point.alert)}`;
        button.dataset.baseClass = baseButtonClass;
        button.className = baseButtonClass;
        button.innerHTML = `
          <span class="text-base md:text-xl drop-shadow">${point.icon}</span>
          ${
            point.alert
              ? '<span class="absolute -inset-1.5 rounded-full border-2 border-current opacity-60 animate-ping pointer-events-none"></span>'
              : ''
          }
        `;

        const label = document.createElement('div');
        const baseLabelClass = 'mt-1 px-2 py-1 text-[9px] font-bold tracking-tight rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 backdrop-blur-sm';
        label.dataset.baseClass = baseLabelClass;
        label.className = `${baseLabelClass} bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100`;
        label.textContent = point.name;

        wrapper.appendChild(button);
        wrapper.appendChild(label);

        const marker = new maplibregl.Marker({ element: wrapper, anchor: 'bottom' })
          .setLngLat([point.lng, point.lat])
          .addTo(map);

        markersRef.current[point.id] = { marker, button, label };

        const handleClick = () => {
          setActivePoint(point);
          if (onSelectBeach) onSelectBeach(point);
        };

        wrapper.addEventListener('mouseenter', () => setHoveredRegion(point.region));
        wrapper.addEventListener('mouseleave', () => setHoveredRegion(null));
        button.addEventListener('click', handleClick);
      });

      syncMarkerStyles(activePoint?.id);
    });

    return () => {
      map.remove();
      markersRef.current = {};
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current || !activePoint) return;
    mapRef.current.flyTo({
      center: [activePoint.lng, activePoint.lat],
      zoom: 8,
      speed: 0.8,
      essential: true
    });
    syncMarkerStyles(activePoint.id);
  }, [activePoint]);

  return (
    <div className="h-full animate-fade-in">
      <div className="relative h-full w-full aspect-[4/5] rounded-[2rem] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl">
        <div ref={mapContainerRef} className="absolute inset-0" />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-blue-200/5 to-blue-300/15 dark:via-blue-900/10 dark:to-blue-800/20" />

        <div className="absolute top-4 left-4 right-4 sm:left-4 sm:right-auto z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 max-w-xs">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-400">Vigilância</span>
          </div>
          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 tracking-tighter mt-0.5 truncate">
            {hoveredRegion || activePoint?.region || 'Portugal'}
          </h3>
        </div>

        <div className="absolute top-4 right-4 z-10 bg-slate-900/90 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-semibold shadow-md border border-slate-700/80 hidden sm:block">
          Modo Satélite
        </div>

      </div>

      {activePoint && (
        <div className="mt-4 sm:mt-5 bg-white/95 dark:bg-slate-900/95 sm:bg-white/90 sm:dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-4 sm:p-6 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[9px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-500 truncate">Praia selecionada</p>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-50 leading-tight truncate">
                {activePoint.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">{activePoint.region}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <span className="text-3xl sm:text-4xl drop-shadow-sm">{activePoint.icon}</span>
              <div className="text-right">
                <p className="text-[10px] sm:text-sm font-semibold text-slate-600 dark:text-slate-200 line-clamp-2">{activePoint.condition}</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{activePoint.temp}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-lg bg-slate-100 dark:bg-slate-800/70 px-3 sm:px-4 py-3 sm:py-4 border border-slate-200 dark:border-slate-700">
              <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-slate-500 dark:text-slate-400 font-bold">Vento</p>
              <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white mt-2">{activePoint.wind}</p>
            </div>
            <div className="rounded-lg bg-slate-100 dark:bg-slate-800/70 px-3 sm:px-4 py-3 sm:py-4 border border-slate-200 dark:border-slate-700">
              <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-slate-500 dark:text-slate-400 font-bold">Ondas</p>
              <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white mt-2">{activePoint.waves}</p>
            </div>
            <div className="rounded-lg bg-slate-100 dark:bg-slate-800/70 px-3 sm:px-4 py-3 sm:py-4 border border-slate-200 dark:border-slate-700">
              <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-slate-500 dark:text-slate-400 font-bold">Maré</p>
              <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white mt-2">{activePoint.tide}</p>
            </div>
          </div>
          {(activePoint.airTemp || activePoint.waterTemp || activePoint.uvIndex) && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {activePoint.airTemp && (
                <div className="rounded-lg bg-orange-100/50 dark:bg-orange-900/30 px-3 sm:px-4 py-3 sm:py-4 border border-orange-200 dark:border-orange-800">
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-orange-600 dark:text-orange-400 font-bold">Temp Ar</p>
                  <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white mt-2">{activePoint.airTemp}</p>
                </div>
              )}
              {activePoint.waterTemp && (
                <div className="rounded-lg bg-blue-100/50 dark:bg-blue-900/30 px-3 sm:px-4 py-3 sm:py-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-blue-600 dark:text-blue-400 font-bold">Temp Água</p>
                  <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white mt-2">{activePoint.waterTemp}</p>
                </div>
              )}
              {activePoint.uvIndex && (
                <div className="rounded-lg bg-yellow-100/50 dark:bg-yellow-900/30 px-3 sm:px-4 py-3 sm:py-4 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-yellow-600 dark:text-yellow-400 font-bold">UV Index</p>
                  <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white mt-2">{activePoint.uvIndex}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BeachMap;
