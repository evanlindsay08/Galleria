import { NextResponse } from 'next/server'

const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY
const LEONARDO_API_BASE = 'https://cloud.leonardo.ai/api/rest/v1'

export async function POST(request: Request) {
  if (!LEONARDO_API_KEY) {
    return NextResponse.json({ 
      success: false, 
      error: 'API key not configured' 
    }, { status: 500 })
  }

  try {
    const { prompt } = await request.json()

    // First create a generation
    const createResponse = await fetch(`${LEONARDO_API_BASE}/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LEONARDO_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        modelId: "1e60896f-3c26-4296-8ecc-53e2afecc132",
        width: 512,
        height: 512,
        num_images: 1,
        public: false
      }),
    })

    if (!createResponse.ok) {
      const errorText = await createResponse.text()
      console.error('Leonardo API Error Details:', {
        status: createResponse.status,
        statusText: createResponse.statusText,
        error: errorText
      })
      throw new Error(`Failed to initiate generation: ${createResponse.statusText}`)
    }

    const createData = await createResponse.json()
    console.log('Creation Response:', createData)
    
    const generationId = createData.sdGenerationJob?.generationId

    if (!generationId) {
      throw new Error('No generation ID received')
    }

    // Poll for results
    let imageUrl = null
    let attempts = 0
    const maxAttempts = 60

    while (!imageUrl && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Updated endpoint based on Leonardo's docs
      const checkResponse = await fetch(`${LEONARDO_API_BASE}/generations/${generationId}`, {
        headers: {
          'Authorization': `Bearer ${LEONARDO_API_KEY}`,
          'Accept': 'application/json',
        },
      })

      if (!checkResponse.ok) {
        console.error('Status check failed:', {
          status: checkResponse.status,
          statusText: checkResponse.statusText
        })
        continue
      }

      const checkData = await checkResponse.json()
      console.log('Check Response:', checkData)
      
      // Updated response format check
      if (checkData.generations_by_pk?.generated_images?.length > 0) {
        imageUrl = checkData.generations_by_pk.generated_images[0].url
        break
      } else if (checkData.generations_by_pk?.status === 'FAILED') {
        throw new Error('Generation failed on Leonardo servers')
      } else {
        console.log('Current status:', checkData.generations_by_pk?.status)
      }

      attempts++
    }

    if (!imageUrl) {
      throw new Error('Generation timed out or failed to produce an image')
    }

    return NextResponse.json({ 
      success: true,
      imageUrl 
    })

  } catch (error) {
    console.error('Generation failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Image generation failed' 
    }, { status: 500 })
  }
} 