"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Maximize2, Minimize2, Music2, Play, Search, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

const tracks = [
  { id: "t0Bt3a-MLGs", title: "Surat Cinta untuk Starla", artist: "Virgoun" },
  { id: "kzGzPL23XOc", title: "Sampai Menutup Mata", artist: "Mahalini" },
  { id: "oIYWenB637c", title: "To The Bone", artist: "Pamungkas" },
  { id: "pagiHshKe_0", title: "Lantas", artist: "Juicy Luicy" },
  { id: "wnAKxtEi78c", title: "Secukupnya", artist: "Hindia" },
  { id: "wdFNa0US3u4", title: "Bertaut (In Silence Live)", artist: "Nadin Amizah" },
  { id: "cA2TqwucPUQ", title: "Cinta Luar Biasa (Piano Version)", artist: "Andmesh" },
  { id: "6NsiA6GFAbU", title: "Tak Segampang Itu", artist: "Anggi Marito" },
  { id: "9II3OGZETo4", title: "Hati-Hati di Jalan", artist: "Tulus" },
  { id: "_ZYvZ7XfQU4", title: "Tak Ingin Usai", artist: "Keisya Levronka" },
  { id: "UHTVQVuVZTY", title: "Merasa Indah", artist: "Tiara Andini" },
  { id: "AQpEIZ8dNcU", title: "Gala Bunga Matahari", artist: "Sal Priadi" },
  { id: "102HT0f5K7U", title: "Buruh Tani", artist: "Marjinal" },
] as const;

