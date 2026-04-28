import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ForgotPasswordTemplateProps {
  url: string;
}

export const ForgotPasswordTemplate = ({ url }: ForgotPasswordTemplateProps) => (
  <Html>
    <Head />
    <Preview>Reset your Prosperity security key</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Prosperity</Heading>
        <Text style={text}>
          A protocol for identity recovery has been initiated. Click the button below to reset your security key and regain access to your portfolio.
        </Text>
        <Section style={buttonContainer}>
          <Link style={button} href={url}>
            Establish New Key
          </Link>
        </Section>
        <Text style={text}>
          If you did not initiate this recovery protocol, please ignore this transmission.
        </Text>
        <Text style={footer}>
          Prosperity Protocol • Secure Financial Management
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#fbf9f8',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '580px',
};

const h1 = {
  color: '#0f172a',
  fontSize: '24px',
  fontWeight: '600',
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  margin: '30px 0',
};

const text = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#0f172a',
  borderRadius: '0px',
  color: '#fff',
  fontSize: '12px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
};

const footer = {
  color: '#94a3b8',
  fontSize: '10px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginTop: '40px',
};
