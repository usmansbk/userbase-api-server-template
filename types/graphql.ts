import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AccountNumber: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Byte: { input: any; output: any; }
  CountryCode: { input: any; output: any; }
  Cuid: { input: any; output: any; }
  Currency: { input: any; output: any; }
  DID: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  DateTimeISO: { input: any; output: any; }
  DeweyDecimal: { input: any; output: any; }
  Duration: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  GUID: { input: any; output: any; }
  HSL: { input: any; output: any; }
  HSLA: { input: any; output: any; }
  HexColorCode: { input: any; output: any; }
  Hexadecimal: { input: any; output: any; }
  IBAN: { input: any; output: any; }
  IP: { input: any; output: any; }
  IPCPatent: { input: any; output: any; }
  IPv4: { input: any; output: any; }
  IPv6: { input: any; output: any; }
  ISBN: { input: any; output: any; }
  ISO8601Duration: { input: any; output: any; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  JWT: { input: any; output: any; }
  LCCSubclass: { input: any; output: any; }
  Latitude: { input: any; output: any; }
  LocalDate: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
  LocalEndTime: { input: any; output: any; }
  LocalTime: { input: any; output: any; }
  Locale: { input: any; output: any; }
  Long: { input: any; output: any; }
  Longitude: { input: any; output: any; }
  MAC: { input: any; output: any; }
  NegativeFloat: { input: any; output: any; }
  NegativeInt: { input: any; output: any; }
  NonEmptyString: { input: any; output: any; }
  NonNegativeFloat: { input: any; output: any; }
  NonNegativeInt: { input: any; output: any; }
  NonPositiveFloat: { input: any; output: any; }
  NonPositiveInt: { input: any; output: any; }
  ObjectID: { input: any; output: any; }
  PhoneNumber: { input: any; output: any; }
  Port: { input: any; output: any; }
  PositiveFloat: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  PostalCode: { input: any; output: any; }
  RGB: { input: any; output: any; }
  RGBA: { input: any; output: any; }
  RoutingNumber: { input: any; output: any; }
  SafeInt: { input: any; output: any; }
  SemVer: { input: any; output: any; }
  Time: { input: any; output: any; }
  TimeZone: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
  URL: { input: any; output: any; }
  USCurrency: { input: any; output: any; }
  UUID: { input: any; output: any; }
  UnsignedFloat: { input: any; output: any; }
  UnsignedInt: { input: any; output: any; }
  UtcOffset: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export enum AccountStatus {
  /**
   * Accounts have an active status when:
   * - An admin adds a user and sets the user password without requiring email verification.
   * - A user self-registers and verified their email.
   * - An admin explicitly activate user accounts.
   */
  Active = 'Active',
  /** Accounts have a deprovisioned status when an admin explicitly deactivates or deprovisions them. All application assignments are removed and the password is permanently deleted. */
  Deprovisioned = 'Deprovisioned',
  /** Accounts have a locked out status when the user exceeds the number of login attempts. */
  LockedOut = 'LockedOut',
  /** Accounts have a password expired status when the password has expired and the account requires an update to the password before a user is granted access to applications. */
  PasswordExpired = 'PasswordExpired',
  /** Accounts have a provisioned status when the user has not provided verification by clicking through the activation email. */
  Provisioned = 'Provisioned',
  /** Accounts have a recovery status when a user requests a password reset or an admin initiates one on their behalf. */
  Recovery = 'Recovery',
  /** Accounts have a staged status when they are first created, before the activation flow is initiated, or if there is a pending admin action. */
  Staged = 'Staged',
  /** Accounts have a suspended status when an admin explicitly suspends them. The user cannot access applications. */
  Suspended = 'Suspended'
}

export type Application = {
  __typename?: 'Application';
  clientId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AuthResponse = Response & {
  __typename?: 'AuthResponse';
  /** Access tokens contain information about what scopes, or permissions. */
  accessToken?: Maybe<Scalars['JWT']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  /** Token used to obtain a renewed Access Token without forcing users to log in again. */
  refreshToken?: Maybe<Scalars['JWT']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AuthRule = {
  allow: AuthStrategy;
  ownerField?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<Array<InputMaybe<AccountStatus>>>;
};

export enum AuthStrategy {
  /**
   * To restrict a record's access to a specific user, use the `owner` strategy.
   * When `owner` authorization is configured, only the record's `owner` and admins are allowed the specified operations.
   */
  Owner = 'owner',
  Permissions = 'permissions',
  Roles = 'roles',
  /** Restrict user according to account status */
  Status = 'status'
}

export type CreateApplicationInput = {
  description?: InputMaybe<Scalars['NonEmptyString']['input']>;
  name: Scalars['NonEmptyString']['input'];
};

export type CreatePermissionInput = {
  description?: InputMaybe<Scalars['NonEmptyString']['input']>;
  name: Scalars['NonEmptyString']['input'];
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['NonEmptyString']['input']>;
  name: Scalars['NonEmptyString']['input'];
};

export type CreateRolePermissionInput = {
  permissionId: Scalars['ID']['input'];
  roleId: Scalars['ID']['input'];
};

export type CreateUserInput = {
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['NonEmptyString']['input'];
  language?: InputMaybe<Scalars['Locale']['input']>;
  lastName?: InputMaybe<Scalars['NonEmptyString']['input']>;
  password?: InputMaybe<Scalars['NonEmptyString']['input']>;
  phoneNumber?: InputMaybe<Scalars['PhoneNumber']['input']>;
  status?: InputMaybe<AccountStatus>;
  surname?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type CreateUserPermissionInput = {
  permissionId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateUserRoleInput = {
  roleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type DeleteAccountInput = {
  password: Scalars['NonEmptyString']['input'];
  token: Scalars['NonEmptyString']['input'];
};

export type DeleteApplicationInput = {
  id: Scalars['ID']['input'];
};

export type DeleteFileInput = {
  bucket: Scalars['ID']['input'];
  key: Scalars['ID']['input'];
};

export type DeletePermissionInput = {
  id: Scalars['ID']['input'];
};

export type DeleteRoleInput = {
  id: Scalars['ID']['input'];
};

export type DeleteRolePermissionInput = {
  id: Scalars['ID']['input'];
};

export type DeleteSessionInput = {
  id: Scalars['ID']['input'];
};

export type DeleteUserAvatarInput = {
  id: Scalars['ID']['input'];
};

export type DeleteUserInput = {
  id: Scalars['ID']['input'];
};

export type DeleteUserPermissionInput = {
  id: Scalars['ID']['input'];
};

export type DeleteUserRoleInput = {
  id: Scalars['ID']['input'];
};

export type EmailLoginInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['NonEmptyString']['input'];
};

export type EmailOtpLoginInput = {
  email: Scalars['EmailAddress']['input'];
  otp: Scalars['NonEmptyString']['input'];
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime']['output'];
  downloadUrl?: Maybe<Scalars['URL']['output']>;
  encoding?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mimetype: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  size: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FilesList = {
  __typename?: 'FilesList';
  items: Array<Maybe<File>>;
};

export enum IdentityProvider {
  Google = 'GOOGLE'
}

export type IdentityProviderLoginInput = {
  provider: IdentityProvider;
  token: Scalars['NonEmptyString']['input'];
};

export type ImageEditInput = {
  flatten?: InputMaybe<Scalars['Boolean']['input']>;
  flip?: InputMaybe<Scalars['Boolean']['input']>;
  flop?: InputMaybe<Scalars['Boolean']['input']>;
  grayscale?: InputMaybe<Scalars['Boolean']['input']>;
  negate?: InputMaybe<Scalars['Boolean']['input']>;
  normalise?: InputMaybe<Scalars['Boolean']['input']>;
  resize?: InputMaybe<ImageResize>;
};

export type ImageResize = {
  background?: InputMaybe<ImageResizeBackgroundInput>;
  fit?: InputMaybe<ImageResizeFit>;
  height: Scalars['PositiveInt']['input'];
  width: Scalars['PositiveInt']['input'];
};

export type ImageResizeBackgroundInput = {
  alpha: Scalars['Int']['input'];
  b: Scalars['Int']['input'];
  g: Scalars['Int']['input'];
  r: Scalars['Int']['input'];
};

export enum ImageResizeFit {
  Contain = 'contain',
  Cover = 'cover',
  Fill = 'fill',
  Inside = 'inside',
  Outside = 'outside'
}

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: Application;
  createPermissions: Array<Maybe<Permission>>;
  createRolePermissions: Array<Maybe<RolePermission>>;
  createRoles: Array<Maybe<Role>>;
  createUserPermissions: Array<Maybe<UserPermission>>;
  createUserRoles: Array<Maybe<UserRole>>;
  createUsers: Array<Maybe<User>>;
  deleteApplication: Application;
  deleteFiles: File;
  deletePermissions: Array<Maybe<Permission>>;
  deleteRolePermissions: Array<Maybe<RolePermission>>;
  deleteRoles: Array<Maybe<Role>>;
  deleteSessions: Array<Maybe<Session>>;
  deleteUserAccount: MutationResponse;
  deleteUserAvatars: Array<Maybe<User>>;
  deleteUserPermissions: Array<Maybe<UserPermission>>;
  deleteUserRoles: Array<Maybe<UserRole>>;
  deleteUsers: Array<Maybe<User>>;
  joinWaitlist: MutationResponse;
  leaveWaitlist: MutationResponse;
  loginWithEmail: AuthResponse;
  loginWithEmailOTP: AuthResponse;
  loginWithIdentityProvider: AuthResponse;
  loginWithSMSOTP: AuthResponse;
  logoutFromAllDevices: MutationResponse;
  registerWithEmail: AuthResponse;
  removeCurrentUserPicture: UserResponse;
  requestDeleteCurrentUserAccount: MutationResponse;
  requestEmailLoginOTP: MutationResponse;
  requestResetUserPassword: MutationResponse;
  requestSMSLoginOTP: MutationResponse;
  requestUserEmailVerification: MutationResponse;
  requestUserPhoneNumberVerification: MutationResponse;
  resetUserPassword: MutationResponse;
  rotateKeys: MutationResponse;
  sendEmailLoginOTPToUsers: MutationResponse;
  sendPasswordResetEmailToUsers: MutationResponse;
  sendPhoneNumberVerificationSMSToUsers: MutationResponse;
  sendSMSLoginOTPToUsers: MutationResponse;
  sendVerificationEmailToUsers: MutationResponse;
  unblockUserIPs: UserResponse;
  updateApplication: Application;
  updateCurrentUserBasicInfo: UserResponse;
  updateCurrentUserPhoneNumber: UserResponse;
  updatePermissions: Array<Maybe<Permission>>;
  updateRoles: Array<Maybe<Role>>;
  updateUsers: Array<Maybe<User>>;
  verifyUserEmail: MutationResponse;
  verifyUserPhoneNumber: MutationResponse;
};


export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};


export type MutationCreatePermissionsArgs = {
  inputs: Array<CreatePermissionInput>;
};


export type MutationCreateRolePermissionsArgs = {
  inputs: Array<CreateRolePermissionInput>;
};


export type MutationCreateRolesArgs = {
  inputs: Array<CreateRoleInput>;
};


export type MutationCreateUserPermissionsArgs = {
  inputs: Array<CreateUserPermissionInput>;
};


export type MutationCreateUserRolesArgs = {
  inputs: Array<CreateUserRoleInput>;
};


export type MutationCreateUsersArgs = {
  inputs: Array<CreateUserInput>;
};


export type MutationDeleteApplicationArgs = {
  input: DeleteApplicationInput;
};


export type MutationDeleteFilesArgs = {
  inputs: Array<DeleteFileInput>;
};


export type MutationDeletePermissionsArgs = {
  inputs: Array<DeletePermissionInput>;
};


export type MutationDeleteRolePermissionsArgs = {
  inputs: Array<DeleteRolePermissionInput>;
};


export type MutationDeleteRolesArgs = {
  inputs: Array<DeleteRoleInput>;
};


export type MutationDeleteSessionsArgs = {
  inputs: Array<DeleteSessionInput>;
};


export type MutationDeleteUserAccountArgs = {
  input: DeleteAccountInput;
};


export type MutationDeleteUserAvatarsArgs = {
  inputs: Array<DeleteUserAvatarInput>;
};


export type MutationDeleteUserPermissionsArgs = {
  inputs: Array<DeleteUserPermissionInput>;
};


export type MutationDeleteUserRolesArgs = {
  inputs: Array<DeleteUserRoleInput>;
};


export type MutationDeleteUsersArgs = {
  inputs: Array<DeleteUserInput>;
};


export type MutationJoinWaitlistArgs = {
  email: Scalars['EmailAddress']['input'];
};


export type MutationLeaveWaitlistArgs = {
  token: Scalars['NonEmptyString']['input'];
};


export type MutationLoginWithEmailArgs = {
  input: EmailLoginInput;
};


export type MutationLoginWithEmailOtpArgs = {
  input: EmailOtpLoginInput;
};


export type MutationLoginWithIdentityProviderArgs = {
  input: IdentityProviderLoginInput;
};


export type MutationLoginWithSmsotpArgs = {
  input: SmsotpLoginInput;
};


export type MutationRegisterWithEmailArgs = {
  input: RegisterWithEmailInput;
};


export type MutationRequestEmailLoginOtpArgs = {
  email: Scalars['EmailAddress']['input'];
};


export type MutationRequestResetUserPasswordArgs = {
  email: Scalars['EmailAddress']['input'];
};


export type MutationRequestSmsLoginOtpArgs = {
  phoneNumber: Scalars['PhoneNumber']['input'];
};


export type MutationRequestUserEmailVerificationArgs = {
  email: Scalars['EmailAddress']['input'];
};


export type MutationRequestUserPhoneNumberVerificationArgs = {
  phoneNumber: Scalars['PhoneNumber']['input'];
};


export type MutationResetUserPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendEmailLoginOtpToUsersArgs = {
  inputs: Array<SendEmailLoginOtpInput>;
};


export type MutationSendPasswordResetEmailToUsersArgs = {
  inputs: Array<SendPasswordResetEmailInput>;
};


export type MutationSendPhoneNumberVerificationSmsToUsersArgs = {
  inputs: Array<SendPhoneNumberVerificationSmsInput>;
};


export type MutationSendSmsLoginOtpToUsersArgs = {
  inputs: Array<SendSmsLoginOtpInput>;
};


export type MutationSendVerificationEmailToUsersArgs = {
  inputs: Array<SendVerificationEmailInput>;
};


export type MutationUnblockUserIPsArgs = {
  input: UnblockUserIPsInput;
};


export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput;
};


export type MutationUpdateCurrentUserBasicInfoArgs = {
  input: UpdateBasicInfoInput;
};


export type MutationUpdateCurrentUserPhoneNumberArgs = {
  input: UpdatePhoneNumberInput;
};


export type MutationUpdatePermissionsArgs = {
  inputs: Array<UpdatePermissionInput>;
};


export type MutationUpdateRolesArgs = {
  inputs: Array<UpdateRoleInput>;
};


export type MutationUpdateUsersArgs = {
  inputs: Array<UpdateUserInput>;
};


export type MutationVerifyUserEmailArgs = {
  input: VerifyEmailInput;
};


export type MutationVerifyUserPhoneNumberArgs = {
  input: VerifyPhoneNumberInput;
};

export type MutationResponse = Response & {
  __typename?: 'MutationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Permission = {
  __typename?: 'Permission';
  createdAt: Scalars['DateTime']['output'];
  creator?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rolePermissions: Array<Maybe<RolePermission>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userPermissions: Array<Maybe<UserPermission>>;
};

export type PermissionsList = {
  __typename?: 'PermissionsList';
  items: Array<Maybe<Permission>>;
};

export type Picture = {
  __typename?: 'Picture';
  downloadUrl: Scalars['URL']['output'];
  id: Scalars['ID']['output'];
  thumbnail: Scalars['URL']['output'];
  url: Scalars['URL']['output'];
};


export type PictureThumbnailArgs = {
  edits?: InputMaybe<ImageEditInput>;
};


export type PictureUrlArgs = {
  edits?: InputMaybe<ImageEditInput>;
};

export type Query = {
  __typename?: 'Query';
  application: Application;
  applications: Array<Maybe<Application>>;
  file: File;
  files: FilesList;
  me: User;
  permission: Permission;
  permissions: PermissionsList;
  role: Role;
  rolePermission: RolePermission;
  rolePermissions: RolePermissionsList;
  roles: RolesList;
  session: Session;
  sessions: SessionsList;
  user: User;
  userAvatar: UserAvatar;
  userAvatars: UserAvatarsList;
  userPermission: UserPermission;
  userPermissions: UserPermissionsList;
  userRole: UserRole;
  userRoles: UserRolesList;
  users: UsersList;
};


export type QueryApplicationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFileArgs = {
  bucket: Scalars['ID']['input'];
  key: Scalars['ID']['input'];
};


export type QueryFilesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolePermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolePermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRolesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySessionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserAvatarArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserAvatarsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserPermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserPermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserRolesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type RegisterWithEmailInput = {
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['NonEmptyString']['input'];
  language?: InputMaybe<Scalars['Locale']['input']>;
  lastName?: InputMaybe<Scalars['NonEmptyString']['input']>;
  password: Scalars['NonEmptyString']['input'];
  phoneNumber?: InputMaybe<Scalars['PhoneNumber']['input']>;
  surname?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type ResetPasswordInput = {
  password: Scalars['NonEmptyString']['input'];
  token: Scalars['NonEmptyString']['input'];
};

export type Response = {
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**
 * Essentially, a role is a collection of permissions that you can apply to users.
 * Using roles makes it easier to add, remove, and adjust permissions than assigning permissions to users individually.
 * As your user base increases in scale and complexity, roles become particularly useful.
 */
export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  creator?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rolePermissions: Array<Maybe<RolePermission>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userRoles: Array<Maybe<UserRole>>;
};

export type RolePermission = {
  __typename?: 'RolePermission';
  assignor?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  permission: Permission;
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RolePermissionsList = {
  __typename?: 'RolePermissionsList';
  items: Array<Maybe<RolePermission>>;
};

export type RolesList = {
  __typename?: 'RolesList';
  items: Array<Maybe<Role>>;
};

export type SmsotpLoginInput = {
  otp: Scalars['NonEmptyString']['input'];
  phoneNumber: Scalars['PhoneNumber']['input'];
};

export type SendEmailLoginOtpInput = {
  email: Scalars['EmailAddress']['input'];
};

export type SendPasswordResetEmailInput = {
  email: Scalars['EmailAddress']['input'];
};

export type SendPhoneNumberVerificationSmsInput = {
  phoneNumber: Scalars['PhoneNumber']['input'];
};

export type SendSmsLoginOtpInput = {
  phoneNumber: Scalars['PhoneNumber']['input'];
};

export type SendVerificationEmailInput = {
  email: Scalars['EmailAddress']['input'];
};

export type Session = {
  __typename?: 'Session';
  clientId: Scalars['ID']['output'];
  clientIp: Scalars['IP']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  jti: Scalars['ID']['output'];
  user: User;
  userAgent?: Maybe<Scalars['String']['output']>;
};

export type SessionsList = {
  __typename?: 'SessionsList';
  items: Array<Maybe<Session>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  ping?: Maybe<Scalars['String']['output']>;
  userBasicInfoUpdated?: Maybe<User>;
};


export type SubscriptionUserBasicInfoUpdatedArgs = {
  id: Scalars['ID']['input'];
};

export type UnblockUserIPsInput = {
  id: Scalars['ID']['input'];
  ips: Array<Scalars['IP']['input']>;
};

export type UpdateApplicationInput = {
  description?: InputMaybe<Scalars['NonEmptyString']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type UpdateBasicInfoInput = {
  firstName: Scalars['NonEmptyString']['input'];
  language?: InputMaybe<Scalars['Locale']['input']>;
  lastName?: InputMaybe<Scalars['NonEmptyString']['input']>;
  surname?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type UpdatePermissionInput = {
  description?: InputMaybe<Scalars['NonEmptyString']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type UpdatePhoneNumberInput = {
  phoneNumber: Scalars['PhoneNumber']['input'];
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['NonEmptyString']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  firstName?: InputMaybe<Scalars['NonEmptyString']['input']>;
  id: Scalars['ID']['input'];
  language?: InputMaybe<Scalars['Locale']['input']>;
  lastName?: InputMaybe<Scalars['NonEmptyString']['input']>;
  password?: InputMaybe<Scalars['NonEmptyString']['input']>;
  phoneNumber?: InputMaybe<Scalars['PhoneNumber']['input']>;
  status?: InputMaybe<AccountStatus>;
  surname?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<UserAvatar>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['EmailAddress']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isMe: Scalars['Boolean']['output'];
  isPhoneNumberVerified: Scalars['Boolean']['output'];
  language: Scalars['Locale']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  passwordUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  permissionsAssignedByUser: Array<Maybe<UserPermission>>;
  permissionsAssignedToUser: Array<Maybe<UserPermission>>;
  permissionsCreatedByUser: Array<Maybe<Permission>>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']['output']>;
  rolePermissionsAssignedByUser: Array<Maybe<RolePermission>>;
  roles: Array<Maybe<Scalars['String']['output']>>;
  rolesAssignedByUser: Array<Maybe<UserRole>>;
  rolesAssignedToUser: Array<Maybe<UserRole>>;
  rolesCreatedByUser: Array<Maybe<Role>>;
  sessions: Array<Maybe<Session>>;
  socialPictureUrl?: Maybe<Scalars['URL']['output']>;
  status?: Maybe<AccountStatus>;
  surname?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserAvatar = {
  __typename?: 'UserAvatar';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  picture: Picture;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserAvatarsList = {
  __typename?: 'UserAvatarsList';
  items: Array<Maybe<UserAvatar>>;
};

export type UserPermission = {
  __typename?: 'UserPermission';
  assignee: User;
  assignor?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  permission: Permission;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserPermissionsList = {
  __typename?: 'UserPermissionsList';
  items: Array<Maybe<UserPermission>>;
};

export type UserResponse = Response & {
  __typename?: 'UserResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  user: User;
};

export type UserRole = {
  __typename?: 'UserRole';
  assignee: User;
  assignor?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserRolesList = {
  __typename?: 'UserRolesList';
  items: Array<Maybe<UserRole>>;
};

export type UsersList = {
  __typename?: 'UsersList';
  items: Array<Maybe<User>>;
};

export type VerifyEmailInput = {
  token: Scalars['NonEmptyString']['input'];
};

export type VerifyNewEmailInput = {
  email: Scalars['EmailAddress']['input'];
  token: Scalars['NonEmptyString']['input'];
};

export type VerifyPhoneNumberInput = {
  phoneNumber: Scalars['PhoneNumber']['input'];
  token: Scalars['NonEmptyString']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  Response: ( AuthResponse ) | ( MutationResponse ) | ( UserResponse );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']['output']>;
  AccountStatus: AccountStatus;
  Application: ResolverTypeWrapper<Application>;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  AuthRule: AuthRule;
  AuthStrategy: AuthStrategy;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']['output']>;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']['output']>;
  CreateApplicationInput: CreateApplicationInput;
  CreatePermissionInput: CreatePermissionInput;
  CreateRoleInput: CreateRoleInput;
  CreateRolePermissionInput: CreateRolePermissionInput;
  CreateUserInput: CreateUserInput;
  CreateUserPermissionInput: CreateUserPermissionInput;
  CreateUserRoleInput: CreateUserRoleInput;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']['output']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']['output']>;
  DID: ResolverTypeWrapper<Scalars['DID']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  DeleteAccountInput: DeleteAccountInput;
  DeleteApplicationInput: DeleteApplicationInput;
  DeleteFileInput: DeleteFileInput;
  DeletePermissionInput: DeletePermissionInput;
  DeleteRoleInput: DeleteRoleInput;
  DeleteRolePermissionInput: DeleteRolePermissionInput;
  DeleteSessionInput: DeleteSessionInput;
  DeleteUserAvatarInput: DeleteUserAvatarInput;
  DeleteUserInput: DeleteUserInput;
  DeleteUserPermissionInput: DeleteUserPermissionInput;
  DeleteUserRoleInput: DeleteUserRoleInput;
  DeweyDecimal: ResolverTypeWrapper<Scalars['DeweyDecimal']['output']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  EmailLoginInput: EmailLoginInput;
  EmailOTPLoginInput: EmailOtpLoginInput;
  File: ResolverTypeWrapper<File>;
  FilesList: ResolverTypeWrapper<FilesList>;
  GUID: ResolverTypeWrapper<Scalars['GUID']['output']>;
  HSL: ResolverTypeWrapper<Scalars['HSL']['output']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']['output']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']['output']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']['output']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IP: ResolverTypeWrapper<Scalars['IP']['output']>;
  IPCPatent: ResolverTypeWrapper<Scalars['IPCPatent']['output']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']['output']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']['output']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']['output']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']['output']>;
  IdentityProvider: IdentityProvider;
  IdentityProviderLoginInput: IdentityProviderLoginInput;
  ImageEditInput: ImageEditInput;
  ImageResize: ImageResize;
  ImageResizeBackgroundInput: ImageResizeBackgroundInput;
  ImageResizeFit: ImageResizeFit;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']['output']>;
  LCCSubclass: ResolverTypeWrapper<Scalars['LCCSubclass']['output']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']['output']>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']['output']>;
  LocalDateTime: ResolverTypeWrapper<Scalars['LocalDateTime']['output']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']['output']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']['output']>;
  Locale: ResolverTypeWrapper<Scalars['Locale']['output']>;
  Long: ResolverTypeWrapper<Scalars['Long']['output']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']['output']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']['output']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']['output']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']['output']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']['output']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']['output']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']['output']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  Permission: ResolverTypeWrapper<Permission>;
  PermissionsList: ResolverTypeWrapper<PermissionsList>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']['output']>;
  Picture: ResolverTypeWrapper<Picture>;
  Port: ResolverTypeWrapper<Scalars['Port']['output']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']['output']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']['output']>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']['output']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']['output']>;
  RegisterWithEmailInput: RegisterWithEmailInput;
  ResetPasswordInput: ResetPasswordInput;
  Response: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Response']>;
  Role: ResolverTypeWrapper<Role>;
  RolePermission: ResolverTypeWrapper<RolePermission>;
  RolePermissionsList: ResolverTypeWrapper<RolePermissionsList>;
  RolesList: ResolverTypeWrapper<RolesList>;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']['output']>;
  SMSOTPLoginInput: SmsotpLoginInput;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']['output']>;
  SemVer: ResolverTypeWrapper<Scalars['SemVer']['output']>;
  SendEmailLoginOTPInput: SendEmailLoginOtpInput;
  SendPasswordResetEmailInput: SendPasswordResetEmailInput;
  SendPhoneNumberVerificationSMSInput: SendPhoneNumberVerificationSmsInput;
  SendSMSLoginOTPInput: SendSmsLoginOtpInput;
  SendVerificationEmailInput: SendVerificationEmailInput;
  Session: ResolverTypeWrapper<Session>;
  SessionsList: ResolverTypeWrapper<SessionsList>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UnblockUserIPsInput: UnblockUserIPsInput;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']['output']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']['output']>;
  UpdateApplicationInput: UpdateApplicationInput;
  UpdateBasicInfoInput: UpdateBasicInfoInput;
  UpdatePermissionInput: UpdatePermissionInput;
  UpdatePhoneNumberInput: UpdatePhoneNumberInput;
  UpdateRoleInput: UpdateRoleInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserAvatar: ResolverTypeWrapper<UserAvatar>;
  UserAvatarsList: ResolverTypeWrapper<UserAvatarsList>;
  UserPermission: ResolverTypeWrapper<UserPermission>;
  UserPermissionsList: ResolverTypeWrapper<UserPermissionsList>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserRolesList: ResolverTypeWrapper<UserRolesList>;
  UsersList: ResolverTypeWrapper<UsersList>;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']['output']>;
  VerifyEmailInput: VerifyEmailInput;
  VerifyNewEmailInput: VerifyNewEmailInput;
  VerifyPhoneNumberInput: VerifyPhoneNumberInput;
  Void: ResolverTypeWrapper<Scalars['Void']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AccountNumber: Scalars['AccountNumber']['output'];
  Application: Application;
  AuthResponse: AuthResponse;
  AuthRule: AuthRule;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  Byte: Scalars['Byte']['output'];
  CountryCode: Scalars['CountryCode']['output'];
  CreateApplicationInput: CreateApplicationInput;
  CreatePermissionInput: CreatePermissionInput;
  CreateRoleInput: CreateRoleInput;
  CreateRolePermissionInput: CreateRolePermissionInput;
  CreateUserInput: CreateUserInput;
  CreateUserPermissionInput: CreateUserPermissionInput;
  CreateUserRoleInput: CreateUserRoleInput;
  Cuid: Scalars['Cuid']['output'];
  Currency: Scalars['Currency']['output'];
  DID: Scalars['DID']['output'];
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  DateTimeISO: Scalars['DateTimeISO']['output'];
  DeleteAccountInput: DeleteAccountInput;
  DeleteApplicationInput: DeleteApplicationInput;
  DeleteFileInput: DeleteFileInput;
  DeletePermissionInput: DeletePermissionInput;
  DeleteRoleInput: DeleteRoleInput;
  DeleteRolePermissionInput: DeleteRolePermissionInput;
  DeleteSessionInput: DeleteSessionInput;
  DeleteUserAvatarInput: DeleteUserAvatarInput;
  DeleteUserInput: DeleteUserInput;
  DeleteUserPermissionInput: DeleteUserPermissionInput;
  DeleteUserRoleInput: DeleteUserRoleInput;
  DeweyDecimal: Scalars['DeweyDecimal']['output'];
  Duration: Scalars['Duration']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  EmailLoginInput: EmailLoginInput;
  EmailOTPLoginInput: EmailOtpLoginInput;
  File: File;
  FilesList: FilesList;
  GUID: Scalars['GUID']['output'];
  HSL: Scalars['HSL']['output'];
  HSLA: Scalars['HSLA']['output'];
  HexColorCode: Scalars['HexColorCode']['output'];
  Hexadecimal: Scalars['Hexadecimal']['output'];
  IBAN: Scalars['IBAN']['output'];
  ID: Scalars['ID']['output'];
  IP: Scalars['IP']['output'];
  IPCPatent: Scalars['IPCPatent']['output'];
  IPv4: Scalars['IPv4']['output'];
  IPv6: Scalars['IPv6']['output'];
  ISBN: Scalars['ISBN']['output'];
  ISO8601Duration: Scalars['ISO8601Duration']['output'];
  IdentityProviderLoginInput: IdentityProviderLoginInput;
  ImageEditInput: ImageEditInput;
  ImageResize: ImageResize;
  ImageResizeBackgroundInput: ImageResizeBackgroundInput;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  JWT: Scalars['JWT']['output'];
  LCCSubclass: Scalars['LCCSubclass']['output'];
  Latitude: Scalars['Latitude']['output'];
  LocalDate: Scalars['LocalDate']['output'];
  LocalDateTime: Scalars['LocalDateTime']['output'];
  LocalEndTime: Scalars['LocalEndTime']['output'];
  LocalTime: Scalars['LocalTime']['output'];
  Locale: Scalars['Locale']['output'];
  Long: Scalars['Long']['output'];
  Longitude: Scalars['Longitude']['output'];
  MAC: Scalars['MAC']['output'];
  Mutation: {};
  MutationResponse: MutationResponse;
  NegativeFloat: Scalars['NegativeFloat']['output'];
  NegativeInt: Scalars['NegativeInt']['output'];
  NonEmptyString: Scalars['NonEmptyString']['output'];
  NonNegativeFloat: Scalars['NonNegativeFloat']['output'];
  NonNegativeInt: Scalars['NonNegativeInt']['output'];
  NonPositiveFloat: Scalars['NonPositiveFloat']['output'];
  NonPositiveInt: Scalars['NonPositiveInt']['output'];
  ObjectID: Scalars['ObjectID']['output'];
  Permission: Permission;
  PermissionsList: PermissionsList;
  PhoneNumber: Scalars['PhoneNumber']['output'];
  Picture: Picture;
  Port: Scalars['Port']['output'];
  PositiveFloat: Scalars['PositiveFloat']['output'];
  PositiveInt: Scalars['PositiveInt']['output'];
  PostalCode: Scalars['PostalCode']['output'];
  Query: {};
  RGB: Scalars['RGB']['output'];
  RGBA: Scalars['RGBA']['output'];
  RegisterWithEmailInput: RegisterWithEmailInput;
  ResetPasswordInput: ResetPasswordInput;
  Response: ResolversInterfaceTypes<ResolversParentTypes>['Response'];
  Role: Role;
  RolePermission: RolePermission;
  RolePermissionsList: RolePermissionsList;
  RolesList: RolesList;
  RoutingNumber: Scalars['RoutingNumber']['output'];
  SMSOTPLoginInput: SmsotpLoginInput;
  SafeInt: Scalars['SafeInt']['output'];
  SemVer: Scalars['SemVer']['output'];
  SendEmailLoginOTPInput: SendEmailLoginOtpInput;
  SendPasswordResetEmailInput: SendPasswordResetEmailInput;
  SendPhoneNumberVerificationSMSInput: SendPhoneNumberVerificationSmsInput;
  SendSMSLoginOTPInput: SendSmsLoginOtpInput;
  SendVerificationEmailInput: SendVerificationEmailInput;
  Session: Session;
  SessionsList: SessionsList;
  String: Scalars['String']['output'];
  Subscription: {};
  Time: Scalars['Time']['output'];
  TimeZone: Scalars['TimeZone']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  URL: Scalars['URL']['output'];
  USCurrency: Scalars['USCurrency']['output'];
  UUID: Scalars['UUID']['output'];
  UnblockUserIPsInput: UnblockUserIPsInput;
  UnsignedFloat: Scalars['UnsignedFloat']['output'];
  UnsignedInt: Scalars['UnsignedInt']['output'];
  UpdateApplicationInput: UpdateApplicationInput;
  UpdateBasicInfoInput: UpdateBasicInfoInput;
  UpdatePermissionInput: UpdatePermissionInput;
  UpdatePhoneNumberInput: UpdatePhoneNumberInput;
  UpdateRoleInput: UpdateRoleInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserAvatar: UserAvatar;
  UserAvatarsList: UserAvatarsList;
  UserPermission: UserPermission;
  UserPermissionsList: UserPermissionsList;
  UserResponse: UserResponse;
  UserRole: UserRole;
  UserRolesList: UserRolesList;
  UsersList: UsersList;
  UtcOffset: Scalars['UtcOffset']['output'];
  VerifyEmailInput: VerifyEmailInput;
  VerifyNewEmailInput: VerifyNewEmailInput;
  VerifyPhoneNumberInput: VerifyPhoneNumberInput;
  Void: Scalars['Void']['output'];
}>;

