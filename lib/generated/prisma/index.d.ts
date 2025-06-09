
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model TestCase
 * *** TestCase schema ****
 */
export type TestCase = $Result.DefaultSelection<Prisma.$TestCasePayload>
/**
 * Model TestStep
 * 
 */
export type TestStep = $Result.DefaultSelection<Prisma.$TestStepPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProjectStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  COMPLETED: 'COMPLETED'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const ProjectPriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type ProjectPriority = (typeof ProjectPriority)[keyof typeof ProjectPriority]


export const TestCasePriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type TestCasePriority = (typeof TestCasePriority)[keyof typeof TestCasePriority]


export const TestCaseStatus: {
  PENDING: 'PENDING',
  PASS: 'PASS',
  FAIL: 'FAIL'
};

export type TestCaseStatus = (typeof TestCaseStatus)[keyof typeof TestCaseStatus]

}

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type ProjectPriority = $Enums.ProjectPriority

export const ProjectPriority: typeof $Enums.ProjectPriority

export type TestCasePriority = $Enums.TestCasePriority

export const TestCasePriority: typeof $Enums.TestCasePriority

export type TestCaseStatus = $Enums.TestCaseStatus

export const TestCaseStatus: typeof $Enums.TestCaseStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testCase`: Exposes CRUD operations for the **TestCase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestCases
    * const testCases = await prisma.testCase.findMany()
    * ```
    */
  get testCase(): Prisma.TestCaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testStep`: Exposes CRUD operations for the **TestStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestSteps
    * const testSteps = await prisma.testStep.findMany()
    * ```
    */
  get testStep(): Prisma.TestStepDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Project: 'Project',
    Notification: 'Notification',
    TestCase: 'TestCase',
    TestStep: 'TestStep'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "project" | "notification" | "testCase" | "testStep"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      TestCase: {
        payload: Prisma.$TestCasePayload<ExtArgs>
        fields: Prisma.TestCaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestCaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestCaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          findFirst: {
            args: Prisma.TestCaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestCaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          findMany: {
            args: Prisma.TestCaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>[]
          }
          create: {
            args: Prisma.TestCaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          createMany: {
            args: Prisma.TestCaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestCaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>[]
          }
          delete: {
            args: Prisma.TestCaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          update: {
            args: Prisma.TestCaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          deleteMany: {
            args: Prisma.TestCaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestCaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestCaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>[]
          }
          upsert: {
            args: Prisma.TestCaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          aggregate: {
            args: Prisma.TestCaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestCase>
          }
          groupBy: {
            args: Prisma.TestCaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestCaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestCaseCountArgs<ExtArgs>
            result: $Utils.Optional<TestCaseCountAggregateOutputType> | number
          }
        }
      }
      TestStep: {
        payload: Prisma.$TestStepPayload<ExtArgs>
        fields: Prisma.TestStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload>
          }
          findFirst: {
            args: Prisma.TestStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload>
          }
          findMany: {
            args: Prisma.TestStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload>[]
          }
          create: {
            args: Prisma.TestStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload>
          }
          createMany: {
            args: Prisma.TestStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload>[]
          }
          delete: {
            args: Prisma.TestStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload>
          }
          update: {
            args: Prisma.TestStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload>
          }
          deleteMany: {
            args: Prisma.TestStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload>[]
          }
          upsert: {
            args: Prisma.TestStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestStepPayload>
          }
          aggregate: {
            args: Prisma.TestStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestStep>
          }
          groupBy: {
            args: Prisma.TestStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestStepCountArgs<ExtArgs>
            result: $Utils.Optional<TestStepCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    project?: ProjectOmit
    notification?: NotificationOmit
    testCase?: TestCaseOmit
    testStep?: TestStepOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    notifications: number
    Project_Project_createdByIdToUser: number
    projects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    Project_Project_createdByIdToUser?: boolean | UserCountOutputTypeCountProject_Project_createdByIdToUserArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProject_Project_createdByIdToUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    TestCase: number
    members: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TestCase?: boolean | ProjectCountOutputTypeCountTestCaseArgs
    members?: boolean | ProjectCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTestCaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestCaseWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type TestCaseCountOutputType
   */

  export type TestCaseCountOutputType = {
    testSteps: number
  }

  export type TestCaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testSteps?: boolean | TestCaseCountOutputTypeCountTestStepsArgs
  }

  // Custom InputTypes
  /**
   * TestCaseCountOutputType without action
   */
  export type TestCaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseCountOutputType
     */
    select?: TestCaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TestCaseCountOutputType without action
   */
  export type TestCaseCountOutputTypeCountTestStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestStepWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    lname: string | null
    password: string | null
    imageUrl: string | null
    clerkUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    lname: string | null
    password: string | null
    imageUrl: string | null
    clerkUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    lname: number
    password: number
    imageUrl: number
    clerkUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    lname?: true
    password?: true
    imageUrl?: true
    clerkUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    lname?: true
    password?: true
    imageUrl?: true
    clerkUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    lname?: true
    password?: true
    imageUrl?: true
    clerkUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string | null
    lname: string | null
    password: string | null
    imageUrl: string | null
    clerkUserId: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    lname?: boolean
    password?: boolean
    imageUrl?: boolean
    clerkUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    Project_Project_createdByIdToUser?: boolean | User$Project_Project_createdByIdToUserArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    lname?: boolean
    password?: boolean
    imageUrl?: boolean
    clerkUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    lname?: boolean
    password?: boolean
    imageUrl?: boolean
    clerkUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    lname?: boolean
    password?: boolean
    imageUrl?: boolean
    clerkUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "lname" | "password" | "imageUrl" | "clerkUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    Project_Project_createdByIdToUser?: boolean | User$Project_Project_createdByIdToUserArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      Project_Project_createdByIdToUser: Prisma.$ProjectPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string | null
      lname: string | null
      password: string | null
      imageUrl: string | null
      clerkUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Project_Project_createdByIdToUser<T extends User$Project_Project_createdByIdToUserArgs<ExtArgs> = {}>(args?: Subset<T, User$Project_Project_createdByIdToUserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly lname: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly clerkUserId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.Project_Project_createdByIdToUser
   */
  export type User$Project_Project_createdByIdToUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    id: number | null
    createdById: number | null
  }

  export type ProjectSumAggregateOutputType = {
    id: number | null
    createdById: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: number | null
    description: string | null
    status: $Enums.ProjectStatus | null
    priority: $Enums.ProjectPriority | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    createdById: number | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: number | null
    description: string | null
    status: $Enums.ProjectStatus | null
    priority: $Enums.ProjectPriority | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    createdById: number | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    description: number
    status: number
    priority: number
    createdAt: number
    updatedAt: number
    title: number
    createdById: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    id?: true
    createdById?: true
  }

  export type ProjectSumAggregateInputType = {
    id?: true
    createdById?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    description?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    createdById?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    description?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    createdById?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    description?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    createdById?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: number
    description: string | null
    status: $Enums.ProjectStatus
    priority: $Enums.ProjectPriority
    createdAt: Date
    updatedAt: Date
    title: string | null
    createdById: number | null
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    createdById?: boolean
    User_Project_createdByIdToUser?: boolean | Project$User_Project_createdByIdToUserArgs<ExtArgs>
    TestCase?: boolean | Project$TestCaseArgs<ExtArgs>
    members?: boolean | Project$membersArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    createdById?: boolean
    User_Project_createdByIdToUser?: boolean | Project$User_Project_createdByIdToUserArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    createdById?: boolean
    User_Project_createdByIdToUser?: boolean | Project$User_Project_createdByIdToUserArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    createdById?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "description" | "status" | "priority" | "createdAt" | "updatedAt" | "title" | "createdById", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User_Project_createdByIdToUser?: boolean | Project$User_Project_createdByIdToUserArgs<ExtArgs>
    TestCase?: boolean | Project$TestCaseArgs<ExtArgs>
    members?: boolean | Project$membersArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User_Project_createdByIdToUser?: boolean | Project$User_Project_createdByIdToUserArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User_Project_createdByIdToUser?: boolean | Project$User_Project_createdByIdToUserArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      User_Project_createdByIdToUser: Prisma.$UserPayload<ExtArgs> | null
      TestCase: Prisma.$TestCasePayload<ExtArgs>[]
      members: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      description: string | null
      status: $Enums.ProjectStatus
      priority: $Enums.ProjectPriority
      createdAt: Date
      updatedAt: Date
      title: string | null
      createdById: number | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User_Project_createdByIdToUser<T extends Project$User_Project_createdByIdToUserArgs<ExtArgs> = {}>(args?: Subset<T, Project$User_Project_createdByIdToUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    TestCase<T extends Project$TestCaseArgs<ExtArgs> = {}>(args?: Subset<T, Project$TestCaseArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    members<T extends Project$membersArgs<ExtArgs> = {}>(args?: Subset<T, Project$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'Int'>
    readonly description: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly priority: FieldRef<"Project", 'ProjectPriority'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly title: FieldRef<"Project", 'String'>
    readonly createdById: FieldRef<"Project", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.User_Project_createdByIdToUser
   */
  export type Project$User_Project_createdByIdToUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Project.TestCase
   */
  export type Project$TestCaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    where?: TestCaseWhereInput
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    cursor?: TestCaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * Project.members
   */
  export type Project$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    message: string | null
    userId: number | null
    createdAt: Date | null
    read: boolean | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    message: string | null
    userId: number | null
    createdAt: Date | null
    read: boolean | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    message: number
    userId: number
    createdAt: number
    read: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    message?: true
    userId?: true
    createdAt?: true
    read?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    message?: true
    userId?: true
    createdAt?: true
    read?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    message?: true
    userId?: true
    createdAt?: true
    read?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    message: string
    userId: number
    createdAt: Date
    read: boolean
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    userId?: boolean
    createdAt?: boolean
    read?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    userId?: boolean
    createdAt?: boolean
    read?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    userId?: boolean
    createdAt?: boolean
    read?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    message?: boolean
    userId?: boolean
    createdAt?: boolean
    read?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "userId" | "createdAt" | "read", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      message: string
      userId: number
      createdAt: Date
      read: boolean
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'Int'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly read: FieldRef<"Notification", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model TestCase
   */

  export type AggregateTestCase = {
    _count: TestCaseCountAggregateOutputType | null
    _avg: TestCaseAvgAggregateOutputType | null
    _sum: TestCaseSumAggregateOutputType | null
    _min: TestCaseMinAggregateOutputType | null
    _max: TestCaseMaxAggregateOutputType | null
  }

  export type TestCaseAvgAggregateOutputType = {
    id: number | null
    projectId: number | null
  }

  export type TestCaseSumAggregateOutputType = {
    id: number | null
    projectId: number | null
  }

  export type TestCaseMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    status: $Enums.TestCaseStatus | null
    priority: $Enums.TestCasePriority | null
    actualResult: string | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: number | null
    module: string | null
  }

  export type TestCaseMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    status: $Enums.TestCaseStatus | null
    priority: $Enums.TestCasePriority | null
    actualResult: string | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: number | null
    module: string | null
  }

  export type TestCaseCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    priority: number
    actualResult: number
    createdAt: number
    updatedAt: number
    projectId: number
    module: number
    _all: number
  }


  export type TestCaseAvgAggregateInputType = {
    id?: true
    projectId?: true
  }

  export type TestCaseSumAggregateInputType = {
    id?: true
    projectId?: true
  }

  export type TestCaseMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    actualResult?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    module?: true
  }

  export type TestCaseMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    actualResult?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    module?: true
  }

  export type TestCaseCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    actualResult?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    module?: true
    _all?: true
  }

  export type TestCaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestCase to aggregate.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestCases
    **/
    _count?: true | TestCaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestCaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestCaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestCaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestCaseMaxAggregateInputType
  }

  export type GetTestCaseAggregateType<T extends TestCaseAggregateArgs> = {
        [P in keyof T & keyof AggregateTestCase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestCase[P]>
      : GetScalarType<T[P], AggregateTestCase[P]>
  }




  export type TestCaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestCaseWhereInput
    orderBy?: TestCaseOrderByWithAggregationInput | TestCaseOrderByWithAggregationInput[]
    by: TestCaseScalarFieldEnum[] | TestCaseScalarFieldEnum
    having?: TestCaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestCaseCountAggregateInputType | true
    _avg?: TestCaseAvgAggregateInputType
    _sum?: TestCaseSumAggregateInputType
    _min?: TestCaseMinAggregateInputType
    _max?: TestCaseMaxAggregateInputType
  }

  export type TestCaseGroupByOutputType = {
    id: number
    title: string | null
    description: string | null
    status: $Enums.TestCaseStatus
    priority: $Enums.TestCasePriority
    actualResult: string | null
    createdAt: Date
    updatedAt: Date
    projectId: number | null
    module: string | null
    _count: TestCaseCountAggregateOutputType | null
    _avg: TestCaseAvgAggregateOutputType | null
    _sum: TestCaseSumAggregateOutputType | null
    _min: TestCaseMinAggregateOutputType | null
    _max: TestCaseMaxAggregateOutputType | null
  }

  type GetTestCaseGroupByPayload<T extends TestCaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestCaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestCaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestCaseGroupByOutputType[P]>
            : GetScalarType<T[P], TestCaseGroupByOutputType[P]>
        }
      >
    >


  export type TestCaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    actualResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    module?: boolean
    Project?: boolean | TestCase$ProjectArgs<ExtArgs>
    testSteps?: boolean | TestCase$testStepsArgs<ExtArgs>
    _count?: boolean | TestCaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testCase"]>

  export type TestCaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    actualResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    module?: boolean
    Project?: boolean | TestCase$ProjectArgs<ExtArgs>
  }, ExtArgs["result"]["testCase"]>

  export type TestCaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    actualResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    module?: boolean
    Project?: boolean | TestCase$ProjectArgs<ExtArgs>
  }, ExtArgs["result"]["testCase"]>

  export type TestCaseSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    actualResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    module?: boolean
  }

  export type TestCaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "priority" | "actualResult" | "createdAt" | "updatedAt" | "projectId" | "module", ExtArgs["result"]["testCase"]>
  export type TestCaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | TestCase$ProjectArgs<ExtArgs>
    testSteps?: boolean | TestCase$testStepsArgs<ExtArgs>
    _count?: boolean | TestCaseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TestCaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | TestCase$ProjectArgs<ExtArgs>
  }
  export type TestCaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | TestCase$ProjectArgs<ExtArgs>
  }

  export type $TestCasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestCase"
    objects: {
      Project: Prisma.$ProjectPayload<ExtArgs> | null
      testSteps: Prisma.$TestStepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string | null
      description: string | null
      status: $Enums.TestCaseStatus
      priority: $Enums.TestCasePriority
      actualResult: string | null
      createdAt: Date
      updatedAt: Date
      projectId: number | null
      module: string | null
    }, ExtArgs["result"]["testCase"]>
    composites: {}
  }

  type TestCaseGetPayload<S extends boolean | null | undefined | TestCaseDefaultArgs> = $Result.GetResult<Prisma.$TestCasePayload, S>

  type TestCaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestCaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestCaseCountAggregateInputType | true
    }

  export interface TestCaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestCase'], meta: { name: 'TestCase' } }
    /**
     * Find zero or one TestCase that matches the filter.
     * @param {TestCaseFindUniqueArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestCaseFindUniqueArgs>(args: SelectSubset<T, TestCaseFindUniqueArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestCase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestCaseFindUniqueOrThrowArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestCaseFindUniqueOrThrowArgs>(args: SelectSubset<T, TestCaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestCase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseFindFirstArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestCaseFindFirstArgs>(args?: SelectSubset<T, TestCaseFindFirstArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestCase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseFindFirstOrThrowArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestCaseFindFirstOrThrowArgs>(args?: SelectSubset<T, TestCaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestCases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestCases
     * const testCases = await prisma.testCase.findMany()
     * 
     * // Get first 10 TestCases
     * const testCases = await prisma.testCase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testCaseWithIdOnly = await prisma.testCase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestCaseFindManyArgs>(args?: SelectSubset<T, TestCaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestCase.
     * @param {TestCaseCreateArgs} args - Arguments to create a TestCase.
     * @example
     * // Create one TestCase
     * const TestCase = await prisma.testCase.create({
     *   data: {
     *     // ... data to create a TestCase
     *   }
     * })
     * 
     */
    create<T extends TestCaseCreateArgs>(args: SelectSubset<T, TestCaseCreateArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestCases.
     * @param {TestCaseCreateManyArgs} args - Arguments to create many TestCases.
     * @example
     * // Create many TestCases
     * const testCase = await prisma.testCase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestCaseCreateManyArgs>(args?: SelectSubset<T, TestCaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestCases and returns the data saved in the database.
     * @param {TestCaseCreateManyAndReturnArgs} args - Arguments to create many TestCases.
     * @example
     * // Create many TestCases
     * const testCase = await prisma.testCase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestCases and only return the `id`
     * const testCaseWithIdOnly = await prisma.testCase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestCaseCreateManyAndReturnArgs>(args?: SelectSubset<T, TestCaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestCase.
     * @param {TestCaseDeleteArgs} args - Arguments to delete one TestCase.
     * @example
     * // Delete one TestCase
     * const TestCase = await prisma.testCase.delete({
     *   where: {
     *     // ... filter to delete one TestCase
     *   }
     * })
     * 
     */
    delete<T extends TestCaseDeleteArgs>(args: SelectSubset<T, TestCaseDeleteArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestCase.
     * @param {TestCaseUpdateArgs} args - Arguments to update one TestCase.
     * @example
     * // Update one TestCase
     * const testCase = await prisma.testCase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestCaseUpdateArgs>(args: SelectSubset<T, TestCaseUpdateArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestCases.
     * @param {TestCaseDeleteManyArgs} args - Arguments to filter TestCases to delete.
     * @example
     * // Delete a few TestCases
     * const { count } = await prisma.testCase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestCaseDeleteManyArgs>(args?: SelectSubset<T, TestCaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestCases
     * const testCase = await prisma.testCase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestCaseUpdateManyArgs>(args: SelectSubset<T, TestCaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestCases and returns the data updated in the database.
     * @param {TestCaseUpdateManyAndReturnArgs} args - Arguments to update many TestCases.
     * @example
     * // Update many TestCases
     * const testCase = await prisma.testCase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestCases and only return the `id`
     * const testCaseWithIdOnly = await prisma.testCase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestCaseUpdateManyAndReturnArgs>(args: SelectSubset<T, TestCaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestCase.
     * @param {TestCaseUpsertArgs} args - Arguments to update or create a TestCase.
     * @example
     * // Update or create a TestCase
     * const testCase = await prisma.testCase.upsert({
     *   create: {
     *     // ... data to create a TestCase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestCase we want to update
     *   }
     * })
     */
    upsert<T extends TestCaseUpsertArgs>(args: SelectSubset<T, TestCaseUpsertArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseCountArgs} args - Arguments to filter TestCases to count.
     * @example
     * // Count the number of TestCases
     * const count = await prisma.testCase.count({
     *   where: {
     *     // ... the filter for the TestCases we want to count
     *   }
     * })
    **/
    count<T extends TestCaseCountArgs>(
      args?: Subset<T, TestCaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestCaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestCaseAggregateArgs>(args: Subset<T, TestCaseAggregateArgs>): Prisma.PrismaPromise<GetTestCaseAggregateType<T>>

    /**
     * Group by TestCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestCaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestCaseGroupByArgs['orderBy'] }
        : { orderBy?: TestCaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestCaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestCaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestCase model
   */
  readonly fields: TestCaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestCase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestCaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Project<T extends TestCase$ProjectArgs<ExtArgs> = {}>(args?: Subset<T, TestCase$ProjectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    testSteps<T extends TestCase$testStepsArgs<ExtArgs> = {}>(args?: Subset<T, TestCase$testStepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestCase model
   */
  interface TestCaseFieldRefs {
    readonly id: FieldRef<"TestCase", 'Int'>
    readonly title: FieldRef<"TestCase", 'String'>
    readonly description: FieldRef<"TestCase", 'String'>
    readonly status: FieldRef<"TestCase", 'TestCaseStatus'>
    readonly priority: FieldRef<"TestCase", 'TestCasePriority'>
    readonly actualResult: FieldRef<"TestCase", 'String'>
    readonly createdAt: FieldRef<"TestCase", 'DateTime'>
    readonly updatedAt: FieldRef<"TestCase", 'DateTime'>
    readonly projectId: FieldRef<"TestCase", 'Int'>
    readonly module: FieldRef<"TestCase", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TestCase findUnique
   */
  export type TestCaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase findUniqueOrThrow
   */
  export type TestCaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase findFirst
   */
  export type TestCaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestCases.
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestCases.
     */
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * TestCase findFirstOrThrow
   */
  export type TestCaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestCases.
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestCases.
     */
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * TestCase findMany
   */
  export type TestCaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCases to fetch.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestCases.
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * TestCase create
   */
  export type TestCaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * The data needed to create a TestCase.
     */
    data: XOR<TestCaseCreateInput, TestCaseUncheckedCreateInput>
  }

  /**
   * TestCase createMany
   */
  export type TestCaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestCases.
     */
    data: TestCaseCreateManyInput | TestCaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestCase createManyAndReturn
   */
  export type TestCaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * The data used to create many TestCases.
     */
    data: TestCaseCreateManyInput | TestCaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestCase update
   */
  export type TestCaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * The data needed to update a TestCase.
     */
    data: XOR<TestCaseUpdateInput, TestCaseUncheckedUpdateInput>
    /**
     * Choose, which TestCase to update.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase updateMany
   */
  export type TestCaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestCases.
     */
    data: XOR<TestCaseUpdateManyMutationInput, TestCaseUncheckedUpdateManyInput>
    /**
     * Filter which TestCases to update
     */
    where?: TestCaseWhereInput
    /**
     * Limit how many TestCases to update.
     */
    limit?: number
  }

  /**
   * TestCase updateManyAndReturn
   */
  export type TestCaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * The data used to update TestCases.
     */
    data: XOR<TestCaseUpdateManyMutationInput, TestCaseUncheckedUpdateManyInput>
    /**
     * Filter which TestCases to update
     */
    where?: TestCaseWhereInput
    /**
     * Limit how many TestCases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestCase upsert
   */
  export type TestCaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * The filter to search for the TestCase to update in case it exists.
     */
    where: TestCaseWhereUniqueInput
    /**
     * In case the TestCase found by the `where` argument doesn't exist, create a new TestCase with this data.
     */
    create: XOR<TestCaseCreateInput, TestCaseUncheckedCreateInput>
    /**
     * In case the TestCase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestCaseUpdateInput, TestCaseUncheckedUpdateInput>
  }

  /**
   * TestCase delete
   */
  export type TestCaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter which TestCase to delete.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase deleteMany
   */
  export type TestCaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestCases to delete
     */
    where?: TestCaseWhereInput
    /**
     * Limit how many TestCases to delete.
     */
    limit?: number
  }

  /**
   * TestCase.Project
   */
  export type TestCase$ProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * TestCase.testSteps
   */
  export type TestCase$testStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    where?: TestStepWhereInput
    orderBy?: TestStepOrderByWithRelationInput | TestStepOrderByWithRelationInput[]
    cursor?: TestStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestStepScalarFieldEnum | TestStepScalarFieldEnum[]
  }

  /**
   * TestCase without action
   */
  export type TestCaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
  }


  /**
   * Model TestStep
   */

  export type AggregateTestStep = {
    _count: TestStepCountAggregateOutputType | null
    _avg: TestStepAvgAggregateOutputType | null
    _sum: TestStepSumAggregateOutputType | null
    _min: TestStepMinAggregateOutputType | null
    _max: TestStepMaxAggregateOutputType | null
  }

  export type TestStepAvgAggregateOutputType = {
    id: number | null
    testCaseId: number | null
  }

  export type TestStepSumAggregateOutputType = {
    id: number | null
    testCaseId: number | null
  }

  export type TestStepMinAggregateOutputType = {
    id: number | null
    action: string | null
    expectedResult: string | null
    testCaseId: number | null
  }

  export type TestStepMaxAggregateOutputType = {
    id: number | null
    action: string | null
    expectedResult: string | null
    testCaseId: number | null
  }

  export type TestStepCountAggregateOutputType = {
    id: number
    action: number
    expectedResult: number
    testCaseId: number
    _all: number
  }


  export type TestStepAvgAggregateInputType = {
    id?: true
    testCaseId?: true
  }

  export type TestStepSumAggregateInputType = {
    id?: true
    testCaseId?: true
  }

  export type TestStepMinAggregateInputType = {
    id?: true
    action?: true
    expectedResult?: true
    testCaseId?: true
  }

  export type TestStepMaxAggregateInputType = {
    id?: true
    action?: true
    expectedResult?: true
    testCaseId?: true
  }

  export type TestStepCountAggregateInputType = {
    id?: true
    action?: true
    expectedResult?: true
    testCaseId?: true
    _all?: true
  }

  export type TestStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestStep to aggregate.
     */
    where?: TestStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSteps to fetch.
     */
    orderBy?: TestStepOrderByWithRelationInput | TestStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestSteps
    **/
    _count?: true | TestStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestStepMaxAggregateInputType
  }

  export type GetTestStepAggregateType<T extends TestStepAggregateArgs> = {
        [P in keyof T & keyof AggregateTestStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestStep[P]>
      : GetScalarType<T[P], AggregateTestStep[P]>
  }




  export type TestStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestStepWhereInput
    orderBy?: TestStepOrderByWithAggregationInput | TestStepOrderByWithAggregationInput[]
    by: TestStepScalarFieldEnum[] | TestStepScalarFieldEnum
    having?: TestStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestStepCountAggregateInputType | true
    _avg?: TestStepAvgAggregateInputType
    _sum?: TestStepSumAggregateInputType
    _min?: TestStepMinAggregateInputType
    _max?: TestStepMaxAggregateInputType
  }

  export type TestStepGroupByOutputType = {
    id: number
    action: string
    expectedResult: string
    testCaseId: number
    _count: TestStepCountAggregateOutputType | null
    _avg: TestStepAvgAggregateOutputType | null
    _sum: TestStepSumAggregateOutputType | null
    _min: TestStepMinAggregateOutputType | null
    _max: TestStepMaxAggregateOutputType | null
  }

  type GetTestStepGroupByPayload<T extends TestStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestStepGroupByOutputType[P]>
            : GetScalarType<T[P], TestStepGroupByOutputType[P]>
        }
      >
    >


  export type TestStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    expectedResult?: boolean
    testCaseId?: boolean
    TestCase?: boolean | TestCaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testStep"]>

  export type TestStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    expectedResult?: boolean
    testCaseId?: boolean
    TestCase?: boolean | TestCaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testStep"]>

  export type TestStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    expectedResult?: boolean
    testCaseId?: boolean
    TestCase?: boolean | TestCaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testStep"]>

  export type TestStepSelectScalar = {
    id?: boolean
    action?: boolean
    expectedResult?: boolean
    testCaseId?: boolean
  }

  export type TestStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "expectedResult" | "testCaseId", ExtArgs["result"]["testStep"]>
  export type TestStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TestCase?: boolean | TestCaseDefaultArgs<ExtArgs>
  }
  export type TestStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TestCase?: boolean | TestCaseDefaultArgs<ExtArgs>
  }
  export type TestStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TestCase?: boolean | TestCaseDefaultArgs<ExtArgs>
  }

  export type $TestStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestStep"
    objects: {
      TestCase: Prisma.$TestCasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      action: string
      expectedResult: string
      testCaseId: number
    }, ExtArgs["result"]["testStep"]>
    composites: {}
  }

  type TestStepGetPayload<S extends boolean | null | undefined | TestStepDefaultArgs> = $Result.GetResult<Prisma.$TestStepPayload, S>

  type TestStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestStepCountAggregateInputType | true
    }

  export interface TestStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestStep'], meta: { name: 'TestStep' } }
    /**
     * Find zero or one TestStep that matches the filter.
     * @param {TestStepFindUniqueArgs} args - Arguments to find a TestStep
     * @example
     * // Get one TestStep
     * const testStep = await prisma.testStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestStepFindUniqueArgs>(args: SelectSubset<T, TestStepFindUniqueArgs<ExtArgs>>): Prisma__TestStepClient<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestStepFindUniqueOrThrowArgs} args - Arguments to find a TestStep
     * @example
     * // Get one TestStep
     * const testStep = await prisma.testStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestStepFindUniqueOrThrowArgs>(args: SelectSubset<T, TestStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestStepClient<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestStepFindFirstArgs} args - Arguments to find a TestStep
     * @example
     * // Get one TestStep
     * const testStep = await prisma.testStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestStepFindFirstArgs>(args?: SelectSubset<T, TestStepFindFirstArgs<ExtArgs>>): Prisma__TestStepClient<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestStepFindFirstOrThrowArgs} args - Arguments to find a TestStep
     * @example
     * // Get one TestStep
     * const testStep = await prisma.testStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestStepFindFirstOrThrowArgs>(args?: SelectSubset<T, TestStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestStepClient<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestSteps
     * const testSteps = await prisma.testStep.findMany()
     * 
     * // Get first 10 TestSteps
     * const testSteps = await prisma.testStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testStepWithIdOnly = await prisma.testStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestStepFindManyArgs>(args?: SelectSubset<T, TestStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestStep.
     * @param {TestStepCreateArgs} args - Arguments to create a TestStep.
     * @example
     * // Create one TestStep
     * const TestStep = await prisma.testStep.create({
     *   data: {
     *     // ... data to create a TestStep
     *   }
     * })
     * 
     */
    create<T extends TestStepCreateArgs>(args: SelectSubset<T, TestStepCreateArgs<ExtArgs>>): Prisma__TestStepClient<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestSteps.
     * @param {TestStepCreateManyArgs} args - Arguments to create many TestSteps.
     * @example
     * // Create many TestSteps
     * const testStep = await prisma.testStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestStepCreateManyArgs>(args?: SelectSubset<T, TestStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestSteps and returns the data saved in the database.
     * @param {TestStepCreateManyAndReturnArgs} args - Arguments to create many TestSteps.
     * @example
     * // Create many TestSteps
     * const testStep = await prisma.testStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestSteps and only return the `id`
     * const testStepWithIdOnly = await prisma.testStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestStepCreateManyAndReturnArgs>(args?: SelectSubset<T, TestStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestStep.
     * @param {TestStepDeleteArgs} args - Arguments to delete one TestStep.
     * @example
     * // Delete one TestStep
     * const TestStep = await prisma.testStep.delete({
     *   where: {
     *     // ... filter to delete one TestStep
     *   }
     * })
     * 
     */
    delete<T extends TestStepDeleteArgs>(args: SelectSubset<T, TestStepDeleteArgs<ExtArgs>>): Prisma__TestStepClient<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestStep.
     * @param {TestStepUpdateArgs} args - Arguments to update one TestStep.
     * @example
     * // Update one TestStep
     * const testStep = await prisma.testStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestStepUpdateArgs>(args: SelectSubset<T, TestStepUpdateArgs<ExtArgs>>): Prisma__TestStepClient<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestSteps.
     * @param {TestStepDeleteManyArgs} args - Arguments to filter TestSteps to delete.
     * @example
     * // Delete a few TestSteps
     * const { count } = await prisma.testStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestStepDeleteManyArgs>(args?: SelectSubset<T, TestStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestSteps
     * const testStep = await prisma.testStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestStepUpdateManyArgs>(args: SelectSubset<T, TestStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestSteps and returns the data updated in the database.
     * @param {TestStepUpdateManyAndReturnArgs} args - Arguments to update many TestSteps.
     * @example
     * // Update many TestSteps
     * const testStep = await prisma.testStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestSteps and only return the `id`
     * const testStepWithIdOnly = await prisma.testStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestStepUpdateManyAndReturnArgs>(args: SelectSubset<T, TestStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestStep.
     * @param {TestStepUpsertArgs} args - Arguments to update or create a TestStep.
     * @example
     * // Update or create a TestStep
     * const testStep = await prisma.testStep.upsert({
     *   create: {
     *     // ... data to create a TestStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestStep we want to update
     *   }
     * })
     */
    upsert<T extends TestStepUpsertArgs>(args: SelectSubset<T, TestStepUpsertArgs<ExtArgs>>): Prisma__TestStepClient<$Result.GetResult<Prisma.$TestStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestStepCountArgs} args - Arguments to filter TestSteps to count.
     * @example
     * // Count the number of TestSteps
     * const count = await prisma.testStep.count({
     *   where: {
     *     // ... the filter for the TestSteps we want to count
     *   }
     * })
    **/
    count<T extends TestStepCountArgs>(
      args?: Subset<T, TestStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestStepAggregateArgs>(args: Subset<T, TestStepAggregateArgs>): Prisma.PrismaPromise<GetTestStepAggregateType<T>>

    /**
     * Group by TestStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestStepGroupByArgs['orderBy'] }
        : { orderBy?: TestStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestStep model
   */
  readonly fields: TestStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    TestCase<T extends TestCaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestCaseDefaultArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestStep model
   */
  interface TestStepFieldRefs {
    readonly id: FieldRef<"TestStep", 'Int'>
    readonly action: FieldRef<"TestStep", 'String'>
    readonly expectedResult: FieldRef<"TestStep", 'String'>
    readonly testCaseId: FieldRef<"TestStep", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TestStep findUnique
   */
  export type TestStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    /**
     * Filter, which TestStep to fetch.
     */
    where: TestStepWhereUniqueInput
  }

  /**
   * TestStep findUniqueOrThrow
   */
  export type TestStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    /**
     * Filter, which TestStep to fetch.
     */
    where: TestStepWhereUniqueInput
  }

  /**
   * TestStep findFirst
   */
  export type TestStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    /**
     * Filter, which TestStep to fetch.
     */
    where?: TestStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSteps to fetch.
     */
    orderBy?: TestStepOrderByWithRelationInput | TestStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestSteps.
     */
    cursor?: TestStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestSteps.
     */
    distinct?: TestStepScalarFieldEnum | TestStepScalarFieldEnum[]
  }

  /**
   * TestStep findFirstOrThrow
   */
  export type TestStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    /**
     * Filter, which TestStep to fetch.
     */
    where?: TestStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSteps to fetch.
     */
    orderBy?: TestStepOrderByWithRelationInput | TestStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestSteps.
     */
    cursor?: TestStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestSteps.
     */
    distinct?: TestStepScalarFieldEnum | TestStepScalarFieldEnum[]
  }

  /**
   * TestStep findMany
   */
  export type TestStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    /**
     * Filter, which TestSteps to fetch.
     */
    where?: TestStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSteps to fetch.
     */
    orderBy?: TestStepOrderByWithRelationInput | TestStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestSteps.
     */
    cursor?: TestStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSteps.
     */
    skip?: number
    distinct?: TestStepScalarFieldEnum | TestStepScalarFieldEnum[]
  }

  /**
   * TestStep create
   */
  export type TestStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    /**
     * The data needed to create a TestStep.
     */
    data: XOR<TestStepCreateInput, TestStepUncheckedCreateInput>
  }

  /**
   * TestStep createMany
   */
  export type TestStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestSteps.
     */
    data: TestStepCreateManyInput | TestStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestStep createManyAndReturn
   */
  export type TestStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * The data used to create many TestSteps.
     */
    data: TestStepCreateManyInput | TestStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestStep update
   */
  export type TestStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    /**
     * The data needed to update a TestStep.
     */
    data: XOR<TestStepUpdateInput, TestStepUncheckedUpdateInput>
    /**
     * Choose, which TestStep to update.
     */
    where: TestStepWhereUniqueInput
  }

  /**
   * TestStep updateMany
   */
  export type TestStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestSteps.
     */
    data: XOR<TestStepUpdateManyMutationInput, TestStepUncheckedUpdateManyInput>
    /**
     * Filter which TestSteps to update
     */
    where?: TestStepWhereInput
    /**
     * Limit how many TestSteps to update.
     */
    limit?: number
  }

  /**
   * TestStep updateManyAndReturn
   */
  export type TestStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * The data used to update TestSteps.
     */
    data: XOR<TestStepUpdateManyMutationInput, TestStepUncheckedUpdateManyInput>
    /**
     * Filter which TestSteps to update
     */
    where?: TestStepWhereInput
    /**
     * Limit how many TestSteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestStep upsert
   */
  export type TestStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    /**
     * The filter to search for the TestStep to update in case it exists.
     */
    where: TestStepWhereUniqueInput
    /**
     * In case the TestStep found by the `where` argument doesn't exist, create a new TestStep with this data.
     */
    create: XOR<TestStepCreateInput, TestStepUncheckedCreateInput>
    /**
     * In case the TestStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestStepUpdateInput, TestStepUncheckedUpdateInput>
  }

  /**
   * TestStep delete
   */
  export type TestStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
    /**
     * Filter which TestStep to delete.
     */
    where: TestStepWhereUniqueInput
  }

  /**
   * TestStep deleteMany
   */
  export type TestStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestSteps to delete
     */
    where?: TestStepWhereInput
    /**
     * Limit how many TestSteps to delete.
     */
    limit?: number
  }

  /**
   * TestStep without action
   */
  export type TestStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestStep
     */
    select?: TestStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestStep
     */
    omit?: TestStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestStepInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    lname: 'lname',
    password: 'password',
    imageUrl: 'imageUrl',
    clerkUserId: 'clerkUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    description: 'description',
    status: 'status',
    priority: 'priority',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    createdById: 'createdById'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    message: 'message',
    userId: 'userId',
    createdAt: 'createdAt',
    read: 'read'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const TestCaseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    priority: 'priority',
    actualResult: 'actualResult',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    projectId: 'projectId',
    module: 'module'
  };

  export type TestCaseScalarFieldEnum = (typeof TestCaseScalarFieldEnum)[keyof typeof TestCaseScalarFieldEnum]


  export const TestStepScalarFieldEnum: {
    id: 'id',
    action: 'action',
    expectedResult: 'expectedResult',
    testCaseId: 'testCaseId'
  };

  export type TestStepScalarFieldEnum = (typeof TestStepScalarFieldEnum)[keyof typeof TestStepScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'ProjectPriority'
   */
  export type EnumProjectPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectPriority'>
    


  /**
   * Reference to a field of type 'ProjectPriority[]'
   */
  export type ListEnumProjectPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectPriority[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'TestCaseStatus'
   */
  export type EnumTestCaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestCaseStatus'>
    


  /**
   * Reference to a field of type 'TestCaseStatus[]'
   */
  export type ListEnumTestCaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestCaseStatus[]'>
    


  /**
   * Reference to a field of type 'TestCasePriority'
   */
  export type EnumTestCasePriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestCasePriority'>
    


  /**
   * Reference to a field of type 'TestCasePriority[]'
   */
  export type ListEnumTestCasePriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestCasePriority[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    lname?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    clerkUserId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    notifications?: NotificationListRelationFilter
    Project_Project_createdByIdToUser?: ProjectListRelationFilter
    projects?: ProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    lname?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    clerkUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    notifications?: NotificationOrderByRelationAggregateInput
    Project_Project_createdByIdToUser?: ProjectOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    clerkUserId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    lname?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    notifications?: NotificationListRelationFilter
    Project_Project_createdByIdToUser?: ProjectListRelationFilter
    projects?: ProjectListRelationFilter
  }, "id" | "email" | "clerkUserId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    lname?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    clerkUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    lname?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    clerkUserId?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: IntFilter<"Project"> | number
    description?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFilter<"Project"> | $Enums.ProjectPriority
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    title?: StringNullableFilter<"Project"> | string | null
    createdById?: IntNullableFilter<"Project"> | number | null
    User_Project_createdByIdToUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    TestCase?: TestCaseListRelationFilter
    members?: UserListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    User_Project_createdByIdToUser?: UserOrderByWithRelationInput
    TestCase?: TestCaseOrderByRelationAggregateInput
    members?: UserOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    description?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFilter<"Project"> | $Enums.ProjectPriority
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    title?: StringNullableFilter<"Project"> | string | null
    createdById?: IntNullableFilter<"Project"> | number | null
    User_Project_createdByIdToUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    TestCase?: TestCaseListRelationFilter
    members?: UserListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Project"> | number
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    priority?: EnumProjectPriorityWithAggregatesFilter<"Project"> | $Enums.ProjectPriority
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    title?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdById?: IntNullableWithAggregatesFilter<"Project"> | number | null
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    message?: StringFilter<"Notification"> | string
    userId?: IntFilter<"Notification"> | number
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    read?: BoolFilter<"Notification"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    message?: StringFilter<"Notification"> | string
    userId?: IntFilter<"Notification"> | number
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    read?: BoolFilter<"Notification"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    message?: StringWithAggregatesFilter<"Notification"> | string
    userId?: IntWithAggregatesFilter<"Notification"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
  }

  export type TestCaseWhereInput = {
    AND?: TestCaseWhereInput | TestCaseWhereInput[]
    OR?: TestCaseWhereInput[]
    NOT?: TestCaseWhereInput | TestCaseWhereInput[]
    id?: IntFilter<"TestCase"> | number
    title?: StringNullableFilter<"TestCase"> | string | null
    description?: StringNullableFilter<"TestCase"> | string | null
    status?: EnumTestCaseStatusFilter<"TestCase"> | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFilter<"TestCase"> | $Enums.TestCasePriority
    actualResult?: StringNullableFilter<"TestCase"> | string | null
    createdAt?: DateTimeFilter<"TestCase"> | Date | string
    updatedAt?: DateTimeFilter<"TestCase"> | Date | string
    projectId?: IntNullableFilter<"TestCase"> | number | null
    module?: StringNullableFilter<"TestCase"> | string | null
    Project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    testSteps?: TestStepListRelationFilter
  }

  export type TestCaseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    actualResult?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrderInput | SortOrder
    module?: SortOrderInput | SortOrder
    Project?: ProjectOrderByWithRelationInput
    testSteps?: TestStepOrderByRelationAggregateInput
  }

  export type TestCaseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TestCaseWhereInput | TestCaseWhereInput[]
    OR?: TestCaseWhereInput[]
    NOT?: TestCaseWhereInput | TestCaseWhereInput[]
    title?: StringNullableFilter<"TestCase"> | string | null
    description?: StringNullableFilter<"TestCase"> | string | null
    status?: EnumTestCaseStatusFilter<"TestCase"> | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFilter<"TestCase"> | $Enums.TestCasePriority
    actualResult?: StringNullableFilter<"TestCase"> | string | null
    createdAt?: DateTimeFilter<"TestCase"> | Date | string
    updatedAt?: DateTimeFilter<"TestCase"> | Date | string
    projectId?: IntNullableFilter<"TestCase"> | number | null
    module?: StringNullableFilter<"TestCase"> | string | null
    Project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    testSteps?: TestStepListRelationFilter
  }, "id">

  export type TestCaseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    actualResult?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrderInput | SortOrder
    module?: SortOrderInput | SortOrder
    _count?: TestCaseCountOrderByAggregateInput
    _avg?: TestCaseAvgOrderByAggregateInput
    _max?: TestCaseMaxOrderByAggregateInput
    _min?: TestCaseMinOrderByAggregateInput
    _sum?: TestCaseSumOrderByAggregateInput
  }

  export type TestCaseScalarWhereWithAggregatesInput = {
    AND?: TestCaseScalarWhereWithAggregatesInput | TestCaseScalarWhereWithAggregatesInput[]
    OR?: TestCaseScalarWhereWithAggregatesInput[]
    NOT?: TestCaseScalarWhereWithAggregatesInput | TestCaseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TestCase"> | number
    title?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
    description?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
    status?: EnumTestCaseStatusWithAggregatesFilter<"TestCase"> | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityWithAggregatesFilter<"TestCase"> | $Enums.TestCasePriority
    actualResult?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TestCase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TestCase"> | Date | string
    projectId?: IntNullableWithAggregatesFilter<"TestCase"> | number | null
    module?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
  }

  export type TestStepWhereInput = {
    AND?: TestStepWhereInput | TestStepWhereInput[]
    OR?: TestStepWhereInput[]
    NOT?: TestStepWhereInput | TestStepWhereInput[]
    id?: IntFilter<"TestStep"> | number
    action?: StringFilter<"TestStep"> | string
    expectedResult?: StringFilter<"TestStep"> | string
    testCaseId?: IntFilter<"TestStep"> | number
    TestCase?: XOR<TestCaseScalarRelationFilter, TestCaseWhereInput>
  }

  export type TestStepOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    expectedResult?: SortOrder
    testCaseId?: SortOrder
    TestCase?: TestCaseOrderByWithRelationInput
  }

  export type TestStepWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TestStepWhereInput | TestStepWhereInput[]
    OR?: TestStepWhereInput[]
    NOT?: TestStepWhereInput | TestStepWhereInput[]
    action?: StringFilter<"TestStep"> | string
    expectedResult?: StringFilter<"TestStep"> | string
    testCaseId?: IntFilter<"TestStep"> | number
    TestCase?: XOR<TestCaseScalarRelationFilter, TestCaseWhereInput>
  }, "id">

  export type TestStepOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    expectedResult?: SortOrder
    testCaseId?: SortOrder
    _count?: TestStepCountOrderByAggregateInput
    _avg?: TestStepAvgOrderByAggregateInput
    _max?: TestStepMaxOrderByAggregateInput
    _min?: TestStepMinOrderByAggregateInput
    _sum?: TestStepSumOrderByAggregateInput
  }

  export type TestStepScalarWhereWithAggregatesInput = {
    AND?: TestStepScalarWhereWithAggregatesInput | TestStepScalarWhereWithAggregatesInput[]
    OR?: TestStepScalarWhereWithAggregatesInput[]
    NOT?: TestStepScalarWhereWithAggregatesInput | TestStepScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TestStep"> | number
    action?: StringWithAggregatesFilter<"TestStep"> | string
    expectedResult?: StringWithAggregatesFilter<"TestStep"> | string
    testCaseId?: IntWithAggregatesFilter<"TestStep"> | number
  }

  export type UserCreateInput = {
    email: string
    name?: string | null
    lname?: string | null
    password?: string | null
    imageUrl?: string | null
    clerkUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationCreateNestedManyWithoutUserInput
    Project_Project_createdByIdToUser?: ProjectCreateNestedManyWithoutUser_Project_createdByIdToUserInput
    projects?: ProjectCreateNestedManyWithoutMembersInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    lname?: string | null
    password?: string | null
    imageUrl?: string | null
    clerkUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    Project_Project_createdByIdToUser?: ProjectUncheckedCreateNestedManyWithoutUser_Project_createdByIdToUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutMembersInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    Project_Project_createdByIdToUser?: ProjectUpdateManyWithoutUser_Project_createdByIdToUserNestedInput
    projects?: ProjectUpdateManyWithoutMembersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    Project_Project_createdByIdToUser?: ProjectUncheckedUpdateManyWithoutUser_Project_createdByIdToUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutMembersNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name?: string | null
    lname?: string | null
    password?: string | null
    imageUrl?: string | null
    clerkUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
    User_Project_createdByIdToUser?: UserCreateNestedOneWithoutProject_Project_createdByIdToUserInput
    TestCase?: TestCaseCreateNestedManyWithoutProjectInput
    members?: UserCreateNestedManyWithoutProjectsInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: number
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
    createdById?: number | null
    TestCase?: TestCaseUncheckedCreateNestedManyWithoutProjectInput
    members?: UserUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type ProjectUpdateInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User_Project_createdByIdToUser?: UserUpdateOneWithoutProject_Project_createdByIdToUserNestedInput
    TestCase?: TestCaseUpdateManyWithoutProjectNestedInput
    members?: UserUpdateManyWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    TestCase?: TestCaseUncheckedUpdateManyWithoutProjectNestedInput
    members?: UserUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: number
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
    createdById?: number | null
  }

  export type ProjectUpdateManyMutationInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type NotificationCreateInput = {
    message: string
    createdAt?: Date | string
    read?: boolean
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    message: string
    userId: number
    createdAt?: Date | string
    read?: boolean
  }

  export type NotificationUpdateInput = {
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationCreateManyInput = {
    id?: number
    message: string
    userId: number
    createdAt?: Date | string
    read?: boolean
  }

  export type NotificationUpdateManyMutationInput = {
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestCaseCreateInput = {
    title?: string | null
    description?: string | null
    status?: $Enums.TestCaseStatus
    priority?: $Enums.TestCasePriority
    actualResult?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    module?: string | null
    Project?: ProjectCreateNestedOneWithoutTestCaseInput
    testSteps?: TestStepCreateNestedManyWithoutTestCaseInput
  }

  export type TestCaseUncheckedCreateInput = {
    id?: number
    title?: string | null
    description?: string | null
    status?: $Enums.TestCaseStatus
    priority?: $Enums.TestCasePriority
    actualResult?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    projectId?: number | null
    module?: string | null
    testSteps?: TestStepUncheckedCreateNestedManyWithoutTestCaseInput
  }

  export type TestCaseUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTestCaseStatusFieldUpdateOperationsInput | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFieldUpdateOperationsInput | $Enums.TestCasePriority
    actualResult?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
    Project?: ProjectUpdateOneWithoutTestCaseNestedInput
    testSteps?: TestStepUpdateManyWithoutTestCaseNestedInput
  }

  export type TestCaseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTestCaseStatusFieldUpdateOperationsInput | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFieldUpdateOperationsInput | $Enums.TestCasePriority
    actualResult?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: NullableIntFieldUpdateOperationsInput | number | null
    module?: NullableStringFieldUpdateOperationsInput | string | null
    testSteps?: TestStepUncheckedUpdateManyWithoutTestCaseNestedInput
  }

  export type TestCaseCreateManyInput = {
    id?: number
    title?: string | null
    description?: string | null
    status?: $Enums.TestCaseStatus
    priority?: $Enums.TestCasePriority
    actualResult?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    projectId?: number | null
    module?: string | null
  }

  export type TestCaseUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTestCaseStatusFieldUpdateOperationsInput | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFieldUpdateOperationsInput | $Enums.TestCasePriority
    actualResult?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TestCaseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTestCaseStatusFieldUpdateOperationsInput | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFieldUpdateOperationsInput | $Enums.TestCasePriority
    actualResult?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: NullableIntFieldUpdateOperationsInput | number | null
    module?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TestStepCreateInput = {
    action: string
    expectedResult: string
    TestCase: TestCaseCreateNestedOneWithoutTestStepsInput
  }

  export type TestStepUncheckedCreateInput = {
    id?: number
    action: string
    expectedResult: string
    testCaseId: number
  }

  export type TestStepUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    expectedResult?: StringFieldUpdateOperationsInput | string
    TestCase?: TestCaseUpdateOneRequiredWithoutTestStepsNestedInput
  }

  export type TestStepUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    expectedResult?: StringFieldUpdateOperationsInput | string
    testCaseId?: IntFieldUpdateOperationsInput | number
  }

  export type TestStepCreateManyInput = {
    id?: number
    action: string
    expectedResult: string
    testCaseId: number
  }

  export type TestStepUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    expectedResult?: StringFieldUpdateOperationsInput | string
  }

  export type TestStepUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    expectedResult?: StringFieldUpdateOperationsInput | string
    testCaseId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    lname?: SortOrder
    password?: SortOrder
    imageUrl?: SortOrder
    clerkUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    lname?: SortOrder
    password?: SortOrder
    imageUrl?: SortOrder
    clerkUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    lname?: SortOrder
    password?: SortOrder
    imageUrl?: SortOrder
    clerkUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type EnumProjectPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectPriority | EnumProjectPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectPriority[] | ListEnumProjectPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectPriority[] | ListEnumProjectPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectPriorityFilter<$PrismaModel> | $Enums.ProjectPriority
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TestCaseListRelationFilter = {
    every?: TestCaseWhereInput
    some?: TestCaseWhereInput
    none?: TestCaseWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type TestCaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    createdById?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    id?: SortOrder
    createdById?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    createdById?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    createdById?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    id?: SortOrder
    createdById?: SortOrder
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type EnumProjectPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectPriority | EnumProjectPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectPriority[] | ListEnumProjectPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectPriority[] | ListEnumProjectPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectPriorityWithAggregatesFilter<$PrismaModel> | $Enums.ProjectPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectPriorityFilter<$PrismaModel>
    _max?: NestedEnumProjectPriorityFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumTestCaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TestCaseStatus | EnumTestCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestCaseStatus[] | ListEnumTestCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestCaseStatus[] | ListEnumTestCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestCaseStatusFilter<$PrismaModel> | $Enums.TestCaseStatus
  }

  export type EnumTestCasePriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TestCasePriority | EnumTestCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TestCasePriority[] | ListEnumTestCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestCasePriority[] | ListEnumTestCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTestCasePriorityFilter<$PrismaModel> | $Enums.TestCasePriority
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type TestStepListRelationFilter = {
    every?: TestStepWhereInput
    some?: TestStepWhereInput
    none?: TestStepWhereInput
  }

  export type TestStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestCaseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    actualResult?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    module?: SortOrder
  }

  export type TestCaseAvgOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
  }

  export type TestCaseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    actualResult?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    module?: SortOrder
  }

  export type TestCaseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    actualResult?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    module?: SortOrder
  }

  export type TestCaseSumOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
  }

  export type EnumTestCaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestCaseStatus | EnumTestCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestCaseStatus[] | ListEnumTestCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestCaseStatus[] | ListEnumTestCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestCaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.TestCaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTestCaseStatusFilter<$PrismaModel>
    _max?: NestedEnumTestCaseStatusFilter<$PrismaModel>
  }

  export type EnumTestCasePriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestCasePriority | EnumTestCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TestCasePriority[] | ListEnumTestCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestCasePriority[] | ListEnumTestCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTestCasePriorityWithAggregatesFilter<$PrismaModel> | $Enums.TestCasePriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTestCasePriorityFilter<$PrismaModel>
    _max?: NestedEnumTestCasePriorityFilter<$PrismaModel>
  }

  export type TestCaseScalarRelationFilter = {
    is?: TestCaseWhereInput
    isNot?: TestCaseWhereInput
  }

  export type TestStepCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    expectedResult?: SortOrder
    testCaseId?: SortOrder
  }

  export type TestStepAvgOrderByAggregateInput = {
    id?: SortOrder
    testCaseId?: SortOrder
  }

  export type TestStepMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    expectedResult?: SortOrder
    testCaseId?: SortOrder
  }

  export type TestStepMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    expectedResult?: SortOrder
    testCaseId?: SortOrder
  }

  export type TestStepSumOrderByAggregateInput = {
    id?: SortOrder
    testCaseId?: SortOrder
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutUser_Project_createdByIdToUserInput = {
    create?: XOR<ProjectCreateWithoutUser_Project_createdByIdToUserInput, ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput> | ProjectCreateWithoutUser_Project_createdByIdToUserInput[] | ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUser_Project_createdByIdToUserInput | ProjectCreateOrConnectWithoutUser_Project_createdByIdToUserInput[]
    createMany?: ProjectCreateManyUser_Project_createdByIdToUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutMembersInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput> | ProjectCreateWithoutMembersInput[] | ProjectUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput | ProjectCreateOrConnectWithoutMembersInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUser_Project_createdByIdToUserInput = {
    create?: XOR<ProjectCreateWithoutUser_Project_createdByIdToUserInput, ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput> | ProjectCreateWithoutUser_Project_createdByIdToUserInput[] | ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUser_Project_createdByIdToUserInput | ProjectCreateOrConnectWithoutUser_Project_createdByIdToUserInput[]
    createMany?: ProjectCreateManyUser_Project_createdByIdToUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutMembersInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput> | ProjectCreateWithoutMembersInput[] | ProjectUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput | ProjectCreateOrConnectWithoutMembersInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutUser_Project_createdByIdToUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUser_Project_createdByIdToUserInput, ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput> | ProjectCreateWithoutUser_Project_createdByIdToUserInput[] | ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUser_Project_createdByIdToUserInput | ProjectCreateOrConnectWithoutUser_Project_createdByIdToUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUser_Project_createdByIdToUserInput | ProjectUpsertWithWhereUniqueWithoutUser_Project_createdByIdToUserInput[]
    createMany?: ProjectCreateManyUser_Project_createdByIdToUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUser_Project_createdByIdToUserInput | ProjectUpdateWithWhereUniqueWithoutUser_Project_createdByIdToUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUser_Project_createdByIdToUserInput | ProjectUpdateManyWithWhereWithoutUser_Project_createdByIdToUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutMembersNestedInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput> | ProjectCreateWithoutMembersInput[] | ProjectUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput | ProjectCreateOrConnectWithoutMembersInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutMembersInput | ProjectUpsertWithWhereUniqueWithoutMembersInput[]
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutMembersInput | ProjectUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutMembersInput | ProjectUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUser_Project_createdByIdToUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUser_Project_createdByIdToUserInput, ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput> | ProjectCreateWithoutUser_Project_createdByIdToUserInput[] | ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUser_Project_createdByIdToUserInput | ProjectCreateOrConnectWithoutUser_Project_createdByIdToUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUser_Project_createdByIdToUserInput | ProjectUpsertWithWhereUniqueWithoutUser_Project_createdByIdToUserInput[]
    createMany?: ProjectCreateManyUser_Project_createdByIdToUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUser_Project_createdByIdToUserInput | ProjectUpdateWithWhereUniqueWithoutUser_Project_createdByIdToUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUser_Project_createdByIdToUserInput | ProjectUpdateManyWithWhereWithoutUser_Project_createdByIdToUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutMembersNestedInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput> | ProjectCreateWithoutMembersInput[] | ProjectUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput | ProjectCreateOrConnectWithoutMembersInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutMembersInput | ProjectUpsertWithWhereUniqueWithoutMembersInput[]
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutMembersInput | ProjectUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutMembersInput | ProjectUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProject_Project_createdByIdToUserInput = {
    create?: XOR<UserCreateWithoutProject_Project_createdByIdToUserInput, UserUncheckedCreateWithoutProject_Project_createdByIdToUserInput>
    connectOrCreate?: UserCreateOrConnectWithoutProject_Project_createdByIdToUserInput
    connect?: UserWhereUniqueInput
  }

  export type TestCaseCreateNestedManyWithoutProjectInput = {
    create?: XOR<TestCaseCreateWithoutProjectInput, TestCaseUncheckedCreateWithoutProjectInput> | TestCaseCreateWithoutProjectInput[] | TestCaseUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutProjectInput | TestCaseCreateOrConnectWithoutProjectInput[]
    createMany?: TestCaseCreateManyProjectInputEnvelope
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput> | UserCreateWithoutProjectsInput[] | UserUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput | UserCreateOrConnectWithoutProjectsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TestCaseUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<TestCaseCreateWithoutProjectInput, TestCaseUncheckedCreateWithoutProjectInput> | TestCaseCreateWithoutProjectInput[] | TestCaseUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutProjectInput | TestCaseCreateOrConnectWithoutProjectInput[]
    createMany?: TestCaseCreateManyProjectInputEnvelope
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput> | UserCreateWithoutProjectsInput[] | UserUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput | UserCreateOrConnectWithoutProjectsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type EnumProjectPriorityFieldUpdateOperationsInput = {
    set?: $Enums.ProjectPriority
  }

  export type UserUpdateOneWithoutProject_Project_createdByIdToUserNestedInput = {
    create?: XOR<UserCreateWithoutProject_Project_createdByIdToUserInput, UserUncheckedCreateWithoutProject_Project_createdByIdToUserInput>
    connectOrCreate?: UserCreateOrConnectWithoutProject_Project_createdByIdToUserInput
    upsert?: UserUpsertWithoutProject_Project_createdByIdToUserInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProject_Project_createdByIdToUserInput, UserUpdateWithoutProject_Project_createdByIdToUserInput>, UserUncheckedUpdateWithoutProject_Project_createdByIdToUserInput>
  }

  export type TestCaseUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TestCaseCreateWithoutProjectInput, TestCaseUncheckedCreateWithoutProjectInput> | TestCaseCreateWithoutProjectInput[] | TestCaseUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutProjectInput | TestCaseCreateOrConnectWithoutProjectInput[]
    upsert?: TestCaseUpsertWithWhereUniqueWithoutProjectInput | TestCaseUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TestCaseCreateManyProjectInputEnvelope
    set?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    disconnect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    delete?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    update?: TestCaseUpdateWithWhereUniqueWithoutProjectInput | TestCaseUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TestCaseUpdateManyWithWhereWithoutProjectInput | TestCaseUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
  }

  export type UserUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput> | UserCreateWithoutProjectsInput[] | UserUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput | UserCreateOrConnectWithoutProjectsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutProjectsInput | UserUpsertWithWhereUniqueWithoutProjectsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutProjectsInput | UserUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutProjectsInput | UserUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TestCaseUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TestCaseCreateWithoutProjectInput, TestCaseUncheckedCreateWithoutProjectInput> | TestCaseCreateWithoutProjectInput[] | TestCaseUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutProjectInput | TestCaseCreateOrConnectWithoutProjectInput[]
    upsert?: TestCaseUpsertWithWhereUniqueWithoutProjectInput | TestCaseUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TestCaseCreateManyProjectInputEnvelope
    set?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    disconnect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    delete?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    update?: TestCaseUpdateWithWhereUniqueWithoutProjectInput | TestCaseUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TestCaseUpdateManyWithWhereWithoutProjectInput | TestCaseUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput> | UserCreateWithoutProjectsInput[] | UserUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput | UserCreateOrConnectWithoutProjectsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutProjectsInput | UserUpsertWithWhereUniqueWithoutProjectsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutProjectsInput | UserUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutProjectsInput | UserUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type ProjectCreateNestedOneWithoutTestCaseInput = {
    create?: XOR<ProjectCreateWithoutTestCaseInput, ProjectUncheckedCreateWithoutTestCaseInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTestCaseInput
    connect?: ProjectWhereUniqueInput
  }

  export type TestStepCreateNestedManyWithoutTestCaseInput = {
    create?: XOR<TestStepCreateWithoutTestCaseInput, TestStepUncheckedCreateWithoutTestCaseInput> | TestStepCreateWithoutTestCaseInput[] | TestStepUncheckedCreateWithoutTestCaseInput[]
    connectOrCreate?: TestStepCreateOrConnectWithoutTestCaseInput | TestStepCreateOrConnectWithoutTestCaseInput[]
    createMany?: TestStepCreateManyTestCaseInputEnvelope
    connect?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
  }

  export type TestStepUncheckedCreateNestedManyWithoutTestCaseInput = {
    create?: XOR<TestStepCreateWithoutTestCaseInput, TestStepUncheckedCreateWithoutTestCaseInput> | TestStepCreateWithoutTestCaseInput[] | TestStepUncheckedCreateWithoutTestCaseInput[]
    connectOrCreate?: TestStepCreateOrConnectWithoutTestCaseInput | TestStepCreateOrConnectWithoutTestCaseInput[]
    createMany?: TestStepCreateManyTestCaseInputEnvelope
    connect?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
  }

  export type EnumTestCaseStatusFieldUpdateOperationsInput = {
    set?: $Enums.TestCaseStatus
  }

  export type EnumTestCasePriorityFieldUpdateOperationsInput = {
    set?: $Enums.TestCasePriority
  }

  export type ProjectUpdateOneWithoutTestCaseNestedInput = {
    create?: XOR<ProjectCreateWithoutTestCaseInput, ProjectUncheckedCreateWithoutTestCaseInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTestCaseInput
    upsert?: ProjectUpsertWithoutTestCaseInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTestCaseInput, ProjectUpdateWithoutTestCaseInput>, ProjectUncheckedUpdateWithoutTestCaseInput>
  }

  export type TestStepUpdateManyWithoutTestCaseNestedInput = {
    create?: XOR<TestStepCreateWithoutTestCaseInput, TestStepUncheckedCreateWithoutTestCaseInput> | TestStepCreateWithoutTestCaseInput[] | TestStepUncheckedCreateWithoutTestCaseInput[]
    connectOrCreate?: TestStepCreateOrConnectWithoutTestCaseInput | TestStepCreateOrConnectWithoutTestCaseInput[]
    upsert?: TestStepUpsertWithWhereUniqueWithoutTestCaseInput | TestStepUpsertWithWhereUniqueWithoutTestCaseInput[]
    createMany?: TestStepCreateManyTestCaseInputEnvelope
    set?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
    disconnect?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
    delete?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
    connect?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
    update?: TestStepUpdateWithWhereUniqueWithoutTestCaseInput | TestStepUpdateWithWhereUniqueWithoutTestCaseInput[]
    updateMany?: TestStepUpdateManyWithWhereWithoutTestCaseInput | TestStepUpdateManyWithWhereWithoutTestCaseInput[]
    deleteMany?: TestStepScalarWhereInput | TestStepScalarWhereInput[]
  }

  export type TestStepUncheckedUpdateManyWithoutTestCaseNestedInput = {
    create?: XOR<TestStepCreateWithoutTestCaseInput, TestStepUncheckedCreateWithoutTestCaseInput> | TestStepCreateWithoutTestCaseInput[] | TestStepUncheckedCreateWithoutTestCaseInput[]
    connectOrCreate?: TestStepCreateOrConnectWithoutTestCaseInput | TestStepCreateOrConnectWithoutTestCaseInput[]
    upsert?: TestStepUpsertWithWhereUniqueWithoutTestCaseInput | TestStepUpsertWithWhereUniqueWithoutTestCaseInput[]
    createMany?: TestStepCreateManyTestCaseInputEnvelope
    set?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
    disconnect?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
    delete?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
    connect?: TestStepWhereUniqueInput | TestStepWhereUniqueInput[]
    update?: TestStepUpdateWithWhereUniqueWithoutTestCaseInput | TestStepUpdateWithWhereUniqueWithoutTestCaseInput[]
    updateMany?: TestStepUpdateManyWithWhereWithoutTestCaseInput | TestStepUpdateManyWithWhereWithoutTestCaseInput[]
    deleteMany?: TestStepScalarWhereInput | TestStepScalarWhereInput[]
  }

  export type TestCaseCreateNestedOneWithoutTestStepsInput = {
    create?: XOR<TestCaseCreateWithoutTestStepsInput, TestCaseUncheckedCreateWithoutTestStepsInput>
    connectOrCreate?: TestCaseCreateOrConnectWithoutTestStepsInput
    connect?: TestCaseWhereUniqueInput
  }

  export type TestCaseUpdateOneRequiredWithoutTestStepsNestedInput = {
    create?: XOR<TestCaseCreateWithoutTestStepsInput, TestCaseUncheckedCreateWithoutTestStepsInput>
    connectOrCreate?: TestCaseCreateOrConnectWithoutTestStepsInput
    upsert?: TestCaseUpsertWithoutTestStepsInput
    connect?: TestCaseWhereUniqueInput
    update?: XOR<XOR<TestCaseUpdateToOneWithWhereWithoutTestStepsInput, TestCaseUpdateWithoutTestStepsInput>, TestCaseUncheckedUpdateWithoutTestStepsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedEnumProjectPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectPriority | EnumProjectPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectPriority[] | ListEnumProjectPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectPriority[] | ListEnumProjectPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectPriorityFilter<$PrismaModel> | $Enums.ProjectPriority
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedEnumProjectPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectPriority | EnumProjectPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectPriority[] | ListEnumProjectPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectPriority[] | ListEnumProjectPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectPriorityWithAggregatesFilter<$PrismaModel> | $Enums.ProjectPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectPriorityFilter<$PrismaModel>
    _max?: NestedEnumProjectPriorityFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumTestCaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TestCaseStatus | EnumTestCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestCaseStatus[] | ListEnumTestCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestCaseStatus[] | ListEnumTestCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestCaseStatusFilter<$PrismaModel> | $Enums.TestCaseStatus
  }

  export type NestedEnumTestCasePriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TestCasePriority | EnumTestCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TestCasePriority[] | ListEnumTestCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestCasePriority[] | ListEnumTestCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTestCasePriorityFilter<$PrismaModel> | $Enums.TestCasePriority
  }

  export type NestedEnumTestCaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestCaseStatus | EnumTestCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestCaseStatus[] | ListEnumTestCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestCaseStatus[] | ListEnumTestCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestCaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.TestCaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTestCaseStatusFilter<$PrismaModel>
    _max?: NestedEnumTestCaseStatusFilter<$PrismaModel>
  }

  export type NestedEnumTestCasePriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestCasePriority | EnumTestCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TestCasePriority[] | ListEnumTestCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestCasePriority[] | ListEnumTestCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTestCasePriorityWithAggregatesFilter<$PrismaModel> | $Enums.TestCasePriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTestCasePriorityFilter<$PrismaModel>
    _max?: NestedEnumTestCasePriorityFilter<$PrismaModel>
  }

  export type NotificationCreateWithoutUserInput = {
    message: string
    createdAt?: Date | string
    read?: boolean
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    message: string
    createdAt?: Date | string
    read?: boolean
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutUser_Project_createdByIdToUserInput = {
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
    TestCase?: TestCaseCreateNestedManyWithoutProjectInput
    members?: UserCreateNestedManyWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput = {
    id?: number
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
    TestCase?: TestCaseUncheckedCreateNestedManyWithoutProjectInput
    members?: UserUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type ProjectCreateOrConnectWithoutUser_Project_createdByIdToUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUser_Project_createdByIdToUserInput, ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput>
  }

  export type ProjectCreateManyUser_Project_createdByIdToUserInputEnvelope = {
    data: ProjectCreateManyUser_Project_createdByIdToUserInput | ProjectCreateManyUser_Project_createdByIdToUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutMembersInput = {
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
    User_Project_createdByIdToUser?: UserCreateNestedOneWithoutProject_Project_createdByIdToUserInput
    TestCase?: TestCaseCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutMembersInput = {
    id?: number
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
    createdById?: number | null
    TestCase?: TestCaseUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutMembersInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    message?: StringFilter<"Notification"> | string
    userId?: IntFilter<"Notification"> | number
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    read?: BoolFilter<"Notification"> | boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutUser_Project_createdByIdToUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUser_Project_createdByIdToUserInput, ProjectUncheckedUpdateWithoutUser_Project_createdByIdToUserInput>
    create: XOR<ProjectCreateWithoutUser_Project_createdByIdToUserInput, ProjectUncheckedCreateWithoutUser_Project_createdByIdToUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUser_Project_createdByIdToUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUser_Project_createdByIdToUserInput, ProjectUncheckedUpdateWithoutUser_Project_createdByIdToUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUser_Project_createdByIdToUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUser_Project_createdByIdToUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: IntFilter<"Project"> | number
    description?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFilter<"Project"> | $Enums.ProjectPriority
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    title?: StringNullableFilter<"Project"> | string | null
    createdById?: IntNullableFilter<"Project"> | number | null
  }

  export type ProjectUpsertWithWhereUniqueWithoutMembersInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutMembersInput, ProjectUncheckedUpdateWithoutMembersInput>
    create: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutMembersInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutMembersInput, ProjectUncheckedUpdateWithoutMembersInput>
  }

  export type ProjectUpdateManyWithWhereWithoutMembersInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutMembersInput>
  }

  export type UserCreateWithoutProject_Project_createdByIdToUserInput = {
    email: string
    name?: string | null
    lname?: string | null
    password?: string | null
    imageUrl?: string | null
    clerkUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutMembersInput
  }

  export type UserUncheckedCreateWithoutProject_Project_createdByIdToUserInput = {
    id?: number
    email: string
    name?: string | null
    lname?: string | null
    password?: string | null
    imageUrl?: string | null
    clerkUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutMembersInput
  }

  export type UserCreateOrConnectWithoutProject_Project_createdByIdToUserInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProject_Project_createdByIdToUserInput, UserUncheckedCreateWithoutProject_Project_createdByIdToUserInput>
  }

  export type TestCaseCreateWithoutProjectInput = {
    title?: string | null
    description?: string | null
    status?: $Enums.TestCaseStatus
    priority?: $Enums.TestCasePriority
    actualResult?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    module?: string | null
    testSteps?: TestStepCreateNestedManyWithoutTestCaseInput
  }

  export type TestCaseUncheckedCreateWithoutProjectInput = {
    id?: number
    title?: string | null
    description?: string | null
    status?: $Enums.TestCaseStatus
    priority?: $Enums.TestCasePriority
    actualResult?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    module?: string | null
    testSteps?: TestStepUncheckedCreateNestedManyWithoutTestCaseInput
  }

  export type TestCaseCreateOrConnectWithoutProjectInput = {
    where: TestCaseWhereUniqueInput
    create: XOR<TestCaseCreateWithoutProjectInput, TestCaseUncheckedCreateWithoutProjectInput>
  }

  export type TestCaseCreateManyProjectInputEnvelope = {
    data: TestCaseCreateManyProjectInput | TestCaseCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutProjectsInput = {
    email: string
    name?: string | null
    lname?: string | null
    password?: string | null
    imageUrl?: string | null
    clerkUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationCreateNestedManyWithoutUserInput
    Project_Project_createdByIdToUser?: ProjectCreateNestedManyWithoutUser_Project_createdByIdToUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: number
    email: string
    name?: string | null
    lname?: string | null
    password?: string | null
    imageUrl?: string | null
    clerkUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    Project_Project_createdByIdToUser?: ProjectUncheckedCreateNestedManyWithoutUser_Project_createdByIdToUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type UserUpsertWithoutProject_Project_createdByIdToUserInput = {
    update: XOR<UserUpdateWithoutProject_Project_createdByIdToUserInput, UserUncheckedUpdateWithoutProject_Project_createdByIdToUserInput>
    create: XOR<UserCreateWithoutProject_Project_createdByIdToUserInput, UserUncheckedCreateWithoutProject_Project_createdByIdToUserInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProject_Project_createdByIdToUserInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProject_Project_createdByIdToUserInput, UserUncheckedUpdateWithoutProject_Project_createdByIdToUserInput>
  }

  export type UserUpdateWithoutProject_Project_createdByIdToUserInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutMembersNestedInput
  }

  export type UserUncheckedUpdateWithoutProject_Project_createdByIdToUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutMembersNestedInput
  }

  export type TestCaseUpsertWithWhereUniqueWithoutProjectInput = {
    where: TestCaseWhereUniqueInput
    update: XOR<TestCaseUpdateWithoutProjectInput, TestCaseUncheckedUpdateWithoutProjectInput>
    create: XOR<TestCaseCreateWithoutProjectInput, TestCaseUncheckedCreateWithoutProjectInput>
  }

  export type TestCaseUpdateWithWhereUniqueWithoutProjectInput = {
    where: TestCaseWhereUniqueInput
    data: XOR<TestCaseUpdateWithoutProjectInput, TestCaseUncheckedUpdateWithoutProjectInput>
  }

  export type TestCaseUpdateManyWithWhereWithoutProjectInput = {
    where: TestCaseScalarWhereInput
    data: XOR<TestCaseUpdateManyMutationInput, TestCaseUncheckedUpdateManyWithoutProjectInput>
  }

  export type TestCaseScalarWhereInput = {
    AND?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
    OR?: TestCaseScalarWhereInput[]
    NOT?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
    id?: IntFilter<"TestCase"> | number
    title?: StringNullableFilter<"TestCase"> | string | null
    description?: StringNullableFilter<"TestCase"> | string | null
    status?: EnumTestCaseStatusFilter<"TestCase"> | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFilter<"TestCase"> | $Enums.TestCasePriority
    actualResult?: StringNullableFilter<"TestCase"> | string | null
    createdAt?: DateTimeFilter<"TestCase"> | Date | string
    updatedAt?: DateTimeFilter<"TestCase"> | Date | string
    projectId?: IntNullableFilter<"TestCase"> | number | null
    module?: StringNullableFilter<"TestCase"> | string | null
  }

  export type UserUpsertWithWhereUniqueWithoutProjectsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutProjectsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateManyWithWhereWithoutProjectsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutProjectsInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    lname?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    clerkUserId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserCreateWithoutNotificationsInput = {
    email: string
    name?: string | null
    lname?: string | null
    password?: string | null
    imageUrl?: string | null
    clerkUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Project_Project_createdByIdToUser?: ProjectCreateNestedManyWithoutUser_Project_createdByIdToUserInput
    projects?: ProjectCreateNestedManyWithoutMembersInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: number
    email: string
    name?: string | null
    lname?: string | null
    password?: string | null
    imageUrl?: string | null
    clerkUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Project_Project_createdByIdToUser?: ProjectUncheckedCreateNestedManyWithoutUser_Project_createdByIdToUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutMembersInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Project_Project_createdByIdToUser?: ProjectUpdateManyWithoutUser_Project_createdByIdToUserNestedInput
    projects?: ProjectUpdateManyWithoutMembersNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Project_Project_createdByIdToUser?: ProjectUncheckedUpdateManyWithoutUser_Project_createdByIdToUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutMembersNestedInput
  }

  export type ProjectCreateWithoutTestCaseInput = {
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
    User_Project_createdByIdToUser?: UserCreateNestedOneWithoutProject_Project_createdByIdToUserInput
    members?: UserCreateNestedManyWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutTestCaseInput = {
    id?: number
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
    createdById?: number | null
    members?: UserUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type ProjectCreateOrConnectWithoutTestCaseInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTestCaseInput, ProjectUncheckedCreateWithoutTestCaseInput>
  }

  export type TestStepCreateWithoutTestCaseInput = {
    action: string
    expectedResult: string
  }

  export type TestStepUncheckedCreateWithoutTestCaseInput = {
    id?: number
    action: string
    expectedResult: string
  }

  export type TestStepCreateOrConnectWithoutTestCaseInput = {
    where: TestStepWhereUniqueInput
    create: XOR<TestStepCreateWithoutTestCaseInput, TestStepUncheckedCreateWithoutTestCaseInput>
  }

  export type TestStepCreateManyTestCaseInputEnvelope = {
    data: TestStepCreateManyTestCaseInput | TestStepCreateManyTestCaseInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutTestCaseInput = {
    update: XOR<ProjectUpdateWithoutTestCaseInput, ProjectUncheckedUpdateWithoutTestCaseInput>
    create: XOR<ProjectCreateWithoutTestCaseInput, ProjectUncheckedCreateWithoutTestCaseInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTestCaseInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTestCaseInput, ProjectUncheckedUpdateWithoutTestCaseInput>
  }

  export type ProjectUpdateWithoutTestCaseInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User_Project_createdByIdToUser?: UserUpdateOneWithoutProject_Project_createdByIdToUserNestedInput
    members?: UserUpdateManyWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTestCaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    members?: UserUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type TestStepUpsertWithWhereUniqueWithoutTestCaseInput = {
    where: TestStepWhereUniqueInput
    update: XOR<TestStepUpdateWithoutTestCaseInput, TestStepUncheckedUpdateWithoutTestCaseInput>
    create: XOR<TestStepCreateWithoutTestCaseInput, TestStepUncheckedCreateWithoutTestCaseInput>
  }

  export type TestStepUpdateWithWhereUniqueWithoutTestCaseInput = {
    where: TestStepWhereUniqueInput
    data: XOR<TestStepUpdateWithoutTestCaseInput, TestStepUncheckedUpdateWithoutTestCaseInput>
  }

  export type TestStepUpdateManyWithWhereWithoutTestCaseInput = {
    where: TestStepScalarWhereInput
    data: XOR<TestStepUpdateManyMutationInput, TestStepUncheckedUpdateManyWithoutTestCaseInput>
  }

  export type TestStepScalarWhereInput = {
    AND?: TestStepScalarWhereInput | TestStepScalarWhereInput[]
    OR?: TestStepScalarWhereInput[]
    NOT?: TestStepScalarWhereInput | TestStepScalarWhereInput[]
    id?: IntFilter<"TestStep"> | number
    action?: StringFilter<"TestStep"> | string
    expectedResult?: StringFilter<"TestStep"> | string
    testCaseId?: IntFilter<"TestStep"> | number
  }

  export type TestCaseCreateWithoutTestStepsInput = {
    title?: string | null
    description?: string | null
    status?: $Enums.TestCaseStatus
    priority?: $Enums.TestCasePriority
    actualResult?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    module?: string | null
    Project?: ProjectCreateNestedOneWithoutTestCaseInput
  }

  export type TestCaseUncheckedCreateWithoutTestStepsInput = {
    id?: number
    title?: string | null
    description?: string | null
    status?: $Enums.TestCaseStatus
    priority?: $Enums.TestCasePriority
    actualResult?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    projectId?: number | null
    module?: string | null
  }

  export type TestCaseCreateOrConnectWithoutTestStepsInput = {
    where: TestCaseWhereUniqueInput
    create: XOR<TestCaseCreateWithoutTestStepsInput, TestCaseUncheckedCreateWithoutTestStepsInput>
  }

  export type TestCaseUpsertWithoutTestStepsInput = {
    update: XOR<TestCaseUpdateWithoutTestStepsInput, TestCaseUncheckedUpdateWithoutTestStepsInput>
    create: XOR<TestCaseCreateWithoutTestStepsInput, TestCaseUncheckedCreateWithoutTestStepsInput>
    where?: TestCaseWhereInput
  }

  export type TestCaseUpdateToOneWithWhereWithoutTestStepsInput = {
    where?: TestCaseWhereInput
    data: XOR<TestCaseUpdateWithoutTestStepsInput, TestCaseUncheckedUpdateWithoutTestStepsInput>
  }

  export type TestCaseUpdateWithoutTestStepsInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTestCaseStatusFieldUpdateOperationsInput | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFieldUpdateOperationsInput | $Enums.TestCasePriority
    actualResult?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
    Project?: ProjectUpdateOneWithoutTestCaseNestedInput
  }

  export type TestCaseUncheckedUpdateWithoutTestStepsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTestCaseStatusFieldUpdateOperationsInput | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFieldUpdateOperationsInput | $Enums.TestCasePriority
    actualResult?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: NullableIntFieldUpdateOperationsInput | number | null
    module?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    message: string
    createdAt?: Date | string
    read?: boolean
  }

  export type ProjectCreateManyUser_Project_createdByIdToUserInput = {
    id?: number
    description?: string | null
    status?: $Enums.ProjectStatus
    priority?: $Enums.ProjectPriority
    createdAt?: Date | string
    updatedAt?: Date | string
    title?: string | null
  }

  export type NotificationUpdateWithoutUserInput = {
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectUpdateWithoutUser_Project_createdByIdToUserInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    TestCase?: TestCaseUpdateManyWithoutProjectNestedInput
    members?: UserUpdateManyWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUser_Project_createdByIdToUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    TestCase?: TestCaseUncheckedUpdateManyWithoutProjectNestedInput
    members?: UserUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUser_Project_createdByIdToUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUpdateWithoutMembersInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User_Project_createdByIdToUser?: UserUpdateOneWithoutProject_Project_createdByIdToUserNestedInput
    TestCase?: TestCaseUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    TestCase?: TestCaseUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    priority?: EnumProjectPriorityFieldUpdateOperationsInput | $Enums.ProjectPriority
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TestCaseCreateManyProjectInput = {
    id?: number
    title?: string | null
    description?: string | null
    status?: $Enums.TestCaseStatus
    priority?: $Enums.TestCasePriority
    actualResult?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    module?: string | null
  }

  export type TestCaseUpdateWithoutProjectInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTestCaseStatusFieldUpdateOperationsInput | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFieldUpdateOperationsInput | $Enums.TestCasePriority
    actualResult?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
    testSteps?: TestStepUpdateManyWithoutTestCaseNestedInput
  }

  export type TestCaseUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTestCaseStatusFieldUpdateOperationsInput | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFieldUpdateOperationsInput | $Enums.TestCasePriority
    actualResult?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
    testSteps?: TestStepUncheckedUpdateManyWithoutTestCaseNestedInput
  }

  export type TestCaseUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTestCaseStatusFieldUpdateOperationsInput | $Enums.TestCaseStatus
    priority?: EnumTestCasePriorityFieldUpdateOperationsInput | $Enums.TestCasePriority
    actualResult?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUpdateWithoutProjectsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    Project_Project_createdByIdToUser?: ProjectUpdateManyWithoutUser_Project_createdByIdToUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    Project_Project_createdByIdToUser?: ProjectUncheckedUpdateManyWithoutUser_Project_createdByIdToUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestStepCreateManyTestCaseInput = {
    id?: number
    action: string
    expectedResult: string
  }

  export type TestStepUpdateWithoutTestCaseInput = {
    action?: StringFieldUpdateOperationsInput | string
    expectedResult?: StringFieldUpdateOperationsInput | string
  }

  export type TestStepUncheckedUpdateWithoutTestCaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    expectedResult?: StringFieldUpdateOperationsInput | string
  }

  export type TestStepUncheckedUpdateManyWithoutTestCaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    expectedResult?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}