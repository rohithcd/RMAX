"use client"

// Importing built-in dependencies
import React, { useRef } from 'react';
import Image from 'next/image';

type FullscreenDocument = Document & {
  webkitRequestFullscreen: () => Promise<void>
  msRequestFullscreen: () => void
}

const VideoPlayer = () => {
  const videoContainerRef = useRef<HTMLDivElement | FullscreenDocument>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (videoContainerRef.current) {
      (videoContainerRef.current as HTMLDivElement).style.display = 'block'

      if ((videoContainerRef.current as HTMLDivElement).requestFullscreen) {
        (videoContainerRef.current as HTMLDivElement).requestFullscreen()
      } else if ((videoContainerRef.current as FullscreenDocument).webkitRequestFullscreen) {
        (videoContainerRef.current as FullscreenDocument).webkitRequestFullscreen()
      } else if ((videoContainerRef.current as FullscreenDocument).msRequestFullscreen) {
        (videoContainerRef.current as FullscreenDocument).msRequestFullscreen()
      }

      videoRef.current?.play()
    }
  }

  const handleClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }

    videoRef.current?.pause()
    videoRef.current!.currentTime = 0

    if (videoContainerRef.current) {
      (videoContainerRef.current as HTMLDivElement).style.display = 'none'
    }
  }

    function getYouTubeThumbnail(url: string) {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        const videoId = match && match[2].length === 11 ? match[2] : null

        if (!videoId) return ''

        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    }

  return (
    <>
        <div className="flex flex-col justify-center items-center relative min-h-25 w-ful rounded-lg overflow-hidden px-2">
            <figure>
                <Image src={getYouTubeThumbnail("https://www.youtube.com/watch?v=SC2eSujzrUY")} alt="thumbnail" fill={true} className='-z-1'/>
                <button
                    className='z-2'
                    onClick={handlePlay}
            >
                <Image src="/icons/play.svg" alt="Play" width={30} height={30}/>
            </button>
            </figure>
        </div>

        

      <div
        ref={videoContainerRef as React.Ref<HTMLDivElement>}
        className="fixed inset-0 bg-black hidden z-50"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded text-sm z-50"
        >
          ✕ Close
        </button>

        <video
          ref={videoRef}
          controls
          className="w-full h-full object-contain"
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  )
}

export default VideoPlayer;