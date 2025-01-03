import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const artworkId = params.id
    const { walletAddress, ...socialData } = await request.json()

    // Verify ownership
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
      include: { user: true, socials: true }
    })

    if (!artwork || artwork.user.walletAddress !== walletAddress) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 403 })
    }

    // Delete existing social links
    await prisma.social.deleteMany({
      where: { artworkId }
    })

    // Create new social links
    const socials = await Promise.all(
      Object.entries(socialData).map(([platform, url]) =>
        prisma.social.create({
          data: {
            platform,
            url: url as string,
            artworkId
          }
        })
      )
    )

    return NextResponse.json({ 
      success: true,
      socials 
    })

  } catch (error) {
    console.error('Failed to update social links:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update social links' 
    }, { status: 500 })
  }
} 