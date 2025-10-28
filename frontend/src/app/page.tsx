'use client'

import { useState, useEffect } from 'react'
import Slider from 'react-slick'

interface Video {
  link: string;
  category: string;
}

interface GroupedVideos {
  [key: string]: Video[];
}

export default function Home() {
  const [videos, setVideos] = useState<GroupedVideos>({})

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch('/api/videos');
      const newData: { link: string[], category: string }[] = await response.json();
      
      const flattenedData: Video[] = [];
      if (Array.isArray(newData)) {
        newData.forEach(item => {
          const category = item.category;
          item.link.forEach(link => {
            flattenedData.push({ link, category });
          });
        });
      }

      const grouped: GroupedVideos = {};
      flattenedData.forEach(video => {
        const category = video.category;
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(video);
      });

      setVideos(grouped);
    };

    const interval = setInterval(() => {
      fetchVideos();
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Player</h1>
      {Object.keys(videos).map(category => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold mb-4 capitalize">{category}</h2>
          <Slider {...sliderSettings}>
            {videos[category].map((video, index) => (
              <div key={index} className="px-2">
                                  <div className="video-container">
                                    <video controls src={video.link} />
                                  </div>              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  )
}

