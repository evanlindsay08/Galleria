import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PrismaClient } from '@prisma/client'

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const artworkId = context.params.id
    const { walletAddress } = await request.json()

    // Verify ownership
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
      include: { user: true }
    })

    if (!artwork || artwork.user.walletAddress !== walletAddress) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 403 })
    }

    // Delete all related records in a transaction
    await prisma.$transaction(async (tx: PrismaClient) => {
      // Delete likes
      await tx.like.deleteMany({
        where: { artworkId }
      })

      // Delete social links
      await tx.social.deleteMany({
        where: { artworkId }
      })

      // Finally delete the artwork
      await tx.artwork.delete({
        where: { id: artworkId }
      })
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Failed to delete artwork:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete artwork'
    }, { status: 500 })
  }
} 