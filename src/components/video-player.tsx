
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import Hls from 'hls.js';
import { getHlsProxyUrl } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  thumbnail?: string;
}

const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export function VideoPlayer({ src, thumbnail }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const youtubeId = getYouTubeId(src);
  
  const isHLS = src?.includes('.m3u8');
  const hasVideo = src && (
    youtubeId || 
    src.includes('.mp4') || 
    isHLS ||
    src.includes('envatousercontent') || 
    src.includes('archive.org') || 
    src.includes('motionarray.com')
  );

  // Usar el proxy para archivos HLS
  const finalSrc = isHLS ? getHlsProxyUrl(src) : src;

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying && video) {
      if (isHLS) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            xhrSetup: (xhr) => {
              xhr.withCredentials = false;
            }
          });
          hlsRef.current = hls;
          hls.loadSource(finalSrc);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(err => {
              console.error("HLS Video play failed:", err);
            });
          });
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              console.error('HLS fatal error in VideoPlayer:', data);
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  hls.recoverMediaError();
                  break;
                default:
                  hls.destroy();
                  break;
              }
            }
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = finalSrc;
          video.onloadedmetadata = () => {
            video.play().catch(err => {
              console.error('Safari HLS video play failed:', err);
            });
          };
        }
      } else {
        // Para videos directos MP4
        video.load();
        video.play().catch(err => console.error("Direct video play failed:", err));
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isPlaying, finalSrc, isHLS]);

  if (!isPlaying && thumbnail) {
    return (
      <div 
        className="relative w-full h-full cursor-pointer group"
        onClick={() => hasVideo && setIsPlaying(true)}
      >
        <Image 
          src={thumbnail} 
          alt="Video thumbnail" 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
            <div className="bg-primary text-white p-5 rounded-full shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-active:scale-95">
              <Play className="h-10 w-10 fill-current" />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (youtubeId) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }

  const isDirectVideo = src && (src.includes('.mp4') || isHLS || src.includes('envatousercontent') || src.includes('archive.org') || src.includes('motionarray.com'));

  if (isDirectVideo) {
    return (
      <video 
        ref={videoRef} 
        className="w-full h-full bg-black" 
        controls 
        autoPlay 
        muted={false}
        playsInline
        crossOrigin={isHLS ? "anonymous" : undefined}
      >
        {!isHLS && (
          <source src={src} type="video/mp4" />
        )}
        Your browser does not support the video tag.
      </video>
    );
  }

  if (thumbnail) {
    return (
      <div className="relative w-full h-full">
        <Image src={thumbnail} alt="Preview" fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <p className="text-muted-foreground">No hay video disponible</p>
    </div>
  );
}
