import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('wallet')

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

    return NextResponse.json({
      success: true,
      artworks: artworks.map(artwork => ({
        ...artwork,
        isLikedByUser: artwork.likes?.length > 0,
        socialLinks: artwork.socials.reduce((acc, social) => ({
          ...acc,
          [social.platform]: social.url
        }), {})
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