const featuredCartoons = [
  { key: "IrXZJ7mhkSc", embed: "IrXZJ7mhkSc", title: "Kompilasi Upin & Ipin Musim 19 (Episode Penuh)", creator: "Upin & Ipin Official" },
  { key: "tpOunHuneCQ", embed: "tpOunHuneCQ", title: "Musim 19 - Sahabat Baik Abah", creator: "Upin & Ipin Official" },
  { key: "DKmIvzxFvKw", embed: "DKmIvzxFvKw", title: "Musim 20 - Minyak Sawit Luar Biasa", creator: "Les' Copaque Production" },
  { key: "DjBO98auack", embed: "DjBO98auack", title: "Basikal Baru (Full Episode)", creator: "Les' Copaque Production" },
  { key: "4B9UtUhNnu0", embed: "4B9UtUhNnu0", title: "Perut Ehsan (Full Episode)", creator: "Upin & Ipin Official" },
  { key: "k2Db7xsBJHs", embed: "k2Db7xsBJHs", title: "Mulanya Ramadhan & Tibanya Syawal", creator: "Upin & Ipin Official" },
  { key: "0Q5W7BsJsEo", embed: "0Q5W7BsJsEo", title: "Upin & Ipin Musim 18", creator: "Upin & Ipin Official" },
  { key: "CqGQmgP_LKM", embed: "CqGQmgP_LKM", title: "The Palm Oil Hero", creator: "Upin & Ipin Official | English" },
  { key: "xwHVqahAk_U", embed: "xwHVqahAk_U", title: "New Toys", creator: "Upin & Ipin Official | English" },
  { key: "r8uHRKVtros", embed: "r8uHRKVtros", title: "Tibanya Syawal", creator: "Upin & Ipin Official" },
  { key: "uw_BzUwwyPE", embed: "uw_BzUwwyPE", title: "Ramadan Raya", creator: "Upin & Ipin Official" },
  { key: "P4IVguxDdd8", embed: "P4IVguxDdd8", title: "Kuih Ramadan Kak Ros", creator: "Upin & Ipin Official" },
  { key: "LtguruoWirk", embed: "LtguruoWirk", title: "Jaga Dan Hargai Mata", creator: "Les' Copaque Production" },
  { key: "OujCu95VxJ4", embed: "OujCu95VxJ4", title: "Wira Minyak Sawit", creator: "Les' Copaque Production" },
  { key: "ZYMI8adms7c", embed: "ZYMI8adms7c", title: "Musim 18 - Minyak Sawit", creator: "Les' Copaque Production" },
  { key: "zM78QaUshxE", embed: "zM78QaUshxE", title: "Ramadan Raya - Full Episode", creator: "Les' Copaque Production" },
  { key: "oroh0Z8XiKo", embed: "oroh0Z8XiKo", title: "Buy, Use, Love", creator: "Les' Copaque Production" },
  { key: "eqlD2uqYlLQ", embed: "eqlD2uqYlLQ", title: "Maximum Performance", creator: "Les' Copaque Production" },
  { key: "QErZlWQYxtw", embed: "QErZlWQYxtw", title: "Kompilasi Episod 2025", creator: "Les' Copaque Production" },
  { key: "ddyPjrmQAJU", embed: "ddyPjrmQAJU", title: "Kompilasi Episod 2024", creator: "Les' Copaque Production" },
  { key: "qQPIzkEmrts", embed: "qQPIzkEmrts", title: "Kompilasi Episod 2026", creator: "Les' Copaque Production" },
  { key: "PiWDylHIoRk", embed: "PiWDylHIoRk", title: "New Toys HD", creator: "Les' Copaque Production" },
  { key: "RqMhTHbSW38", embed: "RqMhTHbSW38", title: "Our Story HD", creator: "Les' Copaque Production" },
  { key: "iuLuYdl_41o", embed: "iuLuYdl_41o", title: "Kompilasi Musim 19", creator: "Les' Copaque Production" },
  { key: "KhF8JG-F9QI", embed: "KhF8JG-F9QI", title: "Upin & Ipin - Jeruk", creator: "Les' Copaque Production" },
  { key: "BhpaGoIhWyU", embed: "BhpaGoIhWyU", title: "Kompilasi Musim 12", creator: "Les' Copaque Production" },
  { key: "kyFl--pAo_8", embed: "kyFl--pAo_8", title: "Kompilasi Musim 13", creator: "Les' Copaque Production" },
  { key: "9Ur_XXG9iDw", embed: "9Ur_XXG9iDw", title: "Kompilasi Musim 17", creator: "Les' Copaque Production" },
  { key: "kKIapF9WqXM", embed: "kKIapF9WqXM", title: "Kompilasi Episod Raya Musim 1-17", creator: "Les' Copaque Production" },
  { key: "UeTxp88mM9g", embed: "UeTxp88mM9g", title: "The Car and The Train", creator: "Bernard Bear" },
  { key: "no-xS38lpg0", embed: "no-xS38lpg0", title: "The Treasure", creator: "Bernard Bear" },
  { key: "Gf-hzN2SADY", embed: "Gf-hzN2SADY", title: "Giant Treasure", creator: "Bernard Bear" },
  { key: "GpZncXa2eqo", embed: "GpZncXa2eqo", title: "Canoeing", creator: "Bernard Bear" },
  { key: "trZwLeigeSI", embed: "trZwLeigeSI", title: "Plane Trouble", creator: "Bernard Bear" },
  { key: "TVGRclQfxf4", embed: "TVGRclQfxf4", title: "Pizza Mummy", creator: "Bernard Bear" },
  { key: "F0x5UOXmeXM", embed: "F0x5UOXmeXM", title: "Fishing - 30 Minute Compilation", creator: "Bernard Bear" },
  { key: "3pzSq7KDDfo", embed: "3pzSq7KDDfo", title: "In The Shower", creator: "Bernard Bear" },
  { key: "0Dt_4BU4gos", embed: "0Dt_4BU4gos", title: "Hot Water!", creator: "Bernard Bear" },
  { key: "PY-TJyfPFbU", embed: "PY-TJyfPFbU", title: "The Underground", creator: "Bernard Bear" },
  { key: "cCIsvLBlS3I", embed: "cCIsvLBlS3I", title: "Motor Racing", creator: "Bernard Bear" },
  { key: "6qkCAA6QIEI", embed: "6qkCAA6QIEI", title: "Triathlon - 50 Minute Compilation", creator: "Bernard Bear" },
  { key: "oXCHT2hXj5c", embed: "oXCHT2hXj5c", title: "The Moth - 30 Minute Compilation", creator: "Bernard Bear" },
  { key: "1NwUzvqMmCo", embed: "1NwUzvqMmCo", title: "Swimming - 30 Minute Compilation", creator: "Bernard Bear" },
  { key: "9BwYo4R7J_c", embed: "9BwYo4R7J_c", title: "Motor Racing Full Episodes", creator: "Bernard Bear" },
  { key: "lYtvrExgcJU", embed: "lYtvrExgcJU", title: "Bullfighter - 30 Minute Compilation", creator: "Bernard Bear" },
  { key: "_VBTtVNvM38", embed: "_VBTtVNvM38", title: "Stepped on Poo!", creator: "Bernard Bear" },
  { key: "QdtZgbSuDOo", embed: "QdtZgbSuDOo", title: "New Year Special - 1 Hour", creator: "Oscar's Oasis Official" },
  { key: "mCIryt0LSF4", embed: "mCIryt0LSF4", title: "Summer Compilation - 1 Hour", creator: "Oscar's Oasis Official" },
  { key: "8GU4Ny3GQlY", embed: "8GU4Ny3GQlY", title: "Top 10 Oscar Moments", creator: "Oscar's Oasis Official" },
  { key: "7XKsORP3rgs", embed: "7XKsORP3rgs", title: "Oscar's Search for Water", creator: "Oscar's Oasis Official" },
] as const;

