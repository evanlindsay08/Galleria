import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    // Get the viewer's wallet address from the query params
    const { searchParams } = new URL(request.url)
    const viewerAddress = searchParams.get('viewer')

    console.log('Fetching public artworks for viewer:', viewerAddress)

    const artworks = await prisma.artwork.findMany({
      where: {
        isPublic: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            walletAddress: true
          }
        },
        socialLinks: true,
        likes: viewerAddress ? {
          where: {
            user: {
              walletAddress: viewerAddress
            }
          }
        } : false
      }
    })

    console.log('Found artworks:', artworks.length)

    // Transform the data to include isLikedByUser
    const transformedArtworks = artworks.map(artwork => ({
      ...artwork,
      isLikedByUser: artwork.likes?.length > 0,
      likes: undefined
    }))

    return NextResponse.json({ 
      success: true, 
      artworks: transformedArtworks
    })
  } catch (error) {
    console.error('Failed to fetch public artworks:', error)
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
    }

    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch artworks'
    }, { status: 500 })
  }
} 