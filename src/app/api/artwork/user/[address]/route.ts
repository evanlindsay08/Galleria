import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    // Get the viewer's wallet address from the query params
    const { searchParams } = new URL(request.url)
    const viewerAddress = searchParams.get('viewer')

    const artworks = await prisma.artwork.findMany({
      where: {
        user: {
          walletAddress: params.address
        }
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

    console.log('Found artworks with social links:', 
      artworks.map(a => ({ id: a.id, socialLinks: a.socialLinks }))
    )

    // Transform the data to include isLikedByUser
    const transformedArtworks = artworks.map(artwork => ({
      ...artwork,
      isLikedByUser: artwork.likes?.length > 0,
      likes: undefined // Remove the likes array from the response
    }))

    return NextResponse.json({ 
      success: true, 
      artworks: transformedArtworks
    })
  } catch (error) {
    console.error('Failed to fetch artworks:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch artworks' 
    }, { status: 500 })
  }
} 