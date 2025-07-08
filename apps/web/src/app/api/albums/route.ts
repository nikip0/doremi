import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const trendingAlbums = await prisma.album.findMany({
      include: {
        artist: true,
        tracks: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: [
        {
          reviews: {
            _count: 'desc',
          },
        },
        {
          reviews: {
            rating: 'desc',
          },
        },
      ],
      take: 20,
    });

    // Calculate average ratings
    const albumsWithAvgRating = trendingAlbums.map((album) => {
      const avgRating = album.reviews.length > 0
        ? album.reviews.reduce((sum, review) => sum + review.rating, 0) / album.reviews.length
        : 0;

      return {
        ...album,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: album._count.reviews,
      };
    });

    return NextResponse.json(albumsWithAvgRating);
  } catch (error) {
    console.error('Error fetching trending albums:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending albums' },
      { status: 500 }
    );
  }
} 