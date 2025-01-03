import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
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
        socials: true,
        likes: viewerAddress ? {
          where: {
            user: {
              walletAddress: viewerAddress
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
        likes: undefined
      }))
    })

  } catch (error) {
    console.error('Failed to fetch user artworks:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch artworks' 
    }, { status: 500 })
  }
} 