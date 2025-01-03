import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { walletAddress } = await request.json()

    // Find or create user
    const user = await prisma.user.upsert({
      where: { walletAddress },
      create: {
        id: walletAddress,
        walletAddress,
      },
      update: {},
    })

    // Check if user has already liked this artwork
    const existingLike = await prisma.like.findUnique({
      where: {
        artworkId_userId: {
          artworkId: params.id,
          userId: user.id,
        },
      },
    })

    if (existingLike) {
      // Unlike: Remove the like and decrement count
      await prisma.$transaction([
        prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        }),
        prisma.artwork.update({
          where: { id: params.id },
          data: {
            likeCount: {
              decrement: 1,
            },
          },
        }),
      ])

      return NextResponse.json({ 
        success: true, 
        liked: false,
        likeCount: (await prisma.artwork.findUnique({
          where: { id: params.id },
        }))?.likeCount || 0,
      })
    } else {
      // Like: Create new like and increment count
      await prisma.$transaction([
        prisma.like.create({
          data: {
            artworkId: params.id,
            userId: user.id,
          },
        }),
        prisma.artwork.update({
          where: { id: params.id },
          data: {
            likeCount: {
              increment: 1,
            },
          },
        }),
      ])

      return NextResponse.json({ 
        success: true, 
        liked: true,
        likeCount: (await prisma.artwork.findUnique({
          where: { id: params.id },
        }))?.likeCount || 0,
      })
    }
  } catch (error) {
    console.error('Failed to toggle like:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to toggle like'
    }, { status: 500 })
  }
} 