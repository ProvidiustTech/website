import { Resend } from 'resend';
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, industry, channel, volume, challenge } = body;

    // Validate required fields
    if (!company?.trim()) {
      return Response.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    // Save to database
    const submission = await prisma.application.create({
      data: {
        company,
        industry: industry || null,
        channel: channel || null,
        volume: volume || null,
        challenge: challenge || null,
      },
    });

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const emailResult = await resend.emails.send({
          from: 'Providius <onboarding@resend.dev>',
          to: 'support@providiustech.com',
          subject: `New Application: ${company}`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
              <div style="background-color: white; border-radius: 8px; padding: 20px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0a0a14; margin-top: 0;">New Application Received ✨</h2>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Industry:</strong> ${industry || 'Not specified'}</p>
                <p><strong>Preferred Channel:</strong> ${channel || 'Not specified'}</p>
                <p><strong>Monthly Volume:</strong> ${volume || 'Not specified'}</p>
                <p><strong>Challenge:</strong></p>
                <p style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #14B8A6; border-radius: 4px;">${challenge || 'Not specified'}</p>
                <p><strong>Submitted:</strong> ${new Date(submission.createdAt).toLocaleString()}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/applications" style="background-color: #14B8A6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View in Admin Dashboard</a></p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        // Don't fail the request if email fails, just log it
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY not set - email notifications disabled');
    }

    return Response.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return Response.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return Response.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return Response.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
