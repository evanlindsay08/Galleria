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
      create: { walletAddress },
      update: {}
    })

    const existingLike = await prisma.like.findUnique({
      where: {
        artworkId_userId: {
          artworkId: params.id,
          userId: user.id
        }
      }
    })

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      })

      // Get updated like count
      const likeCount = await prisma.like.count({
        where: { artworkId: params.id }
      })

      return NextResponse.json({ 
        success: true, 
        liked: false,
        likeCount 
      })
    }

    await prisma.like.create({
      data: {
        artworkId: params.id,
        userId: user.id
      }
    })

    // Get updated like count
    const likeCount = await prisma.like.count({
      where: { artworkId: params.id }
    })

    return NextResponse.json({ 
      success: true, 
      liked: true,
      likeCount 
    })

  } catch (error) {
    console.error('Error handling like:', error)
    return NextResponse.json({ error: 'Failed to process like' }, { status: 500 })
  }
} 