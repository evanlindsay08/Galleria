import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { walletAddress } = await request.json()

    const user = await prisma.user.findUnique({
      where: { walletAddress }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

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
      return NextResponse.json({ liked: false })
    }

    await prisma.like.create({
      data: {
        artworkId: params.id,
        userId: user.id
      }
    })

    return NextResponse.json({ liked: true })

  } catch (error) {
    console.error('Error handling like:', error)
    return NextResponse.json({ error: 'Failed to process like' }, { status: 500 })
  }
} 