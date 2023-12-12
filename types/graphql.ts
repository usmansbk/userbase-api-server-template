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

export type DeleteAccountInput = {
  password: Scalars['NonEmptyString']['input'];
  token: Scalars['NonEmptyString']['input'];
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
  cursor?: Maybe<Scalars['ID']['output']>;
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
  attachManyPermissionsToRole: Array<Maybe<RolePermission>>;
  attachManyPermissionsToUser: Array<Maybe<UserPermission>>;
  attachManyRolesToUser: Array<Maybe<UserRole>>;
  attachPermissionToManyRoles: Array<Maybe<RolePermission>>;
  attachPermissionToManyUsers: Array<Maybe<UserPermission>>;
  attachRoleToManyUsers: Array<Maybe<UserRole>>;
  createManyPermissions: Array<Maybe<Permission>>;
  createManyRoles: Array<Maybe<Role>>;
  createManyUsers: Array<Maybe<User>>;
  deleteManyFiles: Array<Maybe<File>>;
  deleteManyPermissions: Array<Maybe<Permission>>;
  deleteManyRoles: Array<Maybe<Role>>;
  deleteManySessions: Array<Maybe<UserSession>>;
  deleteManyUserPictures: User;
  deleteManyUsers: Array<Maybe<User>>;
  deleteUserAccount: MutationResponse;
  detachManyPermissionsFromRole: Array<Maybe<RolePermission>>;
  detachManyPermissionsFromUser: Array<Maybe<UserPermission>>;
  detachManyRolesFromUser: Array<Maybe<UserRole>>;
  detachPermissionFromManyRoles: Array<Maybe<RolePermission>>;
  detachPermissionFromManyUsers: Array<Maybe<UserPermission>>;
  detachRoleFromManyUsers: Array<Maybe<UserRole>>;
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
  sendEmailLoginOTPToUser: MutationResponse;
  sendPasswordResetEmailToManyUsers: MutationResponse;
  sendPhoneNumberVerificationSMSToManyUsers: MutationResponse;
  sendSMSLoginOTPToUser: MutationResponse;
  sendVerificationEmailToManyUsers: MutationResponse;
  updateCurrentUserBasicInfo: UserResponse;
  updateCurrentUserPhoneNumber: UserResponse;
  updateManyPermissions: Array<Maybe<Permission>>;
  updateManyRoles: Array<Maybe<Role>>;
  updateManyUsers: Array<Maybe<User>>;
  verifyUserEmail: MutationResponse;
  verifyUserPhoneNumber: MutationResponse;
};


