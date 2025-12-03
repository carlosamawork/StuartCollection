'use client';
import { useEffect, useRef, useState } from "react";
import s from "./LazyVideo.module.scss";

interface LazyVideoProps {
    alt?: string;
    src: string;
    defaultInView?: boolean;
    autoplay: boolean;
    controls?: boolean;
    muted?: boolean;
    preload?: boolean;
    isHero?: boolean;
    onLoadedData?: () => void;
}

export default function LazyVideo({
    src = "",
    autoplay = false,
    controls,
    muted,
    preload = false,
    onLoadedData,
}: LazyVideoProps) {
    const [isVisible, setIsVisible] = useState(false); // Controla el fade-in
    const [isLoaded, setIsLoaded] = useState(false); // Controla si el video ya se cargó
    
    const videoRef = useRef<HTMLVideoElement>(null);


    useEffect(() => {
        if (videoRef.current && !muted) {
            videoRef.current.volume = 0.5; // Establece el volumen al 50%
        }
    }, [muted]);

    const handleLoadedData = () => {
        setIsLoaded(true); // Marcamos el video como cargado
        setTimeout(() => setIsVisible(true), 50); // Pequeño delay para asegurar que se renderiza
        if (onLoadedData) onLoadedData();
    };

    return (
        <div className={s.lazyVideo}>
            <div
                style={{ height: "100%" }}
                className={`${s.contentVideo} ${isLoaded && isVisible ? s.fadeIn : s.hidden}`} 
            >
                <video
                    ref={videoRef}
                    src={src}
                    autoPlay={autoplay}
                    muted={muted}
                    loop
                    playsInline
                    preload={preload ? "metadata" : "auto"} // Usar "auto" para mejorar carga
                    controls={controls}
                    controlsList="nodownload noplaybackrate nofullscreen"
                    onLoadedData={handleLoadedData} // Se llama cuando el video realmente carga
                />
            </div>
        </div>
    );
}