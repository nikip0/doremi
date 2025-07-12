'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <span className="text-white font-bold text-xl">♪</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Doremi
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Music Review Hub</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-8">
              <Link 
                href="/trending" 
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium flex items-center space-x-2 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">🔥</span>
                <span>Trending</span>
              </Link>
              <Link 
                href="/user/1" 
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium flex items-center space-x-2 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">👤</span>
                <span>Profile</span>
              </Link>
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                <span className="text-gray-600 text-sm">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Doremi
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your ultimate music review hub. Discover amazing albums, share your thoughts, and connect with fellow music lovers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/trending" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>🔥</span>
                <span>Explore Trending Albums</span>
              </Link>
              <Link 
                href="/album/1" 
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200 flex items-center space-x-2"
              >
                <span>💿</span>
                <span>View Sample Album</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Doremi?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover, review, and connect with music lovers from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">🎵</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Discover Music</h3>
              <p className="text-gray-600 leading-relaxed">
                Find trending albums and discover new artists that match your taste
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Share Reviews</h3>
              <p className="text-gray-600 leading-relaxed">
                Rate and review your favorite albums and tracks with detailed insights
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Follow other music lovers and share your passion for great music
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Navigation</h2>
            <p className="text-gray-600">Jump right into exploring our music community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/trending">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-gray-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl">🔥</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Trending Albums</h3>
                  <p className="text-gray-600">{"See what's hot right now"}</p>
                </div>
              </div>
            </Link>

            <Link href="/album/1">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-gray-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl">💿</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sample Album</h3>
                  <p className="text-gray-600">Explore album details</p>
                </div>
              </div>
            </Link>

            <Link href="/user/1">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-gray-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl">👤</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">User Profile</h3>
                  <p className="text-gray-600">See user reviews & follows</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 