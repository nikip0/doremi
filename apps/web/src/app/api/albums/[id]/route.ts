import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const album = await prisma.album.findUnique({
      where: {
        id: context.params.id,
      },
      include: {
        artist: true,
        tracks: {
          include: {
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
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            tracks: true,
            reviews: true,
          },
        },
      },
    });

    if (!album) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }

    // Calculate average rating
    const avgRating = album.reviews.length > 0
      ? album.reviews.reduce((sum, review) => sum + review.rating, 0) / album.reviews.length
      : 0;

    const albumWithStats = {
      ...album,
      averageRating: Math.round(avgRating * 10) / 10,
    };

    return NextResponse.json(albumWithStats);
  } catch (error) {
    console.error('Error fetching album details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch album details' },
      { status: 500 }
    );
  }
} 