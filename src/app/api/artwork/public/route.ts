import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('wallet')

    // First get all artworks with their basic info
    const artworks = await prisma.artwork.findMany({
      where: {
        isPublic: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true,
        socials: true,
        likes: walletAddress ? {
          where: {
            user: {
              walletAddress
            }
          }
        } : false
      }
    })

    // Get like counts for all artworks in a single query
    const likeCounts = await prisma.like.groupBy({
      by: ['artworkId'],
      _count: {
        _all: true
      }
    })

    // Create a map of artwork ID to like count
    const likeCountMap = new Map(
      likeCounts.map(count => [count.artworkId, count._count._all])
    )

    return NextResponse.json({
      success: true,
      artworks: artworks.map(artwork => ({
        ...artwork,
        isLikedByUser: artwork.likes?.length > 0,
        likeCount: likeCountMap.get(artwork.id) || 0,
        socialLinks: artwork.socials.reduce((acc, social) => ({
          ...acc,
          [social.platform]: social.url
        }), {}),
        likes: undefined
      }))
    })

  } catch (error) {
    console.error('Failed to fetch artworks:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch artworks' 
    }, { status: 500 })
  }
} 