const classicVideos = [...featuredCartoons];

const megaPlaylistCount = 180;
const marjinalCatalogCount = 10;
const totalTrackCount = tracks.length + megaPlaylistCount + marjinalCatalogCount;
type Source = "favorites" | "mega" | "marjinal" | "videos";

export function AmbientPlayer() {
  const { t } = useLanguage();
  const navigationHidden = useScrollVisibility();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<Source>("favorites");
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [videoMode, setVideoMode] = useState<"closed" | "mini" | "full">("closed");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [videoQuery, setVideoQuery] = useState("");
  const activeTrack = tracks[activeIndex];
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return normalizedQuery ? tracks.filter((track) => `${track.title} ${track.artist}`.toLowerCase().includes(normalizedQuery)) : tracks;
  }, [query]);
  const queueIds = tracks.filter((_, index) => index !== activeIndex).map((track) => track.id).join(",");
  const playerUrl = `https://www.youtube-nocookie.com/embed/${activeTrack.id}?rel=0&playsinline=1&autoplay=1&playlist=${queueIds}`;
  const activeVideo = classicVideos[activeVideoIndex];
  const filteredVideos = useMemo(() => {
    const normalizedQuery = videoQuery.trim().toLowerCase();
    return normalizedQuery ? classicVideos.filter((video) => `${video.title} ${video.creator}`.toLowerCase().includes(normalizedQuery)) : classicVideos;
  }, [videoQuery]);
  const classicVideoUrl = `https://www.youtube.com/embed/${activeVideo.embed}?rel=0&playsinline=1&autoplay=1`;
  const cinemaUrl = source === "videos" ? classicVideoUrl : playerUrl;
  const cinemaTitle = source === "videos" ? activeVideo.title : activeTrack.title;
  const cinemaCreator = source === "videos" ? activeVideo.creator : activeTrack.artist;
  const stepTrack = (direction: number) => setActiveIndex((current) => (current + direction + tracks.length) % tracks.length);

  useEffect(() => {
    if (videoMode === "closed") return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setVideoMode("closed"); };
    if (videoMode === "full") document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeOnEscape); };
  }, [videoMode]);

  return (
    <aside className={`youtube-music ${open ? "is-open" : ""} ${navigationHidden && !open ? "media-nav-hidden" : ""}`} aria-label={t("Music player")}>
      <div className="youtube-frame-wrap" aria-hidden={!open}>
        <div className="music-source-tabs" role="tablist" aria-label={t("Music source")}>
          <button className={source === "favorites" ? "active" : ""} type="button" onClick={() => setSource("favorites")}>YTB {t("Selected")} · {tracks.length}</button>
          <button className={source === "mega" ? "active" : ""} type="button" onClick={() => setSource("mega")}>Viral 2026 · {megaPlaylistCount}</button>
          <button className={source === "marjinal" ? "active" : ""} type="button" onClick={() => setSource("marjinal")}>Marjinal · 10+</button>
          <button className={source === "videos" ? "active" : ""} type="button" onClick={() => setSource("videos")}>{t("Cartoons")} · {classicVideos.length}</button>
        </div>
        <div className="music-library-count"><strong>{totalTrackCount}</strong><span>{t("songs available")}</span><i>{t("Auto-next enabled")}</i></div>

        {source === "favorites" ? (
          <iframe key={activeTrack.id} src={playerUrl} title={`${activeTrack.title} by ${activeTrack.artist}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        ) : source === "mega" ? (
          <iframe className="spotify-mega-frame" src="https://open.spotify.com/embed/playlist/2WEjl04WUKRyDD6oUZC5wN?utm_source=generator&theme=0" title="INDO POP 2026 — 180 songs" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
        ) : source === "marjinal" ? (
          <iframe className="spotify-mega-frame" src="https://open.spotify.com/embed/artist/3IOhBSi8QpYo4rR6oQKZP6?utm_source=generator&theme=0" title="Katalog Marjinal" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
        ) : (
          <iframe key={activeVideo.key} src={classicVideoUrl} title={`${activeVideo.title} by ${activeVideo.creator}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        )}

        <div className="youtube-track-copy"><span>{t(source === "videos" ? "NOW WATCHING" : "NOW PLAYING")}</span><p>{source === "favorites" ? `${activeTrack.title} · ${activeTrack.artist}` : source === "mega" ? `Mega Playlist · ${megaPlaylistCount} ${t("tracks")} 2026` : source === "marjinal" ? `Buruh Tani + ${t("Artist catalog")} Marjinal` : `${activeVideo.title} · ${activeVideo.creator}`}</p></div>

        {source === "favorites" && <><div className="music-controls">
          <button type="button" onClick={() => stepTrack(-1)} aria-label={t("Previous track")}><ChevronLeft size={16} /></button>
          <label className="music-search"><Search size={13} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search music...")} aria-label={t("Search music")} /></label>
          <button type="button" onClick={() => stepTrack(1)} aria-label={t("Next track")}><ChevronRight size={16} /></button>
        </div><div className="music-results">
          {results.length > 0 ? results.map((track) => { const index = tracks.findIndex((item) => item.id === track.id); return <button className={index === activeIndex ? "active" : ""} type="button" key={track.id} onClick={() => setActiveIndex(index)}><Play size={11} /><span>{track.title}<small>{track.artist}</small></span></button>; }) : <p>{t("Music not found.")}</p>}
        </div><button className="music-cinema-button" type="button" onClick={() => setVideoMode("full")}><Maximize2 size={14} /> {t("Open video player")}</button></>}

        {source === "videos" && <><label className="video-search"><Search size={14} aria-hidden="true" /><input value={videoQuery} onChange={(event) => setVideoQuery(event.target.value)} placeholder={t("Search cartoons or seasons...")} aria-label={t("Search cartoons")} /></label><div className="video-library-list">{filteredVideos.length > 0 ? filteredVideos.map((video) => { const index = classicVideos.findIndex((item) => item.key === video.key); return <button className={index === activeVideoIndex ? "active" : ""} type="button" key={video.key} onClick={() => setActiveVideoIndex(index)}><Play size={12} /><span>{video.title}<small>{video.creator}</small></span></button>; }) : <p className="video-empty">{t("Cartoon not found.")}</p>}</div><button className="music-cinema-button" type="button" onClick={() => setVideoMode("full")}><Maximize2 size={14} /> {t("Watch mini / fullscreen")}</button></>}

        <details className="music-references"><summary>{t("Music references")}</summary><a href="https://open.spotify.com/playlist/2WEjl04WUKRyDD6oUZC5wN" target="_blank" rel="noopener noreferrer">INDO POP 2026 · 180 {t("tracks")}</a><a href="https://www.youtube.com/watch?v=102HT0f5K7U" target="_blank" rel="noopener noreferrer">Marjinal · Buruh Tani</a><a href="https://open.spotify.com/artist/3IOhBSi8QpYo4rR6oQKZP6" target="_blank" rel="noopener noreferrer">Marjinal · {t("Artist catalog")}</a></details>
      </div>
      <button className="youtube-music-toggle" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open}><span className="youtube-music-icon">{open ? <ChevronDown size={17} /> : <Play size={16} />}</span><span><small><Music2 size={11} /> XYRONS MEDIA · {totalTrackCount} TRACKS + {classicVideos.length} {t("Cartoons").toUpperCase()}</small>{open ? t("Hide player") : source === "mega" ? "Viral Indonesia 2026" : source === "marjinal" ? `Marjinal ${t("Artist catalog")}` : source === "videos" ? activeVideo.title : activeTrack.title}</span></button>
      {videoMode !== "closed" && typeof document !== "undefined" && createPortal(<div className={`music-cinema mode-${videoMode}`} role="dialog" aria-modal={videoMode === "full"} aria-label={`${cinemaTitle} video`}><div className="music-cinema-toolbar"><button type="button" onClick={() => setVideoMode(videoMode === "full" ? "mini" : "full")} aria-label={t(videoMode === "full" ? "Minimize video" : "Maximize video")}>{videoMode === "full" ? <Minimize2 size={19} /> : <Maximize2 size={17} />}</button><button type="button" onClick={() => setVideoMode("closed")} aria-label={t("Close video")}><X size={20} /></button></div><div className="music-cinema-stage"><iframe src={`${cinemaUrl}&autoplay=1`} title={`${cinemaTitle} video player`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /><div><span>{t("NOW WATCHING")}</span><h2>{cinemaTitle}</h2><p>{cinemaCreator}</p></div></div></div>, document.body)}
    </aside>
  );
}