export type AuthDirectiveArgs = {
  rules?: Maybe<Array<AuthRule>>;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export type ApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Application'] = ResolversParentTypes['Application']> = ResolversObject<{
  clientId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['JWT']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['JWT']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface CuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cuid'], any> {
  name: 'Cuid';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export interface DeweyDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DeweyDecimal'], any> {
  name: 'DeweyDecimal';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  downloadUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  encoding?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FilesListResolvers<ContextType = any, ParentType extends ResolversParentTypes['FilesList'] = ResolversParentTypes['FilesList']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['File']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IpScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IP'], any> {
  name: 'IP';
}

export interface IpcPatentScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPCPatent'], any> {
  name: 'IPCPatent';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export interface LccSubclassScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LCCSubclass'], any> {
  name: 'LCCSubclass';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDateTime'], any> {
  name: 'LocalDateTime';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LocaleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Locale'], any> {
  name: 'Locale';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createApplication?: Resolver<ResolversTypes['Application'], ParentType, ContextType, RequireFields<MutationCreateApplicationArgs, 'input'>>;
  createPermissions?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType, RequireFields<MutationCreatePermissionsArgs, 'inputs'>>;
  createRolePermissions?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType, RequireFields<MutationCreateRolePermissionsArgs, 'inputs'>>;
  createRoles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType, RequireFields<MutationCreateRolesArgs, 'inputs'>>;
  createUserPermissions?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType, RequireFields<MutationCreateUserPermissionsArgs, 'inputs'>>;
  createUserRoles?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType, RequireFields<MutationCreateUserRolesArgs, 'inputs'>>;
  createUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<MutationCreateUsersArgs, 'inputs'>>;
  deleteApplication?: Resolver<ResolversTypes['Application'], ParentType, ContextType, RequireFields<MutationDeleteApplicationArgs, 'input'>>;
  deleteFiles?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<MutationDeleteFilesArgs, 'inputs'>>;
  deletePermissions?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType, RequireFields<MutationDeletePermissionsArgs, 'inputs'>>;
  deleteRolePermissions?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType, RequireFields<MutationDeleteRolePermissionsArgs, 'inputs'>>;
  deleteRoles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType, RequireFields<MutationDeleteRolesArgs, 'inputs'>>;
  deleteSessions?: Resolver<Array<Maybe<ResolversTypes['Session']>>, ParentType, ContextType, RequireFields<MutationDeleteSessionsArgs, 'inputs'>>;
  deleteUserAccount?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteUserAccountArgs, 'input'>>;
  deleteUserAvatars?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<MutationDeleteUserAvatarsArgs, 'inputs'>>;
  deleteUserPermissions?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType, RequireFields<MutationDeleteUserPermissionsArgs, 'inputs'>>;
  deleteUserRoles?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType, RequireFields<MutationDeleteUserRolesArgs, 'inputs'>>;
  deleteUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<MutationDeleteUsersArgs, 'inputs'>>;
  joinWaitlist?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationJoinWaitlistArgs, 'email'>>;
  leaveWaitlist?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationLeaveWaitlistArgs, 'token'>>;
  loginWithEmail?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginWithEmailArgs, 'input'>>;
  loginWithEmailOTP?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginWithEmailOtpArgs, 'input'>>;
  loginWithIdentityProvider?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginWithIdentityProviderArgs, 'input'>>;
  loginWithSMSOTP?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginWithSmsotpArgs, 'input'>>;
  logoutFromAllDevices?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType>;
  registerWithEmail?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationRegisterWithEmailArgs, 'input'>>;
  removeCurrentUserPicture?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>;
  requestDeleteCurrentUserAccount?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType>;
  requestEmailLoginOTP?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationRequestEmailLoginOtpArgs, 'email'>>;
  requestResetUserPassword?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationRequestResetUserPasswordArgs, 'email'>>;
  requestSMSLoginOTP?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationRequestSmsLoginOtpArgs, 'phoneNumber'>>;
  requestUserEmailVerification?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationRequestUserEmailVerificationArgs, 'email'>>;
  requestUserPhoneNumberVerification?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationRequestUserPhoneNumberVerificationArgs, 'phoneNumber'>>;
  resetUserPassword?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationResetUserPasswordArgs, 'input'>>;
  rotateKeys?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType>;
  sendEmailLoginOTPToUsers?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationSendEmailLoginOtpToUsersArgs, 'inputs'>>;
  sendPasswordResetEmailToUsers?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationSendPasswordResetEmailToUsersArgs, 'inputs'>>;
  sendPhoneNumberVerificationSMSToUsers?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationSendPhoneNumberVerificationSmsToUsersArgs, 'inputs'>>;
  sendSMSLoginOTPToUsers?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationSendSmsLoginOtpToUsersArgs, 'inputs'>>;
  sendVerificationEmailToUsers?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationSendVerificationEmailToUsersArgs, 'inputs'>>;
  unblockUserIPs?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUnblockUserIPsArgs, 'input'>>;
  updateApplication?: Resolver<ResolversTypes['Application'], ParentType, ContextType, RequireFields<MutationUpdateApplicationArgs, 'input'>>;
  updateCurrentUserBasicInfo?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateCurrentUserBasicInfoArgs, 'input'>>;
  updateCurrentUserPhoneNumber?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateCurrentUserPhoneNumberArgs, 'input'>>;
  updatePermissions?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType, RequireFields<MutationUpdatePermissionsArgs, 'inputs'>>;
  updateRoles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType, RequireFields<MutationUpdateRolesArgs, 'inputs'>>;
  updateUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<MutationUpdateUsersArgs, 'inputs'>>;
  verifyUserEmail?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationVerifyUserEmailArgs, 'input'>>;
  verifyUserPhoneNumber?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationVerifyUserPhoneNumberArgs, 'input'>>;
}>;

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type PermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Permission'] = ResolversParentTypes['Permission']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rolePermissions?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userPermissions?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PermissionsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['PermissionsList'] = ResolversParentTypes['PermissionsList']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export type PictureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Picture'] = ResolversParentTypes['Picture']> = ResolversObject<{
  downloadUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['URL'], ParentType, ContextType, Partial<PictureThumbnailArgs>>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType, Partial<PictureUrlArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  application?: Resolver<ResolversTypes['Application'], ParentType, ContextType, RequireFields<QueryApplicationArgs, 'id'>>;
  applications?: Resolver<Array<Maybe<ResolversTypes['Application']>>, ParentType, ContextType>;
  file?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<QueryFileArgs, 'bucket' | 'key'>>;
  files?: Resolver<ResolversTypes['FilesList'], ParentType, ContextType, Partial<QueryFilesArgs>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['Permission'], ParentType, ContextType, RequireFields<QueryPermissionArgs, 'id'>>;
  permissions?: Resolver<ResolversTypes['PermissionsList'], ParentType, ContextType, Partial<QueryPermissionsArgs>>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType, RequireFields<QueryRoleArgs, 'id'>>;
  rolePermission?: Resolver<ResolversTypes['RolePermission'], ParentType, ContextType, RequireFields<QueryRolePermissionArgs, 'id'>>;
  rolePermissions?: Resolver<ResolversTypes['RolePermissionsList'], ParentType, ContextType, Partial<QueryRolePermissionsArgs>>;
  roles?: Resolver<ResolversTypes['RolesList'], ParentType, ContextType, Partial<QueryRolesArgs>>;
  session?: Resolver<ResolversTypes['Session'], ParentType, ContextType, RequireFields<QuerySessionArgs, 'id'>>;
  sessions?: Resolver<ResolversTypes['SessionsList'], ParentType, ContextType, Partial<QuerySessionsArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userAvatar?: Resolver<ResolversTypes['UserAvatar'], ParentType, ContextType, RequireFields<QueryUserAvatarArgs, 'id'>>;
  userAvatars?: Resolver<ResolversTypes['UserAvatarsList'], ParentType, ContextType, Partial<QueryUserAvatarsArgs>>;
  userPermission?: Resolver<ResolversTypes['UserPermission'], ParentType, ContextType, RequireFields<QueryUserPermissionArgs, 'id'>>;
  userPermissions?: Resolver<ResolversTypes['UserPermissionsList'], ParentType, ContextType, Partial<QueryUserPermissionsArgs>>;
  userRole?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType, RequireFields<QueryUserRoleArgs, 'id'>>;
  userRoles?: Resolver<ResolversTypes['UserRolesList'], ParentType, ContextType, Partial<QueryUserRolesArgs>>;
  users?: Resolver<ResolversTypes['UsersList'], ParentType, ContextType, Partial<QueryUsersArgs>>;
}>;

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = ResolversObject<{
  __resolveType: TypeResolveFn<'AuthResponse' | 'MutationResponse' | 'UserResponse', ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rolePermissions?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userRoles?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RolePermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolePermission'] = ResolversParentTypes['RolePermission']> = ResolversObject<{
  assignor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['Permission'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RolePermissionsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolePermissionsList'] = ResolversParentTypes['RolePermissionsList']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RolesListResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolesList'] = ResolversParentTypes['RolesList']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export interface SemVerScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SemVer'], any> {
  name: 'SemVer';
}

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = ResolversObject<{
  clientId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clientIp?: Resolver<ResolversTypes['IP'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jti?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userAgent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionsList'] = ResolversParentTypes['SessionsList']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['Session']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  ping?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "ping", ParentType, ContextType>;
  userBasicInfoUpdated?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userBasicInfoUpdated", ParentType, ContextType, RequireFields<SubscriptionUserBasicInfoUpdatedArgs, 'id'>>;
}>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeZoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeZone'], any> {
  name: 'TimeZone';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['UserAvatar']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPhoneNumberVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['Locale'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passwordUpdatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  permissionsAssignedByUser?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  permissionsAssignedToUser?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  permissionsCreatedByUser?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  rolePermissionsAssignedByUser?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  roles?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  rolesAssignedByUser?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  rolesAssignedToUser?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  rolesCreatedByUser?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  sessions?: Resolver<Array<Maybe<ResolversTypes['Session']>>, ParentType, ContextType>;
  socialPictureUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['AccountStatus']>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserAvatarResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAvatar'] = ResolversParentTypes['UserAvatar']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  picture?: Resolver<ResolversTypes['Picture'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserAvatarsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAvatarsList'] = ResolversParentTypes['UserAvatarsList']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['UserAvatar']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPermission'] = ResolversParentTypes['UserPermission']> = ResolversObject<{
  assignee?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  assignor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['Permission'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPermissionsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPermissionsList'] = ResolversParentTypes['UserPermissionsList']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = ResolversObject<{
  assignee?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  assignor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserRolesListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRolesList'] = ResolversParentTypes['UserRolesList']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersList'] = ResolversParentTypes['UsersList']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  AccountNumber?: GraphQLScalarType;
  Application?: ApplicationResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  CountryCode?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DateTimeISO?: GraphQLScalarType;
  DeweyDecimal?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  FilesList?: FilesListResolvers<ContextType>;
  GUID?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IP?: GraphQLScalarType;
  IPCPatent?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  LCCSubclass?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalDateTime?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  Permission?: PermissionResolvers<ContextType>;
  PermissionsList?: PermissionsListResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Picture?: PictureResolvers<ContextType>;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  Response?: ResponseResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RolePermission?: RolePermissionResolvers<ContextType>;
  RolePermissionsList?: RolePermissionsListResolvers<ContextType>;
  RolesList?: RolesListResolvers<ContextType>;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  SemVer?: GraphQLScalarType;
  Session?: SessionResolvers<ContextType>;
  SessionsList?: SessionsListResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserAvatar?: UserAvatarResolvers<ContextType>;
  UserAvatarsList?: UserAvatarsListResolvers<ContextType>;
  UserPermission?: UserPermissionResolvers<ContextType>;
  UserPermissionsList?: UserPermissionsListResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
  UserRolesList?: UserRolesListResolvers<ContextType>;
  UsersList?: UsersListResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;