export type MutationDeleteUserAccountArgs = {
  input: DeleteAccountInput;
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


export type MutationUpdateCurrentUserBasicInfoArgs = {
  input: UpdateBasicInfoInput;
};


export type MutationUpdateCurrentUserPhoneNumberArgs = {
  input: UpdatePhoneNumberInput;
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
  cursor?: Maybe<Scalars['ID']['output']>;
  items: Array<Maybe<Permission>>;
};

export type Picture = {
  file: File;
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
  files: FilesList;
  me: User;
  permission: Permission;
  permissions: PermissionsList;
  role: Role;
  rolePermission: RolePermission;
  roles: RolesList;
  session: UserSession;
  sessions: SessionsList;
  user: User;
  userPermission: UserPermission;
  userRole: UserRole;
  users: UsersList;
};


export type QueryFilesArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPermissionsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolePermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolesArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySessionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySessionsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserPermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
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

export type RolesList = {
  __typename?: 'RolesList';
  cursor?: Maybe<Scalars['ID']['output']>;
  items: Array<Maybe<Role>>;
};

export type SmsotpLoginInput = {
  otp: Scalars['NonEmptyString']['input'];
  phoneNumber: Scalars['PhoneNumber']['input'];
};

export type SessionsList = {
  __typename?: 'SessionsList';
  cursor?: Maybe<Scalars['ID']['output']>;
  items: Array<Maybe<UserSession>>;
};

export type UpdateBasicInfoInput = {
  firstName: Scalars['NonEmptyString']['input'];
  language?: InputMaybe<Scalars['Locale']['input']>;
  lastName?: InputMaybe<Scalars['NonEmptyString']['input']>;
  surname?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type UpdatePhoneNumberInput = {
  phoneNumber: Scalars['PhoneNumber']['input'];
};

export type User = {
  __typename?: 'User';
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
  picture?: Maybe<UserAvatar>;
  rolePermissionsAssignedByUser: Array<Maybe<RolePermission>>;
  roles: Array<Maybe<Scalars['String']['output']>>;
  rolesAssignedByUser: Array<Maybe<UserRole>>;
  rolesAssignedToUser: Array<Maybe<UserRole>>;
  rolesCreatedByUser: Array<Maybe<Role>>;
  sessions: Array<Maybe<UserSession>>;
  socialPictureUrl?: Maybe<Scalars['URL']['output']>;
  status?: Maybe<AccountStatus>;
  surname?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserAvatar = Picture & {
  __typename?: 'UserAvatar';
  createdAt: Scalars['DateTime']['output'];
  file: File;
  id: Scalars['ID']['output'];
  thumbnail: Scalars['URL']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['URL']['output'];
};


export type UserAvatarThumbnailArgs = {
  edits?: InputMaybe<ImageEditInput>;
};


export type UserAvatarUrlArgs = {
  edits?: InputMaybe<ImageEditInput>;
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

export type UserSession = {
  __typename?: 'UserSession';
  clientId: Scalars['ID']['output'];
  clientIp: Scalars['IP']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  jti: Scalars['ID']['output'];
  userAgent?: Maybe<Scalars['String']['output']>;
};

export type UsersList = {
  __typename?: 'UsersList';
  cursor?: Maybe<Scalars['ID']['output']>;
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
  Picture: ( UserAvatar );
  Response: ( AuthResponse ) | ( MutationResponse ) | ( UserResponse );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']['output']>;
  AccountStatus: AccountStatus;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  AuthRule: AuthRule;
  AuthStrategy: AuthStrategy;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']['output']>;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']['output']>;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']['output']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']['output']>;
  DID: ResolverTypeWrapper<Scalars['DID']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  DeleteAccountInput: DeleteAccountInput;
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
  Picture: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Picture']>;
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
  RolesList: ResolverTypeWrapper<RolesList>;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']['output']>;
  SMSOTPLoginInput: SmsotpLoginInput;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']['output']>;
  SemVer: ResolverTypeWrapper<Scalars['SemVer']['output']>;
  SessionsList: ResolverTypeWrapper<SessionsList>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']['output']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']['output']>;
  UpdateBasicInfoInput: UpdateBasicInfoInput;
  UpdatePhoneNumberInput: UpdatePhoneNumberInput;
  User: ResolverTypeWrapper<User>;
  UserAvatar: ResolverTypeWrapper<UserAvatar>;
  UserPermission: ResolverTypeWrapper<UserPermission>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserSession: ResolverTypeWrapper<UserSession>;
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
  AuthResponse: AuthResponse;
  AuthRule: AuthRule;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  Byte: Scalars['Byte']['output'];
  CountryCode: Scalars['CountryCode']['output'];
  Cuid: Scalars['Cuid']['output'];
  Currency: Scalars['Currency']['output'];
  DID: Scalars['DID']['output'];
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  DateTimeISO: Scalars['DateTimeISO']['output'];
  DeleteAccountInput: DeleteAccountInput;
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
  Picture: ResolversInterfaceTypes<ResolversParentTypes>['Picture'];
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
  RolesList: RolesList;
  RoutingNumber: Scalars['RoutingNumber']['output'];
  SMSOTPLoginInput: SmsotpLoginInput;
  SafeInt: Scalars['SafeInt']['output'];
  SemVer: Scalars['SemVer']['output'];
  SessionsList: SessionsList;
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  TimeZone: Scalars['TimeZone']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  URL: Scalars['URL']['output'];
  USCurrency: Scalars['USCurrency']['output'];
  UUID: Scalars['UUID']['output'];
  UnsignedFloat: Scalars['UnsignedFloat']['output'];
  UnsignedInt: Scalars['UnsignedInt']['output'];
  UpdateBasicInfoInput: UpdateBasicInfoInput;
  UpdatePhoneNumberInput: UpdatePhoneNumberInput;
  User: User;
  UserAvatar: UserAvatar;
  UserPermission: UserPermission;
  UserResponse: UserResponse;
  UserRole: UserRole;
  UserSession: UserSession;
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
  cursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
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
  attachManyPermissionsToRole?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  attachManyPermissionsToUser?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  attachManyRolesToUser?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  attachPermissionToManyRoles?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  attachPermissionToManyUsers?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  attachRoleToManyUsers?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  createManyPermissions?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType>;
  createManyRoles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  createManyUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  deleteManyFiles?: Resolver<Array<Maybe<ResolversTypes['File']>>, ParentType, ContextType>;
  deleteManyPermissions?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType>;
  deleteManyRoles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  deleteManySessions?: Resolver<Array<Maybe<ResolversTypes['UserSession']>>, ParentType, ContextType>;
  deleteManyUserPictures?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deleteManyUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  deleteUserAccount?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteUserAccountArgs, 'input'>>;
  detachManyPermissionsFromRole?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  detachManyPermissionsFromUser?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  detachManyRolesFromUser?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  detachPermissionFromManyRoles?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  detachPermissionFromManyUsers?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  detachRoleFromManyUsers?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
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
  sendEmailLoginOTPToUser?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType>;
  sendPasswordResetEmailToManyUsers?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType>;
  sendPhoneNumberVerificationSMSToManyUsers?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType>;
  sendSMSLoginOTPToUser?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType>;
  sendVerificationEmailToManyUsers?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType>;
  updateCurrentUserBasicInfo?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateCurrentUserBasicInfoArgs, 'input'>>;
  updateCurrentUserPhoneNumber?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateCurrentUserPhoneNumberArgs, 'input'>>;
  updateManyPermissions?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType>;
  updateManyRoles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  updateManyUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
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
  cursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  items?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export type PictureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Picture'] = ResolversParentTypes['Picture']> = ResolversObject<{
  __resolveType: TypeResolveFn<'UserAvatar', ParentType, ContextType>;
  file?: Resolver<ResolversTypes['File'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['URL'], ParentType, ContextType, Partial<PictureThumbnailArgs>>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType, Partial<PictureUrlArgs>>;
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
  files?: Resolver<ResolversTypes['FilesList'], ParentType, ContextType, Partial<QueryFilesArgs>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['Permission'], ParentType, ContextType, RequireFields<QueryPermissionArgs, 'id'>>;
  permissions?: Resolver<ResolversTypes['PermissionsList'], ParentType, ContextType, Partial<QueryPermissionsArgs>>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType, RequireFields<QueryRoleArgs, 'id'>>;
  rolePermission?: Resolver<ResolversTypes['RolePermission'], ParentType, ContextType, RequireFields<QueryRolePermissionArgs, 'id'>>;
  roles?: Resolver<ResolversTypes['RolesList'], ParentType, ContextType, Partial<QueryRolesArgs>>;
  session?: Resolver<ResolversTypes['UserSession'], ParentType, ContextType, RequireFields<QuerySessionArgs, 'id'>>;
  sessions?: Resolver<ResolversTypes['SessionsList'], ParentType, ContextType, Partial<QuerySessionsArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userPermission?: Resolver<ResolversTypes['UserPermission'], ParentType, ContextType, RequireFields<QueryUserPermissionArgs, 'id'>>;
  userRole?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType, RequireFields<QueryUserRoleArgs, 'id'>>;
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

export type RolesListResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolesList'] = ResolversParentTypes['RolesList']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
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

export type SessionsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionsList'] = ResolversParentTypes['SessionsList']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  items?: Resolver<Array<Maybe<ResolversTypes['UserSession']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  picture?: Resolver<Maybe<ResolversTypes['UserAvatar']>, ParentType, ContextType>;
  rolePermissionsAssignedByUser?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  roles?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  rolesAssignedByUser?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  rolesAssignedToUser?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  rolesCreatedByUser?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  sessions?: Resolver<Array<Maybe<ResolversTypes['UserSession']>>, ParentType, ContextType>;
  socialPictureUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['AccountStatus']>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserAvatarResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAvatar'] = ResolversParentTypes['UserAvatar']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  file?: Resolver<ResolversTypes['File'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['URL'], ParentType, ContextType, Partial<UserAvatarThumbnailArgs>>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType, Partial<UserAvatarUrlArgs>>;
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

export type UserSessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSession'] = ResolversParentTypes['UserSession']> = ResolversObject<{
  clientId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clientIp?: Resolver<ResolversTypes['IP'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jti?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userAgent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersList'] = ResolversParentTypes['UsersList']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
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
  RolesList?: RolesListResolvers<ContextType>;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  SemVer?: GraphQLScalarType;
  SessionsList?: SessionsListResolvers<ContextType>;
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
  UserPermission?: UserPermissionResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
  UserSession?: UserSessionResolvers<ContextType>;
  UsersList?: UsersListResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;
