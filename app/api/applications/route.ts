import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'submissions.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Get all submissions
function getSubmissions() {
  ensureDataDir();
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save submissions
function saveSubmissions(submissions: any[]) {
  ensureDataDir();
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
}

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

    // Create submission object
    const submission = {
      id: Date.now().toString(),
      company,
      industry,
      channel,
      volume,
      challenge,
      submittedAt: new Date().toISOString(),
    };

    // Save to file
    const submissions = getSubmissions();
    submissions.push(submission);
    saveSubmissions(submissions);

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
                <p><strong>Submitted:</strong> ${new Date(submission.submittedAt).toLocaleString()}</p>
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
    const submissions = getSubmissions();
    return Response.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return Response.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
