'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Album {
  id: string;
  title: string;
  releaseDate: string;
  averageRating: number;
  reviewCount: number;
  artist: {
    name: string;
  };
  tracks: Array<{
    id: string;
    title: string;
  }>;
}

export default function TrendingPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/albums')
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trending Albums</h1>
            <p className="text-xl text-gray-600">Discover what's hot in music right now</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
              <Link href="/trending" className="text-purple-600 font-semibold">
                Trending
              </Link>
              <Link href="/user/1" className="text-gray-600 hover:text-purple-600 transition-colors">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trending Albums
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most popular albums based on reviews and ratings from our community
          </p>
        </div>
        
        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {albums.map((album) => (
            <Link key={album.id} href={`/album/${album.id}`}>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100">
                {/* Album Cover Placeholder */}
                <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">💿</span>
                    <p className="text-sm text-gray-600 font-medium">Album Cover</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
                      {album.title}
                    </h3>
                    <div className="flex items-center space-x-1 ml-2">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="text-sm font-bold text-gray-700">
                        {album.averageRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 font-medium mb-3">{album.artist.name}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {new Date(album.releaseDate).getFullYear()}
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                      {album.reviewCount} reviews
                    </span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2 font-medium">
                      {album.tracks.length} tracks
                    </p>
                    <div className="space-y-1">
                      {album.tracks.slice(0, 3).map((track) => (
                        <p key={track.id} className="text-xs text-gray-500 truncate">
                          {track.title}
                        </p>
                      ))}
                      {album.tracks.length > 3 && (
                        <p className="text-xs text-purple-600 font-medium">
                          +{album.tracks.length - 3} more tracks
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {albums.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎵</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trending albums yet</h3>
            <p className="text-gray-600">Be the first to review an album and make it trend!</p>
          </div>
        )}
      </div>
    </div>
  );
} 