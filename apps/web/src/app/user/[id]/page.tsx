'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '../../components/ThemeToggle';

interface Review {
  id: string;
  rating: number;
  content: string;
  createdAt: string;
  album?: {
    id: string;
    title: string;
    artist: {
      name: string;
    };
  };
  track?: {
    id: string;
    title: string;
    album: {
      id: string;
      title: string;
      artist: {
        name: string;
      };
    };
  };
}

interface Follow {
  id: string;
  following: {
    id: string;
    name: string;
  };
}

interface Follower {
  id: string;
  follower: {
    id: string;
    name: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  reviews: Review[];
  follows: Follow[];
  followers: Follower[];
  _count: {
    reviews: number;
    follows: number;
    followers: number;
  };
}

export default function UserProfilePage() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch('/api/users/' + params.id)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">👤</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The user you&apos;re looking for doesn&apos;t exist.</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
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
              <Link href="/trending" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Trending
              </Link>
              <Link href="/user/1" className="text-purple-600 dark:text-purple-400 font-semibold">
                Profile
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{user.email}</p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
                    {user._count.reviews} reviews
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
                    {user._count.follows} following
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-medium">
                    {user._count.followers} followers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reviews</h2>
              {user.reviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No reviews yet</h3>
                  <p className="text-gray-600 dark:text-gray-300">Start reviewing albums to see them here!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {user.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={'text-sm ' + (review.rating >= i + 1 ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600')}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      {review.album && (
                        <div className="mb-3">
                          <Link href={'/album/' + review.album.id} className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                            {review.album.title} by {review.album.artist.name}
                          </Link>
                        </div>
                      )}
                      
                      {review.track && (
                        <div className="mb-3">
                          <Link href={'/album/' + review.track.album.id} className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                            {review.track.title} from {review.track.album.title} by {review.track.album.artist.name}
                          </Link>
                        </div>
                      )}
                      
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Following */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Following</h3>
              {user.follows.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">Not following anyone yet</p>
              ) : (
                <div className="space-y-3">
                  {user.follows.slice(0, 5).map((follow) => (
                    <div key={follow.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {follow.following.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {follow.following.name}
                      </span>
                    </div>
                  ))}
                  {user.follows.length > 5 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      +{user.follows.length - 5} more
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Followers */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Followers</h3>
              {user.followers.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No followers yet</p>
              ) : (
                <div className="space-y-3">
                  {user.followers.slice(0, 5).map((follower) => (
                    <div key={follower.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {follower.follower.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {follower.follower.name}
                      </span>
                    </div>
                  ))}
                  {user.followers.length > 5 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      +{user.followers.length - 5} more
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 