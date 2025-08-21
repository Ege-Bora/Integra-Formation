import { NextRequest, NextResponse } from 'next/server';
import { formSchema } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Honeypot check - if website field is filled, it's likely a bot
    if (body.website && body.website.trim() !== '') {
      console.log('Honeypot triggered, ignoring submission');
      return NextResponse.json({ success: true });
    }

    // Validate the form data
    const validatedData = formSchema.parse(body);
    
    // Log the submission (for now - will be replaced with Google Sheets integration)
    console.log('Form submission received:', {
      timestamp: body.timestamp,
      ip: body.ip,
      userAgent: body.userAgent,
      data: validatedData,
    });

    // TODO: Replace this with Google Apps Script POST request
    // Example structure for future Google Sheets integration:
    /*
    const googleScriptResponse = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: body.timestamp,
        ip: body.ip,
        userAgent: body.userAgent,
        ...validatedData,
      }),
    });
    
    if (!googleScriptResponse.ok) {
      throw new Error('Failed to submit to Google Sheets');
    }
    */

    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully'
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit form' 
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'This endpoint only accepts POST requests' 
  }, { status: 405 });
}
