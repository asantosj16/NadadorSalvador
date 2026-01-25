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

        <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-400">Vigilância</span>
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-slate-100 tracking-tighter mt-0.5">
            {hoveredRegion || activePoint?.region || 'Portugal'}
          </h3>
        </div>

        <div className="absolute top-4 right-4 z-10 bg-slate-900/90 text-white px-3 py-1 rounded-full text-[10px] font-semibold shadow-md border border-slate-700/80">
          Modo Satélite
        </div>

        {activePoint && (
          <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-4">
            {/* Dados movidos para BeachDataPanel */}
          </div>
        )}
      </div>
    </div>
  );
};

export default BeachMap;
