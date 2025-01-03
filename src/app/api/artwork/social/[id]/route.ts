import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const artworkId = context.params.id
    const { twitter, telegram, website, pumpFun, walletAddress } = await request.json()
    console.log('Received social links:', { twitter, telegram, website, pumpFun })

    // Verify ownership
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
      include: { user: true, socialLinks: true }
    })

    if (!artwork || artwork.user.walletAddress !== walletAddress) {
      console.log('Unauthorized attempt:', { 
        artworkUserId: artwork?.user.walletAddress,
        requestUserId: walletAddress 
      })
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 403 })
    }

    // First, find existing social links
    const existingSocialLinks = await prisma.social.findUnique({
      where: {
        artworkId: artworkId
      }
    })

    let updated
    if (existingSocialLinks) {
      // Update existing social links
      updated = await prisma.artwork.update({
        where: { id: artworkId },
        data: {
          socialLinks: {
            update: {
              where: {
                id: existingSocialLinks.id
              },
              data: {
                twitter,
                telegram,
                website,
                pumpFun
              }
            }
          }
        },
        include: {
          socialLinks: true,
          user: true
        }
      })
    } else {
      // Create new social links
      updated = await prisma.artwork.update({
        where: { id: artworkId },
        data: {
          socialLinks: {
            create: {
              twitter,
              telegram,
              website,
              pumpFun,
              userId: artwork.userId
            }
          }
        },
        include: {
          socialLinks: true,
          user: true
        }
      })
    }

    console.log('Updated artwork:', JSON.stringify(updated, null, 2))

    return NextResponse.json({ 
      success: true, 
      artwork: updated 
    })

  } catch (error) {
    console.error('Failed to update social links:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update social links'
    }, { status: 500 })
  }
} 