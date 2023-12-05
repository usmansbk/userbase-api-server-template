import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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

export type AuthRule = {
  allow: AuthStrategy;
  identityClaim?: InputMaybe<Scalars['String']['input']>;
  ownerField?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  rolesField?: InputMaybe<Scalars['String']['input']>;
};

export enum AuthStrategy {
  /**
   * To restrict a record's access to a specific user, use the `owner` strategy.
   * When `owner` authorization is configured, only the record's `owner` and admins are allowed the specified operations.
   */
  Owner = 'owner',
  Permissions = 'permissions',
  Roles = 'roles'
}

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
  me: User;
};

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

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['EmailAddress']['output'];
  emailLastUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isPhoneNumberVerified: Scalars['Boolean']['output'];
  language: Scalars['Locale']['output'];
  lastLoggedInAt?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  passwordLastUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  permissionsAssignedByUser: Array<Maybe<UserPermission>>;
  permissionsAssignedToUser: Array<Maybe<UserPermission>>;
  permissionsCreatedByUser: Array<Maybe<Permission>>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']['output']>;
  phoneNumberLastUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  picture?: Maybe<UserAvatar>;
  pictureLastUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  rolePermissionsAssignedByUser: Array<Maybe<RolePermission>>;
  roles: Array<Maybe<Scalars['String']['output']>>;
  rolesAssignedByUser: Array<Maybe<UserRole>>;
  rolesAssignedToUser: Array<Maybe<UserRole>>;
  rolesCreatedByUser: Array<Maybe<Role>>;
  socialPictureUrl?: Maybe<Scalars['URL']['output']>;
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

export type UserRole = {
  __typename?: 'UserRole';
  assignee: User;
  assignor?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']['output']>;
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
  DeweyDecimal: ResolverTypeWrapper<Scalars['DeweyDecimal']['output']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  File: ResolverTypeWrapper<File>;
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
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']['output']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']['output']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']['output']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']['output']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']['output']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']['output']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  Permission: ResolverTypeWrapper<Permission>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']['output']>;
  Picture: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Picture']>;
  Port: ResolverTypeWrapper<Scalars['Port']['output']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']['output']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']['output']>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']['output']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']['output']>;
  Role: ResolverTypeWrapper<Role>;
  RolePermission: ResolverTypeWrapper<RolePermission>;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']['output']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']['output']>;
  SemVer: ResolverTypeWrapper<Scalars['SemVer']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']['output']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']['output']>;
  User: ResolverTypeWrapper<User>;
  UserAvatar: ResolverTypeWrapper<UserAvatar>;
  UserPermission: ResolverTypeWrapper<UserPermission>;
  UserRole: ResolverTypeWrapper<UserRole>;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']['output']>;
  Void: ResolverTypeWrapper<Scalars['Void']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AccountNumber: Scalars['AccountNumber']['output'];
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
  DeweyDecimal: Scalars['DeweyDecimal']['output'];
  Duration: Scalars['Duration']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  File: File;
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
  NegativeFloat: Scalars['NegativeFloat']['output'];
  NegativeInt: Scalars['NegativeInt']['output'];
  NonEmptyString: Scalars['NonEmptyString']['output'];
  NonNegativeFloat: Scalars['NonNegativeFloat']['output'];
  NonNegativeInt: Scalars['NonNegativeInt']['output'];
  NonPositiveFloat: Scalars['NonPositiveFloat']['output'];
  NonPositiveInt: Scalars['NonPositiveInt']['output'];
  ObjectID: Scalars['ObjectID']['output'];
  Permission: Permission;
  PhoneNumber: Scalars['PhoneNumber']['output'];
  Picture: ResolversInterfaceTypes<ResolversParentTypes>['Picture'];
  Port: Scalars['Port']['output'];
  PositiveFloat: Scalars['PositiveFloat']['output'];
  PositiveInt: Scalars['PositiveInt']['output'];
  PostalCode: Scalars['PostalCode']['output'];
  Query: {};
  RGB: Scalars['RGB']['output'];
  RGBA: Scalars['RGBA']['output'];
  Role: Role;
  RolePermission: RolePermission;
  RoutingNumber: Scalars['RoutingNumber']['output'];
  SafeInt: Scalars['SafeInt']['output'];
  SemVer: Scalars['SemVer']['output'];
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  TimeZone: Scalars['TimeZone']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  URL: Scalars['URL']['output'];
  USCurrency: Scalars['USCurrency']['output'];
  UUID: Scalars['UUID']['output'];
  UnsignedFloat: Scalars['UnsignedFloat']['output'];
  UnsignedInt: Scalars['UnsignedInt']['output'];
  User: User;
  UserAvatar: UserAvatar;
  UserPermission: UserPermission;
  UserRole: UserRole;
  UtcOffset: Scalars['UtcOffset']['output'];
  Void: Scalars['Void']['output'];
}>;

export type AuthDirectiveArgs = {
  rules?: Maybe<Array<AuthRule>>;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

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
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

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

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export interface SemVerScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SemVer'], any> {
  name: 'SemVer';
}

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
  emailLastUpdatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPhoneNumberVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['Locale'], ParentType, ContextType>;
  lastLoggedInAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passwordLastUpdatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  permissionsAssignedByUser?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  permissionsAssignedToUser?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  permissionsCreatedByUser?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  phoneNumberLastUpdatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['UserAvatar']>, ParentType, ContextType>;
  pictureLastUpdatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  rolePermissionsAssignedByUser?: Resolver<Array<Maybe<ResolversTypes['RolePermission']>>, ParentType, ContextType>;
  roles?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  rolesAssignedByUser?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  rolesAssignedToUser?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  rolesCreatedByUser?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  socialPictureUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
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

export type UserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = ResolversObject<{
  assignee?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  assignor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
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
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  Permission?: PermissionResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Picture?: PictureResolvers<ContextType>;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  Role?: RoleResolvers<ContextType>;
  RolePermission?: RolePermissionResolvers<ContextType>;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  SemVer?: GraphQLScalarType;
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
  UserRole?: UserRoleResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;
