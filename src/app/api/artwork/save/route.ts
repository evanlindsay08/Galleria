import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { prompt, imageUrl, walletAddress } = await request.json()

    // Find or create user
    const user = await prisma.user.upsert({
      where: { walletAddress },
      create: {
        id: walletAddress,
        walletAddress,
      },
      update: {},
    })

    // Create artwork with explicit isPublic
    const artwork = await prisma.artwork.create({
      data: {
        prompt,
        imageUrl,
        userId: user.id,
        isPublic: true,  // Explicitly set to true
      },
      include: {
        user: true
      }
    })

    // Verify the artwork was saved
    console.log('Saved artwork:', {
      id: artwork.id,
      prompt: artwork.prompt,
      isPublic: artwork.isPublic,
      userId: artwork.userId
    })

    return NextResponse.json({ success: true, artwork })
  } catch (error) {
    console.error('Failed to save artwork:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save artwork'
    }, { status: 500 })
  }
} 