import { OAuth2Client } from "google-auth-library";

export default async function verifyGoogleIdToken(idToken: string) {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  const ticket = await oAuth2Client.verifyIdToken({
    idToken,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    return null;
  }

  const {
    locale,
    family_name: lastName,
    given_name: firstName,
    email,
    picture: socialPictureUrl,
    email_verified: emailVerified,
  } = payload;

  return {
    firstName: firstName ?? email!,
    lastName,
    locale,
    email: email!,
    socialPictureUrl,
    isEmailVerified: emailVerified,
  };
}
