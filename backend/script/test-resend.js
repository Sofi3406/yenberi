import dotenv from 'dotenv';

dotenv.config();

const toEmail = process.argv[2] || process.env.TEST_EMAIL;
const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM;

const fail = (message) => {
  console.error(message);
  console.log('false');
  process.exit(1);
};

if (!resendApiKey) {
  fail('RESEND_API_KEY is missing in .env');
}

if (!resendFrom) {
  fail('RESEND_FROM is missing in .env');
}

if (!toEmail) {
  fail('Provide a test email: node script/test-resend.js you@example.com');
}

const payload = {
  from: resendFrom,
  to: [toEmail],
  subject: 'Resend Test Email - SLMA',
  html: '<h1>Resend Test</h1><p>If you got this, Resend is working.</p>',
};

try {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Resend API error: ${response.status} ${errorText}`);
    console.log('false');
    process.exit(1);
  }

  const data = await response.json();
  console.log(`Resend message id: ${data.id}`);
  console.log('true');
} catch (error) {
  console.error('Request failed:', error.message);
  console.log('false');
  process.exit(1);
}
