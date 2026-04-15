import { Resend } from 'resend';
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, companyEmail, industry, channel, volume, challenge, email, source = 'founding' } = body;

    // Validate required fields based on source
    if (source === 'founding' && !company?.trim()) {
      return Response.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    if (source === 'coming-soon' && !email?.trim()) {
      return Response.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Save to database
    const submission = await prisma.submission.create({
      data: {
        company: company || null,
        companyEmail: companyEmail || null,
        industry: industry || null,
        channel: channel || null,
        volume: volume || null,
        challenge: challenge || null,
        email: email || null,
        source,
      },
    });

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const emailBody = source === 'founding'
          ? `
            <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
              <div style="background-color: white; border-radius: 8px; padding: 20px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0a0a14; margin-top: 0;">New Founding Program Application ✨</h2>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Company Email:</strong> ${companyEmail}</p>
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
          `
          : `
            <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
              <div style="background-color: white; border-radius: 8px; padding: 20px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0a0a14; margin-top: 0;">New Coming Soon Signup</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Submitted:</strong> ${new Date(submission.createdAt).toLocaleString()}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/applications" style="background-color: #14B8A6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View in Admin Dashboard</a></p>
              </div>
            </div>
          `;

        const emailResult = await resend.emails.send({
          from: 'Providius <onboarding@resend.dev>',
          to: 'support@providiustech.com',
          subject: source === 'founding' 
            ? `New Founding Application: ${company}`
            : `New Coming Soon Signup: ${email}`,
          html: emailBody,
        });
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        // Don't fail the request if email fails, just log it
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY not set - email notifications disabled');
    }

    return Response.json(
      { success: true, message: 'Submission received successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { 
        error: 'Failed to submit',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.delete({
      where: { id: parseInt(id) },
    });

    return Response.json(
      { success: true, message: 'Submission deleted successfully', submission },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { 
        error: 'Failed to delete submission',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
