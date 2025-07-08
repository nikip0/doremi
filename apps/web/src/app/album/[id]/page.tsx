'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Track {
  id: string;
  title: string;
  duration: number;
  reviews: Array<{
    id: string;
    rating: number;
    content: string;
    user: {
      id: string;
      name: string;
    };
  }>;
}

interface Review {
  id: string;
  rating: number;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

interface Album {
  id: string;
  title: string;
  releaseDate: string;
  averageRating: number;
  artist: {
    name: string;
  };
  tracks: Track[];
  reviews: Review[];
  _count: {
    tracks: number;
    reviews: number;
  };
}

export default function AlbumPage() {
  const params = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch('/api/albums/' + params.id)
        .then((res) => res.json())
        .then((data) => {
          setAlbum(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching album:', error);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">💿</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Album Not Found</h1>
            <p className="text-gray-600 mb-6">The album you&apos;re looking for doesn&apos;t exist.</p>
            <Link 
              href="/trending"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              Browse Trending Albums
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes + ':' + remainingSeconds.toString().padStart(2, '0');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">♪</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Doremi
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/trending" className="text-gray-600 hover:text-purple-600 transition-colors">
                Trending
              </Link>
              <Link href="/user/1" className="text-gray-600 hover:text-purple-600 transition-colors">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Album Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{album.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{album.artist.name}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {new Date(album.releaseDate).getFullYear()}
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                  {album._count.tracks} tracks
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {album._count.reviews} reviews
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={'text-2xl ' + (Math.floor(album.averageRating) > i ? 'text-yellow-500' : 'text-gray-300')}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {album.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Tracks */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tracks</h2>
          <div className="space-y-3">
            {album.tracks.map((track, index) => (
              <div key={track.id} className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500 font-medium w-8">{index + 1}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{track.title}</h3>
                    {track.reviews.length > 0 && (
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-xs text-gray-500">
                          {track.reviews.length} reviews
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  {formatDuration(track.duration || 0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
          {album.reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600">Be the first to review this album!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {album.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {review.user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">{review.user.name}</span>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={'text-sm ' + (review.rating >= i + 1 ? 'text-yellow-500' : 'text-gray-300')}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 