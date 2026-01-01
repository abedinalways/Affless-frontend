import { NextRequest, NextResponse } from 'next/server';

interface AvailabilityPayload {
  isAvailable: boolean;
  availableFrom?: string;
  availableUntil?: string;
  reason?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as AvailabilityPayload;

    // Validation
    if (typeof body.isAvailable !== 'boolean') {
      return NextResponse.json(
        { error: 'isAvailable field is required and must be a boolean' },
        { status: 400 }
      );
    }

    // If unavailable, validate date fields
    if (!body.isAvailable) {
      if (!body.availableFrom || !body.availableUntil) {
        return NextResponse.json(
          { error: 'availableFrom and availableUntil are required when setting unavailable' },
          { status: 400 }
        );
      }

      // Validate date range
      const fromDate = new Date(body.availableFrom);
      const untilDate = new Date(body.availableUntil);

      if (isNaN(fromDate.getTime()) || isNaN(untilDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid date format' },
          { status: 400 }
        );
      }

      if (fromDate >= untilDate) {
        return NextResponse.json(
          { error: 'Unavailable until date must be after unavailable from date' },
          { status: 400 }
        );
      }
    }

    // TODO: Replace with your actual database/API call
    // Example: 
    // const response = await fetch(`${process.env.API_BASE_URL}/editor/availability`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${request.headers.get('authorization')}`,
    //   },
    //   body: JSON.stringify(body),
    // });
    //
    // if (!response.ok) {
    //   return NextResponse.json(
    //     { error: 'Failed to update availability' },
    //     { status: response.status }
    //   );
    // }

    // Mock response for demonstration
    console.log('Availability updated:', body);

    return NextResponse.json(
      {
        success: true,
        message: body.isAvailable
          ? 'You are now available for orders'
          : 'Your unavailability period has been set',
        data: {
          ...body,
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating availability:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with your actual database/API call
    // Example:
    // const response = await fetch(`${process.env.API_BASE_URL}/editor/availability`, {
    //   headers: {
    //     'Authorization': `Bearer ${request.headers.get('authorization')}`,
    //   },
    // });

    // Mock response for demonstration
    const availability: AvailabilityPayload = {
      isAvailable: true,
    };

    return NextResponse.json(
      {
        success: true,
        data: availability,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
