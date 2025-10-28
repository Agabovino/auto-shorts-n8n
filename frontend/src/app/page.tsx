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
  const [selectedVideos, setSelectedVideos] = useState<{ [key: string]: Video }>({});
  const [useTestWebhook, setUseTestWebhook] = useState(false);

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

  const handleSelectVideo = (video: Video) => {
    setSelectedVideos(prev => ({
      ...prev,
      [video.category]: video
    }));
  };

  const handleSendToWebhook = async () => {
    const webhookUrl = useTestWebhook
      ? 'http://localhost:5678/webhook-test/75a21675-c87e-49a9-9d3c-d7fe7c3893e9'
      : 'http://localhost:5678/webhook/75a21675-c87e-49a9-9d3c-d7fe7c3893e9';
    const videosToSend = Object.values(selectedVideos);

    if (videosToSend.length === 0) {
      alert('No videos selected.');
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videosToSend),
      });

      if (response.ok) {
        alert('Videos sent successfully!');
        setSelectedVideos({}); // Clear selection after sending
      } else {
        alert('Failed to send videos.');
      }
    } catch (error) {
      console.error('Error sending videos:', error);
      alert('An error occurred while sending videos.');
    }
  };

  const handleClearSelection = () => {
    setVideos({})
  };

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Video Player</h1>
        <div>
          <button
            onClick={() => setUseTestWebhook(!useTestWebhook)}
            className={`font-bold py-2 px-4 rounded mr-2 ${useTestWebhook ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-gray-500 hover:bg-gray-700'}`}>
            {useTestWebhook ? 'Using Test Webhook' : 'Using Prod Webhook'}
          </button>
          <button
            onClick={handleSendToWebhook}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Send to n8n
          </button>
          <button
            onClick={handleClearSelection}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>
      </div>
      {Object.keys(videos).map(category => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold mb-4 capitalize">{category}</h2>
          <Slider {...sliderSettings}>
            {videos[category].map((video, index) => {
              const isSelected = selectedVideos[category]?.link === video.link;
              return (
                <div
                  key={index}
                  className="px-2 cursor-pointer"
                  onClick={() => handleSelectVideo(video)}
                >
                  <div className={`video-container ${isSelected ? 'border-4 border-blue-500' : ''}`}>
                    <video controls src={video.link} />
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      ))}
    </div>
  )
}