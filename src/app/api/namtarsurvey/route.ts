import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const hook = process.env.DISCORD_WEBHOOK_URL;

        if (!hook) {
            throw new Error('DISCORD_WEBHOOK_URL is not defined');
        }

        // The frontend sends an array of payloads for the two-message strategy
        if (Array.isArray(payload)) {
            for (const p of payload) {
                await fetch(hook, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(p)
                });
                // Small delay to prevent rate limiting
                await new Promise(resolve => setTimeout(resolve, 600));
            }
        } else {
            // Single payload fallback
            await fetch(hook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Survey API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
