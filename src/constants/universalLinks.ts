const universalLink = process.env.UNIVERSAL_LINK;

export default {
  home: universalLink,
  leaveWaitlist: `${universalLink}/waitlist/leave/:token`,
  deleteAccount: `${universalLink}/user/delete/:token`,
  verifyEmail: `${universalLink}/verify-email/:token`,
  resetPassword: `${universalLink}/reset-password/:token`,
};
